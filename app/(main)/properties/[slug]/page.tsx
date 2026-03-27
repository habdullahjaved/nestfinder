import { notFound } from "next/navigation";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { SaveButton } from "@/components/properties/save-button";
import { MortgageCalculator } from "@/components/properties/mortgage-calculator";
import { NeighbourhoodSummary } from "@/components/properties/neighbourhood-summary";
import { AgentCard } from "@/components/properties/agent-card";
import { Bed, Bath, Square, MapPin, CheckCircle2 } from "lucide-react";

import { PropertyMetadata, PropertyWithAgent } from "@/types";
import { createClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/client";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const supabase = createStaticClient();

  const { data } = await supabase.from("properties").select("slug");

  // Cast the data to an array of objects with a slug property
  const slugs = data as { slug: string }[] | null;

  return (
    slugs?.map((p) => ({
      slug: p.slug,
    })) ?? []
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("properties")
    .select("title, neighbourhood, price")
    .eq("slug", slug)
    .single();

  if (!data) return {};

  // Cast the result to the expected type
  const property = data as PropertyMetadata;

  return {
    title: property.title ?? "Property",
    description: `${property.title ?? "Property"} in ${
      property.neighbourhood ?? "UAE"
    } — AED ${(property.price ?? 0).toLocaleString()}`,
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const session = await auth();

  const { data } = await supabase
    .from("properties")
    .select("*, agents(*)")
    .eq("slug", slug)
    .single();

  const property = data as PropertyWithAgent | null;

  if (!property) notFound();

  const formatPrice = (price: number, per: string) => {
    const fmt = new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: "AED",
      maximumFractionDigits: 0,
    }).format(price);

    return per === "sale" ? fmt : `${fmt} / ${per}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Image gallery */}
      <div className="relative h-[50vh] w-full overflow-hidden bg-muted md:h-[60vh]">
        <Image
          src={
            property.images?.[0] ??
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80"
          }
          alt={property.title}
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        <div className="absolute bottom-4 left-4 flex gap-2">
          {property.is_featured && (
            <Badge className="bg-accent text-accent-foreground">Featured</Badge>
          )}

          <Badge className="bg-background/90 text-primary capitalize">
            For {property.listing_type}
          </Badge>
        </div>

        <div className="absolute right-4 top-4">
          <SaveButton propertyId={property.id} className="h-10 w-10" />
        </div>

        {property.images?.length > 1 && (
          <div className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
            1 / {property.images.length}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left side */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="font-syne text-2xl font-extrabold text-primary md:text-3xl">
                    {property.title}
                  </h1>

                  <div className="mt-2 flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{property.address}</span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-syne text-2xl font-bold text-primary">
                    {formatPrice(property.price, property.price_per)}
                  </p>

                  <p className="text-xs text-muted-foreground capitalize">
                    {property.property_type}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 rounded-2xl border border-border bg-card p-6">
              {[
                { icon: Bed, label: "Bedrooms", value: property.bedrooms },
                { icon: Bath, label: "Bathrooms", value: property.bathrooms },
                {
                  icon: Square,
                  label: "Area",
                  value: `${property.area_sqft.toLocaleString()} sqft`,
                },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1 text-center"
                >
                  <Icon className="h-5 w-5 text-muted-foreground/60" />
                  <p className="font-syne text-xl font-bold text-primary">
                    {value}
                  </p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-syne text-lg font-bold text-primary mb-3">
                About this property
              </h2>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {property.description ?? "No description available"}
              </p>
            </div>

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="font-syne text-lg font-bold text-primary mb-4">
                  Amenities
                </h2>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {property.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <NeighbourhoodSummary
              neighbourhood={property.neighbourhood}
              city={property.city}
            />
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6 lg:w-80">
            {property.agents && <AgentCard agent={property.agents as any} />}

            {property.listing_type === "sale" && (
              <MortgageCalculator price={property.price} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

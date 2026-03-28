import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { PropertyCard } from "@/components/properties/property-card";
import { Heart } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Saved Properties — NestFinder" };

function getAdmin() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const supabase = getAdmin();

  const { data: saved } = await supabase
    .from("saved_properties")
    .select(
      `
         property_id,
         properties (
         id, slug, title, price, price_per, listing_type,
         property_type, bedrooms, bathrooms, area_sqft,
         address, neighbourhood, images, is_featured, amenities,
         agents ( name, agency, phone, avatar_url )
         )
      `,
    )
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  const properties = saved?.map((s) => s.properties).filter(Boolean) ?? [];

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-syne text-3xl font-extrabold text-slate-900">
            Saved properties
          </h1>
          <p className="mt-1 text-sand-500">
            {properties.length}{" "}
            {properties.length === 1 ? "property" : "properties"} saved
          </p>
        </div>

        {/* Grid */}
        {properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-sand-200 bg-white py-24 text-center">
            <Heart className="mb-4 h-10 w-10 text-sand-300" />
            <p className="font-medium text-slate-700">
              No saved properties yet
            </p>
            <p className="mt-1 text-sm text-sand-500">
              Click the heart on any listing to save it here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property: any) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

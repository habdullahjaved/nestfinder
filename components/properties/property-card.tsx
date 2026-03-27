import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Square, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Property } from "@/hooks/use-properties";
import { SaveButton } from "./save-button";

function formatPrice(price: number, pricePer: string) {
  const formatted = new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(price);

  if (pricePer === "sale") return formatted;
  return `${formatted} / ${pricePer}`;
}

interface PropertyCardProps {
  property: Property;
  className?: string;
  userId?: string;
}

export function PropertyCard({
  property,
  className,
  userId,
}: PropertyCardProps) {
  const imageUrl =
    property.images?.[0] ??
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80";

  return (
    <Link
      href={`/properties/${property.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl transition-shadow hover:shadow-lg",
        className,
      )}
      style={{ border: "1px solid var(--border)", background: "var(--card)" }}
    >
      {/* Image */}
      <div
        className="relative h-52 w-full overflow-hidden"
        style={{ background: "var(--muted)" }}
      >
        <Image
          src={imageUrl}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex gap-2">
          {property.is_featured && (
            <Badge
              className="font-semibold"
              style={{
                background: "var(--accent)",
                color: "var(--accent-foreground)",
              }}
            >
              <Star
                className="mr-1 h-3 w-3"
                style={{ fill: "var(--accent-foreground)" }}
              />
              Featured
            </Badge>
          )}
          <Badge
            className="capitalize"
            style={
              property.listing_type === "rent"
                ? {
                    background: "var(--secondary)",
                    color: "var(--secondary-foreground)",
                  }
                : {
                    background: "var(--primary)",
                    color: "var(--primary-foreground)",
                  }
            }
          >
            For {property.listing_type === "rent" ? "Rent" : "Sale"}
          </Badge>
        </div>

        <div className="absolute right-3 top-3">
          <SaveButton propertyId={property.id} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Price */}
        <p
          className="font-syne text-xl font-bold"
          style={{ color: "var(--foreground)" }}
        >
          {formatPrice(property.price, property.price_per)}
        </p>

        {/* Title */}
        <p
          className="line-clamp-1 text-sm font-medium"
          style={{ color: "var(--foreground)" }}
        >
          {property.title}
        </p>

        {/* Location */}
        <div
          className="flex items-center gap-1"
          style={{ color: "var(--muted-foreground)" }}
        >
          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="line-clamp-1 text-xs">{property.address}</span>
        </div>

        {/* Stats */}
        <div
          className="flex items-center gap-4 pt-3 text-xs"
          style={{
            borderTop: "1px solid var(--border)",
            color: "var(--foreground)",
          }}
        >
          <div className="flex items-center gap-1">
            <Bed
              className="h-3.5 w-3.5"
              style={{ color: "var(--muted-foreground)" }}
            />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath
              className="h-3.5 w-3.5"
              style={{ color: "var(--muted-foreground)" }}
            />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <Square
              className="h-3.5 w-3.5"
              style={{ color: "var(--muted-foreground)" }}
            />
            <span>{property.area_sqft.toLocaleString()} sqft</span>
          </div>
        </div>

        {/* Agent */}
        {property.agents && (
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            {property.agents.name} · {property.agents.agency}
          </p>
        )}
      </div>
    </Link>
  );
}

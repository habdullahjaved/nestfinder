"use client";

import { useState } from "react";
import { useQueryStates, parseAsInteger, parseAsString } from "nuqs";
import { useProperties } from "@/hooks/use-properties";
import { PropertyGrid } from "./property-grid";
import { PropertyMap } from "./property-map";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Map } from "lucide-react";
import { filterParsers } from "./property-filters";

export function PropertyMapView() {
  const [view, setView] = useState<"grid" | "map">("grid");
  const [highlightedId, setHighlightedId] = useState<string>();
  const [filters] = useQueryStates(filterParsers, { shallow: false });

  const { data, isLoading, isError } = useProperties(
    {
      q: filters.q || undefined,
      listing_type: (filters.listing_type || undefined) as
        | "rent"
        | "sale"
        | undefined,
      property_type: (filters.property_type || undefined) as
        | "apartment"
        | "villa"
        | "townhouse"
        | "studio"
        | "penthouse"
        | undefined,
      bedrooms: filters.bedrooms || undefined,
      min_price: filters.min_price || undefined,
      max_price: filters.max_price || undefined,
      neighbourhood: filters.neighbourhood || undefined,
    },
    filters.page,
  );

  return (
    <div className="flex flex-col gap-4">
      {/* View toggle */}
      <div className="flex items-center justify-end gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setView("grid")}
          className={
            view === "grid"
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-sand-200"
          }
        >
          <LayoutGrid className="mr-1.5 h-3.5 w-3.5" />
          Grid
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setView("map")}
          className={
            view === "map"
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-sand-200"
          }
        >
          <Map className="mr-1.5 h-3.5 w-3.5" />
          Map
        </Button>
      </div>

      {view === "grid" ? (
        <PropertyGrid />
      ) : (
        <div className="h-[600px] w-full">
          <PropertyMap
            properties={data?.data ?? []}
            highlightedId={highlightedId}
            onPinClick={(id) => setHighlightedId(id)}
          />
        </div>
      )}
    </div>
  );
}

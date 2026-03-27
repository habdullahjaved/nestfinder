import { Suspense } from "react";
import { PropertyFilters } from "@/components/properties/property-filters";
import { PropertyGrid } from "@/components/properties/property-grid";
import { PropertyMapView } from "@/components/properties/property-map-view";
import { SearchBar } from "@/components/shared/search-bar";
import { MapPin, LayoutGrid } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties",
};

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-sand-50">
      <div className="border-b border-sand-200 bg-white px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Suspense>
            <SearchBar />
          </Suspense>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="w-full lg:w-72 lg:flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <Suspense>
                <PropertyFilters />
              </Suspense>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <Suspense>
              <PropertyMapView />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

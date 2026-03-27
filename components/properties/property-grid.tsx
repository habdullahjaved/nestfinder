"use client";

import { useQueryStates, parseAsInteger, parseAsString } from "nuqs";
import { useProperties } from "@/hooks/use-properties";
import { PropertyCard } from "./property-card";
import { PropertyCardSkeleton } from "./property-card-skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Building2 } from "lucide-react";
import { filterParsers } from "./property-filters";
import { useSession } from "next-auth/react"; // 👈 import
const PAGE_SIZE = 12;

export function PropertyGrid() {
  const { data: session } = useSession(); // 👈 get session
  const userId = session?.user?.id;
  const [filters, setFilters] = useQueryStates(filterParsers, {
    shallow: false,
  });

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

  const totalPages = data ? Math.ceil(data.count / PAGE_SIZE) : 0;

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-slate-500">
          Something went wrong. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-sand-500">
          {isLoading ? (
            <span className="inline-block h-4 w-32 animate-pulse rounded bg-sand-100" />
          ) : (
            <>
              <span className="font-medium text-slate-900">
                {data?.count ?? 0}
              </span>{" "}
              properties found
            </>
          )}
        </p>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      ) : data?.data.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-sand-200 py-24 text-center">
          <Building2 className="mb-4 h-10 w-10 text-sand-300" />
          <p className="font-medium text-slate-700">No properties found</p>
          <p className="mt-1 text-sm text-sand-500">
            Try adjusting your filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {data?.data.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              userId={userId}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilters({ page: filters.page - 1 })}
            disabled={filters.page <= 1}
            className="border-sand-200"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p === 1 ||
                  p === totalPages ||
                  Math.abs(p - filters.page) <= 1,
              )
              .reduce<(number | "...")[]>((acc, p, i, arr) => {
                if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "..." ? (
                  <span key={`ellipsis-${i}`} className="px-1 text-sand-400">
                    …
                  </span>
                ) : (
                  <Button
                    key={p}
                    variant="outline"
                    size="sm"
                    onClick={() => setFilters({ page: p as number })}
                    className={
                      filters.page === p
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-sand-200 text-slate-600"
                    }
                  >
                    {p}
                  </Button>
                ),
              )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilters({ page: filters.page + 1 })}
            disabled={filters.page >= totalPages}
            className="border-sand-200"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

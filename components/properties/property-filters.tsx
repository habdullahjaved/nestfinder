"use client";

import { useQueryStates, parseAsString, parseAsInteger } from "nuqs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SlidersHorizontal, X } from "lucide-react";

export const filterParsers = {
  q: parseAsString.withDefault(""),
  listing_type: parseAsString.withDefault(""),
  property_type: parseAsString.withDefault(""),
  bedrooms: parseAsInteger.withDefault(0),
  min_price: parseAsInteger.withDefault(0),
  max_price: parseAsInteger.withDefault(0),
  neighbourhood: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
};

export function PropertyFilters() {
  const [filters, setFilters] = useQueryStates(filterParsers, {
    shallow: false,
  });

  function reset() {
    setFilters({
      listing_type: "",
      property_type: "",
      bedrooms: 0,
      min_price: 0,
      max_price: 0,
      neighbourhood: "",
      page: 1,
    });
  }

  const hasActiveFilters =
    filters.listing_type ||
    filters.property_type ||
    filters.bedrooms ||
    filters.min_price ||
    filters.max_price;

  return (
    <aside
      className="flex h-fit flex-col gap-5 rounded-2xl p-5"
      style={{ border: "1px solid var(--border)", background: "var(--card)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            className="h-4 w-4"
            style={{ color: "var(--primary)" }}
          />
          <span
            className="font-syne font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            Filters
          </span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={reset}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors hover:opacity-80"
            style={{ color: "var(--muted-foreground)" }}
          >
            <X className="h-3 w-3" />
            Clear all
          </button>
        )}
      </div>

      <Separator style={{ background: "var(--border)" }} />

      {/* Listing Type */}
      <div className="flex flex-col gap-2">
        <Label
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--muted-foreground)" }}
        >
          Type
        </Label>
        <div className="flex gap-2">
          {["", "rent", "sale"].map((type) => {
            const isActive = filters.listing_type === type;
            return (
              <button
                key={type}
                onClick={() => setFilters({ listing_type: type, page: 1 })}
                className="rounded-lg px-3 py-1.5 text-sm font-medium transition-all"
                style={
                  isActive
                    ? {
                        background: "var(--primary)",
                        color: "var(--primary-foreground)",
                        border: "1px solid var(--primary)",
                      }
                    : {
                        background: "transparent",
                        color: "var(--foreground)",
                        border: "1px solid var(--border)",
                      }
                }
              >
                {type === "" ? "All" : type === "rent" ? "Rent" : "Buy"}
              </button>
            );
          })}
        </div>
      </div>

      <Separator style={{ background: "var(--border)" }} />

      {/* Property Type */}
      <div className="flex flex-col gap-2">
        <Label
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--muted-foreground)" }}
        >
          Property
        </Label>
        <Select
          value={filters.property_type || "all"}
          onValueChange={(v) =>
            setFilters({ property_type: v === "all" ? "" : v, page: 1 })
          }
        >
          <SelectTrigger
            className="text-sm"
            style={{
              border: "1px solid var(--border)",
              background: "var(--muted)",
              color: "var(--foreground)",
            }}
          >
            <SelectValue placeholder="Any type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any type</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
            <SelectItem value="townhouse">Townhouse</SelectItem>
            <SelectItem value="studio">Studio</SelectItem>
            <SelectItem value="penthouse">Penthouse</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator style={{ background: "var(--border)" }} />

      {/* Bedrooms */}
      <div className="flex flex-col gap-2">
        <Label
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--muted-foreground)" }}
        >
          Bedrooms
        </Label>
        <div className="flex flex-wrap gap-2">
          {[0, 1, 2, 3, 4, 5].map((n) => {
            const isActive = filters.bedrooms === n;
            return (
              <button
                key={n}
                onClick={() => setFilters({ bedrooms: n, page: 1 })}
                className="rounded-lg px-3 py-1.5 text-sm font-medium transition-all"
                style={
                  isActive
                    ? {
                        background: "var(--primary)",
                        color: "var(--primary-foreground)",
                        border: "1px solid var(--primary)",
                      }
                    : {
                        background: "transparent",
                        color: "var(--foreground)",
                        border: "1px solid var(--border)",
                      }
                }
              >
                {n === 0 ? "Any" : n === 5 ? "5+" : n}
              </button>
            );
          })}
        </div>
      </div>

      <Separator style={{ background: "var(--border)" }} />

      {/* Price Range */}
      <div className="flex flex-col gap-2">
        <Label
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--muted-foreground)" }}
        >
          Price (AED)
        </Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={filters.min_price || ""}
            onChange={(e) =>
              setFilters({ min_price: Number(e.target.value) || 0, page: 1 })
            }
            className="text-sm"
            style={{
              border: "1px solid var(--border)",
              background: "var(--muted)",
              color: "var(--foreground)",
            }}
          />
          <span style={{ color: "var(--muted-foreground)" }}>—</span>
          <Input
            type="number"
            placeholder="Max"
            value={filters.max_price || ""}
            onChange={(e) =>
              setFilters({ max_price: Number(e.target.value) || 0, page: 1 })
            }
            className="text-sm"
            style={{
              border: "1px solid var(--border)",
              background: "var(--muted)",
              color: "var(--foreground)",
            }}
          />
        </div>
      </div>

      {/* Apply accent bar at bottom when filters active */}
      {hasActiveFilters && (
        <div
          className="rounded-lg px-3 py-2 text-center text-xs font-semibold"
          style={{
            background: "var(--secondary)",
            color: "var(--secondary-foreground)",
          }}
        >
          Filters applied
        </div>
      )}
    </aside>
  );
}

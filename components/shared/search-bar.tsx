"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isOnPropertiesPage = pathname === "/properties";

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [listingType, setListingType] = useState(
    searchParams.get("listing_type") ?? "all",
  );

  // Keep in sync when URL changes (on properties page)
  useEffect(() => {
    if (isOnPropertiesPage) {
      setQuery(searchParams.get("q") ?? "");
      setListingType(searchParams.get("listing_type") ?? "all");
    }
  }, [searchParams, isOnPropertiesPage]);

  function handleSearch() {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (listingType && listingType !== "all")
      params.set("listing_type", listingType);

    const url = `/properties${params.toString() ? `?${params.toString()}` : ""}`;
    router.push(url);
  }

  return (
    <div
      className={`flex overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-white/10 ${className ?? ""}`}
    >
      {/* Listing type */}
      <div className="border-r border-sand-200">
        <Select value={listingType} onValueChange={setListingType}>
          <SelectTrigger className="h-full w-24 rounded-none border-0 bg-transparent px-3 text-sm font-medium shadow-none focus:ring-0 sm:w-28 sm:px-4">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="rent">Rent</SelectItem>
            <SelectItem value="sale">Buy</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Search input */}
      <div className="flex flex-1 items-center px-3 sm:px-4">
        <Search className="mr-2 h-4 w-4 flex-shrink-0 text-sand-400" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search by area, building or community..."
          className="border-0 bg-transparent p-0 text-sm shadow-none placeholder:text-sand-400 focus-visible:ring-0"
        />
      </div>

      {/* Button */}
      <div className="p-1.5">
        <Button
          onClick={handleSearch}
          className="h-full rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800 sm:px-6"
        >
          Search
        </Button>
      </div>
    </div>
  );
}

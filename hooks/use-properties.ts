"use client";

import { useQuery } from "@tanstack/react-query";
import type { PropertyFilters } from "@/types";
import type { Database } from "@/types/database";
import { createStaticClient } from "@/lib/supabase/client";

type Property = Database["public"]["Tables"]["properties"]["Row"] & {
  agents: {
    name: string;
    agency: string;
    phone: string;
    avatar_url: string | null;
  } | null;
};

const PAGE_SIZE = 12;

async function fetchProperties(
  filters: PropertyFilters & { q?: string },
  page: number,
) {
  const supabase = createStaticClient();

  let query = supabase
    .from("properties")
    .select("*, agents(name, agency, phone, avatar_url)", { count: "exact" });

  // Full text search across title, description, neighbourhood
  if (filters.q) {
    query = query.or(
      `title.ilike.%${filters.q}%,neighbourhood.ilike.%${filters.q}%,address.ilike.%${filters.q}%`,
    );
  }

  if (filters.listing_type)
    query = query.eq("listing_type", filters.listing_type);
  if (filters.property_type)
    query = query.eq("property_type", filters.property_type);
  if (filters.bedrooms) query = query.eq("bedrooms", filters.bedrooms);
  if (filters.neighbourhood)
    query = query.ilike("neighbourhood", `%${filters.neighbourhood}%`);
  if (filters.min_price) query = query.gte("price", filters.min_price);
  if (filters.max_price) query = query.lte("price", filters.max_price);

  const from = (page - 1) * PAGE_SIZE;
  const { data, error, count } = await query
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);

  if (error) throw new Error(error.message);
  return { data: (data ?? []) as Property[], count: count ?? 0 };
}

export function useProperties(
  filters: PropertyFilters & { q?: string },
  page = 1,
) {
  return useQuery({
    queryKey: ["properties", filters, page],
    queryFn: () => fetchProperties(filters, page),
    placeholderData: (prev) => prev,
  });
}

export type { Property };

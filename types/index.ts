import { Database } from "./database";

export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  price_per: "month" | "year" | "sale";
  property_type: "apartment" | "villa" | "townhouse" | "studio" | "penthouse";
  listing_type: "rent" | "sale";
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  address: string;
  city: string;
  neighbourhood: string;
  latitude: number;
  longitude: number;
  images: string[];
  amenities: string[];
  is_featured: boolean;
  agent_id: string;
  created_at: string;
  updated_at: string;
}

export interface PropertyFilters {
  listing_type?: "rent" | "sale";
  property_type?: Property["property_type"];
  min_price?: number;
  max_price?: number;
  bedrooms?: number;
  city?: string;
  neighbourhood?: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar_url: string;
  agency: string;
  listings_count: number;
}
type PropertyRow = Database["public"]["Tables"]["properties"]["Row"];
type AgentRow = Database["public"]["Tables"]["agents"]["Row"];

// Extend PropertyRow to include the joined agent
export interface PropertyWithAgent extends PropertyRow {
  agents: AgentRow | null;
}
export type PropertyMetadata = Pick<
  Database["public"]["Tables"]["properties"]["Row"],
  "title" | "neighbourhood" | "price"
>;

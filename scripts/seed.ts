import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/database";
const properties: Database["public"]["Tables"]["properties"]["Insert"][] = [];
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // service role — bypasses RLS
);

const AGENTS = [
  {
    name: "Khalid Al Mansoori",
    email: "khalid@emiratesrealty.ae",
    phone: "+971 50 123 4567",
    agency: "Emirates Realty",
    license_number: "DLD-2021-0042",
    rating: 4.8,
    listings_count: 24,
  },
  {
    name: "Sarah Mitchell",
    email: "sarah@metropolitandxb.ae",
    phone: "+971 55 987 6543",
    agency: "Metropolitan Dubai",
    license_number: "DLD-2019-0187",
    rating: 4.9,
    listings_count: 38,
  },
  {
    name: "Ravi Sharma",
    email: "ravi@goldengaterealty.ae",
    phone: "+971 52 456 7890",
    agency: "Golden Gate Realty",
    license_number: "DLD-2020-0093",
    rating: 4.6,
    listings_count: 17,
  },
];

const AMENITIES_POOL = [
  "Swimming Pool",
  "Gym",
  "Parking",
  "Balcony",
  "Built-in Wardrobes",
  "Central A/C",
  "Concierge",
  "Security",
  "Children Play Area",
  "BBQ Area",
  "Sauna",
  "Steam Room",
  "Tennis Court",
  "Squash Court",
  "Spa",
];

function randomAmenities(count = 6) {
  return [...AMENITIES_POOL].sort(() => Math.random() - 0.5).slice(0, count);
}

// Realistic Dubai coordinates per neighbourhood
const NEIGHBOURHOODS: Record<
  string,
  { lat: number; lng: number; address_prefix: string }
> = {
  "Dubai Marina": { lat: 25.08, lng: 55.14, address_prefix: "Marina Walk" },
  "Downtown Dubai": { lat: 25.1972, lng: 55.2744, address_prefix: "Boulevard" },
  JBR: { lat: 25.0762, lng: 55.1303, address_prefix: "The Walk" },
  "Palm Jumeirah": {
    lat: 25.1124,
    lng: 55.139,
    address_prefix: "Palm Crescent",
  },
  "Business Bay": {
    lat: 25.1857,
    lng: 55.265,
    address_prefix: "Executive Tower",
  },
  DIFC: { lat: 25.2048, lng: 55.2795, address_prefix: "Gate Avenue" },
  Jumeirah: { lat: 25.2048, lng: 55.2346, address_prefix: "Jumeirah Road" },
  "Arabian Ranches": {
    lat: 25.0543,
    lng: 55.2715,
    address_prefix: "Mirador La Coleccion",
  },
};

function jitter(coord: number, range = 0.003) {
  return coord + (Math.random() - 0.5) * range;
}

async function seed() {
  console.log("🌱 Seeding NestFinder...");

  // Insert agents
  const { data: agents, error: agentError } = await supabase
    .from("agents")
    .insert(AGENTS)
    .select();

  if (agentError) {
    console.error("Agent seed error:", agentError);
    process.exit(1);
  }
  console.log(`✅ Inserted ${agents.length} agents`);

  // Build properties
  const properties = [];
  const neighbourhoodKeys = Object.keys(NEIGHBOURHOODS);

  for (let i = 0; i < 40; i++) {
    const neighbourhood = neighbourhoodKeys[i % neighbourhoodKeys.length];
    const { lat, lng, address_prefix } = NEIGHBOURHOODS[neighbourhood];
    const isVilla =
      neighbourhood === "Arabian Ranches" || neighbourhood === "Palm Jumeirah";
    const isSale = Math.random() > 0.6;
    const bedrooms = isVilla
      ? Math.floor(Math.random() * 3) + 3
      : Math.floor(Math.random() * 3) + 1;
    const bathrooms = Math.max(1, bedrooms - 1);
    const basePrice = isVilla
      ? isSale
        ? 4_500_000 + Math.random() * 8_000_000
        : 250_000 + Math.random() * 200_000
      : isSale
        ? 800_000 + Math.random() * 3_000_000
        : 60_000 + Math.random() * 200_000;

    const title = `${bedrooms} BR ${isVilla ? "Villa" : "Apartment"} in ${neighbourhood}`;

    // Generate slug from title + index for uniqueness
    const slug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-") +
      "-" +
      (i + 1);

    properties.push({
      title,
      slug,
      description: `Stunning ${bedrooms}-bedroom ${isVilla ? "villa" : "apartment"} in the heart of ${neighbourhood}. Modern interiors, premium finishes, and access to world-class amenities.`,
      price: Math.round(basePrice / 1000) * 1000,
      price_per: (isSale ? "sale" : "year") as "sale" | "year" | "month",
      listing_type: (isSale ? "sale" : "rent") as "sale" | "rent",
      property_type: (isVilla
        ? Math.random() > 0.5
          ? "villa"
          : "townhouse"
        : bedrooms === 1 && Math.random() > 0.5
          ? "studio"
          : "apartment") as
        | "apartment"
        | "villa"
        | "townhouse"
        | "studio"
        | "penthouse",
      bedrooms,
      bathrooms,
      area_sqft: isVilla
        ? 2500 + Math.floor(Math.random() * 3000)
        : 600 + Math.floor(Math.random() * 1200),
      address: `${address_prefix}, ${neighbourhood}, Dubai`,
      city: "Dubai",
      neighbourhood,
      latitude: jitter(lat),
      longitude: jitter(lng),
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      ],
      amenities: randomAmenities(),
      is_featured: i < 6,
      agent_id: agents[i % agents.length].id,
    });
  }

  const { error: propError } = await supabase
    .from("properties")
    .insert(properties);

  if (propError) {
    console.error("Property seed error:", propError);
    process.exit(1);
  }

  console.log(`✅ Inserted ${properties.length} properties`);
  console.log("🎉 Seed complete!");
}

seed();

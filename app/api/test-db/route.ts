import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const { data: properties, error } = await supabase
    .from("properties")
    .select(
      `
      id,
      title,
      price,
      neighbourhood,
      bedrooms,
      listing_type,
      agents (name, agency)
    `,
    )
    .limit(5);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ count: properties.length, properties });
}

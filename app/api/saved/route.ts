import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

function getAdmin() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ saved: [] });
  }

  const supabase = getAdmin();
  const { data } = await supabase
    .from("saved_properties")
    .select("property_id")
    .eq("user_id", session.user.id);

  return NextResponse.json({
    saved: data?.map((r) => r.property_id) ?? [],
  });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { propertyId } = await req.json();
  const supabase = getAdmin();

  const { error } = await supabase
    .from("saved_properties")
    .insert({ user_id: session.user.id, property_id: propertyId });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { propertyId } = await req.json();
  const supabase = getAdmin();

  const { error } = await supabase
    .from("saved_properties")
    .delete()
    .eq("user_id", session.user.id)
    .eq("property_id", propertyId);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

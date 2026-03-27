// lib/supabase/admin.ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

export function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "[NestFinder] Missing Supabase env vars. " +
        "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel.",
    );
  }

  return createClient<Database>(url, key);
}

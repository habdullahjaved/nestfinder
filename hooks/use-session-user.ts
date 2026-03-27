"use client";

import { useSession } from "next-auth/react";

export function useSessionUser() {
  const { data: session } = useSession();
  return session?.user ?? null;
}

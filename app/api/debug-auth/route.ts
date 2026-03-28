// app/api/debug-auth/route.ts — DELETE AFTER TESTING
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  return NextResponse.json({
    session,
    hasSecret: !!process.env.AUTH_SECRET,
    nextauthUrl: process.env.NEXTAUTH_URL,
  });
}

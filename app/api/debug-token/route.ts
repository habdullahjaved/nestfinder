// app/api/debug-token/route.ts — DELETE AFTER TESTING
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  });
  return NextResponse.json({
    token,
    hasAuthSecret: !!process.env.AUTH_SECRET,
    hasNextauthSecret: !!process.env.NEXTAUTH_SECRET,
  });
}

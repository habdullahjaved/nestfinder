// proxy.ts (root)
import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { getToken } from "next-auth/jwt";

const PROTECTED_ROUTES = ["/dashboard"];

export default async function proxy(request: NextRequest) {
  // ← default added
  const { pathname } = request.nextUrl;

  const response = await updateSession(request);

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp)$).*)",
  ],
};

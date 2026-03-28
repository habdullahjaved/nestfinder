// proxy.ts (root)
import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { auth } from "@/lib/auth";

const PROTECTED_ROUTES = ["/dashboard"];

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Run Supabase session refresh
  const response = await updateSession(request);

  // Use auth() instead of getToken() — works correctly with Auth.js v5
  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    const session = await auth();

    if (!session?.user?.id) {
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

import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export function middleware(
  request: NextRequest
) {
  const pathname = request.nextUrl.pathname;

  const protectedRoutes = ["/profile", "/admin", "/leaderboard"];
  const requiresAuth = protectedRoutes.some((route) => pathname.startsWith(route));

  if (!requiresAuth) {
    return NextResponse.next();
  }

  const session = request.cookies.get("ignite_session");

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/profile/:path*",
    "/admin/:path*",
    "/leaderboard/:path*",
  ],
};
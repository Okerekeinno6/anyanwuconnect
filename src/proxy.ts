import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware — injects the current pathname as an x-pathname request header
 * so server components (like the root layout) can read it without
 * needing usePathname() (which is client-only).
 */
export default function proxy(request: NextRequest) {
  const response = NextResponse.next();
  // Forward pathname to server components via custom header
  response.headers.set("x-pathname", request.nextUrl.pathname);
  return response;
}

export const config = {
  // Run on all routes except static assets and Next.js internals
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "agentflow_token";
const PUBLIC_ROUTES = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE);
  const { pathname } = request.nextUrl;

  // No cookie → redirect protected routes to /login
  if (!token && !PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Has cookie → redirect auth pages to /chat
  if (token && PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/chat"],
};

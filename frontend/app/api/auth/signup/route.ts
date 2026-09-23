import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/api";
import { AUTH_COOKIE, COOKIE_MAX_AGE } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();

  const res = await backendFetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.json();
    return NextResponse.json(error, { status: res.status });
  }

  const { access_token } = await res.json();

  const response = NextResponse.json({ success: true });
  response.cookies.set(AUTH_COOKIE, access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  return response;
}

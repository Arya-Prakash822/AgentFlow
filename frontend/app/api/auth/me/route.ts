import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { backendFetch } from "@/lib/api";
import { AUTH_COOKIE } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const res = await backendFetch("/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const user = await res.json();
  return NextResponse.json(user);
}

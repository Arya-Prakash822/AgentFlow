/**
 * Server-only helper to call the FastAPI backend via Docker-internal URL.
 * Must only be used in Route Handlers and Server Components — never in client code.
 */

const INTERNAL_API_URL =
  process.env.INTERNAL_API_URL || "http://backend:8000";

export async function backendFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  return fetch(`${INTERNAL_API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    cache: "no-store",
  });
}

"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AuthFormProps {
  mode: "login" | "signup";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isSignup = mode === "signup";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const body: Record<string, string> = { email, password };
      if (isSignup) body.full_name = fullName;

      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.detail || data.error || "Something went wrong");
        return;
      }

      router.push("/chat");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="logo">AgentFlow</div>
        <h1>{isSignup ? "Create your account" : "Welcome back"}</h1>
        <p className="subtitle">
          {isSignup
            ? "Get started with AI-powered support"
            : "Sign in to continue"}
        </p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="form-group">
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                type="text"
                placeholder="Jane Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete={isSignup ? "new-password" : "current-password"}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner" />
            ) : isSignup ? (
              "Create account"
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <div className="auth-footer">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <Link href="/login">Sign in</Link>
            </>
          ) : (
            <>
              Don&apos;t have an account?{" "}
              <Link href="/signup">Create one</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

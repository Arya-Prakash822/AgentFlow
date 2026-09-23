"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ChatPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ full_name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.replace("/login");
          return;
        }
        const data = await res.json();
        setUser(data);
      } catch (err) {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [router]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="page-loader">
        <span className="spinner" />
      </div>
    );
  }

  return (
    <div className="chat-page">
      <header className="chat-header">
        <div className="brand">
          Agent<span>Flow</span>
        </div>
        
        {user && (
          <div className="user-info">
            <span className="user-name">{user.full_name}</span>
            <div className="avatar">
              {user.full_name.charAt(0).toUpperCase()}
            </div>
            <button onClick={handleLogout} className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: '0.8125rem' }}>
              Sign out
            </button>
          </div>
        )}
      </header>

      <main className="chat-body">
        <div className="chat-placeholder">
          <div className="icon">✨</div>
          <h2>Chat coming in Phase 3</h2>
          <p>The backend foundation and authentication are ready.</p>
        </div>
      </main>
    </div>
  );
}

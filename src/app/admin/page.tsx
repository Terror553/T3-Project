"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "~/client/theme";

export default function AdminPage() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { showLoadingBar, hideLoadingBar } = useTheme();

  useEffect(() => {
    async function load() {
      try {
        showLoadingBar("admin");
        setLoading(true);
        const res = await fetch("/api/auth/user");
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setUser(data || null);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
        hideLoadingBar("admin");
      }
    }

    void load();
  }, [hideLoadingBar, showLoadingBar]);

  if (loading) return <p>Loading...</p>;
  if (!user || !(user.group?.team || user.group?.highTeam)) return <p>Access denied</p>;

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome, {user.username}</p>

      <ul>
        <li>
          <Link href="/admin/categories">Manage Categories</Link>
        </li>
        <li>
          <Link href="/admin/roles">Manage Roles</Link>
        </li>
        <li>
          <Link href="/admin/reactions">Manage Reactions</Link>
        </li>
      </ul>
    </div>
  );
}

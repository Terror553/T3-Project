"use client";

import { useEffect, useState } from "react";

type DashboardStats = {
  topicsCount: number;
  usersCount: number;
  repliesCount: number;
};

export default function Overview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadStats(): Promise<void> {
      try {
        const response = await fetch("/api/dashboard/stats");
        if (!response.ok) {
          throw new Error(`Failed to load dashboard stats (${response.status})`);
        }

        const data = (await response.json()) as DashboardStats;
        if (active) setStats(data);
      } catch (loadError) {
        console.error("Failed to load dashboard stats", loadError);
        if (active) setError("Dashboard statistics are currently unavailable.");
      }
    }

    void loadStats();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="container-fluid py-4">
      <div className="mb-4">
        <h1 className="h3 mb-1">Dashboard overview</h1>
        <p className="text-muted mb-0">A quick view of community activity.</p>
      </div>

      {error && <div className="alert alert-warning">{error}</div>}

      <div className="row g-3">
        <StatCard label="Registered users" value={stats?.usersCount} icon="fas fa-users" />
        <StatCard label="Forum topics" value={stats?.topicsCount} icon="fas fa-comments" />
        <StatCard label="Topic replies" value={stats?.repliesCount} icon="fas fa-reply" />
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number | undefined;
  icon: string;
}) {
  return (
    <div className="col-sm-6 col-xl-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <div className="small text-muted">{label}</div>
            <div className="display-6 fw-semibold">{value ?? "—"}</div>
          </div>
          <i className={`${icon} fs-2 text-primary`} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

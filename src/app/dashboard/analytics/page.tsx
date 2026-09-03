"use client";

import { useEffect, useState } from "react";

type DashboardStats = {
  topicsCount: number;
  usersCount: number;
  repliesCount: number;
};

export default function AnalyticsPage() {
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
        console.error("Failed to load analytics", loadError);
        if (active) setError("Analytics are currently unavailable.");
      }
    }

    void loadStats();
    return () => {
      active = false;
    };
  }, []);

  const repliesPerTopic =
    stats && stats.topicsCount > 0
      ? (stats.repliesCount / stats.topicsCount).toFixed(1)
      : "—";
  const usersPerTopic =
    stats && stats.topicsCount > 0
      ? (stats.usersCount / stats.topicsCount).toFixed(1)
      : "—";

  return (
    <main className="container-fluid py-4">
      <div className="mb-4">
        <h1 className="h3 mb-1">Community analytics</h1>
        <p className="text-muted mb-0">
          Track the current size and activity of the community.
        </p>
      </div>

      {error && <div className="alert alert-warning">{error}</div>}

      <div className="row g-3">
        <MetricCard label="Registered users" value={stats?.usersCount} />
        <MetricCard label="Forum topics" value={stats?.topicsCount} />
        <MetricCard label="Topic replies" value={stats?.repliesCount} />
        <MetricCard label="Replies per topic" value={repliesPerTopic} />
        <MetricCard label="Users per topic" value={usersPerTopic} />
      </div>
    </main>
  );
}

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: number | string | undefined;
}) {
  return (
    <div className="col-sm-6 col-xl-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <div className="small text-muted">{label}</div>
          <div className="display-6 fw-semibold">{value ?? "—"}</div>
        </div>
      </div>
    </div>
  );
}

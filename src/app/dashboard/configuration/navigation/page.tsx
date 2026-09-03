"use client";

import { useEffect, useState } from "react";
import DashboardSection from "~/components/dashboard/DashboardSection";

type NavigationItem = {
  id: number;
  name: string;
  fullLink: string;
  icon: string;
  teamLink: number;
};

export default function Navigation() {
  const [items, setItems] = useState<NavigationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void fetch("/api/auth/navigation")
      .then(async (response) => {
        if (!response.ok) throw new Error(`Navigation request failed (${response.status})`);
        const data = (await response.json()) as NavigationItem[];
        setItems(data);
      })
      .catch((loadError: unknown) => {
        console.error("Failed to load dashboard navigation", loadError);
        setError("Navigation entries are currently unavailable.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardSection title="Navigation" description="Review the navigation entries currently served by the application.">
      {loading && <p className="text-muted mb-0">Loading navigation...</p>}
      {error && <div className="alert alert-warning mb-0">{error}</div>}
      {!loading && !error && items.length === 0 && <div className="alert alert-secondary mb-0">No navigation entries have been configured.</div>}
      {!loading && !error && items.length > 0 && (
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead><tr><th>Name</th><th>Link</th><th>Audience</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td><i className={`${item.icon} me-2`} aria-hidden="true" />{item.name}</td>
                  <td><code>{item.fullLink}</code></td>
                  <td>{item.teamLink ? "Team members" : "Everyone"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardSection>
  );
}

"use client";

import { useEffect, useState } from "react";
import type { Clan } from "~/server/types/clan";

export default function ClansPage() {
  const [clans, setClans] = useState<Clan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadClans(): Promise<void> {
      try {
        const response = await fetch("/api/clan");
        if (!response.ok) {
          throw new Error(`Failed to load clans (${response.status})`);
        }

        const data = (await response.json()) as Clan[];
        if (active) setClans(data);
      } catch (loadError) {
        console.error("Failed to load clans", loadError);
        if (active) setError("Clan data is currently unavailable.");
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadClans();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="container py-4">
      <div className="mb-4">
        <h1 className="h3 mb-1">Server clans</h1>
        <p className="text-muted mb-0">Browse the active clans connected to the Minecraft server.</p>
      </div>

      {error && <div className="alert alert-warning">{error}</div>}
      {loading && <p className="text-muted">Loading clans...</p>}
      {!loading && !error && clans.length === 0 && (
        <div className="card">
          <div className="card-body text-center py-5">
            <h2 className="h5">No clans found</h2>
            <p className="text-muted mb-0">Clans will appear here once the server has synced them.</p>
          </div>
        </div>
      )}

      {!loading && clans.length > 0 && (
        <div className="row g-3">
          {clans.map((clan) => (
            <div className="col-md-6 col-xl-4" key={clan.id}>
              <article className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start gap-3">
                    <div>
                      <h2 className="h5 mb-1">{clan.name}</h2>
                      <p className="text-muted mb-0">UUID: {clan.uuid}</p>
                    </div>
                    <span className="badge text-bg-primary">{clan.tag}</span>
                  </div>
                  <div className="small text-muted mt-3">
                    Updated {new Date(clan.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

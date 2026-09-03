"use client";

import { useEffect, useState, type ReactNode } from "react";

export default function DashboardSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    void fetch("/api/auth/user")
      .then(async (response) =>
        response.ok
          ? ((await response.json()) as {
              group?: { team?: number; highTeam?: number };
            } | null)
          : null,
      )
      .then((user) =>
        setAllowed(Boolean(user?.group?.team || user?.group?.highTeam)),
      )
      .catch((loadError: unknown) => {
        console.error("Failed to load dashboard permissions", loadError);
        setError(true);
        setAllowed(false);
      });
  }, []);

  if (allowed === null) {
    return (
      <main className="container-fluid py-4" aria-busy="true">
        <p className="alert alert-info" role="status">
          Loading dashboard...
        </p>
      </main>
    );
  }
  if (!allowed) {
    return (
      <main className="container-fluid py-4 dashboard-section">
        <div className="alert alert-danger" role="alert">
          {error
            ? "Dashboard access could not be verified."
            : "You do not have permission to view this page."}
        </div>
      </main>
    );
  }

  return (
    <main className="container-fluid py-4 dashboard-section">
      <div className="mb-4">
        <h1 className="h3 mb-1">{title}</h1>
        <p className="text-muted mb-0">{description}</p>
      </div>
      {children}
    </main>
  );
}

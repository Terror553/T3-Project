"use client";

import DashboardSection from "./DashboardSection";

export default function StoreSection({ title, description }: { title: string; description: string }) {
  return (
    <DashboardSection title={title} description={description}>
      <div className="card">
        <div className="card-body">
          <h2 className="h5">Nothing to display yet</h2>
          <p className="text-muted mb-0">The store data model and management API are not configured. This safe empty state avoids creating records without a server contract.</p>
        </div>
      </div>
    </DashboardSection>
  );
}

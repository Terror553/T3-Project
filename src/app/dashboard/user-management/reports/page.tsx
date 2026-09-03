"use client";

import { useEffect, useState } from "react";

type Report = {
  id: number;
  reason: string;
  status: string;
  topicId: number | null;
  replyId: number | null;
  reporter: { id: number; username: string };
  createdAt: string;
};

export default function Reports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function loadReports(): Promise<void> {
    try {
      const response = await fetch("/api/reports");
      if (!response.ok) throw new Error(`Failed to load reports (${response.status})`);
      setReports((await response.json()) as Report[]);
    } catch (loadError) {
      console.error("Failed to load reports", loadError);
      setError("Reports are currently unavailable.");
    }
  }

  async function updateStatus(id: number, status: "resolved" | "dismissed"): Promise<void> {
    const response = await fetch("/api/reports", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!response.ok) {
      setError("Failed to update report.");
      return;
    }
    await loadReports();
  }

  useEffect(() => {
    void loadReports();
  }, []);

  return (
    <main className="container-fluid py-4">
      <h1 className="h3">Reports</h1>
      <p className="text-muted">Review community reports and record moderation decisions.</p>
      {error && <div className="alert alert-warning">{error}</div>}
      {reports.length === 0 ? (
        <div className="alert alert-secondary">No reports found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr><th>Target</th><th>Reporter</th><th>Reason</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.topicId ? `Topic #${report.topicId}` : `Reply #${report.replyId}`}</td>
                  <td>{report.reporter.username}</td>
                  <td>{report.reason}</td>
                  <td><span className="badge text-bg-secondary">{report.status}</span></td>
                  <td>
                    {report.status === "open" && (
                      <div className="btn-group btn-group-sm">
                        <button type="button" className="btn btn-success" onClick={() => void updateStatus(report.id, "resolved")}>Resolve</button>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => void updateStatus(report.id, "dismissed")}>Dismiss</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

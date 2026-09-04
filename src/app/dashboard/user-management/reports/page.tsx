"use client";

import { useEffect, useState } from "react";
import DashboardSection from "~/components/dashboard/DashboardSection";

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
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  async function loadReports(): Promise<void> {
    try {
      const response = await fetch("/api/reports");
      if (!response.ok)
        throw new Error(`Failed to load reports (${response.status})`);
      setReports((await response.json()) as Report[]);
      setError(null);
    } catch (loadError) {
      console.error("Failed to load reports", loadError);
      setError("Reports are currently unavailable.");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(
    id: number,
    status: "resolved" | "dismissed",
  ): Promise<void> {
    try {
      setUpdatingId(id);
      setError(null);
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
    } catch (updateError: unknown) {
      console.error("Failed to update report", updateError);
      setError("Failed to update report.");
    } finally {
      setUpdatingId(null);
    }
  }

  useEffect(() => {
    void loadReports();
  }, []);

  return (
    <DashboardSection
      title="Reports"
      description="Review community reports and record moderation decisions."
    >
      {loading ? (
        <p className="alert alert-info" role="status">
          Loading reports...
        </p>
      ) : (
        <>
          {error && (
            <div className="alert alert-warning" role="alert">
              {error}
            </div>
          )}
          {reports.length === 0 ? (
            <div className="alert alert-secondary">No reports found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Target</th>
                    <th>Reporter</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report.id}>
                      <td>
                        {report.topicId
                          ? `Topic #${report.topicId}`
                          : `Reply #${report.replyId}`}
                      </td>
                      <td>{report.reporter.username}</td>
                      <td>{report.reason}</td>
                      <td>
                        <span className="badge bg-secondary text-white">
                          {report.status}
                        </span>
                      </td>
                      <td>
                        {report.status === "open" && (
                          <div className="btn-group btn-group-sm">
                            <button
                              type="button"
                              className="btn btn-success"
                              disabled={updatingId === report.id}
                              onClick={() =>
                                void updateStatus(report.id, "resolved")
                              }
                            >
                              Resolve
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              disabled={updatingId === report.id}
                              onClick={() =>
                                void updateStatus(report.id, "dismissed")
                              }
                            >
                              Dismiss
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </DashboardSection>
  );
}

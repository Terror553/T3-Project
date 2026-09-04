"use client";

import { useEffect, useState, type FormEvent } from "react";
import DashboardSection from "~/components/dashboard/DashboardSection";

type UserBan = {
  id: number;
  bannerUUID: string;
  bannedUUID: string;
  reason: string;
};

export default function Punishments() {
  const [bans, setBans] = useState<UserBan[]>([]);
  const [bannedUUID, setBannedUUID] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadBans(): Promise<void> {
    try {
      const response = await fetch("/api/admin/bans");
      if (!response.ok)
        throw new Error(`Failed to load bans (${response.status})`);
      setBans((await response.json()) as UserBan[]);
      setError(null);
    } catch (error) {
      console.error("Failed to load bans", error);
      setMessage("Unable to load punishments.");
      setError("Punishments are currently unavailable.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadBans();
  }, []);

  async function createBan(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (!bannedUUID.trim() || !reason.trim()) {
      setMessage("A player UUID and reason are required.");
      setError("A player UUID and reason are required.");
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch("/api/admin/bans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bannedUUID, reason }),
      });
      if (!response.ok)
        throw new Error(`Failed to create ban (${response.status})`);
      setBannedUUID("");
      setReason("");
      setMessage("Punishment recorded.");
      setError(null);
      await loadBans();
    } catch (error) {
      console.error("Failed to create ban", error);
      setMessage("Unable to record punishment.");
      setError("The punishment could not be recorded.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <DashboardSection
      title="Punishments"
      description="Record Minecraft player bans and review the current moderation history."
    >
      {message && (
        <div className="alert alert-info" role="status">
          {message}
        </div>
      )}
      {error && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )}
      <form className="card p-3 mb-4" onSubmit={createBan}>
        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label className="form-label" htmlFor="bannedUUID">
              Player UUID
            </label>
            <input
              id="bannedUUID"
              className="form-control"
              value={bannedUUID}
              onChange={(event) => setBannedUUID(event.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="banReason">
              Reason
            </label>
            <input
              id="banReason"
              className="form-control"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
            />
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-danger w-100"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Record ban"}
            </button>
          </div>
        </div>
      </form>
      {loading ? (
        <p className="alert alert-info" role="status">
          Loading punishments...
        </p>
      ) : bans.length === 0 ? (
        <div className="alert alert-secondary">No punishments recorded.</div>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Player UUID</th>
                <th>Reason</th>
                <th>Banner</th>
              </tr>
            </thead>
            <tbody>
              {bans.map((ban) => (
                <tr key={ban.id}>
                  <td>
                    <code>{ban.bannedUUID}</code>
                  </td>
                  <td>{ban.reason}</td>
                  <td>{ban.bannerUUID}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardSection>
  );
}

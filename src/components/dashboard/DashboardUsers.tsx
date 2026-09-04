"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DashboardSection from "./DashboardSection";

type UserResult = { id: number; username: string; avatarUrl: string };

export default function DashboardUsers() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<UserResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const value = query.trim();
    if (!value) {
      setUsers([]);
      setError(null);
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => {
      void searchUsers(value, controller.signal);
    }, 250);
    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  async function searchUsers(
    value: string,
    signal: AbortSignal,
  ): Promise<void> {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/user/search?q=${encodeURIComponent(value)}`,
        { signal },
      );
      if (!response.ok)
        throw new Error(`User search failed (${response.status})`);
      setUsers((await response.json()) as UserResult[]);
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      console.error("Failed to search dashboard users", error);
      setUsers([]);
      setError("User search is currently unavailable.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardSection
      title="User management"
      description="Search registered members using the shared user directory API."
    >
      <div className="card">
        <div className="card-body">
          <label className="form-label" htmlFor="dashboard-user-search">
            Search users
          </label>
          <input
            id="dashboard-user-search"
            className="form-control"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Enter a username"
            autoComplete="off"
          />
        </div>
      </div>
      {loading && (
        <p className="alert alert-info mt-3" role="status">
          Searching...
        </p>
      )}
      {error && (
        <div className="alert alert-warning mt-3" role="alert">
          {error}
        </div>
      )}
      {!loading && !error && query.trim() && users.length === 0 && (
        <div className="alert alert-secondary mt-3">No users found.</div>
      )}
      {users.length > 0 && (
        <div className="table-responsive mt-3">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Username</th>
                <th>Profile</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>
                    <Link
                      href={`/profile/${user.id}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      View profile
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardSection>
  );
}

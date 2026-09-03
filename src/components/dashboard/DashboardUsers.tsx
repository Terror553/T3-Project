"use client";

import { useState } from "react";
import DashboardSection from "./DashboardSection";

type UserResult = { id: number; username: string; avatarUrl: string };

export default function DashboardUsers() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<UserResult[]>([]);
  const [loading, setLoading] = useState(false);

  async function searchUsers(value: string) {
    setQuery(value);
    if (!value.trim()) {
      setUsers([]);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/user/search?q=${encodeURIComponent(value.trim())}`);
      setUsers(response.ok ? ((await response.json()) as UserResult[]) : []);
    } catch (error: unknown) {
      console.error("Failed to search dashboard users", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardSection title="User management" description="Search registered members using the shared user directory API.">
      <div className="card">
        <div className="card-body">
          <label className="form-label" htmlFor="dashboard-user-search">Search users</label>
          <input id="dashboard-user-search" className="form-control" value={query} onChange={(event) => void searchUsers(event.target.value)} placeholder="Enter a username" />
        </div>
      </div>
      {loading && <p className="text-muted mt-3">Searching...</p>}
      {!loading && query && users.length === 0 && <div className="alert alert-secondary mt-3">No users found.</div>}
      {users.length > 0 && (
        <div className="table-responsive mt-3">
          <table className="table align-middle">
            <thead><tr><th>Username</th><th>Profile</th></tr></thead>
            <tbody>{users.map((user) => <tr key={user.id}><td>{user.username}</td><td><a href={`/profile/${user.id}`} className="btn btn-sm btn-outline-primary">View profile</a></td></tr>)}</tbody>
          </table>
        </div>
      )}
    </DashboardSection>
  );
}

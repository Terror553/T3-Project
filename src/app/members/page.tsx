"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { replaceColor } from "~/utils/styleUtils";

type Member = {
  id: number;
  username: string;
  avatarUrl: string;
  createdAt: string;
  group: {
    id: number;
    name: string;
    color: string;
    gradient: number;
    start: string | null;
    end: string | null;
  } | null;
};

type MembersResponse = {
  users: Member[];
  page: number;
  totalPages: number;
  total: number;
};

export default function MembersPage() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<MembersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMembers = useCallback(async (currentPage: number, currentQuery: string) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(currentPage),
      });
      if (currentQuery) params.set("q", currentQuery);
      const response = await fetch(`/api/members?${params.toString()}`);
      if (!response.ok) throw new Error(`Members request failed (${response.status})`);
      setData((await response.json()) as MembersResponse);
    } catch (loadError: unknown) {
      console.error("Failed to load members", loadError);
      setData(null);
      setError("Members are currently unavailable.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadMembers(page, submittedQuery);
  }, [loadMembers, page, submittedQuery]);

  function submitSearch(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setPage(1);
    setSubmittedQuery(query.trim());
  }

  return (
    <main className="content">
      <div className="page-header d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
        <div>
          <h1 className="mb-1">Members</h1>
          <p className="text-muted mb-0">Find members of the community.</p>
        </div>
        <form className="d-flex gap-2" onSubmit={submitSearch} role="search">
          <label className="visually-hidden" htmlFor="member-search">Search members</label>
          <input
            id="member-search"
            className="form-control"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search members"
            autoComplete="off"
          />
          <button className="btn btn-primary" type="submit">Search</button>
        </form>
      </div>

      {loading && <p className="alert alert-info" role="status" aria-busy="true">Loading members...</p>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {!loading && !error && data?.users.length === 0 && (
        <div className="alert alert-secondary" role="status">
          {submittedQuery ? "No members match your search." : "No members found."}
        </div>
      )}

      {!loading && !error && data && data.users.length > 0 && (
        <>
          <div className="row g-3">
            {data.users.map((member) => (
              <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={member.id}>
                <article className="card card-secondary h-100">
                  <div className="card-body d-flex align-items-center gap-3">
                    <Image
                      src={member.avatarUrl}
                      alt={member.username}
                      width={64}
                      height={64}
                      className="rounded-circle"
                    />
                    <div className="min-w-0">
                      <h2 className="h5 mb-1 text-truncate">
                        <Link href={`/profile/${member.id}`}>{member.username}</Link>
                      </h2>
                      <span
                        className="badge"
                        style={replaceColor({
                          color: member.group?.color ?? "#6c757d",
                          gradient: member.group?.gradient ?? 0,
                          start: member.group?.start,
                          end: member.group?.end,
                          isBadge: true,
                        })}
                      >
                        {member.group?.name ?? "Member"}
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
          {data.totalPages > 1 && (
            <nav className="mt-4" aria-label="Member pages">
              <ul className="pagination justify-content-center">
                <li className={`page-item${page <= 1 ? " disabled" : ""}`}>
                  <button
                    className="page-link"
                    type="button"
                    disabled={page <= 1}
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                  >
                    Previous
                  </button>
                </li>
                <li className="page-item active" aria-current="page">
                  <span className="page-link">{page} / {data.totalPages}</span>
                </li>
                <li className={`page-item${page >= data.totalPages ? " disabled" : ""}`}>
                  <button
                    className="page-link"
                    type="button"
                    disabled={page >= data.totalPages}
                    onClick={() => setPage((current) => Math.min(data.totalPages, current + 1))}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </main>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";

type UserResult = { id: number; username: string; avatarUrl?: string };

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function UserPicker({ value, onChange, placeholder = "Select a user" }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debouncer = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // when external value changes (id string), we don't change the input text.
    // The caller can manage a display name if needed. We'll clear results.
    setResults([]);
  }, [value]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (debouncer.current) window.clearTimeout(debouncer.current);
    if (query.trim().length === 0) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    // Avoid passing an async function directly into setTimeout (ESLint rule warns)
    debouncer.current = window.setTimeout(() => {
      const doSearch = async () => {
        try {
          const res = await fetch(`/api/user/search?q=${encodeURIComponent(query)}`);
          if (!res.ok) throw new Error(`Search failed ${res.status}`);
          const data = (await res.json()) as UserResult[];
          setResults(data || []);
          setOpen(true);
        } catch (err) {
          console.error("User search error", err);
          setResults([]);
          setOpen(false);
        } finally {
          setLoading(false);
        }
      };
      void doSearch();
    }, 250);

    return () => {
      if (debouncer.current) window.clearTimeout(debouncer.current);
    };
  }, [query]);

  function selectUser(u: UserResult) {
    onChange(String(u.id));
    setQuery(u.username);
    setOpen(false);
  }

  function clearSelection() {
    onChange("");
    setQuery("");
    setResults([]);
  }

  return (
    <div className="user-picker" ref={containerRef} style={{ position: "relative" }}>
      <label className="form-label">{placeholder}</label>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search by username..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length > 0 && setOpen(true)}
          aria-autocomplete="list"
        />
        <button type="button" className="btn btn-outline-secondary" onClick={clearSelection} title="Clear selection">
          Clear
        </button>
      </div>

      {open && results.length > 0 && (
        <ul
          className="list-group"
          style={{ position: "absolute", zIndex: 60, width: "100%", maxHeight: 240, overflowY: "auto", marginTop: 6 }}
        >
          {results.map((u) => (
            <li key={u.id} className="list-group-item list-group-item-action" onClick={() => selectUser(u)}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <img src={u.avatarUrl ?? "/default.png"} alt={u.username} width={28} height={28} style={{ borderRadius: 12 }} />
                <div>
                  <div>{u.username}</div>
                  <div className="small text-muted">ID: {u.id}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {loading && <div className="small text-muted mt-1">Searching...</div>}
    </div>
  );
}

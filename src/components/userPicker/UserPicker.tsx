"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

type UserResult = { id: number; username: string; avatarUrl?: string };

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function UserPicker({ value, onChange, placeholder = "Select a user" }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserResult[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debouncer = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  // stable id for aria attributes
  const idRef = useRef<string>(`user-picker-${Math.random().toString(36).slice(2, 8)}`);
  const listboxId = `${idRef.current}-listbox`;

  useEffect(() => {
    // when external value changes (id string), we don't change the input text.
    // The caller can manage a display name if needed. We'll clear results.
    setResults([]);
    setHighlightedIndex(-1);
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
      setOpen(false);
      return;
    }
    setLoading(true);
    // Debounced search
    debouncer.current = window.setTimeout(() => {
      const doSearch = async () => {
        try {
          const res = await fetch(`/api/user/search?q=${encodeURIComponent(query)}`);
          if (!res.ok) throw new Error(`Search failed ${res.status}`);
          const data = (await res.json()) as UserResult[];
          setResults(data || []);
          setOpen(true);
          setHighlightedIndex(data && data.length > 0 ? 0 : -1);
        } catch (err) {
          console.error("User search error", err);
          setResults([]);
          setOpen(false);
          setHighlightedIndex(-1);
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
  const selectUser = useCallback((u: UserResult) => {
    onChange(String(u.id));
    setQuery(u.username);
    setOpen(false);
    setHighlightedIndex(-1);
    // return focus to the input so keyboard users remain in flow
    inputRef.current?.focus();
  }, [onChange]);
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || results.length === 0) {
      // If list is closed and user presses ArrowDown, open it (if results exist)
      if (e.key === "ArrowDown" && results.length > 0) {
        e.preventDefault();
        setOpen(true);
        setHighlightedIndex(0);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev >= results.length - 1 ? 0 : prev + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev <= 0 ? results.length - 1 : prev - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setHighlightedIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setHighlightedIndex(results.length - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const idx = highlightedIndex >= 0 ? highlightedIndex : 0;
      const item = results[idx];
      if (item) selectUser(item);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }, [open, results, highlightedIndex, selectUser]);
  function clearSelection() {
    onChange("");
    setQuery("");
    setResults([]);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  }
  return (
    <div className="user-picker" ref={containerRef} style={{ position: "relative" }}>
      <label className="form-label" htmlFor={`${idRef.current}-input`}>{placeholder}</label>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          id={`${idRef.current}-input`}
          ref={inputRef}
          type="text"
          className="form-control"
          placeholder="Search by username..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length > 0 && setOpen(true)}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-autocomplete="list"
          aria-controls={open && results.length > 0 ? listboxId : undefined}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-activedescendant={open && highlightedIndex >= 0 && results[highlightedIndex] ? `user-picker-option-${results[highlightedIndex].id}` : undefined}
        />
        <button type="button" className="btn btn-outline-secondary" onClick={clearSelection} aria-label="Clear selection">
          Clear
        </button>
      </div>
      {open && results.length > 0 && (
        <ul
          id={listboxId}
          className="list-group"
          role="listbox"
          aria-label="User search results"
          style={{ position: "absolute", zIndex: 60, width: "100%", maxHeight: 240, overflowY: "auto", marginTop: 6 }}
        >
          {results.map((u, idx) => (
            <li
              id={`user-picker-option-${u.id}`}
              key={u.id}
              role="option"
              aria-selected={highlightedIndex === idx}
              tabIndex={-1}
              className={`list-group-item list-group-item-action ${highlightedIndex === idx ? "active" : ""}`}
              onClick={() => selectUser(u)}
              onMouseEnter={() => setHighlightedIndex(idx)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Image src={u.avatarUrl ?? "/default.png"} alt={u.username} width={28} height={28} style={{ borderRadius: 12 }} />
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

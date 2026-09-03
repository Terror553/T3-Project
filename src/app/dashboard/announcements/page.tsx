"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import DashboardSection from "~/components/dashboard/DashboardSection";

type Announcement = { id: number; title: string; content: string; createdAt: string };

export default function Announcements() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function load(): Promise<void> {
    const response = await fetch("/api/dashboard/announcements");
    if (!response.ok) throw new Error("Announcements are unavailable.");
    setItems((await response.json()) as Announcement[]);
  }

  useEffect(() => {
    void load().catch((loadError: unknown) => {
      console.error("Failed to load announcements", loadError);
      setError("Announcements are currently unavailable.");
    });
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const response = await fetch("/api/dashboard/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (!response.ok) {
        const result = (await response.json()) as { error?: string };
        throw new Error(result.error ?? "Announcement could not be created.");
      }

      setTitle("");
      setContent("");
      await load();
    } catch (saveError) {
      console.error("Failed to create announcement", saveError);
      setError(saveError instanceof Error ? saveError.message : "Announcement could not be created.");
    } finally {
      setSaving(false);
    }

  }
  async function remove(id: number): Promise<void> {
    if (!window.confirm("Delete this announcement?")) return;
    try {
      const response = await fetch("/api/dashboard/announcements", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      if (!response.ok) throw new Error("Announcement could not be deleted.");
      await load();
    } catch (removeError: unknown) {
      console.error("Failed to delete announcement", removeError);
      setError("Announcement could not be deleted.");
    }
  }

  return (
    <DashboardSection title="Announcements" description="Publish important updates for the community.">
      {error && <div className="alert alert-warning">{error}</div>}
      <form className="card mb-4" onSubmit={(event) => void submit(event)}>
        <div className="card-body">
          <label className="form-label" htmlFor="announcement-title">Title</label>
          <input id="announcement-title" className="form-control mb-3" value={title} onChange={(event) => setTitle(event.target.value)} required />
          <label className="form-label" htmlFor="announcement-content">Content</label>
          <textarea id="announcement-content" className="form-control mb-3" rows={4} value={content} onChange={(event) => setContent(event.target.value)} required />
          <button className="btn btn-primary" type="submit" disabled={saving}>{saving ? "Publishing..." : "Publish announcement"}</button>
        </div>
      </form>
      {items.length === 0 ? <div className="alert alert-secondary">No announcements published yet.</div> : (
        <div className="list-group">
          {items.map((item) => <article className="list-group-item" key={item.id}><div className="d-flex justify-content-between gap-3"><div><h2 className="h5 mb-1">{item.title}</h2><p className="mb-1">{item.content}</p><small className="text-muted">{new Date(item.createdAt).toLocaleString()}</small></div><button className="btn btn-sm btn-outline-danger align-self-start" type="button" onClick={() => void remove(item.id)}>Delete</button></div></article>)}
        </div>
      )}
    </DashboardSection>
  );
}

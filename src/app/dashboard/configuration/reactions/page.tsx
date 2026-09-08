"use client";

import { useEffect, useState, type FormEvent } from "react";
import DashboardSection from "~/components/dashboard/DashboardSection";

type Reaction = {
  id: number;
  name: string;
  emoji: string;
  negative: number;
};

export default function DashboardReactionsPage() {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [negative, setNegative] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function loadReactions(): Promise<void> {
    const response = await fetch("/api/admin/reactions");
    if (!response.ok) throw new Error("Reactions are unavailable.");
    setReactions((await response.json()) as Reaction[]);
  }

  useEffect(() => {
    void loadReactions()
      .catch((error: unknown) => {
        console.error("Failed to load reactions", error);
        setMessage("Reactions are currently unavailable.");
      })
      .finally(() => setLoading(false));
  }, []);

  async function createReaction(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch("/api/admin/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, emoji, negative: negative ? 1 : 0 }),
      });
      if (!response.ok) {
        const result = (await response.json()) as { error?: string };
        throw new Error(result.error ?? "Reaction could not be created.");
      }
      setName("");
      setEmoji("");
      setNegative(false);
      setMessage("Reaction created.");
      await loadReactions();
    } catch (error) {
      console.error("Failed to create reaction", error);
      setMessage(error instanceof Error ? error.message : "Reaction could not be created.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <DashboardSection
      title="Reaction configuration"
      description="Create the reactions members can use on forum topics."
    >
      {message && <div className="alert alert-info" role="status">{message}</div>}
      {loading ? (
        <p className="alert alert-info" role="status">Loading reactions...</p>
      ) : (
        <>
          <form className="card mb-4" onSubmit={(event) => void createReaction(event)}>
            <div className="card-body">
              <div className="row g-3 align-items-end">
                <div className="col-md-4">
                  <label className="form-label" htmlFor="reaction-name">Name</label>
                  <input id="reaction-name" className="form-control" value={name} onChange={(event) => setName(event.target.value)} required />
                </div>
                <div className="col-md-3">
                  <label className="form-label" htmlFor="reaction-emoji">Emoji</label>
                  <input id="reaction-emoji" className="form-control" value={emoji} onChange={(event) => setEmoji(event.target.value)} required />
                </div>
                <div className="col-md-3">
                  <div className="form-check form-switch">
                    <input id="reaction-negative" className="form-check-input" type="checkbox" checked={negative} onChange={(event) => setNegative(event.target.checked)} />
                    <label className="form-check-label" htmlFor="reaction-negative">Negative reaction</label>
                  </div>
                </div>
                <div className="col-md-2">
                  <button className="btn btn-primary w-100" type="submit" disabled={saving}>
                    {saving ? "Creating..." : "Create"}
                  </button>
                </div>
              </div>
            </div>
          </form>
          {reactions.length === 0 ? (
            <div className="alert alert-secondary">No reactions configured yet.</div>
          ) : (
            <div className="row g-3">
              {reactions.map((reaction) => (
                <div className="col-md-4" key={reaction.id}>
                  <article className="card h-100">
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div>
                        <h2 className="h5 mb-1">{reaction.name}</h2>
                        <small className="text-muted">
                          {reaction.negative ? "Negative reaction" : "Positive reaction"}
                        </small>
                      </div>
                      <span className="fs-3" aria-label={reaction.name}>{reaction.emoji}</span>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </DashboardSection>
  );
}

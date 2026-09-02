"use client";

import { useEffect, useState, type FormEvent } from "react";

type Reaction = {
  id: number;
  name: string;
  emoji: string;
  negative: number;
};

export default function AdminReactionsPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [negative, setNegative] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    void loadReactions();
  }, []);

  async function loadReactions() {
    try {
      const userRes = await fetch("/api/auth/user");
      if (!userRes.ok) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const user = await userRes.json();
      const canAccess = !!user && !!(user.group?.team || user.group?.highTeam);
      setIsAdmin(canAccess);

      if (!canAccess) {
        setLoading(false);
        return;
      }

      const res = await fetch("/api/admin/reactions");
      if (!res.ok) throw new Error("Failed to load reactions");
      const data = (await res.json()) as Reaction[];
      setReactions(data);
    } catch (error) {
      console.error("Failed to load admin reactions", error);
      setMessage("Failed to load reactions");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateReaction(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !emoji.trim()) {
      setMessage("Reaction name and emoji are required");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/admin/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), emoji: emoji.trim(), negative }),
      });

      if (!res.ok) {
        const body = await res.text();
        setMessage(`Failed to create reaction: ${body}`);
        return;
      }

      setName("");
      setEmoji("");
      setNegative(0);
      setMessage("Reaction created");
      await loadReactions();
    } catch (error) {
      console.error("Failed to create reaction", error);
      setMessage("Failed to create reaction");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) return <p>Loading admin reaction management...</p>;
  if (!isAdmin) return <p>Access denied</p>;

  return (
    <div className="container py-4">
      <h2>Reaction emoji management</h2>
      <p className="text-muted">Create the reactions members can use on forum topics.</p>
      {message && <div className="alert alert-info">{message}</div>}

      <form className="card p-3 mb-4" onSubmit={handleCreateReaction}>
        <h4>Create reaction</h4>
        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label className="form-label">Name</label>
            <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Emoji</label>
            <input className="form-control" value={emoji} onChange={(e) => setEmoji(e.target.value)} />
          </div>
          <div className="col-md-2">
            <label className="form-label">Negative</label>
            <input
              type="checkbox"
              role="switch"
              className="form-check-input"
              checked={negative === 1}
              onChange={(e) => setNegative(e.target.checked ? 1 : 0)}
            />
            <span className="ms-2">Marks content negatively</span>
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create reaction"}
            </button>
          </div>
        </div>
      </form>

      <div className="row g-3">
        {reactions.length === 0 ? (
          <div className="col-12"><p className="text-muted">No reactions configured yet.</p></div>
        ) : reactions.map((reaction) => (
          <div className="col-md-4" key={reaction.id}>
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="mb-0">{reaction.name}</h5>
                  <span className="fs-3">{reaction.emoji}</span>
                </div>
                <p className="mb-0">Negative: {reaction.negative ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState, type FormEvent } from "react";
import DashboardSection from "~/components/dashboard/DashboardSection";

type Label = { id: number; name: string; color: string };

export default function Labels() {
  const [labels, setLabels] = useState<Label[]>([]);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#66a5ea");
  const [error, setError] = useState<string | null>(null);

  async function load(): Promise<void> {
    const response = await fetch("/api/dashboard/forum/labels");
    if (!response.ok) throw new Error("Labels are unavailable.");
    setLabels((await response.json()) as Label[]);
  }

  useEffect(() => {
    void load().catch((loadError: unknown) => {
      console.error("Failed to load forum labels", loadError);
      setError("Labels are currently unavailable.");
    });
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setError(null);
    try {
      const response = await fetch("/api/dashboard/forum/labels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, color }),
      });
      if (!response.ok) {
        const result = (await response.json()) as { error?: string };
        setError(result.error ?? "Label could not be created.");
        return;
      }

      setName("");
      await load();
    } catch (submitError: unknown) {
      console.error("Failed to create forum label", submitError);
      setError("Label could not be created.");
    }

  }

  async function remove(id: number): Promise<void> {
    if (!window.confirm("Delete this forum label?")) return;
    try {
      const response = await fetch("/api/dashboard/forum/labels", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      if (!response.ok) throw new Error("Label could not be deleted.");
      await load();
    } catch (removeError: unknown) {
      console.error("Failed to delete forum label", removeError);
      setError("Label could not be deleted.");
    }
  }

  return (
    <DashboardSection title="Forum labels" description="Organize topics with reusable labels.">
      {error && <div className="alert alert-warning">{error}</div>}
      <form className="card mb-4" onSubmit={(event) => void submit(event)}>
        <div className="card-body row g-3 align-items-end">
          <div className="col-md-7"><label className="form-label" htmlFor="label-name">Name</label><input id="label-name" className="form-control" value={name} onChange={(event) => setName(event.target.value)} required /></div>
          <div className="col-md-3"><label className="form-label" htmlFor="label-color">Color</label><input id="label-color" className="form-control form-control-color" type="color" value={color} onChange={(event) => setColor(event.target.value)} /></div>
          <div className="col-md-2"><button className="btn btn-primary w-100" type="submit">Add label</button></div>
        </div>
      </form>
      {labels.length === 0 ? <div className="alert alert-secondary">No labels created yet.</div> : <div className="list-group">{labels.map((label) => <div className="list-group-item d-flex justify-content-between align-items-center" key={label.id}><span className="badge" style={{ backgroundColor: label.color }}>{label.name}</span><button className="btn btn-sm btn-outline-danger" type="button" onClick={() => void remove(label.id)}>Delete</button></div>)}</div>}
    </DashboardSection>
  );
}

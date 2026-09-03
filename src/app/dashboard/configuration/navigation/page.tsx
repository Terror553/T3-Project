"use client";

import { useEffect, useState, type FormEvent } from "react";
import DashboardSection from "~/components/dashboard/DashboardSection";

type NavigationItem = {
  id: number;
  name: string;
  fullLink: string;
  icon: string;
  teamLink: boolean;
};
const INITIAL = {
  name: "",
  fullLink: "",
  icon: "fas fa-link fa-fw",
  teamLink: false,
};

export default function Navigation() {
  const [items, setItems] = useState<NavigationItem[]>([]);
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string | null>(null);

  async function load(): Promise<void> {
    const response = await fetch("/api/dashboard/configuration/navigation");
    if (!response.ok)
      throw new Error(`Navigation request failed (${response.status})`);
    setItems((await response.json()) as NavigationItem[]);
  }

  useEffect(() => {
    void load()
      .catch((error: unknown) => {
        console.error("Failed to load dashboard navigation", error);
        setStatus("Navigation entries are currently unavailable.");
      })
      .finally(() => setLoading(false));
  }, []);

  async function create(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setStatus(null);
    const response = await fetch("/api/dashboard/configuration/navigation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!response.ok) {
      setStatus("Navigation entry could not be created.");
      return;
    }
    setForm(INITIAL);
    await load();
    setStatus("Navigation entry created.");
  }

  async function remove(id: number): Promise<void> {
    if (!window.confirm("Delete this navigation entry?")) return;
    const response = await fetch("/api/dashboard/configuration/navigation", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      setStatus("Navigation entry could not be deleted.");
      return;
    }
    await load();
    setStatus("Navigation entry deleted.");
  }

  return (
    <DashboardSection
      title="Navigation"
      description="Manage the links shown in the community navigation."
    >
      {loading ? (
        <p className="alert alert-info" role="status">
          Loading navigation...
        </p>
      ) : (
        <>
          {status && (
            <div className="alert alert-info" role="status">
              {status}
            </div>
          )}
          <form
            className="card card-body mb-4"
            onSubmit={(event) => void create(event)}
          >
            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label" htmlFor="navName">
                  Name
                </label>
                <input
                  id="navName"
                  className="form-control"
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  required
                  maxLength={100}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label" htmlFor="navLink">
                  Link
                </label>
                <input
                  id="navLink"
                  className="form-control"
                  value={form.fullLink}
                  onChange={(event) =>
                    setForm({ ...form, fullLink: event.target.value })
                  }
                  required
                  maxLength={500}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label" htmlFor="navIcon">
                  Icon class
                </label>
                <input
                  id="navIcon"
                  className="form-control"
                  value={form.icon}
                  onChange={(event) =>
                    setForm({ ...form, icon: event.target.value })
                  }
                  required
                  maxLength={100}
                />
              </div>
              <div className="col-md-2 d-flex align-items-end">
                <button className="btn btn-primary w-100" type="submit">
                  Add link
                </button>
              </div>
              <div className="col-12 form-check form-switch">
                <input
                  id="navTeamLink"
                  className="form-check-input"
                  type="checkbox"
                  checked={form.teamLink}
                  onChange={(event) =>
                    setForm({ ...form, teamLink: event.target.checked })
                  }
                />
                <label className="form-check-label" htmlFor="navTeamLink">
                  Team members only
                </label>
              </div>
            </div>
          </form>
          {items.length === 0 ? (
            <div className="alert alert-secondary">
              No navigation entries have been configured.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Link</th>
                    <th>Audience</th>
                    <th aria-label="Actions" />
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <i className={`${item.icon} me-2`} aria-hidden="true" />
                        {item.name}
                      </td>
                      <td>
                        <code>{item.fullLink}</code>
                      </td>
                      <td>{item.teamLink ? "Team members" : "Everyone"}</td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          type="button"
                          onClick={() => void remove(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </DashboardSection>
  );
}

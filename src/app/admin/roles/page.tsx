"use client";

import { useEffect, useState, type FormEvent } from "react";

type Role = {
  id: number;
  name: string;
  color: string;
  priority: number;
  default: number;
  team: number;
  highTeam: number;
};

export default function AdminRolesPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<Role[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState("&7");
  const [priority, setPriority] = useState(999);
  const [team, setTeam] = useState(0);
  const [highTeam, setHighTeam] = useState(0);
  const [isDefault, setIsDefault] = useState(0);

  useEffect(() => {
    void loadRoles();
  }, []);

  async function loadRoles() {
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

      const res = await fetch("/api/admin/roles");
      if (!res.ok) throw new Error("Failed to load roles");
      const data = (await res.json()) as Role[];
      setRoles(data);
    } catch (error) {
      console.error("Failed to load admin roles", error);
      setMessage("Failed to load roles");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateRole(event: FormEvent) {
    event.preventDefault();
    if (!name.trim()) {
      setMessage("Role name is required");
      return;
    }

    const res = await fetch("/api/admin/roles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        color: color.trim() || "&7",
        priority,
        team,
        highTeam,
        default: isDefault,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      setMessage(`Failed to create role: ${body}`);
      return;
    }

    setName("");
    setColor("&7");
    setPriority(999);
    setTeam(0);
    setHighTeam(0);
    setIsDefault(0);
    setMessage("Role created");
    void loadRoles();
  }

  if (loading) return <p>Loading admin role management...</p>;
  if (!isAdmin) return <p>Access denied</p>;

  return (
    <div className="container py-4">
      <h2>Role management</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form className="card p-3 mb-4" onSubmit={handleCreateRole}>
        <h4>Create role</h4>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Color</label>
            <input className="form-control" value={color} onChange={(e) => setColor(e.target.value)} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Priority</label>
            <input
              type="number"
              className="form-control"
              value={priority}
              onChange={(e) => setPriority(Number(e.target.value || 999))}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Team</label>
            <input
              type="number"
              className="form-control"
              min={0}
              max={1}
              value={team}
              onChange={(e) => setTeam(Number(e.target.value || 0))}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">High team</label>
            <input
              type="number"
              className="form-control"
              min={0}
              max={1}
              value={highTeam}
              onChange={(e) => setHighTeam(Number(e.target.value || 0))}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Default</label>
            <input
              type="number"
              className="form-control"
              min={0}
              max={1}
              value={isDefault}
              onChange={(e) => setIsDefault(Number(e.target.value || 0))}
            />
          </div>
          <div className="col-md-3 d-flex align-items-end">
            <button className="btn btn-primary w-100" type="submit">Create role</button>
          </div>
        </div>
      </form>

      <div className="row g-3">
        {roles.map((role) => (
          <div className="col-md-6" key={role.id}>
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="mb-0">{role.name}</h5>
                  <span className="badge bg-light text-dark">Priority {role.priority}</span>
                </div>
                <p className="mb-1">Color: {role.color}</p>
                <p className="mb-1">Team: {role.team ? "Yes" : "No"}</p>
                <p className="mb-1">High team: {role.highTeam ? "Yes" : "No"}</p>
                <p className="mb-0">Default: {role.default ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

type Settings = {
  theme?: string;
  timezone?: string;
  emailNotifications?: boolean;
  username?: string;
  avatarUrl?: string;
};

export default function Settings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/profile/settings");
        if (!res.ok) throw new Error("Failed to fetch settings");
        const data = await res.json();
        if (mounted) setSettings(data);
      } catch (err) {
        console.error("Failed to load profile settings", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [file]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage(null);
    const f = e.target.files?.[0] ?? null;
    if (!f) return setFile(null);
    // simple client-side validation
    if (f.size > 5 * 1024 * 1024) {
      setMessage("File is too large (max 5MB)");
      return;
    }
    const allowed = ["image/png", "image/jpeg", "image/webp", "image/gif"];
    if (!allowed.includes(f.type)) {
      setMessage("Unsupported file type (png, jpg, webp, gif allowed)");
      return;
    }
    setFile(f);
  }

  async function uploadAvatar() {
    if (!file) return;
    setLoading(true);
    setMessage(null);
    try {
      // read base64 content without data: prefix
      const base = await new Promise<string | null>((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => {
          const s = String(r.result || "");
          const comma = s.indexOf(",");
          resolve(comma >= 0 ? s.slice(comma + 1) : null);
        };
        r.onerror = () => reject(new Error("Failed to read file"));
        r.readAsDataURL(file);
      });
      if (!base) throw new Error("Failed to encode file");

      // Step 1: upload contents
      const uplRes = await fetch("/api/uploads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, contentBase64: base }),
      });
      if (!uplRes.ok) throw new Error("Upload failed");
      const uplBody = await uplRes.json();
      const url = uplBody?.url;
      if (!url) throw new Error("Upload did not return url");

      // Step 2: save metadata and attach to avatar
      const saveRes = await fetch("/api/upload/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: file.name,
          url,
          fileName: file.name,
          contentType: file.type,
          size: file.size,
          attachTo: { type: "avatar" },
        }),
      });
      if (!saveRes.ok) {
        const body = await saveRes.text();
        throw new Error(`Save failed: ${saveRes.status} ${body}`);
      }
      const saved = await saveRes.json();
      const newAvatar = saved?.data?.avatarUrl ?? url;
      setSettings((s) => ({ ...(s ?? {}), avatarUrl: newAvatar }));
      setMessage("Avatar updated");
      setFile(null);
      setPreview(null);
    } catch (err: any) {
      console.error("Avatar upload error", err);
      setMessage(String(err?.message ?? err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="col-xl-9 col-lg-8">
      <div className="card">
        <div className="card-body">
          <h3>Profile Settings</h3>
          <div className="row mt-3">
            <div className="col-md-4">
              <div className="text-center mb-3">
                <div style={{ width: 128, height: 128, margin: "0 auto", position: "relative" }}>
                  <Image src={settings?.avatarUrl ?? "/default.png"} alt={settings?.username ?? "avatar"} fill sizes="128px" style={{ objectFit: "cover", borderRadius: 8 }} />
                </div>
                <div className="mt-2">
                  <strong>{settings?.username ?? "User"}</strong>
                </div>
              </div>

              <div>
                <label className="form-label" htmlFor="avatar-file">Upload new avatar</label>
                <input id="avatar-file" type="file" accept="image/*" className="form-control" onChange={handleFileChange} />
                {preview && (
                  <div className="mt-2">
                    <div style={{ width: 96, height: 96, position: "relative" }}>
                      <Image src={preview} alt="preview" fill sizes="96px" style={{ objectFit: "cover", borderRadius: 8 }} />
                    </div>
                  </div>
                )}

                <div className="mt-3 d-flex gap-2">
                  <button className="btn btn-primary" onClick={uploadAvatar} disabled={!file || loading}>
                    {loading ? "Uploading..." : "Upload avatar"}
                  </button>
                  <button className="btn btn-secondary" onClick={() => { setFile(null); setPreview(null); setMessage(null); }} disabled={loading}>
                    Cancel
                  </button>
                </div>

                {message && <div className="mt-2 text-muted small">{message}</div>}
              </div>
            </div>

            <div className="col-md-8">
              <div>
                <h5>Preferences</h5>
                <p className="text-muted">Theme, timezone and notifications are configured here (not persisted in this iteration).</p>
                <div className="mb-3">
                  <label className="form-label">Theme</label>
                  <input className="form-control" value={settings?.theme ?? "light"} readOnly />
                </div>
                <div className="mb-3">
                  <label className="form-label">Timezone</label>
                  <input className="form-control" value={settings?.timezone ?? "UTC"} readOnly />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

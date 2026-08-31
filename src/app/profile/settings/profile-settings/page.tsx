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
    // create data url preview quickly
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [file]);

  // Resize and center-crop image to square of maxSize (px)
  async function resizeAndCropToSquare(file: File, maxSize = 512): Promise<Blob> {
    return await new Promise<Blob>((resolve, reject) => {
      const img = new Image();
      img.onload = async () => {
        try {
          const w = img.width;
          const h = img.height;
          const side = Math.min(w, h);
          const sx = Math.floor((w - side) / 2);
          const sy = Math.floor((h - side) / 2);

          const canvas = document.createElement("canvas");
          canvas.width = maxSize;
          canvas.height = maxSize;
          const ctx = canvas.getContext("2d");
          if (!ctx) throw new Error("Canvas not supported");

          ctx.drawImage(img, sx, sy, side, side, 0, 0, maxSize, maxSize);
          canvas.toBlob((blob) => {
            if (!blob) return reject(new Error("Failed to create blob"));
            resolve(blob);
          }, "image/jpeg", 0.9);
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = () => reject(new Error("Failed to load image for resizing"));
      // load from local file
      const fr = new FileReader();
      fr.onload = () => {
        img.src = String(fr.result || "");
      };
      fr.onerror = () => reject(new Error("Failed to read file for resizing"));
      fr.readAsDataURL(file);
    });
  }

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
      // Resize & crop to square; yields a Blob
      const blob = await resizeAndCropToSquare(file, 512);
      // Build FormData for multipart upload — use XHR to get progress
      const fd = new FormData();
      const filename = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      fd.append("file", blob, filename);

      const urlForm = "/api/uploads/form";

      const uploadResult = await new Promise<any>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", urlForm);
        xhr.upload.onprogress = (ev) => {
          if (ev.lengthComputable) {
            const pct = Math.round((ev.loaded / ev.total) * 100);
            setMessage(`Uploading... ${pct}%`);
          }
        };
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const j = JSON.parse(xhr.responseText);
              resolve(j);
            } catch (err) {
              reject(new Error("Invalid JSON response from upload"));
            }
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        };
        xhr.onerror = () => reject(new Error("Upload failed (network error)"));
        xhr.send(fd);
      });

      const url = uploadResult?.url;
      if (!url) throw new Error("Upload did not return url");

      // Step 2: save metadata and attach to avatar
      const saveRes = await fetch("/api/upload/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: filename,
          url,
          fileName: filename,
          contentType: "image/jpeg",
          size: blob.size,
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

                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const f = e.dataTransfer?.files?.[0];
                    if (f) {
                      const inputEvent = { target: { files: [f] } } as unknown as React.ChangeEvent<HTMLInputElement>;
                      handleFileChange(inputEvent);
                    }
                  }}
                  style={{ border: "2px dashed #ddd", padding: 8, borderRadius: 6 }}
                >
                  <input id="avatar-file" type="file" accept="image/*" className="form-control" onChange={handleFileChange} />
                  <div className="small text-muted mt-1">Or drag & drop an image here</div>
                </div>

                {preview && (
                  <div className="mt-2">
                    <div style={{ width: 96, height: 96, position: "relative" }}>
                      <Image src={preview} alt="preview" fill sizes="96px" style={{ objectFit: "cover", borderRadius: 8 }} />
                    </div>
                  </div>
                )}

                <div className="mt-3 d-flex gap-2 align-items-center">
                  <button className="btn btn-primary" onClick={uploadAvatar} disabled={!file || loading}>
                    {loading ? "Uploading..." : "Upload avatar"}
                  </button>
                  <button className="btn btn-secondary" onClick={() => { setFile(null); setPreview(null); setMessage(null); }} disabled={loading}>
                    Cancel
                  </button>
                  {loading && <div className="ms-3 small text-muted">{message ?? "Uploading..."}</div>}
                </div>

                {message && !loading && <div className="mt-2 text-muted small">{message}</div>}
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

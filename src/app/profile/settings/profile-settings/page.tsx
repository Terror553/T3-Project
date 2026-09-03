"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Cropper, { type Area } from "react-easy-crop";

type Settings = {
  theme?: string;
  timezone?: string;
  emailNotifications?: boolean;
  compactMode?: boolean;
  username?: string;
  avatarUrl?: string;
};

// Helper: create an HTMLImageElement from a data URL
function createImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new globalThis.Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = src;
  });
}

// Helper: crop image from dataUrl using croppedAreaPixels and return blob resized to sizePx
async function getCroppedImg(
  dataUrl: string,
  crop: { width: number; height: number; x: number; y: number },
  sizePx = 512,
): Promise<Blob> {
  const image = await createImage(dataUrl);
  const canvas = document.createElement("canvas");
  canvas.width = sizePx;
  canvas.height = sizePx;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  // crop.width/height correspond to source pixels from the image (react-easy-crop provides these)
  // Draw the cropped region scaled to the output size
  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    sizePx,
    sizePx,
  );

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject(new Error("Failed to create blob"));
        resolve(blob);
      },
      "image/jpeg",
      0.9,
    );
  });
}

export default function Settings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Cropper state
  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  async function savePreferences() {
    if (!settings) return;
    try {
      const res = await fetch("/api/profile/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          theme: settings.theme ?? "light",
          timezone: settings.timezone ?? "UTC",
          emailNotifications: settings.emailNotifications ?? true,
          compactMode: settings.compactMode ?? false,
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        throw new Error(`Failed to save preferences: ${res.status} ${body}`);
      }

      setMessage("Preferences saved");
    } catch (err) {
      console.error("Failed to save preferences", err);
      setMessage("Failed to save preferences");
    }
  }

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
      // open cropper automatically
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  }, [file]);

  const onCropComplete = useCallback((_area: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const [appliedBlob, setAppliedBlob] = useState<Blob | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  // Apply crop to preview immediately and prepare a downloadable blob
  async function applyCropToPreview() {
    if (!preview || !croppedAreaPixels) {
      setMessage("No crop available");
      return;
    }
    try {
      const blob = await getCroppedImg(preview, croppedAreaPixels, 512);
      // create data URL for preview
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = String(reader.result || "");
        setPreview(dataUrl);
      };
      reader.readAsDataURL(blob);

      // create object URL for download
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
      const objUrl = URL.createObjectURL(blob);
      setDownloadUrl(objUrl);
      setAppliedBlob(blob);
      setShowCropper(false);
      setMessage("Crop applied — preview updated");
    } catch (err) {
      console.error("Failed to apply crop", err);
      setMessage("Failed to apply crop");
    }
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

  async function applyCropAndUpload() {
    if (!preview || !croppedAreaPixels) return setMessage("No crop selected");
    setLoading(true);
    setMessage(null);
    try {
      // if a crop was already applied, prefer that blob
      let blob: Blob;
      if (appliedBlob) {
        blob = appliedBlob;
      } else {
        // get cropped image blob from the preview data URL using selected area
        blob = await getCroppedImg(preview, croppedAreaPixels, 512);
      }
      const filename = (file?.name ?? `avatar-${Date.now()}`).replace(
        /[^a-zA-Z0-9._-]/g,
        "-",
      );
      const signedResponse = await fetch("/api/upload/avatars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: filename, contentType: "image/jpeg" }),
      });
      if (!signedResponse.ok) {
        throw new Error(`Failed to prepare upload: ${signedResponse.status}`);
      }
      const signed = (await signedResponse.json()) as {
        url?: string;
        key?: string;
      };
      if (!signed.url || !signed.key)
        throw new Error("Upload service returned an invalid URL");

      setMessage("Uploading...");
      const uploadResponse = await fetch(signed.url, {
        method: "PUT",
        headers: { "Content-Type": "image/jpeg" },
        body: blob,
      });
      if (!uploadResponse.ok)
        throw new Error(`Upload failed: ${uploadResponse.status}`);

      const url = signed.url.split("?")[0];

      // Step 2: save metadata and attach to avatar
      const saveRes = await fetch("/api/upload/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: signed.key,
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
      // reset states
      setFile(null);
      setPreview(null);
      setShowCropper(false);
      setAppliedBlob(null);
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
        setDownloadUrl(null);
      }
    } catch (error: unknown) {
      console.error("Avatar upload error", error);
      const message =
        error instanceof Error ? error.message : "Unknown avatar upload error";
      setMessage(message);
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
                <div
                  style={{
                    width: 128,
                    height: 128,
                    margin: "0 auto",
                    position: "relative",
                  }}
                >
                  <Image
                    src={settings?.avatarUrl ?? "/default.png"}
                    alt={settings?.username ?? "avatar"}
                    fill
                    sizes="128px"
                    style={{ objectFit: "cover", borderRadius: 8 }}
                  />
                </div>
                <div className="mt-2">
                  <strong>{settings?.username ?? "User"}</strong>
                </div>
              </div>

              <div>
                <label className="form-label" htmlFor="avatar-file">
                  Upload new avatar
                </label>

                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const f = e.dataTransfer?.files?.[0];
                    if (f) {
                      const inputEvent = {
                        target: { files: [f] },
                      } as unknown as React.ChangeEvent<HTMLInputElement>;
                      handleFileChange(inputEvent);
                    }
                  }}
                  style={{
                    border: "2px dashed #ddd",
                    padding: 8,
                    borderRadius: 6,
                  }}
                >
                  <input
                    id="avatar-file"
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                  <div className="small text-muted mt-1">
                    Or drag & drop an image here
                  </div>
                </div>

                {preview && (
                  <div className="mt-2">
                    <div
                      style={{ width: 96, height: 96, position: "relative" }}
                    >
                      <Image
                        src={preview}
                        alt="preview"
                        fill
                        sizes="96px"
                        style={{ objectFit: "cover", borderRadius: 8 }}
                      />
                    </div>
                    <div className="mt-2 d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setShowCropper(true)}
                      >
                        Edit crop
                      </button>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => {
                          setFile(null);
                          setPreview(null);
                          setMessage(null);
                          setAppliedBlob(null);
                          if (downloadUrl) {
                            URL.revokeObjectURL(downloadUrl);
                            setDownloadUrl(null);
                          }
                        }}
                      >
                        Remove
                      </button>
                      {downloadUrl && (
                        <a
                          href={downloadUrl}
                          download="avatar.jpg"
                          className="btn btn-sm btn-outline-primary"
                        >
                          Download
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-3 d-flex gap-2 align-items-center">
                  <button
                    className="btn btn-primary"
                    onClick={applyCropAndUpload}
                    disabled={!preview || loading}
                  >
                    {loading ? "Uploading..." : "Upload avatar"}
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                      setMessage(null);
                    }}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  {loading && (
                    <div className="ms-3 small text-muted">
                      {message ?? "Uploading..."}
                    </div>
                  )}
                </div>

                {message && !loading && (
                  <div className="mt-2 text-muted small">{message}</div>
                )}
              </div>
            </div>

            <div className="col-md-8">
              <div>
                <h5>Preferences</h5>
                <p className="text-muted">
                  Theme, timezone, layout, and notification preferences are saved
                  per-user.
                </p>
                <div className="mb-3">
                  <label className="form-label">Theme</label>
                  <select
                    className="form-select"
                    value={settings?.theme ?? "light"}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...(s ?? {}),
                        theme: e.target.value,
                      }))
                    }
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Timezone</label>
                  <input
                    className="form-control"
                    value={settings?.timezone ?? "UTC"}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...(s ?? {}),
                        timezone: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="emailNotifications"
                    checked={settings?.emailNotifications ?? true}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...(s ?? {}),
                        emailNotifications: e.target.checked,
                      }))
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="emailNotifications"
                  >
                    Email notifications enabled
                  </label>
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="compactMode"
                    checked={settings?.compactMode ?? false}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...(s ?? {}),
                        compactMode: e.target.checked,
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="compactMode">
                    Use compact layout
                  </label>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={savePreferences}
                  disabled={!settings}
                >
                  Save preferences
                </button>
              </div>
            </div>
          </div>

          {/* Cropper modal */}
          {showCropper && preview && (
            <div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  width: 540,
                  background: "#fff",
                  padding: 16,
                  borderRadius: 8,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: 400,
                    background: "#000",
                  }}
                >
                  <Cropper
                    image={preview}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={(c) => setCrop(c)}
                    onZoomChange={(z) => setZoom(z)}
                    onCropComplete={onCropComplete}
                  />
                </div>
                <div className="mt-3 d-flex gap-2 align-items-center">
                  <label className="form-label mb-0">Zoom</label>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.01}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                  />
                  <div style={{ flex: 1 }} />
                  <button
                    className="btn btn-primary"
                    onClick={applyCropToPreview}
                    disabled={!croppedAreaPixels}
                  >
                    Apply crop
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowCropper(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  async function upload() {
    if (!file) return;

    setUploading(true);

    try {
      // Step 1:
      // Request signed upload URL

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
        }),
      });

      const data = (await res.json()) as {
        url: string;
        key: string;
      };

      // Step 2:
      // Upload directly to MinIO

      const uploadRes = await fetch(data.url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadRes.ok) {
        throw new Error("Upload failed");
      }

      console.log("Uploaded:", data.key);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files?.[0] ?? null);
        }}
      />

      <button onClick={upload} disabled={!file || uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">Change Banner</div>
          <a href="#" className="close" data-bs-dismiss="modal">
            <i className="fas fa-times"></i>
          </a>
        </div>
        <div className="modal-body">
          <select
            name="banner"
            className="image-picker show-html"
            id="input-profileBanner"
            style={{ display: "none" }}
          ></select>

          {file && (
            <p>
              Selected file: {file.name}
              <Image
                src={URL.createObjectURL(file)}
                alt="Preview"
                width={200}
                height={200}
              />
            </p>
          )}
          <input type="hidden" name="action" value="banner" />
          <div className="separator">Or Upload Profile Banner</div>
          <div className="form-group">
            <div className="input-group">
              <input
                type="file"
                className="form-control"
                id="input-profileBannerUpload"
                name="file"
              />
              <button type="submit" className="btn btn-success">
                Upload
              </button>
            </div>
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary btn-sm"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button className="btn btn-primary btn-sm">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useNotification } from "~/client/notification";
import { FormProvider } from "~/components/form/FormProvider";
import { useFormContext } from "~/lib/useFormManager";

type UploadFormProps = {
  title?: string;
  aspectRatio?: string;
};

type UploadFormValues = {
  file: File | null;
};

const uploadFormSchema = z.object({
  file: z.custom<File | null>(),
});

function normalizeAspectRatio(aspectRatio?: string): string {
  if (!aspectRatio) {
    return "16 / 9";
  }

  const parts = aspectRatio
    .trim()
    .toLowerCase()
    .split(/\s*[x:]\s*/);

  if (parts.length !== 2) {
    return "16 / 9";
  }

  const width = Number(parts[0]);
  const height = Number(parts[1]);

  if (
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width <= 0 ||
    height <= 0
  ) {
    return "16 / 9";
  }

  return `${width} / ${height}`;
}

export default function UploadForm({
  title = "Upload Image",
  aspectRatio = "16x9",
}: UploadFormProps) {
  const [uploading, setUploading] = useState(false);
  const notification = useNotification(); // Assuming you have a notification hook

  const previewAspectRatio = normalizeAspectRatio(aspectRatio);

  async function upload(file: File) {
    setUploading(true);

    try {
      // Step 1:
      // Request signed upload URL

      const res = await fetch("/api/upload/uploads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
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
      notification.addNotification(
        `Upload completed successfully${data.key ? `: ${data.key}` : ""}`,
        "success",
        5000,
      );
    } catch (err) {
      notification.addNotification("Upload failed", "error", 5000);
      console.error(err);
    } finally {
      setUploading(false);
    }
  }

  return (
    <FormProvider
      schema={uploadFormSchema}
      initialValues={{ file: null }}
      onSubmit={async ({ file }) => {
        if (!file) {
          notification.addNotification("Please select an image", "error", 5000);
          return;
        }

        await upload(file);
      }}
    >
      <UploadFormInner
        title={title}
        previewAspectRatio={previewAspectRatio}
        uploading={uploading}
      />
    </FormProvider>
  );
}

function UploadFormInner({
  title,
  previewAspectRatio,
  uploading,
}: {
  title: string;
  previewAspectRatio: string;
  uploading: boolean;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { values, setFieldValue, handleSubmit } = useFormContext<UploadFormValues>();

  useEffect(() => {
    if (!values.file) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(values.file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [values.file]);

  return (
    <form onSubmit={handleSubmit} className="card upload-image-card">
      <div className="card-header">
        <div className="card-title">{title}</div>
      </div>
      <div className="card-body">
        <select
          name="image"
          className="image-picker show-html"
          id="input-image"
          style={{ display: "none" }}
        ></select>

        {values.file && previewUrl && (
          <div className="upload-image-preview">
            <div
              className="upload-image-preview-image"
              style={{ aspectRatio: previewAspectRatio }}
            >
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                sizes="(max-width: 576px) 100vw, 180px"
                className="upload-image-preview-img"
              />
            </div>
            <div className="upload-image-preview-meta">
              <div className="upload-image-preview-label">Selected image</div>
              <div className="upload-image-preview-name">{values.file.name}</div>
              <div className="upload-image-preview-hint">
                {values.file.type || "Unknown file type"}
              </div>
            </div>
          </div>
        )}
        <div className="form-group">
          <div className="input-group upload-image-input-group">
            <input
              type="file"
              className="form-control"
              id="input-image-upload"
              name="file"
              onChange={(e) => {
                setFieldValue("file", e.target.files?.[0] ?? null);
              }}
            />

            <button type="submit" disabled={!values.file || uploading} className="btn btn-success">
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

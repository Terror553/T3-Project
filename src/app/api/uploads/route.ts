import { NextResponse } from "next/server";
import { getCurrentUser } from "~/server/auth/utils/currentUser";
import storage from "~/server/storage/storage";
import { saveUploadMetadata, type UploadAttachmentTarget } from "~/server/storage/uploadMetadata";

function normalizeAttachmentTarget(value: unknown): UploadAttachmentTarget | null {
  if (value == null || typeof value !== "object") {
    return null;
  }

  const candidate = value as Record<string, unknown>;
  if (typeof candidate.type !== "string") {
    return null;
  }

  const nextId = typeof candidate.id === "number" ? candidate.id : null;
  return { type: candidate.type, id: nextId };
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const body = (await req.json().catch(() => ({}))) as {
      filename?: string;
      contentBase64?: string;
      contentType?: string;
      attachTo?: unknown;
    };
    const { filename, contentBase64, contentType, attachTo } = body;

    if (!filename || !contentBase64) {
      return NextResponse.json({ success: false, error: { message: "filename and contentBase64 required" } }, { status: 400 });
    }

    const buf = Buffer.from(contentBase64, "base64");
    if (buf.length > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: { message: "File too large" } }, { status: 413 });
    }

    const result = await storage.saveFile(filename, buf);
    const metadata = await saveUploadMetadata({
      fileName: filename,
      contentType: contentType ?? "application/octet-stream",
      size: buf.length,
      publicUrl: result.url,
      storagePath: result.path,
      ownerUserId: user?.id ?? null,
      attachTo: normalizeAttachmentTarget(attachTo),
    });

    return NextResponse.json({ success: true, id: metadata.id, url: result.url, metadata });
  } catch (err) {
    console.error("Upload error", err);
    return NextResponse.json({ success: false, error: { message: String(err) } }, { status: 500 });
  }
}

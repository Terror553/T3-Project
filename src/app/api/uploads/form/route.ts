import { NextResponse } from "next/server";
import { getCurrentUser } from "~/server/auth/utils/currentUser";
import storage from "~/server/storage/storage";
import { saveUploadMetadata, type UploadAttachmentTarget } from "~/server/storage/uploadMetadata";

function normalizeAttachmentTarget(value: FormDataEntryValue | null): UploadAttachmentTarget | null {
  if (value == null || typeof value !== "string") {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as unknown;
    if (parsed == null || typeof parsed !== "object") {
      return null;
    }

    const candidate = parsed as Record<string, unknown>;
    if (typeof candidate.type !== "string") {
      return null;
    }

    const nextId = typeof candidate.id === "number" ? candidate.id : null;
    return { type: candidate.type, id: nextId };
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const attachToValue = formData.get("attachTo");
    const ownerIdValue = formData.get("ownerUserId") as string | null;

    if (!file) {
      return NextResponse.json({ success: false, error: { message: "No file provided" } }, { status: 400 });
    }

    const filename = file.name || "upload";
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (buffer.length > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: { message: "File too large" } }, { status: 413 });
    }

    const declaredType = (file.type || "").toLowerCase();
    function startsWith(buf: Buffer, bytes: number[]) {
      if (buf.length < bytes.length) return false;
      for (let i = 0; i < bytes.length; i++) {
        if (buf[i] !== bytes[i]) return false;
      }
      return true;
    }

    const isJpeg = startsWith(buffer, [0xff, 0xd8, 0xff]);
    const isPng = startsWith(buffer, [0x89, 0x50, 0x4e, 0x47]);
    const isGif = startsWith(buffer, [0x47, 0x49, 0x46, 0x38]);
    const isWebP = buffer.length >= 12 && buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP";

    if (!(isJpeg || isPng || isGif || isWebP) || !declaredType.startsWith("image/")) {
      return NextResponse.json({ success: false, error: { message: "Unsupported or invalid image file" } }, { status: 415 });
    }

    const result = await storage.saveFile(filename, buffer);
    const metadata = await saveUploadMetadata({
      fileName: filename,
      contentType: declaredType || "image/png",
      size: buffer.length,
      publicUrl: result.url,
      storagePath: result.path,
      ownerUserId: user?.id ?? (ownerIdValue ? Number(ownerIdValue) : null),
      attachTo: normalizeAttachmentTarget(attachToValue),
    });

    return NextResponse.json({ success: true, id: metadata.id, url: result.url, metadata });
  } catch (err) {
    console.error("Upload form error", err);
    return NextResponse.json({ success: false, error: { message: String(err) } }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import storage from "~/server/storage/storage";

export async function POST(req: Request) {
  try {
    // Parse multipart form data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ success: false, error: { message: "No file provided" } }, { status: 400 });
    }

    const filename = file.name || "upload";
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // simple size check: limit to 5MB
    if (buffer.length > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: { message: "File too large" } }, { status: 413 });
    }

    const result = await storage.saveFile(filename, buffer);
    return NextResponse.json({ success: true, url: result.url });
  } catch (err) {
    console.error("Upload form error", err);
    return NextResponse.json({ success: false, error: { message: String(err) } }, { status: 500 });
  }
}

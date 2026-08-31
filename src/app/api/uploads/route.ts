import { NextResponse } from "next/server";
import storage from "~/server/storage/storage";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { filename, contentBase64 } = body || {};
    if (!filename || !contentBase64) {
      return NextResponse.json({ success: false, error: { message: "filename and contentBase64 required" } }, { status: 400 });
    }

    // simple size check: limit to 5MB
    const buf = Buffer.from(contentBase64, "base64");
    if (buf.length > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: { message: "File too large" } }, { status: 413 });
    }

    const result = await storage.saveFile(filename, buf);
    return NextResponse.json({ success: true, url: result.url });
  } catch (err) {
    console.error("Upload error", err);
    return NextResponse.json({ success: false, error: { message: String(err) } }, { status: 500 });
  }
}

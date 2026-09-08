import { NextResponse } from "next/server";
import { getCurrentUser } from "~/server/auth/utils/currentUser";
import { db } from "~/server/db";
import { saveUploadMetadata } from "~/server/storage/uploadMetadata";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const payload = (await request.json()) as {
      key?: string;
      url?: string;
      fileName?: string;
      contentType?: string;
      size?: number;
      attachTo?: { type: string; id?: number } | null;
    };

    const storagePath = payload.key?.trim();
    const publicUrl = payload.url?.trim() || storagePath;
    const size = payload.size;
    if (!storagePath || !publicUrl || !payload.fileName?.trim() || !payload.contentType?.trim() ||
      typeof size !== "number" || !Number.isInteger(size) || size < 0) {
      return NextResponse.json(
        { error: "A valid key, URL, file name, content type, and size are required." },
        { status: 400 },
      );
    }

    // If the upload is meant to be attached to the current user's avatar, persist it
    if (payload.attachTo?.type === "avatar") {
      // payload.url expected to be the public URL from storage adapter
      try {
        const updated = await db.forumUser.update({
          where: { id: user.id },
          data: { avatarUrl: publicUrl },
        });
        await saveUploadMetadata({
          fileName: payload.fileName.trim(),
          contentType: payload.contentType.trim(),
          size,
          publicUrl,
          storagePath,
          ownerUserId: user.id,
          attachTo: payload.attachTo,
        });
        console.info(`Updated avatar for user ${user.id}: ${publicUrl}`);
        return NextResponse.json({ success: true, data: { avatarUrl: updated.avatarUrl } });
      } catch (dbErr) {
        console.error("Error updating user avatar:", dbErr);
        return NextResponse.json({ error: "Failed to update avatar" }, { status: 500 });
      }
    }

    const metadata = await saveUploadMetadata({
      fileName: payload.fileName.trim(),
      contentType: payload.contentType.trim(),
      size,
      publicUrl,
      storagePath,
      ownerUserId: user.id,
      attachTo: payload.attachTo,
    });

    return NextResponse.json({ success: true, data: metadata });
  } catch (error) {
    console.error("Error saving upload metadata:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

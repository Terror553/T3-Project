import { NextResponse } from "next/server";
import { getCurrentUser } from "~/server/auth/utils/currentUser";
import { db } from "~/server/db";

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

    if (!payload.key) {
      return NextResponse.json({ error: "Missing key" }, { status: 400 });
    }

    // If the upload is meant to be attached to the current user's avatar, persist it
    if (payload.attachTo?.type === "avatar") {
      // payload.url expected to be the public URL from storage adapter
      const avatarUrl = payload.url ?? payload.key ?? null;
      if (!avatarUrl) {
        return NextResponse.json({ error: "Missing url for avatar" }, { status: 400 });
      }

      try {
        const updated = await db.forumUser.update({
          where: { id: user.id },
          data: { avatarUrl: avatarUrl },
        });
        console.info(`Updated avatar for user ${user.id}: ${avatarUrl}`);
        return NextResponse.json({ success: true, data: { avatarUrl: updated.avatarUrl } }, { status: 200 });
      } catch (dbErr) {
        console.error("Error updating user avatar:", dbErr);
        return NextResponse.json({ error: "Failed to update avatar" }, { status: 500 });
      }
    }

    // Persisting to DB for other attachTo types is not implemented in this iteration.
    // Log the payload for server-side inspection and return success.
    console.info(`User ${user.id} uploaded file:`, payload);

    return NextResponse.json({ success: true, data: payload }, { status: 200 });
  } catch (error) {
    console.error("Error saving upload metadata:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

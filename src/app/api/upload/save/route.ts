import { NextResponse } from "next/server";
import { getCurrentUser } from "~/server/auth/utils/currentUser";

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
      attachTo?: { type: string; id: number } | null;
    };

    if (!payload.key) {
      return NextResponse.json({ error: "Missing key" }, { status: 400 });
    }

    // Persisting to DB is not implemented in this iteration.
    // Log the payload for server-side inspection and return success.
    console.info(`User ${user.id} uploaded file:`, payload);

    return NextResponse.json({ success: true, data: payload }, { status: 200 });
  } catch (error) {
    console.error("Error saving upload metadata:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

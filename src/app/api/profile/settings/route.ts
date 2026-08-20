import { NextResponse } from "next/server";
import { getCurrentUser } from "~/server/auth/utils/currentUser";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    // Return a small settings object. Persisted storage for these prefs is not yet implemented.
    const settings = {
      theme: "light",
      timezone: "UTC",
      emailNotifications: true,
      // include some user info to help the client
      username: user.username,
      avatarUrl: user.avatarUrl,
    };

    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    console.error("Error fetching profile settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const payload = (await request.json()) as Record<string, unknown>;

    // For now, we accept and validate a small set of keys and return success.
    // Persisting to the database requires a schema change and migration.
    const acceptedKeys = ["theme", "timezone", "emailNotifications"];
    const update: Record<string, unknown> = {};
    for (const k of acceptedKeys) {
      if (k in payload) update[k] = payload[k];
    }

    console.info(`Profile settings update for user ${user.id}:`, update);

    return NextResponse.json({ success: true, updated: update }, { status: 200 });
  } catch (error) {
    console.error("Error updating profile settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

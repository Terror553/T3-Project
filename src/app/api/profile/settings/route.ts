import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getCurrentUser } from "~/server/auth/utils/currentUser";

type UserProfileSettings = {
  theme: string;
  timezone: string;
  emailNotifications: boolean;
};

const DEFAULT_SETTINGS: UserProfileSettings = {
  theme: "light",
  timezone: "UTC",
  emailNotifications: true,
};

const SETTINGS_DIR = path.join(process.cwd(), "data", "profile-settings");

async function readUserSettings(userId: number): Promise<UserProfileSettings> {
  const filePath = path.join(SETTINGS_DIR, `${userId}.json`);

  try {
    const raw = await fs.readFile(filePath, "utf8");
    const value = JSON.parse(raw) as Partial<UserProfileSettings>;
    return {
      ...DEFAULT_SETTINGS,
      ...value,
    };
  } catch (error: unknown) {
    const maybeNodeError = error as { code?: string };
    if (maybeNodeError.code !== "ENOENT") {
      console.error(`Failed to read settings for user ${userId}:`, error);
    }
    return { ...DEFAULT_SETTINGS };
  }
}

async function writeUserSettings(userId: number, value: UserProfileSettings) {
  await fs.mkdir(SETTINGS_DIR, { recursive: true });
  const filePath = path.join(SETTINGS_DIR, `${userId}.json`);
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), "utf8");
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const settings = await readUserSettings(user.id);

    return NextResponse.json(
      {
        ...settings,
        username: user.username,
        avatarUrl: user.avatarUrl,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching profile settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const payload = (await request.json()) as Partial<UserProfileSettings>;

    const acceptedKeys = ["theme", "timezone", "emailNotifications"] as const;
    const nextSettings = await readUserSettings(user.id);

    for (const key of acceptedKeys) {
      if (!(key in payload)) continue;
      const value = payload[key];

      if (key === "theme") {
        if (typeof value !== "string") {
          return NextResponse.json({ error: "Theme must be a string" }, { status: 400 });
        }
        nextSettings.theme = value;
        continue;
      }

      if (key === "timezone") {
        if (typeof value !== "string") {
          return NextResponse.json({ error: "Timezone must be a string" }, { status: 400 });
        }
        nextSettings.timezone = value;
        continue;
      }

      if (key === "emailNotifications") {
        if (typeof value !== "boolean") {
          return NextResponse.json({ error: "Email notifications must be a boolean" }, { status: 400 });
        }
        nextSettings.emailNotifications = value;
      }
    }

    await writeUserSettings(user.id, nextSettings);

    return NextResponse.json({ success: true, updated: nextSettings }, { status: 200 });
  } catch (error) {
    console.error("Error updating profile settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

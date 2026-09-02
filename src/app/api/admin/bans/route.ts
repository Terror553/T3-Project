import { NextResponse } from "next/server";
import { getCurrentUser } from "~/server/auth/utils/currentUser";
import { db } from "~/server/db";

async function requireModerator() {
  const user = await getCurrentUser();
  return user && (user.group?.team || user.group?.highTeam) ? user : null;
}

export async function GET() {
  const user = await requireModerator();
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const bans = await db.userBan.findMany({ orderBy: { id: "desc" } });
  return NextResponse.json(bans);
}

export async function POST(request: Request) {
  const user = await requireModerator();
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const payload = (await request.json()) as Record<string, unknown>;
  const bannedUUID = typeof payload.bannedUUID === "string" ? payload.bannedUUID.trim() : "";
  const reason = typeof payload.reason === "string" ? payload.reason.trim() : "";

  if (!bannedUUID || !reason) {
    return NextResponse.json({ error: "Banned UUID and reason are required" }, { status: 400 });
  }

  const ban = await db.userBan.create({
    data: { bannerUUID: String(user.id), bannedUUID, reason },
  });
  return NextResponse.json(ban, { status: 201 });
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "~/server/auth/utils/currentUser";
import { db } from "~/server/db";

const banSchema = z.object({
  bannedUUID: z.string().trim().min(1).max(255),
  reason: z.string().trim().min(1).max(10_000),
});

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

  const payload = banSchema.safeParse(await request.json());
  if (!payload.success) {
    return NextResponse.json({ error: "Banned UUID and reason are required" }, { status: 400 });
  }

  const ban = await db.userBan.create({
    data: { bannerUUID: String(user.id), ...payload.data },
  });
  return NextResponse.json(ban, { status: 201 });
}

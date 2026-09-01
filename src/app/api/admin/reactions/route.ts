import { NextResponse } from "next/server";
import { getCurrentUser } from "~/server/auth/utils/currentUser";
import { db } from "~/server/db";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || !(user.group?.team || user.group?.highTeam)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const reactions = await db.forumReactionEmoji.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json(reactions, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch admin reactions", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || !(user.group?.team || user.group?.highTeam)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const payload = (await request.json()) as Record<string, unknown>;
    const name = String(payload.name ?? "").trim();
    const emoji = String(payload.emoji ?? "").trim();
    const negative = Number(payload.negative ?? 0);

    if (!name || !emoji) {
      return NextResponse.json({ error: "Reaction name and emoji are required" }, { status: 400 });
    }

    const reaction = await db.forumReactionEmoji.create({
      data: {
        name,
        emoji,
        negative: Number.isFinite(negative) ? negative : 0,
        authorId: user.id,
      },
    });

    return NextResponse.json(reaction, { status: 201 });
  } catch (error) {
    console.error("Failed to create admin reaction", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

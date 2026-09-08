import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "~/server/auth/utils/currentUser";
import { db } from "~/server/db";

const reactionSchema = z.object({
  name: z.string().trim().min(1).max(100),
  emoji: z.string().trim().min(1).max(32),
  negative: z.coerce.number().int().min(0).max(1),
});

const reactionIdSchema = z.coerce.number().int().positive();

async function authorize() {
  const user = await getCurrentUser();
  if (!user) return { response: NextResponse.json({ error: "Not authenticated" }, { status: 401 }) };
  if (!(user.group?.team || user.group?.highTeam)) {
    return { response: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return { user };
}

export async function GET() {
  try {
    const authorization = await authorize();
    if ("response" in authorization) return authorization.response;

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
    const authorization = await authorize();
    if ("response" in authorization) return authorization.response;
    const parsed = reactionSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Reaction name, emoji, and negative flag are required." }, { status: 400 });
    }

    const reaction = await db.forumReactionEmoji.create({
      data: {
        ...parsed.data,
        authorId: authorization.user.id,
      },
    });

    return NextResponse.json(reaction, { status: 201 });
  } catch (error) {
    console.error("Failed to create admin reaction", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const authorization = await authorize();
    if ("response" in authorization) return authorization.response;
    const payload = (await request.json()) as Record<string, unknown>;
    const id = reactionIdSchema.safeParse(payload.id);
    const reaction = reactionSchema.safeParse(payload);
    if (!id.success || !reaction.success) {
      return NextResponse.json({ error: "A valid reaction id, name, emoji, and negative flag are required." }, { status: 400 });
    }

    const updated = await db.forumReactionEmoji.update({
      where: { id: id.data },
      data: reaction.data,
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update admin reaction", error);
    return NextResponse.json({ error: "Reaction could not be updated." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const authorization = await authorize();
    if ("response" in authorization) return authorization.response;
    const payload = (await request.json()) as Record<string, unknown>;
    const id = reactionIdSchema.safeParse(payload.id);
    if (!id.success) {
      return NextResponse.json({ error: "A valid reaction id is required." }, { status: 400 });
    }

    await db.forumReactionEmoji.delete({ where: { id: id.data } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete admin reaction", error);
    return NextResponse.json({ error: "Reaction could not be deleted." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getCurrentUser } from "~/server/auth/utils/currentUser";
import { db } from "~/server/db";

function isStaff(user: Awaited<ReturnType<typeof getCurrentUser>>): boolean {
  return Boolean(user?.group?.team || user?.group?.highTeam);
}

export async function GET(): Promise<NextResponse> {
  const user = await getCurrentUser();
  if (!user || !isStaff(user)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const rows = await db.$queryRaw<Array<{ id: number; title: string; content: string; published: number; authorId: number; createdAt: Date }>>`SELECT id, title, content, published, authorId, createdAt FROM announcements ORDER BY createdAt DESC`;
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Failed to list announcements", error);
    return NextResponse.json({ error: "Announcements are unavailable." }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  const user = await getCurrentUser();
  if (!user || !isStaff(user)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const title = String(payload.title ?? "").trim();
    const content = String(payload.content ?? "").trim();
    if (!title || !content) return NextResponse.json({ error: "Title and content are required." }, { status: 400 });
    await db.$executeRaw`INSERT INTO announcements (title, content, published, authorId) VALUES (${title}, ${content}, ${1}, ${user.id})`;
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Failed to create announcement", error);
    return NextResponse.json({ error: "Announcement could not be created." }, { status: 500 });
  }
}

export async function DELETE(request: Request): Promise<NextResponse> {
  const user = await getCurrentUser();
  if (!user || !isStaff(user)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const id = Number(payload.id);
    if (!Number.isInteger(id) || id <= 0) return NextResponse.json({ error: "A valid announcement id is required." }, { status: 400 });
    await db.$executeRaw`DELETE FROM announcements WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete announcement", error);
    return NextResponse.json({ error: "Announcement could not be deleted." }, { status: 500 });
  }
}

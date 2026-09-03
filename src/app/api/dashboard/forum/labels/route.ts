import { NextResponse } from "next/server";
import { getCurrentUser } from "~/server/auth/utils/currentUser";
import { db } from "~/server/db";

async function staff(): Promise<boolean> {
  const user = await getCurrentUser();
  return Boolean(user?.group?.team || user?.group?.highTeam);
}

export async function GET(): Promise<NextResponse> {
  if (!(await staff())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const labels = await db.$queryRaw<Array<{ id: number; name: string; color: string }>>`SELECT id, name, color FROM forum_labels ORDER BY name ASC`;
    return NextResponse.json(labels);
  } catch (error) {
    console.error("Failed to list forum labels", error);
    return NextResponse.json({ error: "Labels are unavailable." }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  if (!(await staff())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const name = String(payload.name ?? "").trim();
    const color = String(payload.color ?? "#66a5ea").trim();
    if (!name || name.length > 100 || !/^#[0-9a-fA-F]{6}$/.test(color)) return NextResponse.json({ error: "A valid label name and hex color are required." }, { status: 400 });
    await db.$executeRaw`INSERT INTO forum_labels (name, color) VALUES (${name}, ${color})`;
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Failed to create forum label", error);
    return NextResponse.json({ error: "Label could not be created." }, { status: 500 });
  }
}

export async function DELETE(request: Request): Promise<NextResponse> {
  if (!(await staff())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const id = Number(payload.id);
    if (!Number.isInteger(id) || id <= 0) return NextResponse.json({ error: "A valid label id is required." }, { status: 400 });
    await db.$executeRaw`DELETE FROM forum_labels WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete forum label", error);
    return NextResponse.json({ error: "Label could not be deleted." }, { status: 500 });
  }
}

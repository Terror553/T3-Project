import { NextResponse } from "next/server";
import { getCurrentUser } from "~/server/auth/utils/currentUser";
import { db } from "~/server/db";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || !(user.group?.team || user.group?.highTeam)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const roles = await db.group.findMany({
      orderBy: { priority: "asc" },
    });

    return NextResponse.json(roles, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch admin roles", error);
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
    const color = String(payload.color ?? "&7").trim() || "&7";
    const priority = Number(payload.priority ?? 999);
    const team = Number(payload.team ?? 0);
    const highTeam = Number(payload.highTeam ?? 0);
    const isDefault = Number(payload.default ?? 0);

    if (!name) {
      return NextResponse.json({ error: "Role name is required" }, { status: 400 });
    }

    const role = await db.group.create({
      data: {
        name,
        color,
        priority: Number.isFinite(priority) ? priority : 999,
        team: Number.isFinite(team) ? team : 0,
        highTeam: Number.isFinite(highTeam) ? highTeam : 0,
        default: Number.isFinite(isDefault) ? isDefault : 0,
        gradient: 0,
      },
    });

    return NextResponse.json(role, { status: 201 });
  } catch (error) {
    console.error("Failed to create admin role", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

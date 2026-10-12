import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "~/server/auth/utils/currentUser";
import { db } from "~/server/db";

const roleSchema = z.object({
  name: z.string().trim().min(1).max(100),
  color: z.string().trim().min(1).max(32).default("&7"),
  priority: z.coerce.number().int().default(999),
  team: z.coerce.number().int().default(0),
  highTeam: z.coerce.number().int().default(0),
  default: z.coerce.number().int().default(0),
});

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

    const payload = roleSchema.safeParse(await request.json());
    if (!payload.success) {
      return NextResponse.json({ error: "Role name is required" }, { status: 400 });
    }

    const { name, color, priority, team, highTeam, default: isDefault } = payload.data;
    const role = await db.group.create({
      data: {
        name,
        color,
        priority,
        team,
        highTeam,
        default: isDefault,
        gradient: 0,
      },
    });

    return NextResponse.json(role, { status: 201 });
  } catch (error) {
    console.error("Failed to create admin role", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getCurrentUser } from "~/server/auth/utils/currentUser";
import { db } from "~/server/db";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || !(user.group?.team || user.group?.highTeam)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const categories = await db.forumCategory.findMany({
      include: {
        subcategories: {
          orderBy: { name: "asc" },
        },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch admin categories", error);
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

    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const category = await db.forumCategory.create({
      data: {
        name,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Failed to create admin category", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

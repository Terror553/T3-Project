import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "~/server/auth/utils/currentUser";
import { db } from "~/server/db";

const navigationSchema = z.object({
  name: z.string().trim().min(1).max(100),
  fullLink: z.string().trim().min(1).max(500),
  icon: z.string().trim().min(1).max(100),
  teamLink: z.boolean(),
});

async function requireStaff() {
  const user = await getCurrentUser();
  if (!user)
    return {
      response: NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 },
      ),
    };
  if (!user.group?.team && !user.group?.highTeam) {
    return {
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }
  return { user };
}

function mapItem(item: {
  id: number;
  name: string;
  fullLink: string;
  icon: string;
  teamLink: number;
}) {
  return { ...item, teamLink: item.teamLink === 1 };
}

export async function GET() {
  const auth = await requireStaff();
  if ("response" in auth) return auth.response;
  try {
    const items = await db.forumNavigation.findMany({ orderBy: { id: "asc" } });
    return NextResponse.json(items.map(mapItem));
  } catch (error) {
    console.error("Failed to load dashboard navigation", error);
    return NextResponse.json(
      { error: "Navigation is unavailable." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const auth = await requireStaff();
  if ("response" in auth) return auth.response;
  const parsed = navigationSchema.safeParse(await request.json());
  if (!parsed.success)
    return NextResponse.json(
      { error: "Invalid navigation entry." },
      { status: 400 },
    );
  try {
    const item = await db.forumNavigation.create({
      data: {
        ...parsed.data,
        teamLink: parsed.data.teamLink ? 1 : 0,
        authorId: auth.user.id,
      },
    });
    return NextResponse.json(mapItem(item), { status: 201 });
  } catch (error) {
    console.error("Failed to create dashboard navigation", error);
    return NextResponse.json(
      { error: "Navigation entry could not be created." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const auth = await requireStaff();
  if ("response" in auth) return auth.response;
  const body = (await request.json()) as { id?: number };
  if (!Number.isInteger(body.id))
    return NextResponse.json(
      { error: "A valid navigation id is required." },
      { status: 400 },
    );
  try {
    await db.forumNavigation.delete({ where: { id: body.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete dashboard navigation", error);
    return NextResponse.json(
      { error: "Navigation entry could not be deleted." },
      { status: 500 },
    );
  }
}

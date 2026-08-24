import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const q = (url.searchParams.get("q") ?? "").trim();

    if (q.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    const users = await db.forumUser.findMany({
      where: {
        username: {
          contains: q,
        },
      },

      take: 10,
      select: {
        id: true,
        username: true,
        avatarUrl: true,
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `User search failed: ${String(error)}` }, { status: 500 });
  }
}

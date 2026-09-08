import { NextResponse } from "next/server";
import { db } from "~/server/db";

const PAGE_SIZE = 24;

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const query = (url.searchParams.get("q") ?? "").trim();
    const requestedPage = Number(url.searchParams.get("page") ?? "1");
    const page = Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

    const where = query.length > 0
      ? { username: { contains: query } }
      : undefined;
    const [total, users] = await Promise.all([
      db.forumUser.count({ where }),
      db.forumUser.findMany({
        where,
        orderBy: { username: "asc" },
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        select: {
          id: true,
          username: true,
          avatarUrl: true,
          createdAt: true,
          group: {
            select: {
              id: true,
              name: true,
              color: true,
              gradient: true,
              start: true,
              end: true,
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      users,
      page,
      pageSize: PAGE_SIZE,
      total,
      totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
    });
  } catch (error) {
    console.error("Failed to load members", error);
    return NextResponse.json(
      { error: "Members are currently unavailable." },
      { status: 500 },
    );
  }
}

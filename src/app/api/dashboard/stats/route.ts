import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET() {
  try {
    const [topicsCount, usersCount, repliesCount] = await Promise.all([
      db.forumTopic.count(),
      db.forumUser.count(),
      db.forumTopicReply.count(),
    ]);

    return NextResponse.json({ topicsCount, usersCount, repliesCount }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getTopic } from "~/server/forum/forum";
import type { ForumTopic } from "~/server/types/forum";

export async function GET(
  request: Request,
): Promise<NextResponse<ForumTopic | { error: string }>> {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "ID parameter is missing" },
        { status: 400 },
      );
    }

    const topic = await getTopic(id);
    return NextResponse.json(topic, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error: " + (error as Error).message },
      { status: 500 },
    );
  }
}

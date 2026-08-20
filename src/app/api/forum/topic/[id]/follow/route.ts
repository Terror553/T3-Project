import { NextResponse } from "next/server";
import { toggleTopicFollow } from "~/server/forum/forum";

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const topicId = Number(url.pathname.split("/").slice(-3, -2)[0]);
    const body = (await request.json()) as Record<string, unknown>;

    const result = await toggleTopicFollow({
      ...(body as Record<string, unknown>),
      topicId: Number.isFinite(topicId) ? topicId : null,
    } as Parameters<typeof toggleTopicFollow>[0]);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error: " + String(error),
      },
      { status: 500 },
    );
  }
}

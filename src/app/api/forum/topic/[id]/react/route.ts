import { NextResponse } from "next/server";
import { toggleTopicReaction } from "~/server/forum/forum";

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const body = (await request.json()) as Record<string, unknown>;
    const topicId = body.topicId ?? url.searchParams.get("topicId") ?? null;

    const result = await toggleTopicReaction({
      ...(body as Record<string, unknown>),
      topicId: Number.isFinite(topicId) ? topicId : null,
    } as Parameters<typeof toggleTopicReaction>[0]);

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

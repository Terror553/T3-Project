import { NextResponse } from "next/server";
import { getLatestTopic } from "~/server/forum/forum";
import type { ForumTopic } from "~/server/types/forum";

export async function GET(
  request: Request,
): Promise<NextResponse<ForumTopic | null | { error: string }>> {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { error: "ID parameter is missing" },
      { status: 400 },
    );
  }

  try {
    const latestTopic = await getLatestTopic(id);

    return NextResponse.json(latestTopic, { status: 200 });
  } catch (error) {
    console.error("Error fetching topic:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

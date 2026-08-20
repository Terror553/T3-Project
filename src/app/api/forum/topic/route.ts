import { NextResponse } from "next/server";
import { createTopic } from "~/server/forum/forum";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const result = await createTopic(body as Parameters<typeof createTopic>[0]);

    if (!result.success) {
      return NextResponse.json(result, {
        status: 400,
      });
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

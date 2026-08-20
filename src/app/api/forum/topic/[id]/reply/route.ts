import { NextResponse } from "next/server";
import { createReply, deleteReply, editReply } from "~/server/forum/forum";

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const topicId = Number(url.pathname.split("/").slice(-2, -1)[0]);
    const body = (await request.json()) as Record<string, unknown>;

    const result = await createReply({
      ...(body as Record<string, unknown>),
      topicId: Number.isFinite(topicId) ? topicId : null,
    } as Parameters<typeof createReply>[0]);

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

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const topicId = Number(url.pathname.split("/").slice(-2, -1)[0]);
    const body = (await request.json()) as Record<string, unknown>;

    const result = await editReply({
      ...(body as Record<string, unknown>),
      topicId: Number.isFinite(topicId) ? topicId : null,
    } as Parameters<typeof editReply>[0]);

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

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const topicId = Number(url.pathname.split("/").slice(-2, -1)[0]);
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

    const result = await deleteReply({
      ...(body as Record<string, unknown>),
      topicId: Number.isFinite(topicId) ? topicId : null,
    } as Parameters<typeof deleteReply>[0]);

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

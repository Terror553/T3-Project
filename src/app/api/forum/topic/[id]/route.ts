import { NextResponse } from "next/server";
import {
  deleteTopic,
  editTopic,
  getTopic,
} from "~/server/forum/forum";

export async function GET(request: Request) {
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
      { error: "Internal Server Error: " + String(error) },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const id = Number(url.pathname.split("/").pop());
    const body = (await request.json()) as Record<string, unknown>;

    const result = await editTopic({
      ...(body as Record<string, unknown>),
      id: Number.isFinite(id) ? id : null,
    } as Parameters<typeof editTopic>[0]);

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
    const id = Number(url.pathname.split("/").pop());
    const payload = (await request.json().catch(() => ({}))) as Record<string, unknown>;

    const result = await deleteTopic({
      ...(payload as Record<string, unknown>),
      id: Number.isFinite(id) ? id : null,
    } as Parameters<typeof deleteTopic>[0]);

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

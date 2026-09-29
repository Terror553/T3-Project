import { NextResponse } from "next/server";
import { replyMessageSchema } from "~/lib/schemas/messagingSchemas";
import {
  getMessageThread,
  replyToMessageThread,
} from "~/server/messaging/messaging";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const messageId = Number(id);

    if (!Number.isInteger(messageId) || messageId <= 0) {
      return NextResponse.json({ error: "Invalid message id" }, { status: 400 });
    }

    const message = await getMessageThread(messageId);
    if (!message) {
      return NextResponse.json({ error: "Message thread not found" }, { status: 404 });
    }

    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch message thread: ${String(error)}` },
      { status: 500 },
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const messageId = Number(id);

    if (!Number.isInteger(messageId) || messageId <= 0) {
      return NextResponse.json({ error: "Invalid message id" }, { status: 400 });
    }

    const body: unknown = await request.json();
    const parsed = replyMessageSchema.safeParse({
      messageId,
      ...(typeof body === "object" && body !== null ? body : {}),
    });

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: { message: "Invalid reply data." } },
        { status: 400 },
      );
    }

    const result = await replyToMessageThread(parsed.data);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to reply to message thread: ${String(error)}` },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { createMessageThread, getInboxMessages } from "~/server/messaging/messaging";

export async function GET() {
  try {
    const inbox = await getInboxMessages();
    return NextResponse.json(inbox, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch inbox: ${String(error)}` },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const result = await createMessageThread({
      receiverId: Number(body.receiverId),
      title: String(body.title ?? ""),
      message: String(body.message ?? ""),
    });

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create message thread: ${String(error)}` },
      { status: 500 },
    );
  }
}

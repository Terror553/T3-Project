import { NextResponse } from "next/server";
import { createMessageThreadSchema } from "~/lib/schemas/messagingSchemas";
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
    const body: unknown = await request.json();
    const parsed = createMessageThreadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: { message: "Invalid message data." } },
        { status: 400 },
      );
    }

    const result = await createMessageThread(parsed.data);

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

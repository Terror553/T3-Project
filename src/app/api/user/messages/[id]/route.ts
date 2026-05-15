import { NextResponse } from "next/server";
import { getMessage } from "~/server/auth/utils/getUserMessages";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = Number(url.pathname.split("/").pop());

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { error: "ID parameter is missing or invalid" },
        { status: 400 },
      );
    }

    const message = await getMessage(id);
    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error: " + (error as string) },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { getCurrentUser } from "~/server/auth/utils/currentUser";
import { getUser } from "~/server/auth/utils/getUser";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    const id = Number(url.pathname.split("/").pop());

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid ID parameter" },
        { status: 400 },
      );
    }

    const user = await getUser(id);
    if (!user) {
      return NextResponse.json(null);
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

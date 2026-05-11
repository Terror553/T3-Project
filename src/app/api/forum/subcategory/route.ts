import { NextResponse } from "next/server";
import { getSubCategories } from "~/server/forum/forum";

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

    const subcategory = await getSubCategories(id);
    return NextResponse.json(subcategory, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error: " + (error as string) },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { getCategories } from "~/server/forum/forum";
import type { ForumCategory } from "~/server/types/forum";

export async function GET() {
  try {
    const forum: ForumCategory[] = await getCategories();
    return NextResponse.json(forum, { status: 200 });
  } catch (error) {
    console.error("Error fetching forum:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

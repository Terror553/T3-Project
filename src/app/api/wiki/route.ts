import { NextResponse } from "next/server";
import type { WikiCategoryFull } from "~/server/types/wiki";
import { getWikiCategories } from "~/server/wiki/wiki";

export async function GET() {
  try {
    const wiki: WikiCategoryFull[] = await getWikiCategories();
    return NextResponse.json(wiki, { status: 200 });
  } catch (error) {
    console.error("Error fetching wiki:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

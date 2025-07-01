import { NextResponse } from "next/server";
import { getNavigation } from "~/server/navigation/navGetter";

export async function GET() {
  try {
    const nav = await getNavigation();
    if (!nav) {
      return NextResponse.json([]);
    }
    return NextResponse.json(nav);
  } catch (error) {
    console.error("Error fetching nav:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

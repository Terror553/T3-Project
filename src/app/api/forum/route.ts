import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { getForum } from "~/server/forum/forum";

export async function GET() {
  try {
    const forum = await getForum();
    return NextResponse.json(forum, { status: 200 });
  } catch (error) {
    console.error("Error fetching forum:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

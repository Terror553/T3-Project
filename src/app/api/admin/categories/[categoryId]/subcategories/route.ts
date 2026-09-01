import { NextResponse } from "next/server";
import { createSlug } from "~/server/utils/forumUtils";
import { db } from "~/server/db";
import { getCurrentUser } from "~/server/auth/utils/currentUser";

export async function POST(request: Request, context: { params: Promise<{ categoryId?: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user || !(user.group?.team || user.group?.highTeam)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const params = await context.params;
    const categoryId = Number(params.categoryId ?? "");
    if (!Number.isFinite(categoryId) || categoryId <= 0) {
      return NextResponse.json({ error: "Category id is invalid" }, { status: 400 });
    }

    const payload = (await request.json()) as Record<string, unknown>;
    const name = String(payload.name ?? "").trim();
    const description = String(payload.description ?? "").trim();

    if (!name) {
      return NextResponse.json({ error: "Subcategory name is required" }, { status: 400 });
    }

    const category = await db.forumCategory.findUnique({ where: { id: categoryId } });
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    const subcategory = await db.forumSubcategory.create({
      data: {
        name,
        description: description || `Discussion forum for ${name}`,
        slug: createSlug(name),
        category: {
          connect: { id: category.id },
        },
      },
    });

    return NextResponse.json(subcategory, { status: 201 });
  } catch (error) {
    console.error("Failed to create admin subcategory", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: Promise<{ categoryId?: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user || !(user.group?.team || user.group?.highTeam)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const params = await context.params;
    const categoryId = Number(params.categoryId ?? "");
    const payload = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const subcategoryId = Number(payload.id ?? "");
    const name = String(payload.name ?? "").trim();
    const description = String(payload.description ?? "").trim();

    if (!Number.isFinite(categoryId) || categoryId <= 0) {
      return NextResponse.json({ error: "Category id is invalid" }, { status: 400 });
    }

    if (!Number.isFinite(subcategoryId) || subcategoryId <= 0) {
      return NextResponse.json({ error: "Subcategory id is invalid" }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json({ error: "Subcategory name is required" }, { status: 400 });
    }

    const subcategory = await db.forumSubcategory.update({
      where: { id: subcategoryId },
      data: {
        name,
        description: description || `Discussion forum for ${name}`,
        slug: createSlug(name),
      },
    });

    return NextResponse.json(subcategory, { status: 200 });
  } catch (error) {
    console.error("Failed to update admin subcategory", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ categoryId?: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user || !(user.group?.team || user.group?.highTeam)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const params = await context.params;
    const categoryId = Number(params.categoryId ?? "");
    const payload = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const subcategoryId = Number(payload.id ?? "");

    if (!Number.isFinite(categoryId) || categoryId <= 0) {
      return NextResponse.json({ error: "Category id is invalid" }, { status: 400 });
    }

    if (!Number.isFinite(subcategoryId) || subcategoryId <= 0) {
      return NextResponse.json({ error: "Subcategory id is invalid" }, { status: 400 });
    }

    const topics = await db.forumTopic.count({ where: { subcategoryId } });
    if (topics > 0) {
      return NextResponse.json({ error: "Subcategory is not empty" }, { status: 409 });
    }

    await db.forumSubcategory.delete({ where: { id: subcategoryId } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete admin subcategory", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

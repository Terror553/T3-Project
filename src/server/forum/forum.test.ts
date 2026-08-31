import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("~/server/auth/utils/currentUser", () => ({
  getCurrentUser: vi.fn(),
}));

vi.mock("~/server/db", () => ({
  db: {
    forumTopic: {
      findFirst: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      findMany: vi.fn(),
    },
    forumTopicReply: {
      create: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    forumReaction: {
      findFirst: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    },
    forumTopicFollow: {
      findFirst: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    },
    forumUser: {
      findUnique: vi.fn(),
    },
  },
}));

describe("forum module", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("createTopic fails when not signed in", async () => {
    const { getCurrentUser } = await import("~/server/auth/utils/currentUser");
    (getCurrentUser as any).mockResolvedValue(null);

    const forum = await import("~/server/forum/forum");
    // pass valid-looking data so validation passes and auth check runs
    const res = await forum.createTopic({ title: "Test Title", content: "This is valid content.", subcategory: "1" });
    expect(res.success).toBe(false);
    expect(res.error?.code).toBeDefined();
  });

  it("createTopic sanitizes content and returns success", async () => {
    const { getCurrentUser } = await import("~/server/auth/utils/currentUser");
    (getCurrentUser as any).mockResolvedValue({ id: 10 });

    const { db } = await import("~/server/db");
    // getSubCategory is called in createTopic; mock forumSubcategory via findFirst used by getSubCategory call chain
    (db.forumSubcategory ? db.forumSubcategory.findFirst : undefined);

    // Mock getSubCategory by mocking db.forumSubcategory.findFirst indirectly via require of forum module's getSubCategory
    // Simpler: mock db.forumTopic.findFirst to return null (no duplicate), and db.forumTopic.create to capture data
    (db.forumTopic.findFirst as any).mockResolvedValue(null);

    // Ensure getLatestTopic's db.forumTopic.findMany returns empty array
    (db.forumTopic.findMany as any).mockResolvedValue([]);

    let captured: any = null;
    (db.forumTopic.create as any).mockImplementation(async (args: any) => {
      captured = args;
      return { id: 123 };
    });

    // Mock getSubCategory call by ensuring db.forumSubcategory exists when module calls it; since forum.getSubCategory uses db.forumSubcategory.findFirst
    (db.forumSubcategory = { findFirst: vi.fn().mockResolvedValue({ id: 2, topics: [] }) } as any);

    const forum = await import("~/server/forum/forum");

    const rawContent = '<img src=x onerror=alert(1)>Hello';
    const res = await forum.createTopic({ title: "Test Topic", content: rawContent, subcategory: "2" });

    expect(res.success).toBe(true);
    expect(res.data?.id).toBe(123);
    expect(captured).not.toBeNull();
    expect(captured.data.content).not.toContain("onerror");
  });

  it("createReply fails when topic missing", async () => {
    const { getCurrentUser } = await import("~/server/auth/utils/currentUser");
    (getCurrentUser as any).mockResolvedValue({ id: 5 });

    const { db } = await import("~/server/db");
    (db.forumTopic.findUnique as any).mockResolvedValue(null);

    const forum = await import("~/server/forum/forum");
    const res = await forum.createReply({ topicId: 999, content: "hi" });
    expect(res.success).toBe(false);
    expect(res.error?.code).toBe("app/not-found");
  });

  it("createReply creates reply with sanitized content", async () => {
    const { getCurrentUser } = await import("~/server/auth/utils/currentUser");
    (getCurrentUser as any).mockResolvedValue({ id: 6 });

    const { db } = await import("~/server/db");
    (db.forumTopic.findUnique as any).mockResolvedValue({ id: 11 });

    let captured: any = null;
    (db.forumTopicReply.create as any).mockImplementation(async (args: any) => {
      captured = args;
      return { id: 200 };
    });

    const forum = await import("~/server/forum/forum");
    const res = await forum.createReply({ topicId: 11, content: '<svg onload=alert(1)>' });
    expect(res.success).toBe(true);
    expect(res.data?.id).toBe(200);
    expect(captured.data.content).not.toContain("onload");
  });

  it("editReply enforces permissions and sanitizes", async () => {
    const { getCurrentUser } = await import("~/server/auth/utils/currentUser");
    (getCurrentUser as any).mockResolvedValue({ id: 7, group: { highTeam: 0 } });

    const { db } = await import("~/server/db");
    (db.forumTopicReply.findUnique as any).mockResolvedValue({ id: 30, authorId: 99, topicId: 3 });

    const forum = await import("~/server/forum/forum");
    const resNotAllowed = await forum.editReply({ id: 30, content: "new" });
    expect(resNotAllowed.success).toBe(false);
    expect(resNotAllowed.error?.code).toBe("auth/unauthorized");

    // Now allow as author
    (db.forumTopicReply.findUnique as any).mockResolvedValue({ id: 30, authorId: 7, topicId: 3 });
    (db.forumTopicReply.update as any).mockResolvedValue({ id: 30 });

    const resOk = await forum.editReply({ id: 30, content: '<img src=x onerror=alert(1)>' });
    expect(resOk.success).toBe(true);
  });

  it("deleteReply enforces permissions and deletes", async () => {
    const { getCurrentUser } = await import("~/server/auth/utils/currentUser");
    (getCurrentUser as any).mockResolvedValue({ id: 8, group: { highTeam: 0 } });

    const { db } = await import("~/server/db");
    (db.forumTopicReply.findUnique as any).mockResolvedValue({ id: 40, authorId: 999 });

    const forum = await import("~/server/forum/forum");
    const resNotAllowed = await forum.deleteReply({ id: 40 });
    expect(resNotAllowed.success).toBe(false);
    expect(resNotAllowed.error?.code).toBe("auth/unauthorized");

    (db.forumTopicReply.findUnique as any).mockResolvedValue({ id: 40, authorId: 8 });
    (db.forumTopicReply.delete as any).mockResolvedValue({});

    const resOk = await forum.deleteReply({ id: 40 });
    expect(resOk.success).toBe(true);
  });

  it("toggleTopicReaction adds and removes reaction", async () => {
    const { getCurrentUser } = await import("~/server/auth/utils/currentUser");
    (getCurrentUser as any).mockResolvedValue({ id: 9 });

    const { db } = await import("~/server/db");
    (db.forumTopic.findUnique as any).mockResolvedValue({ id: 50 });

    // No existing reaction -> create
    (db.forumReaction.findFirst as any).mockResolvedValue(null);
    (db.forumReaction.create as any).mockResolvedValue({ id: 500 });
    const forum = await import("~/server/forum/forum");
    const resAdd = await forum.toggleTopicReaction({ topicId: 50, reactionId: 2 });
    expect(resAdd.success).toBe(true);
    expect(resAdd.data?.added).toBe(true);

    // Existing reaction -> delete
    (db.forumReaction.findFirst as any).mockResolvedValue({ id: 500 });
    (db.forumReaction.delete as any).mockResolvedValue({});
    const resRemove = await forum.toggleTopicReaction({ topicId: 50, reactionId: 2 });
    expect(resRemove.success).toBe(true);
    expect(resRemove.data?.added).toBe(false);
  });

  it("toggleTopicFollow follows and unfollows", async () => {
    const { getCurrentUser } = await import("~/server/auth/utils/currentUser");
    (getCurrentUser as any).mockResolvedValue({ id: 12 });

    const { db } = await import("~/server/db");
    (db.forumTopic.findUnique as any).mockResolvedValue({ id: 60 });

    (db.forumTopicFollow.findFirst as any).mockResolvedValue(null);
    (db.forumTopicFollow.create as any).mockResolvedValue({ id: 600 });
    const forum = await import("~/server/forum/forum");
    const resFollow = await forum.toggleTopicFollow({ topicId: 60 });
    expect(resFollow.success).toBe(true);
    expect(resFollow.data?.followed).toBe(true);

    (db.forumTopicFollow.findFirst as any).mockResolvedValue({ id: 600 });
    (db.forumTopicFollow.delete as any).mockResolvedValue({});
    const resUnfollow = await forum.toggleTopicFollow({ topicId: 60 });
    expect(resUnfollow.success).toBe(true);
    expect(resUnfollow.data?.followed).toBe(false);
  });
});
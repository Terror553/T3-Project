import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock auth currentUser and db before importing the module under test
vi.mock("~/server/auth/utils/currentUser", () => ({
  getCurrentUser: vi.fn(),
}));

vi.mock("~/server/db", () => ({
  db: {
    forumUser: {
      findUnique: vi.fn(),
    },
    forumMessage: {
      create: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn(),
    },
    forumMessageReply: {
      create: vi.fn(),
    },
  },
}));

describe("messaging module", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("returns error when creating thread while not signed in", async () => {
    const { getCurrentUser } = await import("~/server/auth/utils/currentUser");
    (getCurrentUser as any).mockResolvedValue(null);

    const messaging = await import("~/server/messaging/messaging");

    const res = await messaging.createMessageThread({ receiverId: 2, title: "Hey", message: "Hello" });
    expect(res.success).toBe(false);
    expect(res.error).toBeDefined();
    expect(res.error?.code).toBeDefined();
  });

  it("returns not found when receiver does not exist", async () => {
    const { getCurrentUser } = await import("~/server/auth/utils/currentUser");
    (getCurrentUser as any).mockResolvedValue({ id: 1 });

    const { db } = await import("~/server/db");
    (db.forumUser.findUnique as any).mockResolvedValue(null);

    const messaging = await import("~/server/messaging/messaging");

    const res = await messaging.createMessageThread({ receiverId: 999, title: "Hey", message: "Hello" });

    expect(res.success).toBe(false);
    expect(res.error?.code).toBe("app/not-found");
  });

  it("creates a thread successfully", async () => {
    const { getCurrentUser } = await import("~/server/auth/utils/currentUser");
    (getCurrentUser as any).mockResolvedValue({ id: 1 });

    const { db } = await import("~/server/db");
    (db.forumUser.findUnique as any).mockResolvedValue({ id: 2 });
    (db.forumMessage.create as any).mockResolvedValue({ id: 42 });

    const messaging = await import("~/server/messaging/messaging");

    const res = await messaging.createMessageThread({ receiverId: 2, title: "Hello", message: "Body" });

    expect(res.success).toBe(true);
    expect(res.data?.id).toBe(42);
  });

  it("returns error when replying while not signed in", async () => {
    const { getCurrentUser } = await import("~/server/auth/utils/currentUser");
    (getCurrentUser as any).mockResolvedValue(null);

    const messaging = await import("~/server/messaging/messaging");

    const res = await messaging.replyToMessageThread({ messageId: 1, message: "Reply" });
    expect(res.success).toBe(false);
  });

  it("returns not found when replying to missing thread", async () => {
    const { getCurrentUser } = await import("~/server/auth/utils/currentUser");
    (getCurrentUser as any).mockResolvedValue({ id: 1 });

    const { db } = await import("~/server/db");
    (db.forumMessage.findUnique as any).mockResolvedValue(null);

    const messaging = await import("~/server/messaging/messaging");

    const res = await messaging.replyToMessageThread({ messageId: 999, message: "Reply" });
    expect(res.success).toBe(false);
    expect(res.error?.code).toBe("app/not-found");
  });

  it("returns unauthorized when user not participant", async () => {
    const { getCurrentUser } = await import("~/server/auth/utils/currentUser");
    (getCurrentUser as any).mockResolvedValue({ id: 5 });

    const { db } = await import("~/server/db");
    (db.forumMessage.findUnique as any).mockResolvedValue({ id: 1, senderId: 2, receiverId: 3 });

    const messaging = await import("~/server/messaging/messaging");

    const res = await messaging.replyToMessageThread({ messageId: 1, message: "Reply" });
    expect(res.success).toBe(false);
    expect(res.error?.code).toBe("auth/unauthorized");
  });

  it("creates a reply successfully", async () => {
    const { getCurrentUser } = await import("~/server/auth/utils/currentUser");
    (getCurrentUser as any).mockResolvedValue({ id: 2 });

    const { db } = await import("~/server/db");
    (db.forumMessage.findUnique as any).mockResolvedValue({ id: 1, senderId: 2, receiverId: 3 });
    (db.forumMessageReply.create as any).mockResolvedValue({ id: 55 });

    const messaging = await import("~/server/messaging/messaging");

    const res = await messaging.replyToMessageThread({ messageId: 1, message: "Reply" });
    expect(res.success).toBe(true);
    expect(res.data?.id).toBe(55);
  });
});

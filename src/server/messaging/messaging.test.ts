import { describe, it, expect, vi, beforeEach } from "vitest";
import DOMPurify from "isomorphic-dompurify";

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

  it("getInboxMessages returns mapped threads", async () => {
    const now = new Date();
    const user = { id: 1 };
    const sender = { id: 1, username: "alice", avatarUrl: "/a.png", signature: "", createdAt: now, updatedAt: now };
    const receiver = { id: 2, username: "bob", avatarUrl: "/b.png", signature: "", createdAt: now, updatedAt: now };

    const { getCurrentUser } = await import("~/server/auth/utils/currentUser");
    (getCurrentUser as any).mockResolvedValue(user);

    const { db } = await import("~/server/db");
    (db.forumMessage.findMany as any).mockResolvedValue([
      {
        id: 10,
        createdAt: now,
        message: "hello",
        title: "Greeting",
        seen: 0,
        senderId: 1,
        receiverId: 2,
        sender,
        receiver,
        messageReplies: [
          {
            id: 100,
            createdAt: now,
            message: "reply",
            seen: 0,
            messageId: 10,
            senderId: 1,
            receiverId: 2,
            sender,
            receiver,
          },
        ],
      },
    ]);

    const messaging = await import("~/server/messaging/messaging");
    const inbox = await messaging.getInboxMessages();
    expect(Array.isArray(inbox)).toBe(true);
    expect(inbox.length).toBe(1);
    expect(inbox[0].id).toBe(10);
    expect(inbox[0].messageReplies.length).toBe(1);
    expect(inbox[0].sender?.username).toBe("alice");
  });

  it("getMessageThread returns null when user is not participant", async () => {
    const now = new Date();
    const { getCurrentUser } = await import("~/server/auth/utils/currentUser");
    (getCurrentUser as any).mockResolvedValue({ id: 5 });

    const { db } = await import("~/server/db");
    (db.forumMessage.findUnique as any).mockResolvedValue({ id: 11, senderId: 2, receiverId: 3 });

    const messaging = await import("~/server/messaging/messaging");
    const thread = await messaging.getMessageThread(11);
    expect(thread).toBeNull();
  });

  it("getMessageThread returns thread when user is participant", async () => {
    const now = new Date();
    const sender = { id: 2, username: "charlie", avatarUrl: "/c.png", signature: "", createdAt: now };
    const receiver = { id: 3, username: "dave", avatarUrl: "/d.png", signature: "", createdAt: now };

    const { getCurrentUser } = await import("~/server/auth/utils/currentUser");
    (getCurrentUser as any).mockResolvedValue({ id: 2 });

    const { db } = await import("~/server/db");
    (db.forumMessage.findUnique as any).mockResolvedValue({ id: 11, senderId: 2, receiverId: 3, sender, receiver, messageReplies: [], createdAt: now, message: "hi", title: "hey", seen: 0 });

    const messaging = await import("~/server/messaging/messaging");
    const thread = await messaging.getMessageThread(11);
    expect(thread).not.toBeNull();
    expect(thread?.id).toBe(11);
    expect(thread?.sender?.username).toBe("charlie");
  });

  it("sanitizes title and message when creating thread", async () => {
    const { getCurrentUser } = await import("~/server/auth/utils/currentUser");
    (getCurrentUser as any).mockResolvedValue({ id: 1 });

    const { db } = await import("~/server/db");
    (db.forumUser.findUnique as any).mockResolvedValue({ id: 2 });

    let captured: any = null;
    (db.forumMessage.create as any).mockImplementation(async (args: any) => {
      captured = args;
      return { id: 777 };
    });

    const messaging = await import("~/server/messaging/messaging");

    const rawTitle = '<script>alert(1)</script>Hi';
    const rawMessage = '<img src=x onerror=alert(1)>Hello';

    const res = await messaging.createMessageThread({ receiverId: 2, title: rawTitle, message: rawMessage });
    expect(res.success).toBe(true);
    expect(res.data?.id).toBe(777);

    const expectedTitle = DOMPurify.sanitize(rawTitle.trim());
    const expectedMessage = DOMPurify.sanitize(rawMessage.trim());

    expect(captured).not.toBeNull();
    expect(captured.data.title).toBe(expectedTitle);
    expect(captured.data.message).toBe(expectedMessage);
  });

  it("reply fails when thread has no receiver", async () => {
    const { getCurrentUser } = await import("~/server/auth/utils/currentUser");
    (getCurrentUser as any).mockResolvedValue({ id: 2 });

    const { db } = await import("~/server/db");
    (db.forumMessage.findUnique as any).mockResolvedValue({ id: 1, senderId: 2, receiverId: null });

    const messaging = await import("~/server/messaging/messaging");
    const res = await messaging.replyToMessageThread({ messageId: 1, message: "Reply" });
    expect(res.success).toBe(false);
    expect(res.error?.code).toBe("app/validation-error");
  });
});

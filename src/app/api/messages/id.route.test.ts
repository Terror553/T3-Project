import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("~/server/messaging/messaging", () => ({
  getMessageThread: vi.fn(),
  replyToMessageThread: vi.fn(),
}));

describe("API /api/messages/[id] route", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("GET returns 400 for invalid id", async () => {
    const route = await import("~/app/api/messages/[id]/route");
    const res = await route.GET(undefined as any, { params: Promise.resolve({ id: "abc" }) });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBeDefined();
  });

  it("GET returns 404 when thread not found", async () => {
    const { getMessageThread } = await import("~/server/messaging/messaging");
    (getMessageThread as any).mockResolvedValue(null);

    const route = await import("~/app/api/messages/[id]/route");
    const res = await route.GET(undefined as any, { params: Promise.resolve({ id: "999" }) });
    expect(res.status).toBe(404);
  });

  it("GET returns 200 and message when found", async () => {
    const { getMessageThread } = await import("~/server/messaging/messaging");
    (getMessageThread as any).mockResolvedValue({ id: 5, title: "t" });

    const route = await import("~/app/api/messages/[id]/route");
    const res = await route.GET(undefined as any, { params: Promise.resolve({ id: "5" }) });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.id).toBe(5);
  });

  it("POST returns 400 for invalid id", async () => {
    const route = await import("~/app/api/messages/[id]/route");
    const fakeReq = { json: async () => ({ message: "hi" }) } as any;
    const res = await route.POST(fakeReq as any, { params: Promise.resolve({ id: "abc" }) });
    expect(res.status).toBe(400);
  });

  it("POST returns 400 when replyToMessageThread fails", async () => {
    const { replyToMessageThread } = await import("~/server/messaging/messaging");
    (replyToMessageThread as any).mockResolvedValue({ success: false, error: { message: "err", code: "app/err" } });

    const route = await import("~/app/api/messages/[id]/route");
    const fakeReq = { json: async () => ({ message: "hi" }) } as any;
    const res = await route.POST(fakeReq as any, { params: Promise.resolve({ id: "1" }) });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.success).toBe(false);
  });

  it("POST returns 201 when reply succeeds", async () => {
    const { replyToMessageThread } = await import("~/server/messaging/messaging");
    (replyToMessageThread as any).mockResolvedValue({ success: true, data: { id: 22 } });

    const route = await import("~/app/api/messages/[id]/route");
    const fakeReq = { json: async () => ({ message: "hi" }) } as any;
    const res = await route.POST(fakeReq as any, { params: Promise.resolve({ id: "1" }) });
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data?.id).toBe(22);
  });
});

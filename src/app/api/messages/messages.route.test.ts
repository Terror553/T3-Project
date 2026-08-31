import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("~/server/messaging/messaging", () => ({
  getInboxMessages: vi.fn(),
  createMessageThread: vi.fn(),
}));

describe("API /api/messages route", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("GET returns inbox messages", async () => {
    const { getInboxMessages } = await import("~/server/messaging/messaging");
    (getInboxMessages as any).mockResolvedValue([{ id: 1, title: "t" }]);

    const route = await import("~/app/api/messages/route");
    const res = await route.GET();

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body[0].id).toBe(1);
  });

  it("POST returns 400 when createMessageThread fails", async () => {
    const { createMessageThread } = await import("~/server/messaging/messaging");
    (createMessageThread as any).mockResolvedValue({ success: false, error: { message: "err", code: "app/err" } });

    const route = await import("~/app/api/messages/route");
    // mock Request with json method
    const fakeReq = { json: async () => ({ receiverId: 2, title: "t", message: "m" }) } as any;
    const res = await route.POST(fakeReq);

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.success).toBe(false);
  });

  it("POST returns 201 when createMessageThread succeeds", async () => {
    const { createMessageThread } = await import("~/server/messaging/messaging");
    (createMessageThread as any).mockResolvedValue({ success: true, data: { id: 123 } });

    const route = await import("~/app/api/messages/route");
    const fakeReq = { json: async () => ({ receiverId: 2, title: "t", message: "m" }) } as any;
    const res = await route.POST(fakeReq);

    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data?.id).toBe(123);
  });
});

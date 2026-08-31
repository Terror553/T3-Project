import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("~/server/forum/forum", () => ({
  getCategories: vi.fn(),
  getSubCategory: vi.fn(),
  getTopic: vi.fn(),
  editTopic: vi.fn(),
  deleteTopic: vi.fn(),
}));

describe("API /api/forum routes", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("GET /api/forum returns categories", async () => {
    const { getCategories } = await import("~/server/forum/forum");
    (getCategories as any).mockResolvedValue([{ id: 1, name: "cat" }]);

    const route = await import("~/app/api/forum/route");
    const res = await route.GET();

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body[0].name).toBe("cat");
  });

  it("GET /api/forum/subcategory/[id] returns 400 on missing id", async () => {
    const route = await import("~/app/api/forum/subcategory/[id]/route");
    // create a fake request with no id in path
    const req = new Request("http://localhost/api/forum/subcategory/");
    const res = await route.GET(req as any);
    expect(res.status).toBe(400);
  });

  it("GET /api/forum/subcategory/[id] returns subcategory when found", async () => {
    const { getSubCategory } = await import("~/server/forum/forum");
    (getSubCategory as any).mockResolvedValue({ id: 2, name: "sub" });

    const route = await import("~/app/api/forum/subcategory/[id]/route");
    const req = new Request("http://localhost/api/forum/subcategory/2");
    const res = await route.GET(req as any);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.id).toBe(2);
  });

  it("GET /api/forum/topic/[id] returns 400 on missing id", async () => {
    const route = await import("~/app/api/forum/topic/[id]/route");
    const req = new Request("http://localhost/api/forum/topic/");
    const res = await route.GET(req as any);
    expect(res.status).toBe(400);
  });

  it("GET /api/forum/topic/[id] returns topic when found", async () => {
    const { getTopic } = await import("~/server/forum/forum");
    (getTopic as any).mockResolvedValue({ id: 5, title: "t" });

    const route = await import("~/app/api/forum/topic/[id]/route");
    const req = new Request("http://localhost/api/forum/topic/5");
    const res = await route.GET(req as any);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.id).toBe(5);
  });

  it("PUT /api/forum/topic/[id] returns 400 when editTopic fails", async () => {
    const { editTopic } = await import("~/server/forum/forum");
    (editTopic as any).mockResolvedValue({ success: false, error: { message: "err", code: "app/err" } });

    const route = await import("~/app/api/forum/topic/[id]/route");
    const req = new Request("http://localhost/api/forum/topic/10", { method: "PUT", body: JSON.stringify({ title: "t" }) } as any);
    // fetch polyfill not required since route parses request.json()
    const res = await route.PUT(req as any);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.success).toBe(false);
  });

  it("DELETE /api/forum/topic/[id] returns 200 when deleteTopic succeeds", async () => {
    const { deleteTopic } = await import("~/server/forum/forum");
    (deleteTopic as any).mockResolvedValue({ success: true, data: { success: true } });

    const route = await import("~/app/api/forum/topic/[id]/route");
    const req = new Request("http://localhost/api/forum/topic/10", { method: "DELETE", body: JSON.stringify({}) } as any);
    const res = await route.DELETE(req as any);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });
});

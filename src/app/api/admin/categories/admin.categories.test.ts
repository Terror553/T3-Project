import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("~/server/auth/utils/currentUser", () => ({
  getCurrentUser: vi.fn(),
}));

vi.mock("~/server/db", () => ({
  db: {
    forumCategory: {
      findMany: vi.fn(),
      create: vi.fn(),
    },
  },
}));

describe("admin categories API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("GET rejects non-admin users with 403", async () => {
    const { getCurrentUser } = await import("~/server/auth/utils/currentUser");
    (getCurrentUser as any).mockResolvedValue({ id: 2, group: { team: 0, highTeam: 0 } });

    const route = await import("~/app/api/admin/categories/route");
    const res = await route.GET();

    expect(res.status).toBe(403);
    const body = await res.json();
    expect(body.error).toBe("Forbidden");
  });

  it("GET returns categories for team members", async () => {
    const { getCurrentUser } = await import("~/server/auth/utils/currentUser");
    (getCurrentUser as any).mockResolvedValue({ id: 5, group: { team: 1, highTeam: 0 } });

    const { db } = await import("~/server/db");
    (db.forumCategory.findMany as any).mockResolvedValue([
      { id: 1, name: "Announcements", subcategories: [] },
    ]);

    const route = await import("~/app/api/admin/categories/route");
    const res = await route.GET();

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body[0]?.name).toBe("Announcements");
  });

  it("POST creates a category when the payload is valid", async () => {
    const { getCurrentUser } = await import("~/server/auth/utils/currentUser");
    (getCurrentUser as any).mockResolvedValue({ id: 9, group: { team: 1, highTeam: 0 } });

    const { db } = await import("~/server/db");
    (db.forumCategory.create as any).mockResolvedValue({ id: 42, name: "Updates" });

    const route = await import("~/app/api/admin/categories/route");
    const res = await route.POST({
      json: async () => ({ name: "Updates" }),
    } as any);

    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.name).toBe("Updates");
  });
});

import { beforeEach, describe, expect, it, vi } from "vitest";
import { db } from "~/server/db";

vi.mock("~/server/db", () => ({
  db: {
    forumUser: {
      count: vi.fn(),
      findMany: vi.fn(),
    },
  },
}));

describe("members API", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns searchable paginated members", async () => {
    vi.mocked(db.forumUser.count).mockResolvedValue(25);
    vi.mocked(db.forumUser.findMany).mockResolvedValue([
      {
        id: 3,
        username: "Alice",
        avatarUrl: null,
        createdAt: new Date("2026-01-01"),
        group: {
          id: 2,
          name: "Member",
          color: "&7",
          gradient: 0,
          start: null,
          end: null,
        },
      },
    ] as never);
    const route = await import("./route");

    const response = await route.GET(
      new Request("http://localhost/api/members?q=ali&page=2"),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      page: 2,
      pageSize: 24,
      total: 25,
      totalPages: 2,
    });
    expect(db.forumUser.count).toHaveBeenCalledWith({
      where: { username: { contains: "ali" } },
    });
    expect(db.forumUser.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { username: { contains: "ali" } },
        skip: 24,
        take: 24,
      }),
    );
  });

  it("normalizes invalid pages to the first page", async () => {
    vi.mocked(db.forumUser.count).mockResolvedValue(0);
    vi.mocked(db.forumUser.findMany).mockResolvedValue([]);
    const route = await import("./route");

    const response = await route.GET(
      new Request("http://localhost/api/members?page=invalid"),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      page: 1,
      total: 0,
      totalPages: 1,
    });
  });

  it("returns a safe error when member loading fails", async () => {
    vi.mocked(db.forumUser.count).mockRejectedValue(new Error("database down"));
    const route = await import("./route");

    const response = await route.GET(new Request("http://localhost/api/members"));

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Members are currently unavailable.",
    });
  });
});

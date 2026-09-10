import { beforeEach, describe, expect, it, vi } from "vitest";
import { getCurrentUser } from "~/server/auth/utils/currentUser";
import { db } from "~/server/db";

vi.mock("~/server/auth/utils/currentUser", () => ({ getCurrentUser: vi.fn() }));
vi.mock("~/server/db", () => ({
  db: {
    $executeRaw: vi.fn(),
    $queryRaw: vi.fn(),
  },
}));

describe("forum reports API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(db.$executeRaw).mockResolvedValue(1);
  });

  it("requires authentication to submit a report", async () => {
    vi.mocked(getCurrentUser).mockResolvedValue(null);
    const route = await import("./route");

    const response = await route.POST({
      json: async () => ({ reason: "Spam", topicId: 7 }),
    } as Request);

    expect(response.status).toBe(401);
  });

  it("requires exactly one report target", async () => {
    vi.mocked(getCurrentUser).mockResolvedValue({ id: 4 });
    const route = await import("./route");

    const response = await route.POST({
      json: async () => ({ reason: "Spam", topicId: 7, replyId: 8 }),
    } as Request);

    expect(response.status).toBe(400);
    expect(db.$executeRaw).not.toHaveBeenCalled();
  });

  it("creates a report for an authenticated member", async () => {
    vi.mocked(getCurrentUser).mockResolvedValue({ id: 4 });
    vi.mocked(db.$queryRaw).mockResolvedValue([
      {
        id: 11,
        reason: "Spam",
        status: "open",
        reporterId: 4,
        topicId: 7,
        replyId: null,
        reviewedBy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    const route = await import("./route");

    const response = await route.POST({
      json: async () => ({ reason: " Spam ", topicId: 7 }),
    } as Request);

    expect(response.status).toBe(201);
    expect(db.$executeRaw).toHaveBeenCalledTimes(1);
    await expect(response.json()).resolves.toMatchObject({
      id: 11,
      reason: "Spam",
      topicId: 7,
    });
  });

  it("blocks non-staff report reads and moderation", async () => {
    vi.mocked(getCurrentUser).mockResolvedValue({
      id: 4,
      group: { team: 0, highTeam: 0 },
    });
    const route = await import("./route");

    expect((await route.GET()).status).toBe(403);
    expect(
      (
        await route.PATCH({
          json: async () => ({ id: 11, status: "resolved" }),
        } as Request)
      ).status,
    ).toBe(403);
  });

  it("updates a report for staff with a valid status", async () => {
    vi.mocked(getCurrentUser).mockResolvedValue({
      id: 9,
      group: { team: 1, highTeam: 0 },
    });
    vi.mocked(db.$queryRaw).mockResolvedValue([
      {
        id: 11,
        reason: "Spam",
        status: "resolved",
        reporterId: 4,
        topicId: 7,
        replyId: null,
        reviewedBy: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    const route = await import("./route");

    const response = await route.PATCH({
      json: async () => ({ id: 11, status: "resolved" }),
    } as Request);

    expect(response.status).toBe(200);
    expect(db.$executeRaw).toHaveBeenCalledTimes(1);
    await expect(response.json()).resolves.toMatchObject({
      id: 11,
      status: "resolved",
    });
  });
});

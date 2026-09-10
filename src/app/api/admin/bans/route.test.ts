import { beforeEach, describe, expect, it, vi } from "vitest";
import { getCurrentUser } from "~/server/auth/utils/currentUser";
import { db } from "~/server/db";

vi.mock("~/server/auth/utils/currentUser", () => ({ getCurrentUser: vi.fn() }));
vi.mock("~/server/db", () => ({
  db: {
    userBan: {
      findMany: vi.fn(),
      create: vi.fn(),
    },
  },
}));

describe("admin bans API", () => {
  beforeEach(() => vi.clearAllMocks());

  it("rejects non-staff users", async () => {
    vi.mocked(getCurrentUser).mockResolvedValue({
      id: 4,
      group: { team: 0, highTeam: 0 },
    });
    const route = await import("./route");

    expect((await route.GET()).status).toBe(403);
    expect(
      (
        await route.POST({
          json: async () => ({ bannedUUID: "uuid", reason: "Rule violation" }),
        } as Request)
      ).status,
    ).toBe(403);
  });

  it("rejects incomplete ban payloads", async () => {
    vi.mocked(getCurrentUser).mockResolvedValue({
      id: 4,
      group: { team: 1, highTeam: 0 },
    });
    const route = await import("./route");

    const response = await route.POST({
      json: async () => ({ bannedUUID: "uuid" }),
    } as Request);

    expect(response.status).toBe(400);
    expect(db.userBan.create).not.toHaveBeenCalled();
  });

  it("creates a normalized ban for staff", async () => {
    vi.mocked(getCurrentUser).mockResolvedValue({
      id: 4,
      group: { team: 1, highTeam: 0 },
    });
    vi.mocked(db.userBan.create).mockResolvedValue({
      id: 8,
      bannerUUID: "4",
      bannedUUID: "uuid",
      reason: "Rule violation",
    } as never);
    const route = await import("./route");

    const response = await route.POST({
      json: async () => ({
        bannedUUID: " uuid ",
        reason: " Rule violation ",
      }),
    } as Request);

    expect(response.status).toBe(201);
    expect(db.userBan.create).toHaveBeenCalledWith({
      data: { bannerUUID: "4", bannedUUID: "uuid", reason: "Rule violation" },
    });
  });
});

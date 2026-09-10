import { beforeEach, describe, expect, it, vi } from "vitest";
import { getCurrentUser } from "~/server/auth/utils/currentUser";
import { db } from "~/server/db";

vi.mock("~/server/auth/utils/currentUser", () => ({ getCurrentUser: vi.fn() }));
vi.mock("~/server/db", () => ({
  db: {
    $queryRaw: vi.fn(),
    $executeRaw: vi.fn(),
    $transaction: vi.fn(),
  },
}));

describe("dashboard configuration API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(db.$queryRaw).mockResolvedValue([]);
    vi.mocked(db.$executeRaw).mockResolvedValue(1);
    vi.mocked(db.$transaction).mockResolvedValue([]);
  });

  it("rejects unauthenticated reads", async () => {
    vi.mocked(getCurrentUser).mockResolvedValue(null);
    const route = await import("./route");

    expect((await route.GET()).status).toBe(401);
  });

  it("rejects non-staff updates", async () => {
    vi.mocked(getCurrentUser).mockResolvedValue({
      id: 4,
      group: { team: 0, highTeam: 0 },
    });
    const route = await import("./route");

    const response = await route.PUT({
      json: async () => ({ registrationEnabled: false }),
    } as Request);

    expect(response.status).toBe(403);
    expect(db.$transaction).not.toHaveBeenCalled();
  });

  it("returns defaults for an empty configuration", async () => {
    vi.mocked(getCurrentUser).mockResolvedValue({
      id: 4,
      group: { team: 1, highTeam: 0 },
    });
    const route = await import("./route");

    const response = await route.GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      siteName: "T3 Project",
      registrationEnabled: true,
      allowTopicCreation: true,
      allowReplies: true,
    });
  });

  it("validates and persists partial updates", async () => {
    vi.mocked(getCurrentUser).mockResolvedValue({
      id: 4,
      group: { team: 1, highTeam: 0 },
    });
    const route = await import("./route");

    const invalidResponse = await route.PUT({
      json: async () => ({ registrationEnabled: "false" }),
    } as Request);
    expect(invalidResponse.status).toBe(400);

    const response = await route.PUT({
      json: async () => ({
        registrationEnabled: false,
        allowReplies: false,
      }),
    } as Request);

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      registrationEnabled: false,
      allowReplies: false,
    });
    expect(db.$transaction).toHaveBeenCalledTimes(1);
  });
});

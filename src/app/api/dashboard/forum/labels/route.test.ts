import { beforeEach, describe, expect, it, vi } from "vitest";
import { getCurrentUser } from "~/server/auth/utils/currentUser";
import { db } from "~/server/db";

vi.mock("~/server/auth/utils/currentUser", () => ({ getCurrentUser: vi.fn() }));
vi.mock("~/server/db", () => ({
  db: {
    $queryRaw: vi.fn(),
    $executeRaw: vi.fn(),
  },
}));

describe("dashboard forum labels API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(db.$executeRaw).mockResolvedValue(1);
  });

  it("requires staff access to list labels", async () => {
    vi.mocked(getCurrentUser).mockResolvedValue({ id: 1, group: { team: 0, highTeam: 0 } });
    const route = await import("./route");

    expect((await route.GET()).status).toBe(403);
  });

  it("rejects malformed label payloads before writing", async () => {
    vi.mocked(getCurrentUser).mockResolvedValue({ id: 1, group: { team: 1, highTeam: 0 } });
    const route = await import("./route");

    const response = await route.POST({
      json: async () => ({ name: "Announcement", color: "blue" }),
    } as Request);

    expect(response.status).toBe(400);
    expect(db.$executeRaw).not.toHaveBeenCalled();
  });
});

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

describe("dashboard announcements API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(db.$executeRaw).mockResolvedValue(1);
  });

  it("rejects malformed delete IDs before writing", async () => {
    vi.mocked(getCurrentUser).mockResolvedValue({ id: 1, group: { team: 1, highTeam: 0 } });
    const route = await import("./route");

    const response = await route.DELETE({
      json: async () => ({ id: "3" }),
    } as Request);

    expect(response.status).toBe(400);
    expect(db.$executeRaw).not.toHaveBeenCalled();
  });
});

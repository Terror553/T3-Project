import { beforeEach, describe, expect, it, vi } from "vitest";
import { getCurrentUser } from "~/server/auth/utils/currentUser";
import { db } from "~/server/db";

vi.mock("~/server/auth/utils/currentUser", () => ({ getCurrentUser: vi.fn() }));
vi.mock("~/server/db", () => ({
  db: { group: { findMany: vi.fn(), create: vi.fn() } },
}));

describe("admin roles API", () => {
  beforeEach(() => vi.clearAllMocks());

  it("rejects non-team users", async () => {
    vi.mocked(getCurrentUser).mockResolvedValue({ id: 1, group: { team: 0, highTeam: 0 } });
    const route = await import("./route");
    expect((await route.GET()).status).toBe(403);
  });

  it("creates a role with normalized defaults", async () => {
    vi.mocked(getCurrentUser).mockResolvedValue({ id: 2, group: { team: 1, highTeam: 0 } });
    vi.mocked(db.group.create).mockResolvedValue({ id: 3, name: "Helper" } as never);
    const route = await import("./route");
    const response = await route.POST({ json: async () => ({ name: " Helper " }) } as Request);
    expect(response.status).toBe(201);
    expect(db.group.create).toHaveBeenCalledWith({
      data: { name: "Helper", color: "&7", priority: 999, team: 0, highTeam: 0, default: 0, gradient: 0 },
    });
  });
});

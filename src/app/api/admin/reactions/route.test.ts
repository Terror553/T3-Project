import { beforeEach, describe, expect, it, vi } from "vitest";
import { getCurrentUser } from "~/server/auth/utils/currentUser";
import { db } from "~/server/db";

vi.mock("~/server/auth/utils/currentUser", () => ({ getCurrentUser: vi.fn() }));
vi.mock("~/server/db", () => ({
  db: { forumReactionEmoji: { findMany: vi.fn(), create: vi.fn() } },
}));

describe("admin reactions API", () => {
  beforeEach(() => vi.clearAllMocks());

  it("rejects non-team users", async () => {
    vi.mocked(getCurrentUser).mockResolvedValue({ id: 1, group: { team: 0, highTeam: 0 } });
    const route = await import("./route");
    expect((await route.GET()).status).toBe(403);
  });

  it("rejects incomplete reaction payloads", async () => {
    vi.mocked(getCurrentUser).mockResolvedValue({ id: 2, group: { team: 1, highTeam: 0 } });
    const route = await import("./route");
    const response = await route.POST({ json: async () => ({ name: "like" }) } as Request);
    expect(response.status).toBe(400);
    expect((await response.json()).error).toBe("Reaction name and emoji are required");
  });
});

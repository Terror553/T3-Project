import { beforeEach, describe, expect, it, vi } from "vitest";
import { getCurrentUser } from "~/server/auth/utils/currentUser";
import { db } from "~/server/db";

vi.mock("~/server/auth/utils/currentUser", () => ({ getCurrentUser: vi.fn() }));
vi.mock("~/server/db", () => ({
  db: {
    forumReactionEmoji: {
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
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
    expect((await response.json()).error).toBe(
      "Reaction name, emoji, and negative flag are required.",
    );
  });

  it("updates a reaction for team users", async () => {
    vi.mocked(getCurrentUser).mockResolvedValue({
      id: 2,
      group: { team: 1, highTeam: 0 },
    });
    vi.mocked(db.forumReactionEmoji.update).mockResolvedValue({
      id: 7,
      name: "Helpful",
      emoji: "👍",
      negative: 0,
    } as never);
    const route = await import("./route");

    const response = await route.PUT({
      json: async () => ({ id: 7, name: " Helpful ", emoji: "👍", negative: 0 }),
    } as Request);

    expect(response.status).toBe(200);
    expect(db.forumReactionEmoji.update).toHaveBeenCalledWith({
      where: { id: 7 },
      data: { name: "Helpful", emoji: "👍", negative: 0 },
    });
  });

  it("deletes a reaction for team users", async () => {
    vi.mocked(getCurrentUser).mockResolvedValue({
      id: 2,
      group: { team: 1, highTeam: 0 },
    });
    const route = await import("./route");

    const response = await route.DELETE({
      json: async () => ({ id: 7 }),
    } as Request);

    expect(response.status).toBe(200);
    expect(db.forumReactionEmoji.delete).toHaveBeenCalledWith({ where: { id: 7 } });
  });
});

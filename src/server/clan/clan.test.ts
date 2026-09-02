import { beforeEach, describe, expect, it, vi } from "vitest";
import { db } from "~/server/db";
import { getClans } from "./clan";

vi.mock("~/server/db", () => ({
  db: { clan: { findMany: vi.fn() } },
}));

describe("clan server module", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns clans from the database", async () => {
    const clans = [{ id: 1, name: "Builders", members: 4 }];
    vi.mocked(db.clan.findMany).mockResolvedValue(clans as never);

    await expect(getClans()).resolves.toEqual(clans);
    expect(db.clan.findMany).toHaveBeenCalledWith();
  });

  it("propagates database failures", async () => {
    vi.mocked(db.clan.findMany).mockRejectedValue(new Error("database unavailable"));

    await expect(getClans()).rejects.toThrow("database unavailable");
  });
});

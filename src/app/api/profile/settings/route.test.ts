import { promises as fs } from "fs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getCurrentUser } from "~/server/auth/utils/currentUser";

vi.mock("~/server/auth/utils/currentUser", () => ({
  getCurrentUser: vi.fn(),
}));

vi.mock("fs", () => ({
  promises: {
    readFile: vi.fn(),
    writeFile: vi.fn(),
    mkdir: vi.fn(),
  },
}));

const mockedGetCurrentUser = vi.mocked(getCurrentUser);
const mockedReadFile = vi.mocked(fs.readFile);
const mockedWriteFile = vi.mocked(fs.writeFile);
const mockedMkdir = vi.mocked(fs.mkdir);

describe("profile settings route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedReadFile.mockRejectedValue(Object.assign(new Error("missing"), { code: "ENOENT" }));
    mockedWriteFile.mockResolvedValue(undefined);
    mockedMkdir.mockResolvedValue(undefined);
  });

  it("returns 401 when the user is not authenticated", async () => {
    mockedGetCurrentUser.mockResolvedValue(null);

    const route = await import("./route");
    const response = await route.GET();

    expect(response.status).toBe(401);
    const body = await response.json();
    expect(body.error).toBe("Not authenticated");
  });

  it("returns default settings for an authenticated user", async () => {
    mockedGetCurrentUser.mockResolvedValue({
      id: 12,
      username: "alice",
      avatarUrl: "/uploads/avatar.png",
    });

    const route = await import("./route");
    const response = await route.GET();

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.theme).toBe("light");
    expect(body.timezone).toBe("UTC");
    expect(body.emailNotifications).toBe(true);
    expect(body.username).toBe("alice");
    expect(body.avatarUrl).toBe("/uploads/avatar.png");
  });

  it("rejects invalid setting payloads", async () => {
    mockedGetCurrentUser.mockResolvedValue({ id: 13, username: "bob" });

    const route = await import("./route");
    const response = await route.PUT({
      json: async () => ({
        emailNotifications: "yes",
      }),
    } as Request);

    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toBe("Email notifications must be a boolean");
  });

  it("persists valid profile settings updates", async () => {
    mockedGetCurrentUser.mockResolvedValue({ id: 13, username: "bob" });
    mockedReadFile.mockResolvedValue(
      JSON.stringify({ theme: "dark", timezone: "UTC", emailNotifications: true }),
    );

    const route = await import("./route");
    const response = await route.PUT({
      json: async () => ({
        theme: "dark",
        timezone: "Europe/Berlin",
        emailNotifications: false,
      }),
    } as Request);

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.updated.theme).toBe("dark");
    expect(body.updated.timezone).toBe("Europe/Berlin");
    expect(body.updated.emailNotifications).toBe(false);
    expect(mockedMkdir).toHaveBeenCalled();
    expect(mockedWriteFile).toHaveBeenCalledWith(
      expect.stringContaining("13.json"),
      expect.stringContaining('"Europe/Berlin"'),
      "utf8",
    );
  });
});

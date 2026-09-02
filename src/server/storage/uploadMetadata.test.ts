import { beforeEach, describe, expect, it, vi } from "vitest";
import { db } from "~/server/db";
import { listUploadMetadata, saveUploadMetadata } from "./uploadMetadata";

vi.mock("~/server/db", () => ({
  db: {
    uploadMetadata: {
      create: vi.fn(),
      findMany: vi.fn(),
    },
  },
}));

const mockedCreate = vi.mocked(db.uploadMetadata.create);
const mockedFindMany = vi.mocked(db.uploadMetadata.findMany);

describe("upload metadata persistence", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("maps persisted metadata and attachment information", async () => {
    mockedCreate.mockResolvedValue({
      id: "upload-1",
      fileName: "avatar.png",
      contentType: "image/png",
      size: 128,
      publicUrl: "/uploads/avatar.png",
      storagePath: "/tmp/avatar.png",
      ownerUserId: 7,
      attachToType: "profile",
      attachToId: 7,
      createdAt: new Date("2026-09-02T20:00:00.000Z"),
    });

    const result = await saveUploadMetadata({
      fileName: "avatar.png",
      contentType: "image/png",
      size: 128,
      publicUrl: "/uploads/avatar.png",
      storagePath: "/tmp/avatar.png",
      ownerUserId: 7,
      attachTo: { type: "profile", id: 7 },
    });

    expect(result).toEqual({
      id: "upload-1",
      fileName: "avatar.png",
      contentType: "image/png",
      size: 128,
      publicUrl: "/uploads/avatar.png",
      storagePath: "/tmp/avatar.png",
      ownerUserId: 7,
      attachTo: { type: "profile", id: 7 },
      createdAt: "2026-09-02T20:00:00.000Z",
    });
    expect(mockedCreate).toHaveBeenCalledWith({
      data: {
        fileName: "avatar.png",
        contentType: "image/png",
        size: 128,
        publicUrl: "/uploads/avatar.png",
        storagePath: "/tmp/avatar.png",
        ownerUserId: 7,
        attachToType: "profile",
        attachToId: 7,
      },
    });
  });

  it("lists metadata in the persistence order", async () => {
    mockedFindMany.mockResolvedValue([]);

    await listUploadMetadata(7);

    expect(mockedFindMany).toHaveBeenCalledWith({
      where: { ownerUserId: 7 },
      orderBy: { createdAt: "desc" },
    });
  });
});

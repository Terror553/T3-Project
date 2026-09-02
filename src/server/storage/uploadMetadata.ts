import { db } from "~/server/db";

export type UploadAttachmentTarget = {
  type: string;
  id?: number | null;
};

export type UploadMetadata = {
  id: string;
  fileName: string;
  contentType: string;
  size: number;
  publicUrl: string;
  storagePath: string;
  ownerUserId: number | null;
  attachTo: UploadAttachmentTarget | null;
  createdAt: string;
};

type UploadMetadataRecord = {
  id: string;
  fileName: string;
  contentType: string;
  size: number;
  publicUrl: string;
  storagePath: string;
  ownerUserId: number | null;
  attachToType: string | null;
  attachToId: number | null;
  createdAt: Date;
};

function mapUploadMetadata(record: UploadMetadataRecord): UploadMetadata {
  return {
    id: record.id,
    fileName: record.fileName,
    contentType: record.contentType,
    size: record.size,
    publicUrl: record.publicUrl,
    storagePath: record.storagePath,
    ownerUserId: record.ownerUserId,
    attachTo: record.attachToType
      ? { type: record.attachToType, id: record.attachToId }
      : null,
    createdAt: record.createdAt.toISOString(),
  };
}

export async function saveUploadMetadata(input: {
  fileName: string;
  contentType: string;
  size: number;
  publicUrl: string;
  storagePath: string;
  ownerUserId?: number | null;
  attachTo?: UploadAttachmentTarget | null;
}): Promise<UploadMetadata> {
  const record = await db.uploadMetadata.create({
    data: {
      fileName: input.fileName,
      contentType: input.contentType,
      size: input.size,
      publicUrl: input.publicUrl,
      storagePath: input.storagePath,
      ownerUserId: input.ownerUserId ?? null,
      attachToType: input.attachTo?.type ?? null,
      attachToId: input.attachTo?.id ?? null,
    },
  });

  return mapUploadMetadata(record);
}

export async function listUploadMetadata(ownerUserId?: number | null): Promise<UploadMetadata[]> {
  const records = await db.uploadMetadata.findMany({
    where: ownerUserId == null ? undefined : { ownerUserId },
    orderBy: { createdAt: "desc" },
  });

  return records.map((record) => mapUploadMetadata(record));
}

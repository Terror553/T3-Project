import { promises as fs } from "fs";
import path from "path";

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
  ownerUserId?: number | null;
  attachTo?: UploadAttachmentTarget | null;
  createdAt: string;
};

const STORAGE_DIR = path.join(process.cwd(), "data", "uploads");
const METADATA_FILE = path.join(STORAGE_DIR, "index.json");

async function readMetadataIndex(): Promise<Record<string, UploadMetadata>> {
  try {
    const raw = await fs.readFile(METADATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<Record<string, UploadMetadata>>;
    return parsed && typeof parsed === "object" ? (parsed as Record<string, UploadMetadata>) : {};
  } catch (error: unknown) {
    const maybeNodeError = error as { code?: string };
    if (maybeNodeError.code !== "ENOENT") {
      console.error("Failed to read upload metadata index:", error);
    }
    return {};
  }
}

async function writeMetadataIndex(index: Record<string, UploadMetadata>) {
  await fs.mkdir(STORAGE_DIR, { recursive: true });
  await fs.writeFile(METADATA_FILE, JSON.stringify(index, null, 2), "utf8");
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
  const index = await readMetadataIndex();
  const id = `upload-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const metadata: UploadMetadata = {
    id,
    fileName: input.fileName,
    contentType: input.contentType,
    size: input.size,
    publicUrl: input.publicUrl,
    storagePath: input.storagePath,
    ownerUserId: input.ownerUserId ?? null,
    attachTo: input.attachTo ?? null,
    createdAt: new Date().toISOString(),
  };

  index[metadata.id] = metadata;
  await writeMetadataIndex(index);
  return metadata;
}

export async function listUploadMetadata(ownerUserId?: number | null): Promise<UploadMetadata[]> {
  const index = await readMetadataIndex();
  const entries = Object.values(index);

  if (ownerUserId == null) {
    return entries;
  }

  return entries.filter((entry) => entry.ownerUserId === ownerUserId);
}

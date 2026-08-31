import fs from "fs/promises";
import path from "path";

export type SaveResult = { url: string; path: string };

export interface StorageAdapter {
  saveFile(filename: string, content: Buffer): Promise<SaveResult>;
}

class LocalStorageAdapter implements StorageAdapter {
  private basePath: string;
  private publicUrlBase: string;

  constructor() {
    // store files under <projectRoot>/public/uploads
    this.basePath = path.join(process.cwd(), "public", "uploads");
    this.publicUrlBase = "/uploads"; // relative URL base served by Next.js static files
  }

  async saveFile(filename: string, content: Buffer): Promise<SaveResult> {
    await fs.mkdir(this.basePath, { recursive: true });
    // sanitize filename: remove path segments
    const safeName = path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, "-");
    const unique = `${Date.now()}-${Math.random().toString(36).slice(2,8)}-${safeName}`;
    const dest = path.join(this.basePath, unique);
    await fs.writeFile(dest, content);
    const url = `${this.publicUrlBase}/${unique}`;
    return { url, path: dest };
  }
}

const adapter = new LocalStorageAdapter();
export default adapter;

import { db } from "~/server/db";
import type { Clan } from "~/server/types/clan";

export async function getClans(): Promise<Clan[]> {
  const clans = await db.clan.findMany();
  return clans as Clan[];
}

import { db } from "~/server/db";
import type { Group } from "~/server/types/role";

export async function getDefaultRole(): Promise<Group> {
  const role = await db.groups.findFirst({
    where: {
      default: 1,
    },
  });

  if (!role) {
    const defaultRole = await db.groups.create({
      data: {
        name: "Spieler",
        default: 1,
        color: "&7",
        priority: 999,
        high_team: 0,
        team: 0,
        gradient: 0,
      },
    });
    return defaultRole as Group;
  }

  return role as Group;
}

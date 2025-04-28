import { db } from "~/server/db";

export async function getDefaultRole() {
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
      },
    });
    return defaultRole;
  }
  return role;
}

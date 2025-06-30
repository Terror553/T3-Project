import { db } from "~/server/db";

export async function getDefaultRole() {
  const role = await db.group.findFirst({
    where: {
      default: 1,
    },
  });
  if (!role) {
    const defaultRole = await db.group.create({
      data: {
        name: "Spieler",
        default: 1,
        color: "&7",
        priority: 999,
        highTeam: 0,
        team: 0,
      },
    });
    return defaultRole;
  }
  return role;
}

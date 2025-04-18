import { cookies } from "next/headers";
import { getUserFromSession } from "../session";
import { db } from "~/server/db";

export type fullUser = {
  groups: {
    id: number;
    default: number;
    name: string;
    color: string;
    team: number;
    high_team: number;
    priority: number;
    gradient: number;
    start: string | null;
    end: string | null;
  } | null;
} & {
  id: number;
  username: string;
  email: string;
  password: string;
  salt: string;
  userAuthToken: string | null;
  avatar_url: string;
  banner_url: string;
  signature: string;
  createdAt: Date;
  updatedAt: Date;
  roleId: number | null;
  user_id: number | null;
};

export async function getCurrentUser() {
  const user = await getUserFromSession(await cookies());

  if (user == null) {
    return null;
  }

  const fullUser = await getUserFromDb(user.id);
  // This should never happen
  if (fullUser == null) return null;
  return fullUser;
}

async function getUserFromDb(id: number) {
  return await db.forum_user.findUnique({
    where: {
      id,
    },
    include: {
      groups: true,
    },
  });
}

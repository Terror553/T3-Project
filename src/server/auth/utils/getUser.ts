import { db } from "~/server/db";

export async function getUser(id: number) {
  const fullUser = await db.forum_user.findFirst({
    where: {
      id: id,
    },
    include: {
      groups: true,
      forum_topics: true,
      profile_wall_replies: true,
      profile_wall_profile_wall_profileIdIdToforum_user: true,
      profile_wall_profile_wall_userIdToforum_user: true,
    },
  });

  if (fullUser == null) {
    return null;
  }

  // This should never happen
  if (fullUser == null) return null;
  if (!fullUser.groups) return null;

  return fullUser;
}

import { db } from "../db";

export type nav = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  icon: string;
  full_link: string;
  authorId: number | null;
  team_link: number;
}[];

export async function getNavigation() {
  const navigation = await db.forum_navigation.findMany();

  if (!navigation || navigation.length == 0) {
    return [
      {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "Home",
        icon: "fa-home",
        full_link: "/",
        authorId: null,
        team_link: 0,
      },
    ];
  }

  return navigation;
}

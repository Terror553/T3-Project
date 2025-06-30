import { db } from "../db";
import type { NavigationProps } from "../types/navigation";

export type nav = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  icon: string;
  fullLink: string;
  authorId: number | null;
  teamLink: number;
}[];

export async function getNavigation() {
  const navigation = await db.forumNavigation.findMany();
  console.log("Navigation fetched:", navigation);

  if (!navigation || navigation.length == 0) {
    return [
      {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "Home",
        icon: "fa-home",
        fullLink: "/",
        authorId: null,
        teamLink: 0,
      },
    ];
  }

  return navigation;
}

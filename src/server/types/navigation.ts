import type { User } from "./user";

export interface NavItem {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  icon: string;
  full_link: string;
  authorId: number | null;
  team_link: number;
}

export interface NavigationProps {
  navigation: NavItem[];
  user?: User;
}

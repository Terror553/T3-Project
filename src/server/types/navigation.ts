import type { User } from "./user";

export interface NavItem {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  icon: string;
  fullLink: string;
  authorId: number | null;
  teamLink: number;
}

export interface NavigationProps {
  navigation: NavItem[];
  user?: User;
}

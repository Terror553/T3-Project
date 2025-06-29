import type { User } from "./user";
import type { ForumNavigation } from "./forum";

/**
 * Navigation item type based on ForumNavigation
 */
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

/**
 * Legacy NavItem for backward compatibility
 */
export interface LegacyNavItem {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  icon: string;
  full_link: string;
  authorId: number | null;
  team_link: number;
}

/**
 * Navigation props for components
 */
export interface NavigationProps {
  navigation: (NavItem | LegacyNavItem)[];
  user?: User;
}

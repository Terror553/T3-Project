/**
 * Wiki-related type definitions based on Prisma schema
 */
import type { FullTimestampedModel } from "./base";
import type { ForumUser } from "./user";

/**
 * Type for wiki categories
 */
export interface WikiCategory extends FullTimestampedModel {
  name: string;
  icon: string;
  dropdown: number;
  content: string | null;
  authorId: number | null;

  // Relations
  author?: ForumUser | null;
  subcategories?: WikiSubCategory[];
}

/**
 * Type for wiki subcategories
 */
export interface WikiSubCategory extends FullTimestampedModel {
  name: string;
  categoryId: number | null;
  content: string;
  authorId: number | null;
  icon: string | null;

  // Relations
  author?: ForumUser | null;
  category?: WikiCategory | null;
}

/**
 * Full wiki category with all related data
 */
export interface WikiCategoryFull {
  id: number;
  content: string;
  dropdown: number;
  forum_user: {
    avatar_url: string;
    username: string;
    groups: {
      color: string;
      name: string;
      id: number;
      gradient: number;
      team: number;
      high_team: number;
      start: string;
      end: string;
    };
  };
  createdAt: Date;
  icon: string;
  updatedAt: Date;
  name: string;
  wiki_sub_categories: Array<{
    content: string;
    id: number;
    icon: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    forum_user: {
      avatar_url: string;
      username: string;
      groups: {
        color: string;
        name: string;
        id: number;
        gradient: number;
        team: number;
        high_team: number;
        start: string;
        end: string;
      };
    };
  }>;
}

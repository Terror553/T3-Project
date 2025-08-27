export interface WikiCategory {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  icon: string;
  dropdown: number;
  content: string | null;
  authorId: number | null;
  subcategories?: WikiSubCategory[];
}

export interface WikiSubCategory {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  categoryId: number | null;
  content: string;
  authorId: number | null;
  icon: string | null;
  category?: WikiCategory | null;
}

export type WikiCategoryFull = {
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
};

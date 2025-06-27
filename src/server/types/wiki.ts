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

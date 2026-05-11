export interface NavItem {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  icon: string;
  fullLink: string;
  authorId: number | null;
  teamLink: number;
  dropdown?: NavItem[];
}

export interface SubNavItem {
  id: number;
  name: string;
  icon: string;
  fullLink: string;
  dropdown?: SubNavItem[];
}

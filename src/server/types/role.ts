export interface RoleObj {
  id: number;
  default: number;
  name: string;
  color: string;
  team: number;
  high_team: number;
  priority: number;
  gradient: number;
  start: string | null;
  end: string | null;
}

export interface Role {
  groups: RoleObj | null;
}

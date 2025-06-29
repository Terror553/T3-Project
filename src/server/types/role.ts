/**
 * User and role type definitions based on Prisma schema
 */
import type { BaseModel, UuidModel } from "./base";

/**
 * Type for groups (roles)
 */
export interface Group extends BaseModel {
  name: string;
  color: string;
  default: number;
  team: number;
  high_team: number; // Using snake_case to match database
  priority: number;
  gradient: number;
  start: string | null;
  end: string | null;

  // Optional relations
  forumUsers?: ForumUser[];
  userGroups?: UserGroup[];
}
/**
 * Alias for Group for backward compatibility
 */
export type RoleObj = Group;

/**
 * Type for role with simplified structure
 */
export interface Role {
  groups: RoleObj | null;
}

/**
 * Type for user groups mapping
 */
export interface UserGroup extends BaseModel {
  uuid: string;
  groupId: number;

  // Relations
  group?: Group;
}

/**
 * Type for MC server users
 */
export interface User extends BaseModel, UuidModel {
  clan: string | null;
  money: number;
  firstJoined: Date;
  lastJoined: Date;
  playtime: bigint;
  forumId: number | null;

  // Relations
  forumUser?: ForumUser | null;
  userPermissions?: UserPermission[];
}

/**
 * Type for user permissions
 */
export interface UserPermission extends BaseModel {
  uuid: string;
  userId: number;
  permission: string;
  permissionActivated: boolean;

  // Relations
  user?: User;
}

/**
 * Type for user bans
 */
export interface UserBan extends BaseModel {
  bannerUUID: string;
  bannedUUID: string;
  reason: string;
}

/**
 * Type for user name colors
 */
export interface UserNameColor extends BaseModel {
  uuid: string | null;
  colour: string | null;
}

/**
 * Type for user tags
 */
export interface UserTag extends BaseModel {
  uuid: string | null;
  tagId: number | null;
}

/**
 * Type for jobs
 */
export interface Job extends BaseModel {
  name: string | null;
  description: string | null;

  // Relations
  userJobs?: UserJob[];
}

/**
 * Type for user jobs
 */
export interface UserJob extends BaseModel {
  uuid: string | null;
  jobId: number | null;

  // Relations
  job?: Job | null;
}

/**
 * Type for tags
 */
export interface Tag extends BaseModel {
  tag: string;
}

/**
 * Type for name colors
 */
export interface NameColor extends BaseModel {
  colour: string | null;
}

/**
 * Type for permissions
 */
export interface Permission extends BaseModel {
  permission: string;
  permissionActivated: number;
}

// Forward reference for ForumUser
export interface ForumUser extends BaseModel {}

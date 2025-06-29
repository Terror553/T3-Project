/**
 * Game-related type definitions based on Prisma schema
 */
import type { BaseModel, UuidModel } from "./base";

/**
 * Type for clans
 */
export interface Clan extends BaseModel, UuidModel {
  name: string;
  tag: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Type for cooldowns
 */
export interface Cooldown extends BaseModel {
  uuid: string;
  cooldown_name: string;
  expiry_time: bigint;
}

/**
 * Type for ender chests
 */
export interface EnderChest extends BaseModel {
  uuid: string;
  level: number;
}

/**
 * Type for kits
 */
export interface Kit extends BaseModel {
  name: string | null;
  permission: string | null;
  cooldown: bigint | null;
}

/**
 * Type for lucky block locations
 */
export interface LuckyBlockLocation extends BaseModel {
  location: string;
}

/**
 * Type for lucky block rewards
 */
export interface LuckyBlockReward extends BaseModel {
  uuid: string | null;
  reward: string | null;
  effect: boolean | null;
}

/**
 * Type for warps
 */
export interface Warp extends BaseModel {
  uuid: string | null;
  location: string | null;
  name: string | null;
}

/**
 * Type for vanish status
 */
export interface Vanish extends BaseModel {
  uuid: string;
}

/**
 * Type for profile banners
 */
export interface ProfileBanner extends BaseModel {
  name: string;
  url: string;
}

/**
 * Type for user table (generic user model)
 */
export interface UserTable extends BaseModel {
  name: string;
  age: number;
  email: string;
}

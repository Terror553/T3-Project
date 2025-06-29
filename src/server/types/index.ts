/**
 * Index file for type definitions
 *
 * Note: Due to potential circular dependencies and type naming conflicts,
 * it's recommended to import types directly from their respective files
 * rather than using this index file.
 *
 * This file serves as documentation of available type modules.
 */

/**
 * Available type modules:
 *
 * - base.ts: Common base interfaces and utility types
 * - forum.ts: Forum-related types (categories, topics, reactions, etc.)
 * - user.ts: User-related types
 * - role.ts: Role and permission-related types
 * - game.ts: Game-specific types (clans, kits, warps, etc.)
 * - wiki.ts: Wiki-related types
 * - profile.ts: Profile-related types (walls, replies, banners)
 * - server.ts: Server and console-related types
 * - navigation.ts: Navigation-related types
 * - db.ts: Database selection helper types
 */

// Export only the base types to avoid naming conflicts
export * from "./base";

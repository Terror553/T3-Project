/**
 * Base type definitions that are shared across multiple domains
 */

/**
 * Common properties for all models with basic ID and timestamps
 */
export interface BaseModel {
  id: number;
}

/**
 * Models with creation timestamp
 */
export interface TimestampedModel extends BaseModel {
  createdAt: Date;
}

/**
 * Models with creation and update timestamps
 */
export interface FullTimestampedModel extends TimestampedModel {
  updatedAt: Date;
}

/**
 * Models with UUID identification
 */
export interface UuidModel {
  uuid: string;
}

/**
 * Common relationship types
 */
export type Relation<T> = T | null;
export type Relations<T> = T[];

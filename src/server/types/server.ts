/**
 * Server and console-related type definitions based on Prisma schema
 */
import type { BaseModel } from "./base";

/**
 * Type for console logs
 */
export interface ConsoleLog extends BaseModel {
  message: string;
}

/**
 * Type for MC server settings
 */
export interface McServerSetting extends BaseModel {
  motdLine1: string;
  motdLine2: string;
  maxPlayers: number;
}

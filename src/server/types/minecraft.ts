export interface ConsoleLog {
  id: number;
  message: string;
}

export interface Cooldown {
  id: number;
  uuid: string;
  cooldown_name: string;
  expiry_time: bigint;
}

export interface EnderChest {
  id: number;
  uuid: string;
  level: number;
}
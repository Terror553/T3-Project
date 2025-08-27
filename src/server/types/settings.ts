export interface Kit {
  id: number;
  name: string | null;
  permission: string | null;
  cooldown: bigint | null;
}

export interface LuckyBlockLocation {
  id: number;
  location: string;
}

export interface LuckyBlockReward {
  id: number;
  uuid: string | null;
  reward: string | null;
  effect: boolean | null;
}

export interface McServerSetting {
  id: number;
  motdLine1: string;
  motdLine2: string;
  maxPlayers: number;
}

export interface NameColor {
  id: number;
  colour: string | null;
}

export interface Permission {
  id: number;
  permission: string;
  permissionActivated: number;
}

export interface Tag {
  id: number;
  tag: string;
}
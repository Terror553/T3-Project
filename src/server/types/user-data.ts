export interface Job {
  id: number;
  name: string | null;
  description: string | null;
  userJobs?: UserJob[];
}

export interface UserJob {
  id: number;
  uuid: string | null;
  jobId: number | null;
  job?: Job | null;
}

export interface UserNameColor {
  id: number;
  uuid: string | null;
  colour: string | null;
}

export interface UserPermission {
  id: number;
  uuid: string;
  userId: number;
  permission: string;
  permissionActivated: boolean;
}

export interface UserTag {
  id: number;
  uuid: string | null;
  tagId: number | null;
}

export interface UserBan {
  id: number;
  bannerUUID: string;
  bannedUUID: string;
  reason: string;
}

export interface Vanish {
  id: number;
  uuid: string;
}

export interface Warp {
  id: number;
  uuid: string | null;
  location: string | null;
  name: string | null;
}
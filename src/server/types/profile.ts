export interface ProfileBanner {
  id: number;
  name: string;
  url: string;
}

export interface ProfileWall {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number | null;
  profileId: number | null;
  replies?: ProfileWallReply[];
}

export interface ProfileWallReply {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number | null;
  postId: number | null;
}
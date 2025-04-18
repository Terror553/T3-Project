import type { SessionOptions } from "iron-session";

export interface SessionData {
  id?: number;
  username?: string;
  email?: string;
  avatar_url?: string;
  banner_url?: string;
  signature?: string;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
  role?: {
    id?: number;
    name?: string;
    color?: string;
    default?: boolean;
    team?: boolean;
    high_team?: boolean;
    priority?: number;
    gradient?: boolean;
    start?: string | null;
    end?: string | null;
  };
  user_id?: {
    id?: number;
  };
  isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.AUTH_SECRET!,
  cookieName: "session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};

export const defaultSession: SessionData = {
  isLoggedIn: false,
};

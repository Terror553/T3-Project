"use client";

import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  type ReactNode 
} from "react";
import type { ForumUser } from "~/server/types/forum";

interface UserContextType {
  user: ForumUser | null;
  isLoading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
  updateUser: (user: ForumUser | null) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  error: null,
  refreshUser: async () => {},
  updateUser: () => {},
});

interface UserProviderProps {
  children: ReactNode;
  initialUser: ForumUser | null;
}

export function UserProvider({ 
  children, 
  initialUser 
}: UserProviderProps) {
  const [user, setUser] = useState<ForumUser | null>(initialUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshUser = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch("/api/auth/user");
      
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      
      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      console.error("Error refreshing user:", err);
      setError("Failed to refresh user data");
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (newUser: ForumUser | null) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        isLoading, 
        error, 
        refreshUser, 
        updateUser 
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
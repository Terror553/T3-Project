"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  showLoadingBar: (id: string) => void;
  hideLoadingBar: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true,
  toggleTheme: () => {},
  showLoadingBar: () => {},
  hideLoadingBar: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
  initialDarkMode?: boolean;
}

export function ThemeProvider({ 
  children,
  initialDarkMode = true 
}: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(initialDarkMode);
  const [activeLoadingBars, setActiveLoadingBars] = useState<Record<string, boolean>>({});

  // Apply theme on initial load and changes
  useEffect(() => {
    const htmlElement = document.documentElement;
    
    if (isDarkMode) {
      htmlElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      htmlElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Load theme from localStorage on initial mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);
  
  // Handle loading bar visibility
  useEffect(() => {
    const loadingBar = document.querySelector(".loading-bar");
    if (!loadingBar) return;
    
    const hasActiveBar = Object.values(activeLoadingBars).some(isActive => isActive);
    
    if (hasActiveBar) {
      loadingBar.classList.add("loading");
    } else {
      loadingBar.classList.remove("loading");
    }
  }, [activeLoadingBars]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };
  
  const showLoadingBar = (id: string) => {
    setActiveLoadingBars(prev => ({
      ...prev,
      [id]: true
    }));
  };
  
  const hideLoadingBar = (id: string) => {
    setActiveLoadingBars(prev => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  };

  return (
    <ThemeContext.Provider value={{ 
      isDarkMode, 
      toggleTheme,
      showLoadingBar,
      hideLoadingBar
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
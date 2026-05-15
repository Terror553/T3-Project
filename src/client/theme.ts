"use client";

import { useCallback } from "react";

let loadingBars: string[] = [];

export function useTheme() {
  const showLoadingBar = useCallback((loadingBarName: string) => {
    if (typeof window !== "undefined") {
      const loadingBarElement = document.querySelector(".loading-bar");
      if (!loadingBarElement) return;
      loadingBars.push(loadingBarName);
      loadingBarElement.classList.add("active");
    }
  }, []);

  const hideLoadingBar = useCallback((loadingBarName: string) => {
    if (typeof window !== "undefined") {
      const loadingBarElement = document.querySelector(".loading-bar");
      if (loadingBarElement) {
        loadingBars = loadingBars.filter((lb) => lb !== loadingBarName);
        if (loadingBars.length === 0) {
          loadingBarElement.classList.remove("active");
        }
      }
    }
  }, []);

  const copy = useCallback(async (elementSelector: string) => {
    const element = document.querySelector(elementSelector);
    if (!element?.textContent) return;
    try {
      await navigator.clipboard.writeText(element.textContent);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }, []);

  const isDarkMode = useCallback(() => {
    return document.documentElement.classList.contains("dark");
  }, []);

  const toggleTheme = useCallback(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark");
      const isDark = isDarkMode();
      localStorage.setItem("theme", isDark ? "dark" : "light");
    }
  }, [isDarkMode]);

  return { showLoadingBar, hideLoadingBar, copy, isDarkMode, toggleTheme };
}

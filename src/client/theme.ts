"use client";

let loadingBars: string[] = [];

export function useTheme() {
  function showLoadingBar(loadingBarName: string) {
    if (typeof window !== "undefined") {
      const loadingBarElement = document.querySelector(".loading-bar");
      if (!loadingBarElement) {
        return;
      }
      if (loadingBarElement) {
        loadingBars.push(loadingBarName);
        loadingBarElement.classList.add("active");
      } else {
      }
    }
  }

  function hideLoadingBar(loadingBarName: string) {
    if (typeof window !== "undefined") {
      const loadingBarElement = document.querySelector(".loading-bar");
      if (loadingBarElement) {
        loadingBars = loadingBars.filter(
          (loadingBar) => loadingBar !== loadingBarName,
        );
        if (loadingBars.length === 0) {
          loadingBarElement.classList.remove("active");
        }
      }
    }
  }

  async function copy(elementSelector: string) {
    const element = document.querySelector(elementSelector);
    if (!element?.textContent) return;
    
    try {
      await navigator.clipboard.writeText(element.textContent);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }

  function isDarkMode() {
    return document.documentElement.classList.contains("dark");
  }

  function toggleTheme() {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark");
      const isDark = isDarkMode();
      localStorage.setItem("theme", isDark ? "dark" : "light");
    }
  }

  return { showLoadingBar, hideLoadingBar, copy, isDarkMode, toggleTheme };
}
"use client";

import { useTheme } from "~/client/theme";

export function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDarkMode() ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode() ? (
        <i className="fas fa-sun"></i>
      ) : (
        <i className="fas fa-moon"></i>
      )}
    </button>
  );
}

import type { CSSProperties } from "react";

export interface ColorOptions {
  color: string;
  gradient: number;
  start?: string;
  end?: string;
  isBadge: boolean;
}

/**
 * Generates CSS styles for consistent color application based on provided options
 */
export function replaceColor({
  color,
  gradient,
  start,
  end,
  isBadge,
}: ColorOptions): CSSProperties {
  if (!color) {
    return {};
  }

  // Default styles
  const baseStyles: CSSProperties = {
    color: color,
  };

  // Add gradient if applicable
  if (gradient === 1 && start && end) {
    if (isBadge) {
      return {
        ...baseStyles,
        background: `linear-gradient(to right, ${start}, ${end})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      };
    } else {
      return {
        ...baseStyles,
        background: `linear-gradient(to right, ${start}, ${end})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-block",
      };
    }
  }

  return baseStyles;
}
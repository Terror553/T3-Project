import type { CSSProperties } from "react";
import { minecraftColorToRGB } from "~/server/utils/colorUtils";

export interface ColorOptions {
  color: string | null | undefined;
  gradient: number | null | undefined;
  start?: string | null | undefined;
  end?: string | null | undefined;
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

  baseStyles.color = minecraftColorToRGB(color);

  // Add gradient if applicable
  if (gradient === 1 && start && end) {
    if (isBadge) {
      return {
        WebkitBackgroundClip: "text",

        background: `linear-gradient(to right, ${start}, ${end})`,
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

/**
 * Convert Minecraft color codes to RGB hex values
 */
export function minecraftColorToRGB(minecraftColor: string): string {
  const colorMap: Record<string, string> = {
    "&0": "#000000", // Black
    "&1": "#0000AA", // Dark Blue
    "&2": "#00AA00", // Dark Green
    "&3": "#00AAAA", // Dark Aqua
    "&4": "#AA0000", // Dark Red
    "&5": "#AA00AA", // Dark Purple
    "&6": "#FFAA00", // Gold
    "&7": "#AAAAAA", // Gray
    "&8": "#555555", // Dark Gray
    "&9": "#5555FF", // Blue
    "&a": "#55FF55", // Green
    "&b": "#55FFFF", // Aqua
    "&c": "#FF5555", // Red
    "&d": "#FF55FF", // Light Purple
    "&e": "#FFFF55", // Yellow
    "&f": "#FFFFFF", // White
  };

  return colorMap[minecraftColor] ?? "#AAAAAA"; // Default to gray if not found
}

/**
 * Check if a string is a valid Minecraft color code
 */
function isMinecraftColorCode(input: string): boolean {
  const regex = /^&[0-9a-fA-F]$/;
  return regex.test(input);
}

/**
 * Convert ASCII color codes to Minecraft color codes
 */
export function replaceAsciiWithMinecraftColor(input: string): string {
  const asciiToMinecraftMap: Record<string, string> = {
    "0;31;22": "&4", // Dark Red
    "0;35;22": "&5", // Purple
    "0;33;22": "&6", // Gold (Orange)
    "0;37;22": "&7", // Light Gray
    "0;30;1": "&8", // Dark Gray
    "0;34;1": "&9", // Blue
    "0;32;1": "&2", // Dark Green
    "0;36;1": "&b", // Aqua (Cyan)
    "0;31;1": "&c", // Red
    "0;35;1": "&d", // Pink
    "0;33;1": "&e", // Yellow
    "0;37;1": "&f", // White
  };

  const regex = /\[(\\d+;\\d+;\\d+)m/g;
  return input.replace(regex, (_, color: string) => {
    const minecraftColor = asciiToMinecraftMap[color] ?? null;
    if (!minecraftColor) return "";
    const rgbColor = minecraftColorToRGB(minecraftColor);
    return `<span style="color: ${rgbColor}">`;
  });
}

/**
 * Replace Minecraft color codes in a string with their RGB equivalents
 */
export function replaceMinecraftColors(input: string): string {
  const regex = /&[0-9a-fA-Fklmnor]/g;
  return input.replace(regex, (match) => {
    const minecraftColor = minecraftColorToRGB(match);
    return `${minecraftColor}`;
  });
}

/**
 * Generate styles for elements based on color configuration
 * @deprecated Use styleUtils.replaceColor instead
 */
export function replaceColor(colorCode: {
  color: string | undefined;
  gradient: number | undefined;
  start: string | undefined | null;
  end: string | undefined | null;
  isBadge: boolean;
}): {
  background?: string;
  WebkitBackgroundClip?: string;
  WebkitTextFillColor?: string;
  color?: string;
  backgroundColor?: string;
  display?: string;
} {
  if (!colorCode.color) {
    return { color: "#AAAAAA" }; // Default gray
  }

  // Handle gradient
  if (colorCode.gradient === 1 && colorCode.start && colorCode.end) {
    if (colorCode.isBadge) {
      return {
        background: `linear-gradient(to right, #${colorCode.start}, #${colorCode.end})`,
        color: "white",
      };
    }
    return {
      background: `linear-gradient(to right, #${colorCode.start}, #${colorCode.end})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      display: "inline-block",
    };
  }

  // Handle solid colors
  if (isMinecraftColorCode(colorCode.color)) {
    if (colorCode.isBadge) {
      return {
        backgroundColor: minecraftColorToRGB(colorCode.color),
        color: "white",
      };
    }
    return {
      color: minecraftColorToRGB(colorCode.color),
    };
  }

  // Direct color string
  if (colorCode.isBadge) {
    return {
      backgroundColor: colorCode.color,
      color: "white",
    };
  }
  return {
    color: colorCode.color,
  };
}
export function minecraftColorToRGB(minecraftColor: string): string {
  const colorMap: Record<string, string> = {
    "&4": "#aa0000", // Dark Red
    "&5": "#aa00aa", // Purple
    "&6": "#ffaa00", // Gold (Orange)
    "&7": "#aaaaaa", // Light Gray
    "&8": "#555555", // Dark Gray
    "&9": "#5555ff", // Blue
    "&2": "#00aa00", // Dark Green
    "&b": "#55ffff", // Aqua (Cyan)
    "&c": "#ff5555", // Red
    "&d": "#ff55ff", // Pink
    "&e": "#ffff55", // Yellow
    "&f": "#ffffff", // White
  };

  return colorMap[minecraftColor] ?? "#aaaaaa";
}

const colorMap: Record<string, string> = {
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

export function replaceAsciiWithMinecraftColor(input: string): string {
  const regex = /\[(\d+;\d+;\d+)m/g;
  return input.replace(regex, (_, color: string) => {
    const minecraftColor = colorMap[color] ?? null; // Get the Minecraft color code from the map
    if (!minecraftColor) return ""; // If no match, return empty string
    const rgbColor = minecraftColorToRGB(minecraftColor);
    return `<span style="color: ${rgbColor}">`;
  });
}

export function replaceMinecraftColors(input: string) {
  const regex = /&[0-9a-fA-Fklmnor]/g;
  return input.replace(regex, (match) => {
    const minecraftColor = minecraftColorToRGB(match);
    return `${minecraftColor}`;
  });
}

function isMinecraftColorCode(input: string): boolean {
  const regex = /^&[0-9a-fA-F]$/;
  return regex.test(input);
}

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
} {
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

  if (!colorCode.color) {
    return { color: colorMap["&7"] ?? "#AAAAAA" };
  }

  if (colorCode.gradient) {
    const start = colorCode.start;
    const end = colorCode.end;
    if (start && end) {
      if (colorCode.isBadge) {
        return {
          background: `-webkit-linear-gradient(0deg, #${start} 0%, #${end} 100%)`,
          color: "white",
        };
      }
      return {
        background: `-webkit-linear-gradient(0deg, #${start} 0%, #${end} 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      };
    }
  } else {
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
  }
  return { color: colorMap["&7"] ?? "#AAAAAA" }; // Default color if no match found
}

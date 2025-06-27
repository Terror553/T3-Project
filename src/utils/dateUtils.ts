/**
 * Format a date with consistent options
 * 
 * @param date - The date to format
 * @param includeTime - Whether to include the time in the formatted date
 * @returns Formatted date string
 */
export function formatDate(date: Date | string, includeTime = false): string {
  if (!date) return "Unknown date";
  
  // Ensure we have a Date object
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  // Options for formatting
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...(includeTime ? { hour: "2-digit", minute: "2-digit" } : {})
  };
  
  return new Intl.DateTimeFormat("de-DE", options).format(dateObj);
}

/**
 * Get a relative time string (e.g., "2 days ago")
 * 
 * @param date - The date to format
 * @returns Relative time string
 */
export function getRelativeTime(date: Date | string): string {
  if (!date) return "Unknown date";
  
  // Ensure we have a Date object
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  if (diffSec < 60) {
    return "just now";
  } else if (diffMin < 60) {
    return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;
  } else if (diffHour < 24) {
    return `${diffHour} hour${diffHour === 1 ? "" : "s"} ago`;
  } else if (diffDay < 30) {
    return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;
  } else {
    return formatDate(dateObj, false);
  }
}
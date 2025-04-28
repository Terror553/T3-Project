export const getRelativeTime = (date: Date) => {
  const now = Date.now();
  const diff = date.getTime() - now;
  const seconds = Math.abs(Math.floor(diff / 1000));
  const minutes = Math.abs(Math.floor(seconds / 60));
  const hours = Math.abs(Math.floor(minutes / 60));
  const days = Math.abs(Math.floor(hours / 24));
  const years = Math.abs(Math.floor(days / 365));

  if (Math.abs(diff) < 1000) return "jetzt gerade";

  const isFuture = diff > 0;

  if (years > 0)
    return `${isFuture ? "in " : ""}${years} ${years === 1 ? "jahr" : "jahre"}${
      isFuture ? "" : " her"
    }`;
  if (days > 0)
    return `${isFuture ? "in " : ""}${days} ${days === 1 ? "tag" : "tage"}${
      isFuture ? "" : " her"
    }`;
  if (hours > 0)
    return `${isFuture ? "in " : ""}${hours} ${
      hours === 1 ? "stunde" : "stunden"
    }${isFuture ? "" : " her"}`;
  if (minutes > 0)
    return `${isFuture ? "in " : ""}${minutes} ${
      minutes === 1 ? "minute" : "minuten"
    }${isFuture ? "" : " her"}`;
  return `${isFuture ? "in " : ""}${seconds} ${
    seconds === 1 ? "sekunde" : "sekunden"
  }${isFuture ? "" : " her"}`;
};

export const formatDate = (
  date: Date,
  relative: boolean | null,
): string | undefined => {
  try {
    date = new Date(date);
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.error("Invalid Date object provided:", date);
      return "Invalid Date";
    }

    if (!relative) {
      return getRelativeTime(date);
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");

    return `${day}.${month}.${year}, ${hour}:${minute}:${second}`;
  } catch (error) {
    console.error("Error in formatDate:", error);
    return "Invalid Date";
  }
};

export const getMonth = (date: Date): string => {
  try {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error("Invalid Date object provided");
    }

    const germanMonths = [
      "Jan",
      "Feb",
      "Mär",
      "Apr",
      "Mai",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Dez",
    ];

    return germanMonths[date.getMonth()] ?? "Ungültiger Monat";
  } catch (error) {
    console.error("Error in getMonth:", error);
    return "Ungültiges Datum";
  }
};

export const getDay = (date: Date): string | undefined => {
  try {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error("Invalid Date object provided");
    }
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}`;
  } catch (error) {
    console.error("Error in getDay:", error);
    return "Invalid Date";
  }
};

export const getRemainingTime = (expiry_time: number): number => {
  console.log(expiry_time);
  if (expiry_time == 0) return 0;
  const remainingTime: number = expiry_time - Date.now();
  return Math.max(Math.floor(remainingTime / 1000), 0); // Convert milliseconds to seconds, minimum of 0
};

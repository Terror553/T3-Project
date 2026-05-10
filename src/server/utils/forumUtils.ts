export const createSlug = (string: string, separator = "-") => {
  return string
    .toString() // Cast to string (optional)
    .normalize("NFD") // Decompose characters (e.g., ä -> a + ¨)
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks (accents)
    .replace(/ß/g, "ss") // Replace German sharp s with "ss"
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, separator) // Replace spaces with {separator}
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\_/g, separator) // Replace _ with {separator}
    .replace(/\-\-+/g, separator) // Replace multiple - with single {separator}
    .replace(/\-$/g, ""); // Remove trailing -
};

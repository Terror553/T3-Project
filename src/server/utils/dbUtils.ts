export function generateWhereClause(id: number | string): {
  id?: number;
  slug?: string;
} {
  // Attempt to convert the input to a number
  const numericId = Number(id);

  // Check if the conversion resulted in a valid number
  if (!isNaN(numericId)) {
    // If it's a valid number (or was originally a number), use the ID
    return {
      id: numericId,
    };
  } else {
    // If it's not a valid number, it must be a non-numeric string, use it as a slug
    // We need toString() in case the original type was technically number but NaN
    return {
      slug: id.toString(),
    };
  }
}

// ============================================================================
// FILE: src/utils/validators.ts
// ============================================================================
export const isValidDate = (date: string | Date): boolean => {
  const parsed = new Date(date);
  return !isNaN(parsed.getTime());
};

export const isValidNumber = (value: unknown): boolean => {
  return typeof value === "number" && !isNaN(value) && isFinite(value);
};

export const isValidCountryName = (name: string): boolean => {
  return name.length > 0 && name.length <= 100;
};

export const sanitizeNumber = (
  value: unknown,
  defaultValue: number = 0
): number => {
  if (typeof value === "number" && isValidNumber(value)) {
    return value;
  }
  if (typeof value === "string") {
    const parsed = parseFloat(value);
    if (isValidNumber(parsed)) {
      return parsed;
    }
  }
  return defaultValue;
};

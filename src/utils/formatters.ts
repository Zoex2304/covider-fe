// ============================================================================
// FILE: src/utils/formatters.ts
// ============================================================================
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-US").format(num);
};

export const formatPercentage = (num: number): string => {
  return `${num.toFixed(2)}%`;
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// ============================================================================
// FILE: src/utils/constants.ts
// ============================================================================
export const APP_NAME = "COVID-19 Dashboard";
export const APP_VERSION = "1.0.0";

export const DATE_FORMATS = {
  DISPLAY: "MMM dd, yyyy",
  API: "yyyy-MM-dd",
  FULL: "MMMM dd, yyyy HH:mm:ss",
} as const;

export const METRIC_LABELS = {
  Confirmed: "Confirmed Cases",
  Deaths: "Deaths",
  Recovered: "Recovered",
  Active: "Active Cases",
  CFR: "Case Fatality Rate",
  RecoveryRate: "Recovery Rate",
} as const;

export const METRIC_COLORS = {
  Confirmed: "#3b82f6",
  Deaths: "#ef4444",
  Recovered: "#22c55e",
  Active: "#f97316",
} as const;

export const TABLE_PAGE_SIZES = [10, 20, 30, 40, 50] as const;

export const PREDICTION_DAYS_OPTIONS = [7, 14, 30] as const;

export const TOP_COUNTRIES_OPTIONS = [10, 20, 30, 50] as const;

// ============================================================================
// FILE: src/types/api.types.ts
// ============================================================================
export interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  status: string;
  data: T[];
  pagination: {
    page: number;
    page_size: number;
    total_records: number;
    total_pages: number;
  };
}

export interface GlobalMetrics {
  total_confirmed: number;
  total_deaths: number;
  total_recovered: number;
  total_active: number;
  global_cfr: number;
  global_recovery_rate: number;
  global_active_rate: number;
  as_of_date: string;
}

export interface CountryData {
  "Country/Region": string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  CFR: number;
  RecoveryRate: number;
  ObservationDate: string;
}

export interface TimeSeriesPoint {
  ObservationDate: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  DailyConfirmed?: number;
  DailyDeaths?: number;
  DailyRecovered?: number;
}

export interface PredictionResponse {
  status: string;
  country: string;
  days_predicted: number;
  predictions: Record<string, number>;
  last_actual_date: string;
  last_actual_value: number;
}

export interface AdvancedAnalyticsResponse {
  status: string;
  data?: any;
  metric?: string;
  country?: string;
  [key: string]: any;
}

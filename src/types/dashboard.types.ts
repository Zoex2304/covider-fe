// ============================================================================
// FILE: src/types/dashboard.types.ts
// ============================================================================
export interface KPI {
  label: string;
  value: number | string;
  format: "number" | "percentage" | "string";
  color: string;
  trend?: number;
}

export interface GlobalMetrics {
  total_confirmed: number;
  total_deaths: number;
  total_recovered: number;
  total_active: number;
  global_cfr: number;
  global_recovery_rate: number;
  as_of_date: string;
}

export interface DashboardSummary {
  status: string;
  global_metrics: GlobalMetrics;
  top_countries: CountrySummary[];
  date_range: {
    start: string;
    end: string;
    days: number;
  };
}

export interface CountrySummary {
  "Country/Region": string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  CFR: number;
  RecoveryRate: number;
  ObservationDate: string;
}

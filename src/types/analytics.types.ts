// ============================================================================
// FILE: src/types/analytics.types.ts
// ============================================================================

// =======================
// Time Series
// =======================
export interface TimeSeriesData {
  ObservationDate: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
}

// =======================
// Prediction
// =======================
export interface PredictionData {
  date: string;
  actual?: number;
  predicted?: number;
}

export interface PredictionResponse {
  status: string;
  country: string;
  days_predicted: number;
  predictions: Record<string, number>;
  last_actual_date: string;
  last_actual_value: number;
}

// =======================
// Chart Metrics (UI layer)
// =======================
export interface ChartMetric {
  key: string;
  label: string;
  color: string;
  enabled: boolean;
}

// =======================
// Anomaly Detection (NEW)
// =======================
export interface AnomalyItem {
  ["Country/Region"]: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  AnomalyScore: number;

  // allow flexible numeric fields
  [key: string]: string | number;
}

export interface AnomalyResponse {
  total_anomalies: number;
  anomalies: AnomalyItem[];
}

// =======================
// K-Means Clustering
// =======================
export interface ClusterItem {
  cluster_id: number;
  num_countries: number;
  avg_confirmed: number;
  avg_deaths: number;
  avg_cfr: number;
  countries: string[];
}

export interface ClusteringResponse {
  clusters: ClusterItem[];
}


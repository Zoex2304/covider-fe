// ============================================================================
// FILE: src/services/api/endpoints.ts (COMPLETE VERSION)
// ============================================================================
export const API_ENDPOINTS = {
  // Dashboard
  DASHBOARD_SUMMARY: '/api/v1/dashboard/summary',
  DASHBOARD_KPIS: '/api/v1/dashboard/kpis',
  DASHBOARD_RECENT_UPDATES: '/api/v1/dashboard/recent-updates',
  
  // Time Series
  TIME_SERIES_GLOBAL: '/api/v1/time-series/global',
  TIME_SERIES_COUNTRY: (country: string) => `/api/v1/time-series/country/${encodeURIComponent(country)}`,
  TIME_SERIES_DAILY_STATISTICS: '/api/v1/time-series/daily-statistics',
  TIME_SERIES_DATE_RANGE: '/api/v1/time-series/date-range',
  
  // Geographical
  COUNTRIES_SUMMARY: '/api/v1/geographical/countries-summary',
  TOP_COUNTRIES: '/api/v1/geographical/top-countries',
  COUNTRY_DETAILS: (country: string) => `/api/v1/geographical/country/${encodeURIComponent(country)}/details`,
  PROVINCES: (country: string) => `/api/v1/geographical/provinces/${encodeURIComponent(country)}`,
  COMPARE_COUNTRIES: '/api/v1/geographical/compare-countries',
  
  // Statistics
  GLOBAL_METRICS: '/api/v1/statistics/global-metrics',
  MORTALITY_RATES: '/api/v1/statistics/mortality-rates',
  RECOVERY_RATES: '/api/v1/statistics/recovery-rates',
  CORRELATION_MATRIX: '/api/v1/statistics/correlation-matrix',
  DISTRIBUTION_STATS: '/api/v1/statistics/distribution-stats',
  OUTLIERS: '/api/v1/statistics/outliers',
  
  // Data Tables
  ALL_DATA: '/api/v1/tables/all-data',
  COUNTRIES_LIST: '/api/v1/tables/countries-list',
  DAILY_SUMMARY: '/api/v1/tables/daily-summary',
  COUNTRY_TIMELINE: (country: string) => `/api/v1/tables/country-timeline/${encodeURIComponent(country)}`,
  
  // Visualizations
  TIME_SERIES_CHART: '/api/v1/visualizations/time-series-chart',
  GEOGRAPHICAL_CHART: '/api/v1/visualizations/geographical-chart',
  DASHBOARD_CHART: '/api/v1/visualizations/dashboard',
  TOP_COUNTRIES_CHART: '/api/v1/visualizations/top-countries-chart',
  COMPARISON_CHART: '/api/v1/visualizations/comparison-chart',
  CORRELATION_HEATMAP: '/api/v1/visualizations/correlation-heatmap',
  
  // Predictions
  COUNTRY_PREDICTION: (country: string) => `/api/v1/predictions/country/${encodeURIComponent(country)}`,
  
  // Comparisons
  COMPARISON_TIMELINE_CHART: '/api/v1/comparisons/timeline-chart',
  COMPARISON_COMPOSITION_CHART: '/api/v1/comparisons/composition-chart',
  
  // Advanced Analytics
  ANOMALIES: '/api/v1/advanced-analytics/anomalies',
  EPIDEMIC_WAVES: (country: string) => `/api/v1/advanced-analytics/epidemic-waves/${encodeURIComponent(country)}`,
  REPRODUCTION_NUMBER: (country: string) => `/api/v1/advanced-analytics/reproduction-number/${encodeURIComponent(country)}`,
  CLUSTERING: '/api/v1/advanced-analytics/clustering',
  CORRELATION_NETWORK: '/api/v1/advanced-analytics/correlation-network',
  LAG_CORRELATION: '/api/v1/advanced-analytics/lag-correlation',
  RESILIENCE: '/api/v1/advanced-analytics/resilience',
} as const;


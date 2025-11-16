// ============================================================================
// FILE: src/config/api.config.ts
// ============================================================================
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 1,
  RETRY_DELAY: 1000,
} as const;

export const API_CACHE_CONFIG = {
  STALE_TIME: 5 * 60 * 1000, // 5 minutes
  CACHE_TIME: 10 * 60 * 1000, // 10 minutes
} as const;

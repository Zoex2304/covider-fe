// ============================================================================
// FILE: src/features/analytics/hooks/useTimeSeriesData.ts
// ============================================================================
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";
import { TimeSeriesData } from "@/types";

export function useTimeSeriesData(country?: string) {
  const endpoint = country
    ? API_ENDPOINTS.TIME_SERIES_COUNTRY(country)
    : API_ENDPOINTS.TIME_SERIES_GLOBAL;

  return useQuery<{ status: string; data: TimeSeriesData[] }>({
    queryKey: ["timeSeries", country || "global"],
    queryFn: async () => {
      const { data } = await apiClient.get(endpoint);
      return data;
    },
    enabled: !country || !!country,
  });
}

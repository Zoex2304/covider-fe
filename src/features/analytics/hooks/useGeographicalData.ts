// ============================================================================
// FILE: src/features/analytics/hooks/useGeographicalData.ts
// ============================================================================
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";

export function useGeographicalData(
  metric: string = "Confirmed",
  limit: number = 20
) {
  return useQuery({
    queryKey: ["geographical", metric, limit],
    queryFn: async () => {
      const { data } = await apiClient.get(API_ENDPOINTS.TOP_COUNTRIES, {
        params: { metric, limit },
      });
      return data;
    },
  });
}

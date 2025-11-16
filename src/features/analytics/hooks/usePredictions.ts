// ============================================================================
// FILE: src/features/analytics/hooks/usePredictions.ts
// ============================================================================
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";
import { PredictionResponse } from "@/types";

export function usePredictions(country: string, days: number = 7) {
  return useQuery<PredictionResponse>({
    queryKey: ["predictions", country, days],
    queryFn: async () => {
      const { data } = await apiClient.get(
        API_ENDPOINTS.COUNTRY_PREDICTION(country),
        { params: { days } }
      );
      return data;
    },
    enabled: !!country,
  });
}

// ============================================================================
// FILE: src/features/countries/hooks/useCountryData.ts
// ============================================================================
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";

export function useCountryData(country: string) {
  const detailsQuery = useQuery({
    queryKey: ["country", "details", country],
    queryFn: async () => {
      const { data } = await apiClient.get(
        API_ENDPOINTS.COUNTRY_DETAILS(country)
      );
      return data;
    },
    enabled: !!country,
  });

  const timelineQuery = useQuery({
    queryKey: ["country", "timeline", country],
    queryFn: async () => {
      const { data } = await apiClient.get(
        API_ENDPOINTS.TIME_SERIES_COUNTRY(country)
      );
      return data;
    },
    enabled: !!country,
  });

  return {
    details: detailsQuery.data,
    timeline: timelineQuery.data,
    isLoading: detailsQuery.isLoading || timelineQuery.isLoading,
    error: detailsQuery.error || timelineQuery.error,
    refetch: () => {
      detailsQuery.refetch();
      timelineQuery.refetch();
    },
  };
}

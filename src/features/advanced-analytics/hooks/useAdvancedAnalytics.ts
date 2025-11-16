// ============================================================================
// FILE: src/features/advanced-analytics/hooks/useAdvancedAnalytics.ts
// ============================================================================
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/api/client';
import { API_ENDPOINTS } from '@/services/api/endpoints';

export function useAdvancedAnalytics() {
  const anomalies = (metric: string = 'Confirmed') => useQuery({
    queryKey: ['anomalies', metric],
    queryFn: async () => {
      const { data } = await apiClient.get(API_ENDPOINTS.ANOMALIES, {
        params: { metric, format: 'json' }
      });
      return data;
    },
  });

  const epidemicWaves = (country: string) => useQuery({
    queryKey: ['epidemic-waves', country],
    queryFn: async () => {
      const { data } = await apiClient.get(
        API_ENDPOINTS.EPIDEMIC_WAVES(country),
        { params: { format: 'json' } }
      );
      return data;
    },
    enabled: !!country,
  });

  const reproductionNumber = (country: string) => useQuery({
    queryKey: ['reproduction-number', country],
    queryFn: async () => {
      const { data } = await apiClient.get(
        API_ENDPOINTS.REPRODUCTION_NUMBER(country),
        { params: { format: 'json' } }
      );
      return data;
    },
    enabled: !!country,
  });

  return {
    anomalies,
    epidemicWaves,
    reproductionNumber,
  };
}


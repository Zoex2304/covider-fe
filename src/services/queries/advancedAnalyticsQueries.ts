// ============================================================================
// FILE: src/services/queries/advancedAnalyticsQueries.ts
// ============================================================================
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const useAnomalies = (metric: string = 'Confirmed') => {
  return useQuery({
    queryKey: ['anomalies', metric],
    queryFn: async () => {
      const { data } = await apiClient.get(API_ENDPOINTS.ANOMALIES, {
        params: { metric, format: 'json' }
      });
      return data;
    },
  });
};

export const useEpidemicWaves = (country: string) => {
  return useQuery({
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
};

export const useReproductionNumber = (country: string) => {
  return useQuery({
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
};

export const useClustering = (nClusters: number = 5) => {
  return useQuery({
    queryKey: ['clustering', nClusters],
    queryFn: async () => {
      const { data } = await apiClient.get(API_ENDPOINTS.CLUSTERING, {
        params: { n_clusters: nClusters, format: 'json' }
      });
      return data;
    },
  });
};

export const useResilience = (topN: number = 20) => {
  return useQuery({
    queryKey: ['resilience', topN],
    queryFn: async () => {
      const { data } = await apiClient.get(API_ENDPOINTS.RESILIENCE, {
        params: { top_n: topN, format: 'json' }
      });
      return data;
    },
  });
};

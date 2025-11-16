// ============================================================================
// FILE: src/services/queries/analyticsQueries.ts
// ============================================================================
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const useTimeSeriesGlobal = () => {
  return useQuery({
    queryKey: ['timeSeries', 'global'],
    queryFn: async () => {
      const { data } = await apiClient.get(API_ENDPOINTS.TIME_SERIES_GLOBAL);
      return data;
    },
  });
};

export const useTimeSeriesCountry = (country: string) => {
  return useQuery({
    queryKey: ['timeSeries', 'country', country],
    queryFn: async () => {
      const { data } = await apiClient.get(API_ENDPOINTS.TIME_SERIES_COUNTRY(country));
      return data;
    },
    enabled: !!country,
  });
};

export const useCountryPrediction = (country: string, days: number = 7) => {
  return useQuery({
    queryKey: ['prediction', country, days],
    queryFn: async () => {
      const { data } = await apiClient.get(
        API_ENDPOINTS.COUNTRY_PREDICTION(country),
        { params: { days } }
      );
      return data;
    },
    enabled: !!country,
  });
};


// ============================================================================
// FILE: src/services/queries/countryQueries.ts
// ============================================================================
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const useCountriesSummary = () => {
  return useQuery({
    queryKey: ['countries', 'summary'],
    queryFn: async () => {
      const { data } = await apiClient.get(API_ENDPOINTS.COUNTRIES_SUMMARY);
      return data;
    },
  });
};

export const useTopCountries = (metric: string = 'Confirmed', limit: number = 20) => {
  return useQuery({
    queryKey: ['countries', 'top', metric, limit],
    queryFn: async () => {
      const { data } = await apiClient.get(API_ENDPOINTS.TOP_COUNTRIES, {
        params: { metric, limit },
      });
      return data;
    },
  });
};

export const useCountryDetails = (country: string) => {
  return useQuery({
    queryKey: ['country', 'details', country],
    queryFn: async () => {
      const { data } = await apiClient.get(API_ENDPOINTS.COUNTRY_DETAILS(country));
      return data;
    },
    enabled: !!country,
  });
};







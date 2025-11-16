// ============================================================================
// FILE: src/features/analytics/hooks/useCountryComparison.ts
// ============================================================================
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/api/client';
import { API_ENDPOINTS } from '@/services/api/endpoints';

// ============================================================================
// DOMAIN TYPES
// ============================================================================
interface CountryComparisonData {
  Country: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  CFR: number;
  RecoveryRate: number;
  Date: string;
}

interface ComparisonApiResponse {
  status: string;
  countries: string[];
  data: CountryComparisonData[];
}

interface BarChartData {
  country: string;
  value: number;
}

export interface TransformedComparisonData {
  chartData: BarChartData[];
  snapshotDate: string | null;
}

// ============================================================================
// DATA TRANSFORMATION SERVICE
// Responsibility: Transform API response into chart-compatible formats
// ============================================================================
class ComparisonDataTransformer {
  transformForBarChart(
    apiData: CountryComparisonData[],
    metric: keyof Pick<CountryComparisonData, 'Confirmed' | 'Deaths' | 'Recovered' | 'Active'>
  ): TransformedComparisonData {
    const chartData = apiData.map(countryData => ({
      country: countryData.Country,
      value: countryData[metric],
    }));

    const snapshotDate = apiData.length > 0 ? apiData[0].Date : null;

    return {
      chartData,
      snapshotDate,
    };
  }
}

// ============================================================================
// CUSTOM HOOK
// Responsibility: Fetch and transform country comparison data
// ============================================================================
export function useCountryComparison(
  countries: string[],
  metric: 'Confirmed' | 'Deaths' | 'Recovered' | 'Active'
) {
  const transformer = new ComparisonDataTransformer();

  return useQuery<TransformedComparisonData>({
    queryKey: ['comparison', countries, metric],
    queryFn: async () => {
      // Build query string
      const queryString = countries.map(c => `countries=${c}`).join('&');
      
      // Fetch data
      const response = await apiClient.get<ComparisonApiResponse>(
        `${API_ENDPOINTS.COMPARE_COUNTRIES}?${queryString}`
      );

      // DEBUG: Log raw API response
      console.log('🔍 useCountryComparison - Full Response:', response);
      console.log('🔍 useCountryComparison - response.data:', response.data);
      console.log('🔍 useCountryComparison - response.data.data:', response.data.data);

      // Transform for bar chart (response.data is the API response object)
      const transformed = transformer.transformForBarChart(response.data.data, metric);
      
      // DEBUG: Log transformed data
      console.log('🔍 useCountryComparison - Transformed:', transformed);
      
      return transformed;
    },
    enabled: countries.length > 0,
  });
}
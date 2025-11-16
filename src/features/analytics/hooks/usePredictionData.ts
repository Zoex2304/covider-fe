// ============================================================================
// FILE: src/features/analytics/hooks/usePredictionData.ts
// ============================================================================
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/api/client';
import { API_ENDPOINTS } from '@/services/api/endpoints';

// ============================================================================
// DOMAIN TYPES
// ============================================================================
interface PredictionApiResponse {
  status: string;
  country: string;
  days_predicted: number;
  historical_data?: Record<string, number>; // ✅ NEW: Optional for backward compatibility
  predictions: Record<string, number>;
  last_actual_date: string;
  last_actual_value: number;
}

interface ChartDataPoint {
  date: string;
  actual?: number;
  predicted?: number;
}

export interface TransformedPredictionData {
  chartData: ChartDataPoint[];
  lastActualDate: string;
  lastActualValue: number;
  country: string;
}

// ============================================================================
// DATA TRANSFORMATION SERVICE
// Responsibility: Transform prediction API response into chart format
// ============================================================================
class PredictionDataTransformer {
  transform(apiData: PredictionApiResponse): TransformedPredictionData {
    const chartData = this.buildChartData(apiData);

    return {
      chartData,
      lastActualDate: apiData.last_actual_date,
      lastActualValue: apiData.last_actual_value,
      country: apiData.country,
    };
  }

  private buildChartData(apiData: PredictionApiResponse): ChartDataPoint[] {
    const points: ChartDataPoint[] = [];

    // ✅ Add all historical data if available
    if (apiData.historical_data && Object.keys(apiData.historical_data).length > 0) {
      // Sort dates to ensure chronological order
      const sortedHistorical = Object.entries(apiData.historical_data)
        .sort(([dateA], [dateB]) => dateA.localeCompare(dateB));
      
      sortedHistorical.forEach(([dateStr, value]) => {
        const cleanDate = this.formatDate(dateStr);
        points.push({
          date: cleanDate,
          actual: value,
          predicted: undefined,
        });
      });
    } else {
      // Fallback: Add only last actual point
      points.push({
        date: apiData.last_actual_date,
        actual: apiData.last_actual_value,
        predicted: undefined,
      });
    }

    // ✅ Add predicted points (also sorted)
    const sortedPredictions = Object.entries(apiData.predictions)
      .sort(([dateA], [dateB]) => dateA.localeCompare(dateB));
    
    sortedPredictions.forEach(([dateStr, value]) => {
      const cleanDate = this.formatDate(dateStr);
      points.push({
        date: cleanDate,
        actual: undefined,
        predicted: value,
      });
    });

    return points;
  }

  private formatDate(isoDate: string): string {
    // Convert "2021-05-30T00:00:00" to "2021-05-30"
    return isoDate.split('T')[0];
  }
}

// ============================================================================
// CUSTOM HOOK
// Responsibility: Fetch and transform prediction data
// ============================================================================
export function usePredictionData(country: string, days: number = 7) {
  const transformer = new PredictionDataTransformer();

  return useQuery<TransformedPredictionData>({
    queryKey: ['prediction', country, days],
    queryFn: async () => {
      const response = await apiClient.get<PredictionApiResponse>(
        API_ENDPOINTS.COUNTRY_PREDICTION(country),
        { params: { days } }
      );

      // Transform data
      const transformed = transformer.transform(response.data);
      
      return transformed;
    },
    enabled: !!country,
  });
}
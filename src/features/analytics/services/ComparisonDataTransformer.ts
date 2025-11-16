// ============================================================================
// FILE: src/features/analytics/services/ComparisonDataTransformer.ts
// ============================================================================

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

interface BarChartData {
  country: string;
  value: number;
}

interface TransformedComparisonData {
  chartData: BarChartData[];
  snapshotDate: string | null;
}

// ============================================================================
// DATA TRANSFORMATION SERVICE
// Responsibility: Transform API response into chart-compatible formats
// 
// Design Principles Applied:
// - Single Responsibility: Only handles data transformation
// - Open/Closed: Easy to extend with new transformation methods
// - Dependency Inversion: Operates on abstractions (interfaces)
// ============================================================================
export class ComparisonDataTransformer {
  /**
   * Transform API response for BarChart consumption
   * 
   * @param apiData - Raw API response data
   * @param metric - The metric to extract (Confirmed, Deaths, etc.)
   * @returns Transformed data with chartData and metadata
   */
  transformForBarChart(
    apiData: CountryComparisonData[],
    metric: keyof Pick<CountryComparisonData, 'Confirmed' | 'Deaths' | 'Recovered' | 'Active'>
  ): TransformedComparisonData {
    const chartData = this.extractMetricValues(apiData, metric);
    const snapshotDate = this.extractSnapshotDate(apiData);

    return {
      chartData,
      snapshotDate,
    };
  }

  /**
   * Extract metric values for each country
   * 
   * @private
   * @param data - Country comparison data
   * @param metric - Target metric
   * @returns Array of country-value pairs
   */
  private extractMetricValues(
    data: CountryComparisonData[],
    metric: keyof Pick<CountryComparisonData, 'Confirmed' | 'Deaths' | 'Recovered' | 'Active'>
  ): BarChartData[] {
    return data.map(countryData => ({
      country: countryData.Country,
      value: countryData[metric],
    }));
  }

  /**
   * Extract snapshot date from data
   * Assumes all countries have the same date (snapshot data)
   * 
   * @private
   * @param data - Country comparison data
   * @returns Snapshot date or null if no data
   */
  private extractSnapshotDate(data: CountryComparisonData[]): string | null {
    if (data.length === 0) return null;
    return data[0].Date;
  }

  /**
   * Validate that all countries have the same date
   * Useful for ensuring data consistency
   * 
   * @param data - Country comparison data
   * @returns True if all dates match
   */
  validateSnapshotConsistency(data: CountryComparisonData[]): boolean {
    if (data.length <= 1) return true;
    
    const firstDate = data[0].Date;
    return data.every(item => item.Date === firstDate);
  }
}
// ============================================================================
// FILE: src/features/analytics/components/ComparisonChart.tsx (UPDATED)
// ============================================================================
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/api/client';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { useCountriesList } from '@/services/queries/dataTableQueries';
import ChartContainer from '@/components/charts/ChartContainer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import LineChart from '@/components/charts/LineChart';

export default function ComparisonChart() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['US', 'India']);
  const [currentSelection, setCurrentSelection] = useState('');
  const [metric, setMetric] = useState('Confirmed');

  const { data: countriesData } = useCountriesList();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['comparison', selectedCountries, metric],
    queryFn: async () => {
      const { data } = await apiClient.get(API_ENDPOINTS.COMPARE_COUNTRIES, {
        params: { countries: selectedCountries }
      });
      return data;
    },
    enabled: selectedCountries.length > 0,
  });

  const handleAddCountry = () => {
    if (currentSelection && !selectedCountries.includes(currentSelection)) {
      setSelectedCountries([...selectedCountries, currentSelection]);
      setCurrentSelection('');
    }
  };

  const handleRemoveCountry = (country: string) => {
    setSelectedCountries(selectedCountries.filter(c => c !== country));
  };

  const countries = countriesData?.countries || [];

  return (
    <ChartContainer
      title="Country Comparison"
      description="Compare COVID-19 trends across multiple countries"
      isLoading={isLoading}
      error={error?.message}
      onRetry={refetch}
      actions={
        <div className="flex items-center gap-2">
          <Select value={metric} onValueChange={setMetric}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Confirmed">Confirmed</SelectItem>
              <SelectItem value="Deaths">Deaths</SelectItem>
              <SelectItem value="Recovered">Recovered</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
            </SelectContent>
          </Select>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Country Selection */}
        <div className="flex gap-2">
          <Select value={currentSelection} onValueChange={setCurrentSelection}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Add country to compare" />
            </SelectTrigger>
            <SelectContent>
              {countries
                .filter((c: string) => !selectedCountries.includes(c))
                .slice(0, 50)
                .map((country: string) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Button
            onClick={handleAddCountry}
            disabled={!currentSelection}
            size="icon"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Selected Countries */}
        {selectedCountries.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedCountries.map((country) => (
              <Badge key={country} variant="secondary" className="pl-3 pr-1 py-1">
                {country}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 ml-1"
                  onClick={() => handleRemoveCountry(country)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}

        {/* Chart */}
        {data && (
          <LineChart
            data={data.data}
            lines={selectedCountries.map((country, idx) => ({
              dataKey: `${country}_${metric}`,
              name: country,
              color: `hsl(${(idx * 360) / selectedCountries.length}, 70%, 50%)`
            }))}
            xAxisKey="Date"
            height={400}
          />
        )}
      </div>
    </ChartContainer>
  );
}


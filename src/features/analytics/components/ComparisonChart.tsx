// ============================================================================
// FILE: src/features/analytics/components/ComparisonChart.tsx (REFACTORED)
// ============================================================================
import { useState } from 'react';
import ChartContainer from '@/components/charts/ChartContainer';
import { useCountriesList } from '@/services/queries/dataTableQueries';
import { useCountryComparison } from '../hooks/useCountryComparison';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function ComparisonChart() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['US', 'India', 'Albania']);
  const [currentSelection, setCurrentSelection] = useState('');
  const [metric, setMetric] = useState<'Confirmed' | 'Deaths' | 'Recovered' | 'Active'>('Confirmed');

  const { data: countriesData } = useCountriesList();
  const { data, isLoading, error, refetch } = useCountryComparison(selectedCountries, metric);

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
  const chartData = data?.chartData || [];
  const snapshotDate = data?.snapshotDate;

  // DEBUG: Log data
  console.log('🔍 ComparisonChart Debug:', {
    selectedCountries,
    metric,
    apiData: data,
    chartData,
    chartDataLength: chartData.length
  });

  return (
    <ChartContainer
      title="Country Comparison"
      description={`Compare ${metric} cases across countries (snapshot data)`}
      isLoading={isLoading}
      error={error?.message}
      onRetry={refetch}
      actions={
        <div className="flex items-center gap-2">
          <Select value={metric} onValueChange={(v) => setMetric(v as typeof metric)}>
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

        {/* Bar Chart */}
        {chartData.length > 0 ? (
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={400}>
              <RechartsBarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="country" 
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                />
                <YAxis 
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                  tickFormatter={(value) => {
                    if (typeof value === 'number') {
                      return value.toLocaleString();
                    }
                    return String(value);
                  }}
                />
                <Tooltip 
                  formatter={(value: number) => value.toLocaleString()}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="value" 
                  name={metric}
                  fill="hsl(var(--primary))" 
                  radius={[8, 8, 0, 0]}
                />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[400px] text-muted-foreground">
            {isLoading ? 'Loading...' : 'No data to display'}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && chartData.length === 0 && selectedCountries.length > 0 && (
          <div className="flex items-center justify-center h-[400px] text-muted-foreground">
            No data available for selected countries
          </div>
        )}

        {/* Data Date Info */}
        {snapshotDate && (
          <p className="text-xs text-muted-foreground text-center">
            Data as of: {new Date(snapshotDate).toLocaleDateString()}
          </p>
        )}
      </div>
    </ChartContainer>
  );
}
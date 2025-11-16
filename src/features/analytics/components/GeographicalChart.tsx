// ============================================================================
// FILE: src/features/analytics/components/GeographicalChart.tsx
// ============================================================================
import { useState } from 'react';
import ChartContainer from '@/components/charts/ChartContainer';
import { useTopCountries } from '@/services/queries/countryQueries';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function GeographicalChart() {
  const [metric, setMetric] = useState('Confirmed');
  const [limit, setLimit] = useState(20);
  const { data, isLoading, error, refetch } = useTopCountries(metric, limit);

  const chartData = data?.data || [];

  return (
    <ChartContainer
      title="Top Countries by Cases"
      description="Countries with highest COVID-19 impact"
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
          <Select value={limit.toString()} onValueChange={(v) => setLimit(Number(v))}>
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">Top 10</SelectItem>
              <SelectItem value="20">Top 20</SelectItem>
              <SelectItem value="30">Top 30</SelectItem>
            </SelectContent>
          </Select>
        </div>
      }
    >
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={chartData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis type="number" className="text-xs" />
          <YAxis
            type="category"
            dataKey="Country/Region"
            className="text-xs"
            width={120}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
            }}
          />
          <Legend />
          <Bar dataKey={metric} fill="#3b82f6" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

// ============================================================================
// FILE: src/features/analytics/components/GeographicalChart.tsx (FINAL)
// ============================================================================
import { useState, useMemo } from 'react';
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

  // Format data untuk chart - urutkan dari terbesar ke terkecil
  const chartData = useMemo(() => {
    const rawData = data?.data || [];
    
    // Sort by metric value descending untuk konsistensi visual
    return [...rawData]
      .sort((a, b) => b[metric] - a[metric])
      .map((item: any, index: number) => ({
        ...item,
        // Tambahkan ranking
        rank: index + 1,
        // Format nilai untuk tooltip
        formattedValue: item[metric].toLocaleString()
      }));
  }, [data, metric]);

  // Warna berbeda untuk setiap metric
  const getBarColor = () => {
    switch (metric) {
      case 'Confirmed': return '#3b82f6'; // blue
      case 'Deaths': return '#ef4444'; // red
      case 'Recovered': return '#10b981'; // green
      case 'Active': return '#f59e0b'; // amber
      default: return '#3b82f6';
    }
  };

  console.log('🔍 GeographicalChart Debug:', {
    metric,
    limit,
    dataCount: chartData.length,
    chartData: chartData,
    summary: data?.summary
  });

  return (
    <ChartContainer
      title={`Top ${limit} Countries by ${metric} Cases`}
      description={`Countries with highest COVID-19 ${metric.toLowerCase()} cases`}
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
              <SelectItem value="50">Top 50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      }
    >
      {/* Debug Info */}
      <div className="text-xs text-muted-foreground mb-4">
        Showing {chartData.length} countries • Hover bars for details
      </div>

      {/* Horizontal Bar Chart */}
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={chartData}
          layout="horizontal"
          margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
          barSize={35} // Fixed bar size untuk konsistensi
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            type="category"
            dataKey="Country/Region"
            className="text-xs"
            angle={-45}
            textAnchor="end"
            height={80}
            interval={0} // Tampilkan semua label
            tick={{ fontSize: 11 }}
          />
          <YAxis
            type="number"
            className="text-xs"
            tickFormatter={(value) => {
              if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
              return value.toString();
            }}
            width={80}
          />
          <Tooltip
            formatter={(value: number, name: string) => [
              value.toLocaleString(),
              metric
            ]}
            labelFormatter={(label, payload) => {
              if (payload && payload[0]) {
                const country = payload[0].payload['Country/Region'];
                const rank = payload[0].payload.rank;
                return `#${rank} - ${country}`;
              }
              return label;
            }}
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              fontSize: '12px'
            }}
          />
          <Legend />
          <Bar
            dataKey={metric}
            fill={getBarColor()}
            radius={[4, 4, 0, 0]}
            name={metric}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Additional Stats - USING BACKEND SUMMARY DATA */}
      {data?.summary && (
        <div className="mt-4 grid grid-cols-3 gap-4 text-xs text-muted-foreground">
          <div className="text-center">
            <div className="font-semibold">#1</div>
            <div>{data.summary.top_country?.name}</div>
            <div className="text-blue-600 font-medium">
              {data.summary.top_country?.value?.toLocaleString()}
            </div>
          </div>
          <div className="text-center">
            <div className="font-semibold">Total Shown</div>
            <div>{data.summary.total_countries} countries</div>
            <div className="text-green-600 font-medium">
              {data.summary.total_metric_value?.toLocaleString()}
            </div>
          </div>
          <div className="text-center">
            <div className="font-semibold">Avg per Country</div>
            <div>—</div>
            <div className="text-purple-600 font-medium">
              {data.summary.average_metric_value?.toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {/* Loading State for Summary */}
      {isLoading && (
        <div className="mt-4 grid grid-cols-3 gap-4 text-xs text-muted-foreground">
          <div className="text-center">
            <div className="font-semibold">#1</div>
            <div className="animate-pulse bg-muted h-4 rounded mt-1"></div>
            <div className="animate-pulse bg-muted h-4 rounded mt-1"></div>
          </div>
          <div className="text-center">
            <div className="font-semibold">Total Shown</div>
            <div className="animate-pulse bg-muted h-4 rounded mt-1"></div>
            <div className="animate-pulse bg-muted h-4 rounded mt-1"></div>
          </div>
          <div className="text-center">
            <div className="font-semibold">Avg per Country</div>
            <div className="animate-pulse bg-muted h-4 rounded mt-1"></div>
            <div className="animate-pulse bg-muted h-4 rounded mt-1"></div>
          </div>
        </div>
      )}
    </ChartContainer>
  );
}
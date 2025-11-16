// ============================================================================
// FILE: src/features/dashboard/components/DashboardChartView.tsx
// ============================================================================
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTimeSeriesGlobal } from '@/services/queries/analyticsQueries';
import LineChart from '@/components/charts/LineChart';
import AreaChart from '@/components/charts/AreaChart';
import LoadingSpinner from '@/components/feedback/LoadingSpinner';
import ErrorAlert from '@/components/feedback/ErrorAlert';

export default function DashboardChartView() {
  const { data, isLoading, error, refetch } = useTimeSeriesGlobal();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12">
          <LoadingSpinner text="Loading chart..." />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-6">
          <ErrorAlert message="Failed to load chart data" onRetry={refetch} />
        </CardContent>
      </Card>
    );
  }

  const chartData = data?.data || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Global Trends</CardTitle>
        <CardDescription>COVID-19 cases over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="line">
          <TabsList className="mb-4">
            <TabsTrigger value="line">Line Chart</TabsTrigger>
            <TabsTrigger value="area">Area Chart</TabsTrigger>
          </TabsList>

          <TabsContent value="line">
            <LineChart
              data={chartData}
              lines={[
                { dataKey: 'Confirmed', name: 'Confirmed', color: '#3b82f6' },
                { dataKey: 'Deaths', name: 'Deaths', color: '#ef4444' },
                { dataKey: 'Recovered', name: 'Recovered', color: '#22c55e' },
              ]}
              xAxisKey="ObservationDate"
              xAxisFormatter={(value) =>
                new Date(value as string).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }
            />
          </TabsContent>

          <TabsContent value="area">
            <AreaChart
              data={chartData}
              areas={[
                { dataKey: 'Confirmed', name: 'Confirmed', color: '#3b82f6' },
                { dataKey: 'Deaths', name: 'Deaths', color: '#ef4444' },
                { dataKey: 'Recovered', name: 'Recovered', color: '#22c55e' },
              ]}
              xAxisKey="ObservationDate"
              xAxisFormatter={(value) =>
                new Date(value as string).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

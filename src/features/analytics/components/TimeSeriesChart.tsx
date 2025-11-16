// ============================================================================
// FILE: src/features/analytics/components/TimeSeriesChart.tsx
// ============================================================================
import { useState } from "react";
import ChartContainer from "@/components/charts/ChartContainer";
import { useTimeSeriesGlobal } from "@/services/queries/analyticsQueries";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TimeSeriesChart() {
  const [metric, setMetric] = useState("all");
  const { data, isLoading, error, refetch } = useTimeSeriesGlobal();

  const chartData = data?.data || [];

  return (
    <ChartContainer
      title="Global Time Series"
      description="COVID-19 cases over time worldwide"
      isLoading={isLoading}
      error={error?.message}
      onRetry={refetch}
      actions={
        <div className="flex items-center gap-2">
          <Select value={metric} onValueChange={setMetric}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Metrics</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="deaths">Deaths</SelectItem>
              <SelectItem value="recovered">Recovered</SelectItem>
              <SelectItem value="active">Active</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      }
    >
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="ObservationDate"
            className="text-xs"
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            }
          />
          <YAxis className="text-xs" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
            }}
            labelFormatter={(value) => new Date(value).toLocaleDateString()}
          />
          <Legend />
          {(metric === "all" || metric === "confirmed") && (
            <Line
              type="monotone"
              dataKey="Confirmed"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
          )}
          {(metric === "all" || metric === "deaths") && (
            <Line
              type="monotone"
              dataKey="Deaths"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
            />
          )}
          {(metric === "all" || metric === "recovered") && (
            <Line
              type="monotone"
              dataKey="Recovered"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
            />
          )}
          {(metric === "all" || metric === "active") && (
            <Line
              type="monotone"
              dataKey="Active"
              stroke="#f97316"
              strokeWidth={2}
              dot={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

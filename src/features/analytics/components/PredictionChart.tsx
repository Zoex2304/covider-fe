// ============================================================================
// FILE: src/features/analytics/components/PredictionChart.tsx
// ============================================================================
import { useState } from "react";
import ChartContainer from "@/components/charts/ChartContainer";
import { useCountryPrediction } from "@/services/queries/analyticsQueries";
import { useCountriesList } from "@/services/queries/dataTableQueries";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

export default function PredictionChart() {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [days, setDays] = useState(7);

  const { data: countriesData } = useCountriesList();
  const { data, isLoading, error, refetch } = useCountryPrediction(
    selectedCountry,
    days
  );

  const countries = countriesData?.countries || [];

  return (
    <ChartContainer
      title="COVID-19 Case Predictions"
      description="Future case projections based on historical trends"
      isLoading={isLoading}
      error={error?.message}
      onRetry={refetch}
      actions={
        <div className="flex items-center gap-2">
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.slice(0, 50).map((country: string) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={days.toString()}
            onValueChange={(v) => setDays(Number(v))}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 Days</SelectItem>
              <SelectItem value="14">14 Days</SelectItem>
              <SelectItem value="30">30 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <TrendingUp className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      }
    >
      <div className="mb-4 p-4 bg-muted rounded-lg">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Last Actual Date</p>
            <p className="font-semibold">{data?.last_actual_date || "N/A"}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Last Actual Value</p>
            <p className="font-semibold">
              {data?.last_actual_value?.toLocaleString() || "N/A"}
            </p>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="date" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
            }}
          />
          <Legend />
          <ReferenceLine
            x={data?.last_actual_date}
            stroke="hsl(var(--muted-foreground))"
            strokeDasharray="3 3"
            label="Prediction Start"
          />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Actual"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#f97316"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Predicted"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

// ============================================================================
// FILE: src/features/analytics/components/PredictionChart.tsx (FIXED)
// ============================================================================
import { useState, useMemo } from "react";
import ChartContainer from "@/components/charts/ChartContainer";
import { usePredictionData } from "../hooks/usePredictionData";
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
import { TrendingUp, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function PredictionChart() {
  const [selectedCountry, setSelectedCountry] = useState("Andorra");
  const [days, setDays] = useState(7);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: countriesData } = useCountriesList();
  const { data, isLoading, error, refetch } = usePredictionData(selectedCountry, days);

  // Filter countries based on search term
  const filteredCountries = useMemo(() => {
    const countries = countriesData?.countries || [];
    
    if (!searchTerm) return countries;
    
    return countries.filter((country: string) =>
      country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [countriesData, searchTerm]);

  const countries = countriesData?.countries || [];
  const chartData = data?.chartData || [];

  // DEBUG
  console.log('🔍 PredictionChart Debug:', {
    selectedCountry,
    days,
    data,
    chartData,
    chartDataLength: chartData.length,
    totalCountries: countries.length,
    filteredCountries: filteredCountries.length
  });

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
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {/* Search Input */}
              <div className="sticky top-0 z-10 bg-background p-2 border-b">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search country..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
              
              {/* Countries List - TAMPILKAN SEMUA atau hasil filter */}
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country: string) => (
                  <SelectItem key={country} value={country}>
                    {country.trim()}
                  </SelectItem>
                ))
              ) : (
                <div className="p-2 text-center text-muted-foreground text-sm">
                  No countries found
                </div>
              )}
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
      <div className="space-y-4">
        {/* Summary Info */}
        {data && (
          <div className="p-4 bg-muted rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Last Actual Date</p>
                <p className="font-semibold">
                  {new Date(data.lastActualDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Actual Value</p>
                <p className="font-semibold">
                  {data.lastActualValue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Chart */}
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="date" 
                className="text-xs"
                tick={{ fill: 'currentColor' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                className="text-xs"
                tick={{ fill: 'currentColor' }}
                tickFormatter={(value) => {
                  if (value >= 1000000) {
                    return `${(value / 1000000).toFixed(1)}M`;
                  } else if (value >= 1000) {
                    return `${(value / 1000).toFixed(0)}K`;
                  }
                  return value.toLocaleString();
                }}
              />
              <Tooltip
                formatter={(value: number) => [value.toLocaleString(), '']}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
              />
              <Legend />
              <ReferenceLine
                x={data?.lastActualDate}
                stroke="hsl(var(--muted-foreground))"
                strokeDasharray="3 3"
                label={{ value: "Prediction Start", position: "top" }}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Actual Cases"
                dot={false}
                connectNulls={false}
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#f97316"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Predicted Cases"
                dot={{ r: 3 }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[400px] text-muted-foreground">
            {isLoading ? 'Loading...' : 'No prediction data available'}
          </div>
        )}
      </div>
    </ChartContainer>
  );
}
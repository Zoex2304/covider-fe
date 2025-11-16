// ============================================================================
// FILE: src/features/advanced-analytics/components/ReproductionNumberChart.tsx
// ============================================================================
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";
import { useCountriesList } from "@/services/queries/dataTableQueries";
import ChartContainer from "@/components/charts/ChartContainer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LineChart from "@/components/charts/LineChart";
import { Badge } from "@/components/ui/badge";

export default function ReproductionNumberChart() {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const { data: countriesData } = useCountriesList();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["reproduction-number", selectedCountry],
    queryFn: async () => {
      const { data } = await apiClient.get(
        API_ENDPOINTS.REPRODUCTION_NUMBER(selectedCountry),
        { params: { format: "json" } }
      );
      return data;
    },
    enabled: !!selectedCountry,
  });

  const countries = countriesData?.countries || [];

  return (
    <ChartContainer
      title="Effective Reproduction Number (Rt)"
      description="R > 1 indicates growing epidemic, R < 1 indicates decline"
      isLoading={isLoading}
      error={error?.message}
      onRetry={refetch}
      actions={
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {countries.slice(0, 50).map((country: string) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      }
    >
      {data && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">Current Rt</p>
              <p className="text-2xl font-bold">{data.current_rt.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant={data.current_rt > 1 ? "destructive" : "default"}>
                {data.status_text}
              </Badge>
            </div>
          </div>

          <LineChart
            data={data.timeline}
            lines={[
              {
                dataKey: "R_t_Smoothed",
                name: "Reproduction Number",
                color: "#ef4444",
              },
            ]}
            xAxisKey="Date"
            height={400}
          />
        </div>
      )}
    </ChartContainer>
  );
}

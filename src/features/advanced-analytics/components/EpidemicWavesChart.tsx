// ============================================================================
// FILE: src/features/advanced-analytics/components/EpidemicWavesChart.tsx
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

export default function EpidemicWavesChart() {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const { data: countriesData } = useCountriesList();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["epidemic-waves", selectedCountry],
    queryFn: async () => {
      const { data } = await apiClient.get(
        API_ENDPOINTS.EPIDEMIC_WAVES(selectedCountry),
        { params: { format: "json" } }
      );
      return data;
    },
    enabled: !!selectedCountry,
  });

  const countries = countriesData?.countries || [];

  return (
    <ChartContainer
      title="Epidemic Waves Analysis"
      description="Peak detection showing multiple waves of infection"
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
              <p className="text-sm text-muted-foreground">Number of Waves</p>
              <p className="text-2xl font-bold">{data.num_waves}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Country</p>
              <p className="text-2xl font-bold">{data.country}</p>
            </div>
          </div>

          <LineChart
            data={data.peaks}
            lines={[
              {
                dataKey: "MovingAverage",
                name: "7-Day Average",
                color: "#3b82f6",
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

// ============================================================================
// FILE: src/features/advanced-analytics/components/ResilienceChart.tsx
// ============================================================================
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";
import ChartContainer from "@/components/charts/ChartContainer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BarChart from "@/components/charts/BarChart";

export default function ResilienceChart() {
  const [topN, setTopN] = useState(20);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["resilience", topN],
    queryFn: async () => {
      const { data } = await apiClient.get(API_ENDPOINTS.RESILIENCE, {
        params: { top_n: topN, format: "json" },
      });
      return data;
    },
  });

  return (
    <ChartContainer
      title="Epidemic Resilience Index"
      description="Measures how well countries are managing the epidemic"
      isLoading={isLoading}
      error={error?.message}
      onRetry={refetch}
      actions={
        <Select
          value={topN.toString()}
          onValueChange={(v) => setTopN(Number(v))}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">Top 10</SelectItem>
            <SelectItem value="20">Top 20</SelectItem>
            <SelectItem value="30">Top 30</SelectItem>
          </SelectContent>
        </Select>
      }
    >
      {data && (
        <BarChart
          data={data.top_countries}
          bars={[
            {
              dataKey: "ResilienceIndex",
              name: "Resilience Score",
              color: "#22c55e",
            },
          ]}
          yAxisKey="Country/Region"
          layout="vertical"
          height={topN * 25 + 100}
        />
      )}
    </ChartContainer>
  );
}

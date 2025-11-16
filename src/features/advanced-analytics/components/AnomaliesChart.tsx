// ============================================================================
// FILE: src/features/advanced-analytics/components/AnomaliesChart.tsx
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

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import type {
  AnomalyResponse,
  AnomalyItem,
} from "@/types/analytics.types";

export default function AnomaliesChart() {
  // ------------------------------------------------------------------------
  // Strict metric state with union literal type
  // ------------------------------------------------------------------------
  const [metric, setMetric] = useState<"Confirmed" | "Deaths" | "Recovered">(
    "Confirmed"
  );

  // ------------------------------------------------------------------------
  // Fetch anomalies data (typed response)
  // ------------------------------------------------------------------------
  const { data, isLoading, error, refetch } = useQuery<AnomalyResponse>({
    queryKey: ["anomalies", metric],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.ANOMALIES, {
        params: { metric, format: "json" },
      });
      return response.data as AnomalyResponse;
    },
  });

  return (
    <ChartContainer
      title="Anomaly Detection"
      description="Countries with unusual patterns detected using Isolation Forest"
      isLoading={isLoading}
      error={error?.message}
      onRetry={refetch}
      actions={
        <Select
          value={metric}
          onValueChange={(value) =>
            setMetric(value as "Confirmed" | "Deaths" | "Recovered")
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Confirmed">Confirmed</SelectItem>
            <SelectItem value="Deaths">Deaths</SelectItem>
            <SelectItem value="Recovered">Recovered</SelectItem>
          </SelectContent>
        </Select>
      }
    >
      {data && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Total Anomalies Detected:{" "}
            <span className="font-bold">{data.total_anomalies}</span>
          </p>

          <div className="grid gap-3">
            {data.anomalies.map((anomaly: AnomalyItem, index: number) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">
                        {anomaly["Country/Region"]}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {metric}: {anomaly[metric].toLocaleString()}
                      </p>
                    </div>

                    <Badge variant="destructive">
                      Score: {anomaly.AnomalyScore.toFixed(3)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </ChartContainer>
  );
}

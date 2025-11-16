// ============================================================================
// FILE: src/features/advanced-analytics/components/ClusteringChart.tsx
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
  ClusteringResponse,
  ClusterItem,
} from "@/types/analytics.types";

export default function ClusteringChart() {
  const [nClusters, setNClusters] = useState<number>(5);

  const { data, isLoading, error, refetch } = useQuery<ClusteringResponse>({
    queryKey: ["clustering", nClusters],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.CLUSTERING, {
        params: {
          n_clusters: nClusters,
          format: "json",
        },
      });

      return response.data as ClusteringResponse;
    },
  });

  return (
    <ChartContainer
      title="Country Clustering"
      description="Groups countries with similar epidemic patterns using K-Means"
      isLoading={isLoading}
      error={error?.message}
      onRetry={refetch}
      actions={
        <Select
          value={nClusters.toString()}
          onValueChange={(value) => setNClusters(Number(value))}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[3, 4, 5, 6, 7].map((v) => (
              <SelectItem key={v} value={v.toString()}>
                {v} Clusters
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      }
    >
      {data && (
        <div className="grid gap-4">
          {data.clusters.map((cluster: ClusterItem) => (
            <Card key={cluster.cluster_id}>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">
                      Cluster {cluster.cluster_id + 1}
                    </h4>
                    <Badge>{cluster.num_countries} countries</Badge>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Avg Cases</p>
                      <p className="font-semibold">
                        {cluster.avg_confirmed.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Avg Deaths</p>
                      <p className="font-semibold">
                        {cluster.avg_deaths.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Avg CFR</p>
                      <p className="font-semibold">
                        {cluster.avg_cfr.toFixed(2)}%
                      </p>
                    </div>
                  </div>

                  {/* Country samples */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Sample Countries:
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {cluster.countries.slice(0, 10).map((country) => (
                        <Badge key={country} variant="outline">
                          {country}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </ChartContainer>
  );
}

// ============================================================================
// FILE: src/features/analytics/AnalyticsPage.tsx
// ============================================================================
import { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TimeSeriesChart from "./components/TimeSeriesChart";
import GeographicalChart from "./components/GeographicalChart";
import PredictionChart from "./components/PredictionChart";
import ComparisonChart from "./components/ComparisonChart";

export default function AnalyticsPage() {
  const [activeChart, setActiveChart] = useState("timeseries");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Visualize COVID-19 trends with interactive charts"
      />

      <Tabs value={activeChart} onValueChange={setActiveChart}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timeseries">Time Series</TabsTrigger>
          <TabsTrigger value="geographical">Geographical</TabsTrigger>
          <TabsTrigger value="prediction">Predictions</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="timeseries" className="mt-6">
          <TimeSeriesChart />
        </TabsContent>

        <TabsContent value="geographical" className="mt-6">
          <GeographicalChart />
        </TabsContent>

        <TabsContent value="prediction" className="mt-6">
          <PredictionChart />
        </TabsContent>

        <TabsContent value="comparison" className="mt-6">
          <ComparisonChart />
        </TabsContent>
      </Tabs>
    </div>
  );
}

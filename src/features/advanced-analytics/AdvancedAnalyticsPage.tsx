// ============================================================================
// FILE: src/features/advanced-analytics/AdvancedAnalyticsPage.tsx
// ============================================================================
import { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnomaliesChart from "@/features/advanced-analytics/components/AnomaliesChart";
import EpidemicWavesChart from "@/features/advanced-analytics/components/EpidemicWavesChart";
import ReproductionNumberChart from "@/features/advanced-analytics/components/ReproductionNumberChart";
import ClusteringChart from "@/features/advanced-analytics/components/ClusteringChart";
import ResilienceChart from "@/features/advanced-analytics/components/ResilienceChart";


export default function AdvancedAnalyticsPage() {
  const [activeTab, setActiveTab] = useState("anomalies");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Advanced Analytics"
        description="Deep insights using machine learning and statistical methods"
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
          <TabsTrigger value="waves">Epidemic Waves</TabsTrigger>
          <TabsTrigger value="reproduction">R Number</TabsTrigger>
          <TabsTrigger value="clustering">Clustering</TabsTrigger>
          <TabsTrigger value="resilience">Resilience</TabsTrigger>
        </TabsList>

        <TabsContent value="anomalies" className="mt-6">
          <AnomaliesChart />
        </TabsContent>

        <TabsContent value="waves" className="mt-6">
          <EpidemicWavesChart />
        </TabsContent>

        <TabsContent value="reproduction" className="mt-6">
          <ReproductionNumberChart />
        </TabsContent>

        <TabsContent value="clustering" className="mt-6">
          <ClusteringChart />
        </TabsContent>

        <TabsContent value="resilience" className="mt-6">
          <ResilienceChart />
        </TabsContent>
      </Tabs>
    </div>
  );
}

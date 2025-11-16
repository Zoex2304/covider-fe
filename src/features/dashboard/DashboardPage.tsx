// ============================================================================
// FILE: src/features/dashboard/DashboardPage.tsx
// ============================================================================
import PageHeader from "@/components/layout/PageHeader";
import {
  useDashboardSummary,
  useDashboardKPIs,
} from "@/services/queries/dashboardQueries";
import LoadingSpinner from "@/components/feedback/LoadingSpinner";
import ErrorAlert from "@/components/feedback/ErrorAlert";
import KPICard from "./components/KPICard";
import StatsSummary from "./components/StatsSummary";
import TopCountriesTable from "./components/TopCountriesTable";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const {
    data: summary,
    isLoading: summaryLoading,
    error: summaryError,
    refetch: refetchSummary,
  } = useDashboardSummary();

  const {
    data: kpis,
    isLoading: kpisLoading,
    error: kpisError,
    refetch: refetchKPIs,
  } = useDashboardKPIs();

  const handleRefresh = () => {
    refetchSummary();
    refetchKPIs();
  };

  if (summaryLoading || kpisLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  if (summaryError || kpisError) {
    return (
      <ErrorAlert
        title="Failed to load dashboard"
        message="Unable to fetch dashboard data. Please try again."
        onRetry={handleRefresh}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Real-time COVID-19 global statistics and insights"
      >
        <Button onClick={handleRefresh} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </PageHeader>

      {/* KPI Cards Grid */}
      {kpis && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {kpis.kpis.map((kpi: any, index: number) => (
            <KPICard key={index} kpi={kpi} />
          ))}
        </div>
      )}

      {/* Statistics Summary */}
      {summary && (
        <div className="grid gap-4 lg:grid-cols-2">
          <StatsSummary metrics={summary.global_metrics} />
          <TopCountriesTable countries={summary.top_countries} />
        </div>
      )}
    </div>
  );
}

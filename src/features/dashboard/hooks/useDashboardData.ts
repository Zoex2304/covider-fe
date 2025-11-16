// ============================================================================
// FILE: src/features/dashboard/hooks/useDashboardData.ts
// ============================================================================
import { useDashboardSummary, useDashboardKPIs } from '@/services/queries/dashboardQueries';

export function useDashboardData() {
  const summary = useDashboardSummary();
  const kpis = useDashboardKPIs();

  return {
    summary,
    kpis,
    isLoading: summary.isLoading || kpis.isLoading,
    error: summary.error || kpis.error,
    refetch: () => {
      summary.refetch();
      kpis.refetch();
    },
  };
}

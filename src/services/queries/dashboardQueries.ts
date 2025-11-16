// ============================================================================
// FILE: src/services/queries/dashboardQueries.ts
// ============================================================================
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/client";
import { API_ENDPOINTS } from "../api/endpoints";

export const useDashboardSummary = () => {
  return useQuery({
    queryKey: ["dashboard", "summary"],
    queryFn: async () => {
      const { data } = await apiClient.get(API_ENDPOINTS.DASHBOARD_SUMMARY);
      return data;
    },
  });
};

export const useDashboardKPIs = () => {
  return useQuery({
    queryKey: ["dashboard", "kpis"],
    queryFn: async () => {
      const { data } = await apiClient.get(API_ENDPOINTS.DASHBOARD_KPIS);
      return data;
    },
  });
};

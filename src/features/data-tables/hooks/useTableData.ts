// ============================================================================
// FILE: src/features/data-tables/hooks/useTableData.ts
// ============================================================================
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";

interface UseTableDataParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export function useTableData(params: UseTableDataParams = {}) {
  return useQuery({
    queryKey: ["tableData", params],
    queryFn: async () => {
      const { data } = await apiClient.get(API_ENDPOINTS.ALL_DATA, {
        params: {
          page: params.page || 1,
          page_size: params.pageSize || 20,
          sort_by: params.sortBy,
          sort_order: params.sortOrder,
        },
      });
      return data;
    },
  });
}

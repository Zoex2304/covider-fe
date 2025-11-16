// ============================================================================
// FILE: src/services/queries/dataTableQueries.ts
// ============================================================================
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/client";
import { API_ENDPOINTS } from "../api/endpoints";

interface TableParams {
  page?: number;
  page_size?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

export const useAllData = (params: TableParams = {}) => {
  return useQuery({
    queryKey: ["allData", params],
    queryFn: async () => {
      const { data } = await apiClient.get(API_ENDPOINTS.ALL_DATA, { params });
      return data;
    },
  });
};

export const useCountriesList = () => {
  return useQuery({
    queryKey: ["countriesList"],
    queryFn: async () => {
      const { data } = await apiClient.get(API_ENDPOINTS.COUNTRIES_LIST);
      return data;
    },
  });
};

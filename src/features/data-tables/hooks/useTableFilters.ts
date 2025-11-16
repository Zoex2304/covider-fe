// ============================================================================
// FILE: src/features/data-tables/hooks/useTableFilters.ts
// ============================================================================
import { useState, useCallback } from "react";
import { useDebounce } from "@/hooks/useDebounce";

export function useTableFilters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMetric, setSelectedMetric] = useState("Confirmed");
  const [dateRange, setDateRange] = useState<{
    start: string | null;
    end: string | null;
  }>({
    start: null,
    end: null,
  });

  const debouncedSearch = useDebounce(searchQuery, 300);

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedMetric("Confirmed");
    setDateRange({ start: null, end: null });
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    debouncedSearch,
    selectedMetric,
    setSelectedMetric,
    dateRange,
    setDateRange,
    resetFilters,
  };
}

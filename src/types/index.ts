// ============================================================================
// FILE: src/types/index.ts
// ============================================================================
export * from "./dashboard.types";
export * from "./analytics.types";
export * from "./table.types";

// ============================================================================
// FILE: src/stores/filterStore.ts
// ============================================================================
import { create } from "zustand";

interface FilterState {
  selectedCountries: string[];
  selectedMetric: string;
  dateRange: {
    start: string | null;
    end: string | null;
  };
  setSelectedCountries: (countries: string[]) => void;
  setSelectedMetric: (metric: string) => void;
  setDateRange: (start: string | null, end: string | null) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedCountries: [],
  selectedMetric: "Confirmed",
  dateRange: {
    start: null,
    end: null,
  },
  setSelectedCountries: (countries) => set({ selectedCountries: countries }),
  setSelectedMetric: (metric) => set({ selectedMetric: metric }),
  setDateRange: (start, end) => set({ dateRange: { start, end } }),
  resetFilters: () =>
    set({
      selectedCountries: [],
      selectedMetric: "Confirmed",
      dateRange: { start: null, end: null },
    }),
}));

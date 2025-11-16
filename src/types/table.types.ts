// ============================================================================
// FILE: src/types/table.types.ts
// ============================================================================
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";

export interface TableState {
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  globalFilter: string;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  error?: string;
  onRetry?: () => void;
}

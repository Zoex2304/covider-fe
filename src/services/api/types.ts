// ============================================================================
// FILE: src/services/api/types.ts
// ============================================================================
export interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}

export interface PaginationMeta {
  page: number;
  page_size: number;
  total_records: number;
  total_pages: number;
}

export interface PaginatedResponse<T> {
  status: string;
  data: T[];
  pagination: PaginationMeta;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

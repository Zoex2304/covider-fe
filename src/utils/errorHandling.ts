// ============================================================================
// FILE: src/utils/errorHandling.ts
// ============================================================================
import { AxiosError } from "axios";

export interface ApiErrorResponse {
  detail: string;
  status?: number;
}

export function isApiError(
  error: unknown
): error is AxiosError<ApiErrorResponse> {
  return (
    error instanceof Error &&
    "isAxiosError" in error &&
    error.isAxiosError === true
  );
}

export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    if (error.response?.data?.detail) {
      return error.response.data.detail;
    }
    if (error.response?.status === 404) {
      return "Resource not found";
    }
    if (error.response?.status === 500) {
      return "Internal server error";
    }
    if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
}

export function handleApiError(error: unknown): never {
  const message = getErrorMessage(error);
  throw new Error(message);
}

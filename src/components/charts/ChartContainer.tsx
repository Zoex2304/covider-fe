// ============================================================================
// FILE: src/components/charts/ChartContainer.tsx
// ============================================================================
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingSpinner from "../feedback/LoadingSpinner";
import ErrorAlert from "../feedback/ErrorAlert";

interface ChartContainerProps {
  title: string;
  description?: string;
  isLoading?: boolean;
  error?: string;
  onRetry?: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export default function ChartContainer({
  title,
  description,
  isLoading,
  error,
  onRetry,
  children,
  actions,
}: ChartContainerProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && (
              <CardDescription className="mt-1.5">
                {description}
              </CardDescription>
            )}
          </div>
          {actions}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-80">
            <LoadingSpinner text="Loading chart..." />
          </div>
        ) : error ? (
          <ErrorAlert message={error} onRetry={onRetry} />
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}

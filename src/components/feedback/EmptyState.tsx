// ============================================================================
// FILE: src/components/feedback/EmptyState.tsx
// ============================================================================
import { FileQuestion } from "lucide-react";
import { cn } from "@/utils/cn";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12",
        className
      )}
    >
      <div className="mb-4 text-muted-foreground">
        {icon || <FileQuestion className="h-12 w-12" />}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      {description && (
        <p className="mb-4 text-center text-sm text-muted-foreground max-w-sm">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}

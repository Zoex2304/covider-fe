// ============================================================================
// FILE: src/features/dashboard/components/KPICard.tsx
// ============================================================================
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/utils/cn";
import { formatNumber, formatPercentage } from "@/utils/formatters";

interface KPICardProps {
  kpi: {
    label: string;
    value: number | string;
    format: "number" | "percentage" | "string";
    color: string;
    trend?: number;
  };
}

export default function KPICard({ kpi }: KPICardProps) {
  const formatValue = () => {
    if (kpi.format === "number") {
      return formatNumber(kpi.value as number);
    }
    if (kpi.format === "percentage") {
      return kpi.value;
    }
    return kpi.value;
  };

  const trendColor =
    kpi.trend && kpi.trend > 0 ? "text-red-500" : "text-green-500";
  const TrendIcon = kpi.trend && kpi.trend > 0 ? ArrowUpRight : ArrowDownRight;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {kpi.label}
        </CardTitle>
        {kpi.trend !== undefined && (
          <TrendIcon className={cn("h-4 w-4", trendColor)} />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold" style={{ color: kpi.color }}>
          {formatValue()}
        </div>
        {kpi.trend !== undefined && (
          <p className={cn("text-xs mt-1", trendColor)}>
            {kpi.trend > 0 ? "+" : ""}
            {kpi.trend.toFixed(2)}% from last week
          </p>
        )}
      </CardContent>
    </Card>
  );
}

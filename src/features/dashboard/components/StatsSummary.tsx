// ============================================================================
// FILE: src/features/dashboard/components/StatsSummary.tsx
// ============================================================================
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber, formatPercentage, formatDate } from "@/utils/formatters";
import { Activity, TrendingUp, Heart } from "lucide-react";
import { cn } from "@/utils/cn";

interface StatsSummaryProps {
  metrics: {
    total_confirmed: number;
    total_deaths: number;
    total_recovered: number;
    total_active: number;
    global_cfr: number;
    global_recovery_rate: number;
    as_of_date: string;
  };
}

export default function StatsSummary({ metrics }: StatsSummaryProps) {
  const stats = [
    {
      label: "Active Cases",
      value: formatNumber(metrics.total_active),
      icon: Activity,
      color: "text-orange-500",
    },
    {
      label: "Case Fatality Rate",
      value: formatPercentage(metrics.global_cfr),
      icon: TrendingUp,
      color: "text-red-500",
    },
    {
      label: "Recovery Rate",
      value: formatPercentage(metrics.global_recovery_rate),
      icon: Heart,
      color: "text-green-500",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Global Statistics</CardTitle>
        <CardDescription>
          Last updated: {formatDate(metrics.as_of_date)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={cn("rounded-full p-2 bg-muted", stat.color)}>
                <stat.icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">{stat.label}</span>
            </div>
            <Badge variant="secondary" className="text-base font-semibold">
              {stat.value}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
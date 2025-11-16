// ============================================================================
// FILE: src/components/charts/BarChart.tsx
// ============================================================================
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CHART_CONFIG, RECHARTS_THEME } from "@/config/chart.config";

interface BarChartProps {
  data: Array<Record<string, unknown>>;
  bars: Array<{
    dataKey: string;
    name?: string;
    color?: string;
  }>;
  xAxisKey?: string;
  yAxisKey?: string;
  height?: number;
  layout?: "horizontal" | "vertical";
  xAxisFormatter?: (value: unknown) => string;
  yAxisFormatter?: (value: unknown) => string;
}

export default function BarChart({
  data,
  bars,
  xAxisKey,
  yAxisKey,
  height = 400,
  layout = "horizontal",
  xAxisFormatter,
  yAxisFormatter,
}: BarChartProps) {
  const isVertical = layout === "vertical";

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} layout={layout}>
        <CartesianGrid {...RECHARTS_THEME.grid} />
        <XAxis
          type={isVertical ? "number" : "category"}
          dataKey={isVertical ? undefined : xAxisKey}
          tickFormatter={xAxisFormatter}
          style={RECHARTS_THEME.axis}
        />
        <YAxis
          type={isVertical ? "category" : "number"}
          dataKey={isVertical ? yAxisKey : undefined}
          tickFormatter={yAxisFormatter}
          style={RECHARTS_THEME.axis}
          width={isVertical ? 120 : undefined}
        />
        <Tooltip {...RECHARTS_THEME.tooltip} />
        <Legend />
        {bars.map((bar) => (
          <Bar
            key={bar.dataKey}
            dataKey={bar.dataKey}
            name={bar.name || bar.dataKey}
            fill={bar.color || CHART_CONFIG.colors.confirmed}
            radius={isVertical ? [0, 4, 4, 0] : [4, 4, 0, 0]}
            animationDuration={CHART_CONFIG.animation.duration}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

// ============================================================================
// FILE: src/components/charts/ScatterChart.tsx
// ============================================================================
import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CHART_CONFIG, RECHARTS_THEME } from "@/config/chart.config";

interface ScatterChartProps {
  data: Array<Record<string, unknown>>;
  xKey: string;
  yKey: string;
  nameKey?: string;
  color?: string;
  height?: number;
  xAxisFormatter?: (value: unknown) => string;
  yAxisFormatter?: (value: unknown) => string;
}

export default function ScatterChart({
  data,
  xKey,
  yKey,
  nameKey,
  color = CHART_CONFIG.colors.confirmed,
  height = 400,
  xAxisFormatter,
  yAxisFormatter,
}: ScatterChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsScatterChart>
        <CartesianGrid {...RECHARTS_THEME.grid} />
        <XAxis
          dataKey={xKey}
          tickFormatter={xAxisFormatter}
          style={RECHARTS_THEME.axis}
          type="number"
        />
        <YAxis
          dataKey={yKey}
          tickFormatter={yAxisFormatter}
          style={RECHARTS_THEME.axis}
          type="number"
        />
        <Tooltip
          {...RECHARTS_THEME.tooltip}
          cursor={{ strokeDasharray: "3 3" }}
        />
        <Legend />
        <Scatter
          name={nameKey || "Data"}
          data={data}
          fill={color}
          animationDuration={CHART_CONFIG.animation.duration}
        />
      </RechartsScatterChart>
    </ResponsiveContainer>
  );
}

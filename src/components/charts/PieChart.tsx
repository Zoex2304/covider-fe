// ============================================================================
// FILE: src/components/charts/PieChart.tsx
// ============================================================================
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CHART_CONFIG } from "@/config/chart.config";

interface PieChartProps {
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
  height?: number;
  showLegend?: boolean;
  innerRadius?: number;
  outerRadius?: number;
}

const DEFAULT_COLORS = [
  CHART_CONFIG.colors.confirmed,
  CHART_CONFIG.colors.deaths,
  CHART_CONFIG.colors.recovered,
  CHART_CONFIG.colors.active,
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
];

export default function PieChart({
  data,
  height = 400,
  showLegend = true,
  innerRadius = 0,
  outerRadius = 100,
}: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={2}
          dataKey="value"
          label={(entry) => `${entry.name}: ${entry.value}`}
          animationDuration={CHART_CONFIG.animation.duration}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                entry.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length]
              }
            />
          ))}
        </Pie>
        <Tooltip />
        {showLegend && <Legend />}
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}

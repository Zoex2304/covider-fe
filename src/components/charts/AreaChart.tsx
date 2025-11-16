// ============================================================================
// FILE: src/components/charts/AreaChart.tsx
// ============================================================================
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CHART_CONFIG, RECHARTS_THEME } from "@/config/chart.config";

interface AreaChartProps {
  data: Array<Record<string, unknown>>;
  areas: Array<{
    dataKey: string;
    name?: string;
    color?: string;
    stackId?: string;
  }>;
  xAxisKey: string;
  height?: number;
  xAxisFormatter?: (value: unknown) => string;
  yAxisFormatter?: (value: unknown) => string;
}

export default function AreaChart({
  data,
  areas,
  xAxisKey,
  height = 400,
  xAxisFormatter,
  yAxisFormatter,
}: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsAreaChart data={data}>
        <defs>
          {areas.map((area, index) => (
            <linearGradient
              key={area.dataKey}
              id={`color${area.dataKey}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={area.color || CHART_CONFIG.colors.confirmed}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={area.color || CHART_CONFIG.colors.confirmed}
                stopOpacity={0.1}
              />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid {...RECHARTS_THEME.grid} />
        <XAxis
          dataKey={xAxisKey}
          tickFormatter={xAxisFormatter}
          style={RECHARTS_THEME.axis}
        />
        <YAxis tickFormatter={yAxisFormatter} style={RECHARTS_THEME.axis} />
        <Tooltip {...RECHARTS_THEME.tooltip} />
        <Legend />
        {areas.map((area) => (
          <Area
            key={area.dataKey}
            type="monotone"
            dataKey={area.dataKey}
            name={area.name || area.dataKey}
            stroke={area.color || CHART_CONFIG.colors.confirmed}
            fillOpacity={1}
            fill={`url(#color${area.dataKey})`}
            stackId={area.stackId}
            animationDuration={CHART_CONFIG.animation.duration}
          />
        ))}
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}

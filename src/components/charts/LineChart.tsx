// ============================================================================
// FILE: src/components/charts/LineChart.tsx
// ============================================================================
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { CHART_CONFIG, RECHARTS_THEME } from '@/config/chart.config';

interface LineChartProps {
  data: Array<Record<string, unknown>>;
  lines: Array<{
    dataKey: string;
    name?: string;
    color?: string;
  }>;
  xAxisKey: string;
  height?: number;
  xAxisFormatter?: (value: unknown) => string;
  yAxisFormatter?: (value: unknown) => string;
  tooltipFormatter?: (value: unknown) => string;
}

// Custom Tooltip Component
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    dataKey: string;
  }>;
  label?: string;
  labelFormatter?: (value: unknown) => string;
  valueFormatter?: (value: unknown) => string;
}

function CustomTooltip({ 
  active, 
  payload, 
  label, 
  labelFormatter, 
  valueFormatter 
}: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="bg-background border border-border rounded-lg shadow-lg p-3">
      <p className="text-sm font-medium mb-2">
        {labelFormatter ? labelFormatter(label) : label}
      </p>
      <div className="space-y-1">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium">
              {valueFormatter ? valueFormatter(entry.value) : entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LineChart({
  data,
  lines,
  xAxisKey,
  height = 400,
  xAxisFormatter,
  yAxisFormatter,
  tooltipFormatter,
}: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data}>
        <CartesianGrid {...RECHARTS_THEME.grid} />
        <XAxis
          dataKey={xAxisKey}
          tickFormatter={xAxisFormatter}
          style={RECHARTS_THEME.axis}
        />
        <YAxis tickFormatter={yAxisFormatter} style={RECHARTS_THEME.axis} />
        <Tooltip
          content={
            <CustomTooltip
              labelFormatter={xAxisFormatter}
              valueFormatter={tooltipFormatter}
            />
          }
        />
        <Legend />
        {lines.map((line) => (
          <Line
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            name={line.name || line.dataKey}
            stroke={line.color || CHART_CONFIG.colors.confirmed}
            strokeWidth={2}
            dot={false}
            animationDuration={CHART_CONFIG.animation.duration}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
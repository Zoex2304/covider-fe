// ============================================================================
// FILE: src/config/chart.config.ts (ENHANCED)
// ============================================================================
export const CHART_CONFIG = {
  colors: {
    confirmed: '#3b82f6',
    deaths: '#ef4444',
    recovered: '#22c55e',
    active: '#f97316',
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    accent: '#f59e0b',
  },
  animation: {
    duration: 750,
    easing: 'ease-in-out' as const,
  },
  responsive: {
    minHeight: 300,
    maxHeight: 600,
  },
  gradients: {
    confirmed: ['#3b82f6', '#1e40af'],
    deaths: ['#ef4444', '#991b1b'],
    recovered: ['#22c55e', '#15803d'],
    active: ['#f97316', '#c2410c'],
  },
} as const;

export const RECHARTS_THEME = {
  grid: {
    strokeDasharray: '3 3' as const,
    strokeOpacity: 0.3,
  },
  tooltip: {
    contentStyle: {
      backgroundColor: 'hsl(var(--popover))',
      border: '1px solid hsl(var(--border))',
      borderRadius: '6px',
    },
  },
  axis: {
    fontSize: 12,
    fontFamily: 'inherit',
  },
} as const;


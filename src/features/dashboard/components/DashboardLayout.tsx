// ============================================================================
// FILE: src/features/dashboard/components/DashboardLayout.tsx
// ============================================================================
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  header?: ReactNode;
  kpis?: ReactNode;
  mainContent?: ReactNode;
  sidebar?: ReactNode;
}

export default function DashboardLayout({
  header,
  kpis,
  mainContent,
  sidebar,
}: DashboardLayoutProps) {
  return (
    <div className="space-y-6">
      {header}
      {kpis}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">{mainContent}</div>
        {sidebar && <div className="space-y-6">{sidebar}</div>}
      </div>
    </div>
  );
}

// ============================================================================
// FILE: src/components/layout/Sidebar.tsx (UPDATED with Advanced Analytics)
// ============================================================================
import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/cn';
import {
  LayoutDashboard,
  LineChart,
  Table,
  Globe,
  FileText,
  Activity,
  Brain,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: LineChart,
  },
  {
    title: 'Advanced Analytics',
    href: '/advanced-analytics',
    icon: Brain,
  },
  {
    title: 'Data Tables',
    href: '/data-tables',
    icon: Table,
  },
  {
    title: 'Countries',
    href: '/countries',
    icon: Globe,
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: FileText,
  },
];

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn('pb-12 w-64 border-r bg-card', className)}>
      <div className="space-y-4 py-4">
        {/* Logo Section */}
        <div className="px-6 py-2">
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-primary" />
            <h2 className="text-lg font-bold tracking-tight">COVID-19 Tracker</h2>
          </div>
        </div>
        
        <Separator />
        
        {/* Navigation */}
        <ScrollArea className="px-3 py-2">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent',
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </NavLink>
            ))}
          </div>
        </ScrollArea>
        
        <Separator />
        
        {/* Footer Section */}
        <div className="px-6 py-2">
          <p className="text-xs text-muted-foreground">
            Real-time COVID-19 statistics and analytics
          </p>
        </div>
      </div>
    </div>
  );
}

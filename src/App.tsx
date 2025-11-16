import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './providers/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import MainLayout from './components/layout/MainLayout';
import DashboardPage from './features/dashboard/DashboardPage';
import AnalyticsPage from './features/analytics/AnalyticsPage';
import DataTablesPage from './features/data-tables/DataTablesPage';
import CountriesPage from './features/countries/CountriesPage';
import ReportsPage from './features/reports/ReportsPage';

// React Query client configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="covid-dashboard-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="data-tables" element={<DataTablesPage />} />
              <Route path="countries" element={<CountriesPage />} />
              <Route path="reports" element={<ReportsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

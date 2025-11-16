// ============================================================================
// FILE: src/features/data-tables/DataTablesPage.tsx
// ============================================================================
import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProcessedDataTable from './components/ProcessedDataTable';
import RawDataTable from './components/RawDataTable';

export default function DataTablesPage() {
  const [activeTab, setActiveTab] = useState('processed');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Data Tables"
        description="Browse and analyze COVID-19 data with advanced filtering and sorting"
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="processed">Processed Data</TabsTrigger>
          <TabsTrigger value="raw">Raw Data</TabsTrigger>
        </TabsList>

        <TabsContent value="processed" className="mt-6">
          <ProcessedDataTable />
        </TabsContent>

        <TabsContent value="raw" className="mt-6">
          <RawDataTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}

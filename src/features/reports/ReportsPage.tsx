// ============================================================================
// FILE: src/features/reports/ReportsPage.tsx (FIXED - SONNER TOAST)
// ============================================================================
import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image, Download } from 'lucide-react';
import ImageModal from './components/ImageModal';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { toast } from "sonner"; // <-- FIX: gunakan sonner, bukan useToast()

const REPORT_IMAGES = [
  {
    id: 'time-series',
    title: 'Time Series Report',
    description: 'Global timeline visualization',
    endpoint: API_ENDPOINTS.TIME_SERIES_CHART,
  },
  {
    id: 'geographical',
    title: 'Geographical Report',
    description: 'Top countries by cases',
    endpoint: API_ENDPOINTS.GEOGRAPHICAL_CHART,
  },
  {
    id: 'dashboard',
    title: 'Dashboard Report',
    description: 'Comprehensive overview',
    endpoint: API_ENDPOINTS.DASHBOARD_CHART,
  },
  {
    id: 'correlation',
    title: 'Correlation Heatmap',
    description: 'Metric correlations',
    endpoint: API_ENDPOINTS.CORRELATION_HEATMAP,
  },
];

export default function ReportsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewImage = (endpoint: string) => {
    setSelectedImage(endpoint);
    setModalOpen(true);
  };

  const handleDownload = async (endpoint: string, filename: string) => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success(`Downloaded ${filename}`); // <-- sonner toast
    } catch (error) {
      console.error('Download failed:', error);
      toast.error("Download failed. Please try again."); // <-- sonner toast
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Backend-generated visualization reports and images"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {REPORT_IMAGES.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                {report.title}
              </CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={() => handleViewImage(report.endpoint)}
                >
                  View Image
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handleDownload(report.endpoint, `${report.id}.png`)
                  }
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ImageModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        imageUrl={selectedImage || ''}
      />
    </div>
  );
}

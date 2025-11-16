// ============================================================================
// FILE: src/features/reports/components/ReportGallery.tsx
// ============================================================================
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image, Download, Eye } from "lucide-react";

interface ReportItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl?: string;
}

interface ReportGalleryProps {
  reports: ReportItem[];
  onView: (imageUrl: string) => void;
  onDownload: (imageUrl: string, filename: string) => void;
}

export default function ReportGallery({
  reports,
  onView,
  onDownload,
}: ReportGalleryProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {reports.map((report) => (
        <Card key={report.id} className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Image className="h-5 w-5" />
              {report.title}
            </CardTitle>
            <CardDescription>{report.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Thumbnail Preview */}
            <div
              className="aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => onView(report.imageUrl)}
            >
              {report.thumbnailUrl ? (
                <img
                  src={report.thumbnailUrl}
                  alt={report.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Image className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="default"
                className="flex-1"
                onClick={() => onView(report.imageUrl)}
              >
                <Eye className="mr-2 h-4 w-4" />
                View
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onDownload(report.imageUrl, `${report.id}.png`)}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

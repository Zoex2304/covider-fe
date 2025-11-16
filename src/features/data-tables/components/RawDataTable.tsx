// ============================================================================
// FILE: src/features/data-tables/components/RawDataTable.tsx
// ============================================================================
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function RawDataTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Raw COVID-19 Data</CardTitle>
        <CardDescription>
          Unprocessed data from the original source
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Raw data table implementation follows the same pattern as
            ProcessedDataTable. Connect to your raw data endpoint and customize
            columns as needed.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}

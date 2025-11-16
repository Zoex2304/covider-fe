// ============================================================================
// FILE: src/features/dashboard/components/TopCountriesTable.tsx
// ============================================================================
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/utils/formatters";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface TopCountriesTableProps {
  countries: Array<{
    "Country/Region": string;
    Confirmed: number;
    Deaths: number;
    Recovered: number;
    Active: number;
  }>;
}

export default function TopCountriesTable({
  countries,
}: TopCountriesTableProps) {
  const topCountries = countries.slice(0, 10);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 10 Affected Countries</CardTitle>
        <CardDescription>
          Countries with highest confirmed cases
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Country</TableHead>
              <TableHead className="text-right">Confirmed</TableHead>
              <TableHead className="text-right">Deaths</TableHead>
              <TableHead className="text-right">Active</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topCountries.map((country, index) => (
              <TableRow key={country["Country/Region"]}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">
                  {country["Country/Region"]}
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary">
                    {formatNumber(country.Confirmed)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-red-500">
                  {formatNumber(country.Deaths)}
                </TableCell>
                <TableCell className="text-right text-orange-500">
                  {formatNumber(country.Active)}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// FILE: src/features/data-tables/components/DataTableColumns.tsx
// ============================================================================
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { formatNumber, formatDate } from "@/utils/formatters";

export interface CovidDataRow {
  "Country/Region": string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  CFR?: number;
  RecoveryRate?: number;
  ObservationDate: string;
}

export const createCovidDataColumns = (): ColumnDef<CovidDataRow>[] => [
  {
    accessorKey: "Country/Region",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Country
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("Country/Region")}</div>
    ),
  },
  {
    accessorKey: "Confirmed",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Confirmed
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-blue-600 font-semibold">
        {formatNumber(row.getValue("Confirmed"))}
      </div>
    ),
  },
  {
    accessorKey: "Deaths",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Deaths
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-red-600 font-semibold">
        {formatNumber(row.getValue("Deaths"))}
      </div>
    ),
  },
  {
    accessorKey: "Recovered",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Recovered
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-green-600 font-semibold">
        {formatNumber(row.getValue("Recovered"))}
      </div>
    ),
  },
  {
    accessorKey: "Active",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Active
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-orange-600 font-semibold">
        {formatNumber(row.getValue("Active"))}
      </div>
    ),
  },
  {
    accessorKey: "ObservationDate",
    header: "Last Updated",
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {formatDate(row.getValue("ObservationDate"))}
      </div>
    ),
  },
];

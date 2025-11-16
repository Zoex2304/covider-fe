// ============================================================================
// FILE: src/features/data-tables/components/ProcessedDataTable.tsx
// ============================================================================
import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import type { ColumnDef, SortingState, ColumnFiltersState } from '@tanstack/react-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  ChevronDown, 
  Search, 
  Download, 
  ArrowUpDown, 
  Filter,
  X
} from 'lucide-react';
import { useAllData } from '@/services/queries/dataTableQueries';
import LoadingSpinner from '@/components/feedback/LoadingSpinner';
import ErrorAlert from '@/components/feedback/ErrorAlert';
import { formatNumber, formatDate } from '@/utils/formatters';
import DataTablePagination from './DataTablePagination';

interface DataRow {
  ObservationDate: string;
  'Province/State': string;
  'Country/Region': string;
  LastUpdate: string | null;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Year: number;
  Month: number;
  Day: number;
  DayOfWeek: number;
  WeekOfYear: number;
  Quarter: number;
  DayOfYear: number;
  CFR: number;
  RecoveryRate: number;
  ActiveRate: number;
  population_2024: number | null;
  image_url: string | null;
  alpha2: string | null;
  alpha3: string | null;
  region: string | null;
  subregion: string | null;
}

export default function ProcessedDataTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  const { data, isLoading, error, refetch } = useAllData({
    page: pagination.pageIndex + 1,
    page_size: pagination.pageSize,
  });

  // Advanced filter state
  const [regionFilter, setRegionFilter] = useState<string>('');
  const [cfrRange, setCfrRange] = useState<[number, number]>([0, 10]);
  const [recoveryRange, setRecoveryRange] = useState<[number, number]>([0, 100]);

  const columns: ColumnDef<DataRow>[] = useMemo(
    () => [
      {
        accessorKey: 'Country/Region',
        header: ({ column }) => (
          <div className="space-y-3">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold">Country</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                className="h-6 w-6 p-0 hover:bg-transparent"
              >
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </div>
            <Input
              placeholder="Search..."
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(e) => column.setFilterValue(e.target.value)}
              className="h-8 text-sm"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="font-medium min-w-[150px] py-3">
            {row.getValue('Country/Region')}
          </div>
        ),
        size: 180,
      },
      {
        accessorKey: 'Province/State',
        header: ({ column }) => (
          <div className="space-y-3">
            <div className="text-sm font-semibold">Province/State</div>
            <Input
              placeholder="Filter..."
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(e) => column.setFilterValue(e.target.value)}
              className="h-8 text-sm"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-muted-foreground min-w-[120px] py-3">
            {row.getValue('Province/State') || 'Unknown'}
          </div>
        ),
        size: 150,
      },
      {
        accessorKey: 'Confirmed',
        header: ({ column }) => (
          <div className="space-y-3">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold">Confirmed</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                className="h-6 w-6 p-0 hover:bg-transparent"
              >
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </div>
            <Input
              placeholder="Min..."
              type="number"
              value={(column.getFilterValue() as [number, number])?.[0] ?? ''}
              onChange={(e) => {
                const value = e.target.value;
                column.setFilterValue((old: [number, number]) => [
                  value ? Number(value) : undefined,
                  old?.[1],
                ]);
              }}
              className="h-8 text-sm"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-blue-600 font-semibold min-w-[120px] py-3">
            {formatNumber(row.getValue('Confirmed'))}
          </div>
        ),
        size: 140,
      },
      {
        accessorKey: 'Deaths',
        header: ({ column }) => (
          <div className="space-y-3">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold">Deaths</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                className="h-6 w-6 p-0 hover:bg-transparent"
              >
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </div>
            <Input
              placeholder="Min..."
              type="number"
              value={(column.getFilterValue() as [number, number])?.[0] ?? ''}
              onChange={(e) => {
                const value = e.target.value;
                column.setFilterValue((old: [number, number]) => [
                  value ? Number(value) : undefined,
                  old?.[1],
                ]);
              }}
              className="h-8 text-sm"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-red-600 font-semibold min-w-[100px] py-3">
            {formatNumber(row.getValue('Deaths'))}
          </div>
        ),
        size: 120,
      },
      {
        accessorKey: 'Recovered',
        header: ({ column }) => (
          <div className="space-y-3">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold">Recovered</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                className="h-6 w-6 p-0 hover:bg-transparent"
              >
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </div>
            <Input
              placeholder="Min..."
              type="number"
              value={(column.getFilterValue() as [number, number])?.[0] ?? ''}
              onChange={(e) => {
                const value = e.target.value;
                column.setFilterValue((old: [number, number]) => [
                  value ? Number(value) : undefined,
                  old?.[1],
                ]);
              }}
              className="h-8 text-sm"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-green-600 font-semibold min-w-[120px] py-3">
            {formatNumber(row.getValue('Recovered'))}
          </div>
        ),
        size: 140,
      },
      {
        accessorKey: 'Active',
        header: ({ column }) => (
          <div className="space-y-3">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold">Active</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                className="h-6 w-6 p-0 hover:bg-transparent"
              >
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </div>
            <Input
              placeholder="Min..."
              type="number"
              value={(column.getFilterValue() as [number, number])?.[0] ?? ''}
              onChange={(e) => {
                const value = e.target.value;
                column.setFilterValue((old: [number, number]) => [
                  value ? Number(value) : undefined,
                  old?.[1],
                ]);
              }}
              className="h-8 text-sm"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-orange-600 font-semibold min-w-[100px] py-3">
            {formatNumber(row.getValue('Active'))}
          </div>
        ),
        size: 120,
      },
      {
        accessorKey: 'CFR',
        header: ({ column }) => (
          <div className="space-y-3">
            <div className="text-sm font-semibold">CFR (%)</div>
            <Input
              placeholder="Min %"
              type="number"
              step="0.1"
              value={(column.getFilterValue() as [number, number])?.[0] ?? ''}
              onChange={(e) => {
                const value = e.target.value;
                column.setFilterValue((old: [number, number]) => [
                  value ? Number(value) : undefined,
                  old?.[1],
                ]);
              }}
              className="h-8 text-sm"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-red-500 font-medium min-w-[80px] py-3">
            {Number(row.getValue('CFR')).toFixed(2)}%
          </div>
        ),
        size: 110,
      },
      {
        accessorKey: 'RecoveryRate',
        header: ({ column }) => (
          <div className="space-y-3">
            <div className="text-sm font-semibold">Recovery (%)</div>
            <Input
              placeholder="Min %"
              type="number"
              step="0.1"
              value={(column.getFilterValue() as [number, number])?.[0] ?? ''}
              onChange={(e) => {
                const value = e.target.value;
                column.setFilterValue((old: [number, number]) => [
                  value ? Number(value) : undefined,
                  old?.[1],
                ]);
              }}
              className="h-8 text-sm"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-green-500 font-medium min-w-[80px] py-3">
            {Number(row.getValue('RecoveryRate')).toFixed(2)}%
          </div>
        ),
        size: 110,
      },
      {
        accessorKey: 'ActiveRate',
        header: ({ column }) => (
          <div className="space-y-3">
            <div className="text-sm font-semibold">Active (%)</div>
            <Input
              placeholder="Min %"
              type="number"
              step="0.1"
              value={(column.getFilterValue() as [number, number])?.[0] ?? ''}
              onChange={(e) => {
                const value = e.target.value;
                column.setFilterValue((old: [number, number]) => [
                  value ? Number(value) : undefined,
                  old?.[1],
                ]);
              }}
              className="h-8 text-sm"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-orange-500 font-medium min-w-[80px] py-3">
            {Number(row.getValue('ActiveRate')).toFixed(2)}%
          </div>
        ),
        size: 110,
      },
      {
        accessorKey: 'population_2024',
        header: ({ column }) => (
          <div className="space-y-3">
            <div className="text-sm font-semibold">Population</div>
            <Input
              placeholder="Min..."
              type="number"
              value={(column.getFilterValue() as [number, number])?.[0] ?? ''}
              onChange={(e) => {
                const value = e.target.value;
                column.setFilterValue((old: [number, number]) => [
                  value ? Number(value) : undefined,
                  old?.[1],
                ]);
              }}
              className="h-8 text-sm"
            />
          </div>
        ),
        cell: ({ row }) => {
          const population = row.getValue('population_2024') as number | null;
          return (
            <div className="text-muted-foreground min-w-[130px] py-3">
              {population ? formatNumber(population) : 'N/A'}
            </div>
          );
        },
        size: 140,
      },
      {
        accessorKey: 'region',
        header: ({ column }) => (
          <div className="space-y-3">
            <div className="text-sm font-semibold">Region</div>
            <Input
              placeholder="Filter region..."
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(e) => column.setFilterValue(e.target.value)}
              className="h-8 text-sm"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-muted-foreground min-w-[120px] py-3">
            {row.getValue('region') || 'N/A'}
          </div>
        ),
        size: 140,
      },
      {
        accessorKey: 'subregion',
        header: ({ column }) => (
          <div className="space-y-3">
            <div className="text-sm font-semibold">Subregion</div>
            <Input
              placeholder="Filter subregion..."
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(e) => column.setFilterValue(e.target.value)}
              className="h-8 text-sm"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-muted-foreground min-w-[150px] py-3">
            {row.getValue('subregion') || 'N/A'}
          </div>
        ),
        size: 160,
      },
      {
        accessorKey: 'ObservationDate',
        header: () => (
          <div className="space-y-3">
            <div className="text-sm font-semibold">Observation Date</div>
            <div className="h-8"></div> {/* Spacer for alignment */}
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-muted-foreground min-w-[150px] py-3">
            {formatDate(row.getValue('ObservationDate'))}
          </div>
        ),
        size: 160,
      },
      {
        accessorKey: 'Year',
        header: ({ column }) => (
          <div className="space-y-3">
            <div className="text-sm font-semibold text-center">Year</div>
            <Input
              placeholder="Filter..."
              type="number"
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(e) => column.setFilterValue(e.target.value)}
              className="h-8 text-sm"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-muted-foreground min-w-[80px] text-center py-3">
            {row.getValue('Year')}
          </div>
        ),
        size: 100,
      },
      {
        accessorKey: 'Month',
        header: ({ column }) => (
          <div className="space-y-3">
            <div className="text-sm font-semibold text-center">Month</div>
            <Input
              placeholder="Filter..."
              type="number"
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(e) => column.setFilterValue(e.target.value)}
              className="h-8 text-sm"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-muted-foreground min-w-[80px] text-center py-3">
            {row.getValue('Month')}
          </div>
        ),
        size: 100,
      },
      {
        accessorKey: 'Quarter',
        header: ({ column }) => (
          <div className="space-y-3">
            <div className="text-sm font-semibold text-center">Quarter</div>
            <Input
              placeholder="Filter..."
              type="number"
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(e) => column.setFilterValue(e.target.value)}
              className="h-8 text-sm"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-muted-foreground min-w-[80px] text-center py-3">
            Q{row.getValue('Quarter')}
          </div>
        ),
        size: 100,
      },
    ],
    []
  );

  const table = useReactTable({
    data: data?.data || [],
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: data?.pagination?.total_pages || 0,
  });

  // Get unique regions for advanced filter
  const uniqueRegions = useMemo(() => {
    const regions = data?.data?.map(item => item.region).filter(Boolean) || [];
    return Array.from(new Set(regions)).sort();
  }, [data?.data]);

  // Apply advanced filters
  const applyAdvancedFilters = () => {
    const newFilters: ColumnFiltersState = [];
    
    if (regionFilter) {
      newFilters.push({
        id: 'region',
        value: regionFilter
      });
    }
    
    if (cfrRange[0] > 0 || cfrRange[1] < 10) {
      newFilters.push({
        id: 'CFR',
        value: cfrRange
      });
    }

    if (recoveryRange[0] > 0 || recoveryRange[1] < 100) {
      newFilters.push({
        id: 'RecoveryRate',
        value: recoveryRange
      });
    }

    setColumnFilters(newFilters);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setColumnFilters([]);
    setGlobalFilter('');
    setRegionFilter('');
    setCfrRange([0, 10]);
    setRecoveryRange([0, 100]);
  };

  const handleExportCSV = () => {
    console.log('Exporting CSV...');
  };

  // Count active filters
  const activeFilterCount = columnFilters.length + (globalFilter ? 1 : 0);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12">
          <LoadingSpinner size="lg" text="Loading data..." />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-6">
          <ErrorAlert
            message="Failed to load data. Please try again."
            onRetry={() => refetch()}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Processed COVID-19 Data</CardTitle>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {activeFilterCount} active filter(s)
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="h-4 w-4 p-0 hover:bg-transparent"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search across all columns..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Advanced Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Advanced Filters
                  {activeFilterCount > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Advanced Filters</span>
                  {activeFilterCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="h-6 text-xs"
                    >
                      Clear All
                    </Button>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <div className="p-4 space-y-4">
                  {/* Region Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Region</label>
                    <select
                      value={regionFilter}
                      onChange={(e) => setRegionFilter(e.target.value)}
                      className="w-full p-2 border rounded-md text-sm bg-background"
                    >
                      <option value="">All Regions</option>
                      {uniqueRegions.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>

                  {/* CFR Range Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Case Fatality Rate (%)</label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Min"
                        value={cfrRange[0]}
                        onChange={(e) => setCfrRange([Number(e.target.value), cfrRange[1]])}
                        className="text-sm"
                      />
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Max"
                        value={cfrRange[1]}
                        onChange={(e) => setCfrRange([cfrRange[0], Number(e.target.value)])}
                        className="text-sm"
                      />
                    </div>
                  </div>

                  {/* Recovery Rate Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Recovery Rate (%)</label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Min"
                        value={recoveryRange[0]}
                        onChange={(e) => setRecoveryRange([Number(e.target.value), recoveryRange[1]])}
                        className="text-sm"
                      />
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Max"
                        value={recoveryRange[1]}
                        onChange={(e) => setRecoveryRange([recoveryRange[0], Number(e.target.value)])}
                        className="text-sm"
                      />
                    </div>
                  </div>

                  <Button onClick={applyAdvancedFilters} className="w-full">
                    Apply Filters
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  Columns
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                        className="capitalize"
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Table Container with Horizontal Scroll */}
        <div className="rounded-md border">
          <div className="overflow-auto">
            <div className="min-w-full inline-block align-middle">
              <Table className="min-w-full">
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead 
                          key={header.id}
                          style={{ 
                            width: header.getSize(),
                            minWidth: header.getSize()
                          }}
                          className="sticky top-0 bg-background border-b p-3"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                        className="hover:bg-muted/50"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell 
                            key={cell.id}
                            style={{ 
                              width: cell.column.getSize(),
                              minWidth: cell.column.getSize()
                            }}
                            className="p-1"
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell 
                        colSpan={columns.length} 
                        className="h-24 text-center p-6"
                        style={{ width: '100%' }}
                      >
                        <div className="text-muted-foreground">
                          No results found. Try adjusting your filters.
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <DataTablePagination table={table} />
        </div>
      </CardContent>
    </Card>
  );
}
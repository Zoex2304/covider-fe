# ================================================
# Generate Folder & Empty File Structure
# COVID Dashboard Architecture
# ================================================

function New-FolderSafe {
    param([string]$path)
    if (Test-Path $path) {
        Write-Host "Folder exists: $path"
    } else {
        New-Item -ItemType Directory -Path $path | Out-Null
        Write-Host "Created folder: $path"
    }
}

function New-FileSafe {
    param([string]$path)
    if (Test-Path $path) {
        Write-Host "File exists: $path"
    } else {
        New-Item -ItemType File -Path $path | Out-Null
        Write-Host "Created file: $path"
    }
}

# Root folder
$root = Get-Location

# ------------------------------
# Public
# ------------------------------
New-FolderSafe "$root/public"
New-FileSafe "$root/public/favicon.ico"

# ------------------------------
# src/app
# ------------------------------
New-FolderSafe "$root/src"
New-FolderSafe "$root/src/app"
New-FileSafe "$root/src/app/App.tsx"
New-FileSafe "$root/src/app/Router.tsx"
New-FolderSafe "$root/src/app/providers"
New-FileSafe "$root/src/app/providers/ThemeProvider.tsx"
New-FileSafe "$root/src/app/providers/QueryProvider.tsx"
New-FileSafe "$root/src/app/providers/AppProviders.tsx"

# ------------------------------
# src/features
# ------------------------------
New-FolderSafe "$root/src/features"

# -- dashboard
New-FolderSafe "$root/src/features/dashboard"
New-FolderSafe "$root/src/features/dashboard/components"
New-FileSafe "$root/src/features/dashboard/components/DashboardLayout.tsx"
New-FileSafe "$root/src/features/dashboard/components/KPICard.tsx"
New-FileSafe "$root/src/features/dashboard/components/StatsSummary.tsx"
New-FileSafe "$root/src/features/dashboard/components/DashboardChartView.tsx"
New-FolderSafe "$root/src/features/dashboard/hooks"
New-FileSafe "$root/src/features/dashboard/hooks/useDashboardData.ts"
New-FileSafe "$root/src/features/dashboard/DashboardPage.tsx"

# -- analytics
New-FolderSafe "$root/src/features/analytics"
New-FolderSafe "$root/src/features/analytics/components"
New-FileSafe "$root/src/features/analytics/components/TimeSeriesChart.tsx"
New-FileSafe "$root/src/features/analytics/components/GeographicalChart.tsx"
New-FileSafe "$root/src/features/analytics/components/PredictionChart.tsx"
New-FileSafe "$root/src/features/analytics/components/ComparisonChart.tsx"
New-FileSafe "$root/src/features/analytics/components/ChartSwitcher.tsx"
New-FolderSafe "$root/src/features/analytics/hooks"
New-FileSafe "$root/src/features/analytics/hooks/useTimeSeriesData.ts"
New-FileSafe "$root/src/features/analytics/hooks/useGeographicalData.ts"
New-FileSafe "$root/src/features/analytics/hooks/usePredictions.ts"
New-FileSafe "$root/src/features/analytics/AnalyticsPage.tsx"

# -- data-tables
New-FolderSafe "$root/src/features/data-tables"
New-FolderSafe "$root/src/features/data-tables/components"
New-FileSafe "$root/src/features/data-tables/components/ProcessedDataTable.tsx"
New-FileSafe "$root/src/features/data-tables/components/RawDataTable.tsx"
New-FileSafe "$root/src/features/data-tables/components/DataTableToolbar.tsx"
New-FileSafe "$root/src/features/data-tables/components/DataTablePagination.tsx"
New-FileSafe "$root/src/features/data-tables/components/DataTableColumns.tsx"
New-FolderSafe "$root/src/features/data-tables/hooks"
New-FileSafe "$root/src/features/data-tables/hooks/useTableData.ts"
New-FileSafe "$root/src/features/data-tables/hooks/useTableFilters.ts"
New-FileSafe "$root/src/features/data-tables/DataTablesPage.tsx"

# -- countries
New-FolderSafe "$root/src/features/countries"
New-FolderSafe "$root/src/features/countries/components"
New-FileSafe "$root/src/features/countries/components/CountryList.tsx"
New-FileSafe "$root/src/features/countries/components/CountryDetailModal.tsx"
New-FileSafe "$root/src/features/countries/components/CountryComparison.tsx"
New-FolderSafe "$root/src/features/countries/hooks"
New-FileSafe "$root/src/features/countries/hooks/useCountryData.ts"
New-FileSafe "$root/src/features/countries/CountriesPage.tsx"

# -- reports
New-FolderSafe "$root/src/features/reports"
New-FolderSafe "$root/src/features/reports/components"
New-FileSafe "$root/src/features/reports/components/ImageModal.tsx"
New-FileSafe "$root/src/features/reports/components/ReportGallery.tsx"
New-FileSafe "$root/src/features/reports/components/DownloadButton.tsx"
New-FolderSafe "$root/src/features/reports/hooks"
New-FileSafe "$root/src/features/reports/hooks/useReportImages.ts"
New-FileSafe "$root/src/features/reports/ReportsPage.tsx"

# ------------------------------
# src/components
# ------------------------------
New-FolderSafe "$root/src/components"
New-FolderSafe "$root/src/components/layout"
New-FileSafe "$root/src/components/layout/Sidebar.tsx"
New-FileSafe "$root/src/components/layout/Navbar.tsx"
New-FileSafe "$root/src/components/layout/MainLayout.tsx"
New-FileSafe "$root/src/components/layout/PageHeader.tsx"

New-FolderSafe "$root/src/components/charts"
New-FileSafe "$root/src/components/charts/LineChart.tsx"
New-FileSafe "$root/src/components/charts/BarChart.tsx"
New-FileSafe "$root/src/components/charts/PieChart.tsx"
New-FileSafe "$root/src/components/charts/AreaChart.tsx"
New-FileSafe "$root/src/components/charts/ChartContainer.tsx"

New-FolderSafe "$root/src/components/modals"
New-FileSafe "$root/src/components/modals/BaseModal.tsx"
New-FileSafe "$root/src/components/modals/ConfirmationModal.tsx"
New-FileSafe "$root/src/components/modals/InfoModal.tsx"

New-FolderSafe "$root/src/components/feedback"
New-FileSafe "$root/src/components/feedback/LoadingSpinner.tsx"
New-FileSafe "$root/src/components/feedback/ErrorBoundary.tsx"
New-FileSafe "$root/src/components/feedback/ErrorAlert.tsx"
New-FileSafe "$root/src/components/feedback/EmptyState.tsx"
New-FileSafe "$root/src/components/feedback/SkeletonLoader.tsx"

New-FolderSafe "$root/src/components/ui"
New-FileSafe "$root/src/components/ui/button.tsx"
New-FileSafe "$root/src/components/ui/card.tsx"
New-FileSafe "$root/src/components/ui/dialog.tsx"

# ------------------------------
# src/services
# ------------------------------
New-FolderSafe "$root/src/services"
New-FolderSafe "$root/src/services/api"
New-FileSafe "$root/src/services/api/client.ts"
New-FileSafe "$root/src/services/api/endpoints.ts"
New-FileSafe "$root/src/services/api/types.ts"

New-FolderSafe "$root/src/services/queries"
New-FileSafe "$root/src/services/queries/dashboardQueries.ts"
New-FileSafe "$root/src/services/queries/analyticsQueries.ts"
New-FileSafe "$root/src/services/queries/dataTableQueries.ts"
New-FileSafe "$root/src/services/queries/countryQueries.ts"

# ------------------------------
# stores
# ------------------------------
New-FolderSafe "$root/src/stores"
New-FileSafe "$root/src/stores/themeStore.ts"
New-FileSafe "$root/src/stores/filterStore.ts"
New-FileSafe "$root/src/stores/modalStore.ts"

# ------------------------------
# Other dirs
# ------------------------------
New-FolderSafe "$root/src/hooks"
New-FileSafe "$root/src/hooks/useTheme.ts"
New-FileSafe "$root/src/hooks/useMediaQuery.ts"
New-FileSafe "$root/src/hooks/useDebounce.ts"
New-FileSafe "$root/src/hooks/useLocalStorage.ts"

New-FolderSafe "$root/src/utils"
New-FileSafe "$root/src/utils/cn.ts"
New-FileSafe "$root/src/utils/formatters.ts"
New-FileSafe "$root/src/utils/validators.ts"
New-FileSafe "$root/src/utils/constants.ts"

New-FolderSafe "$root/src/types"
New-FileSafe "$root/src/types/dashboard.types.ts"
New-FileSafe "$root/src/types/analytics.types.ts"
New-FileSafe "$root/src/types/table.types.ts"
New-FileSafe "$root/src/types/index.ts"

New-FolderSafe "$root/src/styles"
New-FileSafe "$root/src/styles/globals.css"
New-FileSafe "$root/src/styles/themes.css"

New-FolderSafe "$root/src/config"
New-FileSafe "$root/src/config/api.config.ts"
New-FileSafe "$root/src/config/chart.config.ts"

New-FileSafe "$root/src/main.tsx"
New-FileSafe "$root/src/vite-env.d.ts"

# ------------------------------
# Root files
# ------------------------------
New-FileSafe "$root/.env.example"
New-FileSafe "$root/.env"
New-FileSafe "$root/.gitignore"
New-FileSafe "$root/index.html"
New-FileSafe "$root/package.json"
New-FileSafe "$root/tsconfig.json"
New-FileSafe "$root/tsconfig.node.json"
New-FileSafe "$root/vite.config.ts"
New-FileSafe "$root/tailwind.config.js"
New-FileSafe "$root/postcss.config.js"
New-FileSafe "$root/components.json"
New-FileSafe "$root/README.md"

Write-Host "`nDONE! Folder & file structure ready." -ForegroundColor Green

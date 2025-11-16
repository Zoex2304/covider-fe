// ============================================================================
// FILE: src/features/countries/components/CountryDetailModal.tsx
// ============================================================================
import BaseModal from "@/components/modals/BaseModal";
import { useCountryDetails } from "@/services/queries/countryQueries";
import { useTimeSeriesCountry } from "@/services/queries/analyticsQueries";
import LoadingSpinner from "@/components/feedback/LoadingSpinner";
import ErrorAlert from "@/components/feedback/ErrorAlert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatNumber } from "@/utils/formatters";
import { Activity, TrendingUp, TrendingDown, Users } from "lucide-react";

interface CountryDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  country: string;
}

export default function CountryDetailModal({
  open,
  onOpenChange,
  country,
}: CountryDetailModalProps) {
  const {
    data: details,
    isLoading: detailsLoading,
    error: detailsError,
  } = useCountryDetails(country);
  const { data: timeline, isLoading: timelineLoading } =
    useTimeSeriesCountry(country);

  if (!country) return null;

  const isLoading = detailsLoading || timelineLoading;

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title={country}
      description="Detailed COVID-19 statistics and trends"
      size="xl"
    >
      {isLoading && (
        <div className="py-12">
          <LoadingSpinner text="Loading country details..." />
        </div>
      )}

      {detailsError && <ErrorAlert message="Failed to load country details" />}

      {details && !isLoading && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Confirmed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600">
                  {formatNumber(details.data.confirmed)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <TrendingDown className="h-4 w-4" />
                  Deaths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-600">
                  {formatNumber(details.data.deaths)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Recovered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">
                  {formatNumber(details.data.recovered)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Active
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-orange-600">
                  {formatNumber(details.data.active)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <Tabs defaultValue="timeline">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cases Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  {timeline?.data && (
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={timeline.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="ObservationDate"
                          tickFormatter={(value) =>
                            new Date(value).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })
                          }
                        />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="Confirmed"
                          stroke="#3b82f6"
                        />
                        <Line
                          type="monotone"
                          dataKey="Deaths"
                          stroke="#ef4444"
                        />
                        <Line
                          type="monotone"
                          dataKey="Recovered"
                          stroke="#22c55e"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Key Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Last Updated
                    </span>
                    <Badge variant="secondary">
                      {details.data.last_updated}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Total Population
                    </span>
                    <Badge variant="secondary">N/A</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Cases per 100k
                    </span>
                    <Badge variant="secondary">N/A</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </BaseModal>
  );
}

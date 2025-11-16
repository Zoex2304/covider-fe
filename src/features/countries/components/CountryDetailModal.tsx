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
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { formatNumber } from "@/utils/formatters";
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MapPin,
  Globe,
  Calendar
} from "lucide-react";

interface CountryDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  country: string;
}

// Custom formatter untuk YAxis yang lebih readable
const formatYAxisTick = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value.toString();
};

// Custom formatter untuk Tooltip
const formatTooltipValue = (value: number) => {
  return formatNumber(value);
};

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
  const countryData = details?.data;

  // Calculate additional statistics
  const calculateRates = () => {
    if (!countryData) return null;
    
    const confirmed = countryData.confirmed || 0;
    const deaths = countryData.deaths || 0;
    const recovered = countryData.recovered || 0;
    const population = countryData.population_2024 || 0;
    
    return {
      cfr: confirmed > 0 ? (deaths / confirmed) * 100 : 0,
      recoveryRate: confirmed > 0 ? (recovered / confirmed) * 100 : 0,
      casesPer100k: population > 0 ? (confirmed / population) * 100000 : 0,
      deathPer100k: population > 0 ? (deaths / population) * 100000 : 0,
    };
  };

  const rates = calculateRates();

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title={country}
      description="Detailed COVID-19 statistics and trends"
      size="xl"
    >
      <div className="max-h-[80vh] overflow-y-auto">
        {isLoading && (
          <div className="py-12">
            <LoadingSpinner text="Loading country details..." />
          </div>
        )}

        {detailsError && <ErrorAlert message="Failed to load country details" />}

        {countryData && !isLoading && (
          <div className="space-y-6">
            {/* Header with Flag Background */}
            <div 
              className="relative rounded-lg overflow-hidden h-32 bg-cover bg-center"
              style={{
                backgroundImage: countryData.image_url ? `url(${countryData.image_url})` : 'none',
                backgroundColor: countryData.image_url ? 'transparent' : '#f3f4f6'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">{country}</h3>
                <div className="flex items-center gap-4 text-sm text-white/80 mt-1">
                  {countryData.region && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{countryData.region}</span>
                      {countryData.subregion && (
                        <span>• {countryData.subregion}</span>
                      )}
                    </div>
                  )}
                  {countryData.alpha2 && (
                    <div className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      <span>{countryData.alpha2}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Confirmed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatNumber(countryData.confirmed)}
                  </p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <TrendingDown className="h-4 w-4" />
                    Deaths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-red-600">
                    {formatNumber(countryData.deaths)}
                  </p>
                  {rates && (
                    <p className="text-xs text-muted-foreground mt-1">
                      CFR: {rates.cfr.toFixed(2)}%
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Recovered
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-600">
                    {formatNumber(countryData.recovered)}
                  </p>
                  {rates && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Rate: {rates.recoveryRate.toFixed(2)}%
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Active
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-orange-600">
                    {formatNumber(countryData.active)}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Population Card */}
              {countryData.population_2024 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Population Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">2024 Population</span>
                      <Badge variant="secondary" className="font-mono">
                        {formatNumber(countryData.population_2024)}
                      </Badge>
                    </div>
                    {rates && rates.casesPer100k > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Cases per 100k</span>
                        <Badge variant="outline">
                          {rates.casesPer100k.toFixed(1)}
                        </Badge>
                      </div>
                    )}
                    {rates && rates.deathPer100k > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Deaths per 100k</span>
                        <Badge variant="outline">
                          {rates.deathPer100k.toFixed(1)}
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Metadata Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Last Updated</span>
                    <Badge variant="secondary">
                      {countryData.last_updated || 'N/A'}
                    </Badge>
                  </div>
                  {countryData.region && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Region</span>
                      <Badge variant="outline">{countryData.region}</Badge>
                    </div>
                  )}
                  {countryData.subregion && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Subregion</span>
                      <Badge variant="outline">{countryData.subregion}</Badge>
                    </div>
                  )}
                  {countryData.alpha3 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Alpha-3 Code</span>
                      <Badge variant="outline">{countryData.alpha3}</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <Tabs defaultValue="timeline">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="comparison">Comparison</TabsTrigger>
              </TabsList>

              <TabsContent value="timeline" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Cases Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {timeline?.data && timeline.data.length > 0 ? (
                      <div className="overflow-x-auto">
                        <div className="min-w-[600px]">
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
                                interval="preserveStartEnd"
                              />
                              <YAxis 
                                tickFormatter={formatYAxisTick}
                                width={60}
                              />
                              <Tooltip 
                                labelFormatter={(value) => 
                                  new Date(value).toLocaleDateString()
                                }
                                formatter={(value: number) => [formatTooltipValue(value), 'Cases']}
                              />
                              <Legend />
                              <Line
                                type="monotone"
                                dataKey="Confirmed"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                name="Confirmed"
                                dot={false}
                              />
                              <Line
                                type="monotone"
                                dataKey="Deaths"
                                stroke="#ef4444"
                                strokeWidth={2}
                                name="Deaths"
                                dot={false}
                              />
                              <Line
                                type="monotone"
                                dataKey="Recovered"
                                stroke="#22c55e"
                                strokeWidth={2}
                                name="Recovered"
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No timeline data available
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comparison" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Case Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {countryData && (
                      <div className="overflow-x-auto">
                        <div className="min-w-[400px]">
                          <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                              data={[
                                {
                                  name: 'Active',
                                  value: countryData.active,
                                  fill: '#f97316'
                                },
                                {
                                  name: 'Recovered',
                                  value: countryData.recovered,
                                  fill: '#22c55e'
                                },
                                {
                                  name: 'Deaths',
                                  value: countryData.deaths,
                                  fill: '#ef4444'
                                }
                              ]}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis 
                                tickFormatter={formatYAxisTick}
                                width={60}
                              />
                              <Tooltip 
                                formatter={(value: number) => [formatTooltipValue(value), 'Cases']}
                              />
                              <Bar dataKey="value" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </BaseModal>
  );
}
// ============================================================================
// FILE: src/features/countries/CountriesPage.tsx
// ============================================================================
import { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import { useCountriesSummary } from "@/services/queries/countryQueries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink, TrendingUp, Activity } from "lucide-react";
import LoadingSpinner from "@/components/feedback/LoadingSpinner";
import ErrorAlert from "@/components/feedback/ErrorAlert";
import CountryDetailModal from "./components/CountryDetailModal";
import { formatNumber } from "@/utils/formatters";

export default function CountriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isLoading, error, refetch } = useCountriesSummary();

  const handleCountryClick = (country: string) => {
    setSelectedCountry(country);
    setModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner size="lg" text="Loading countries data..." />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorAlert
        title="Failed to load countries"
        message="Unable to fetch countries data. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  const countries = data?.data || [];
  const filteredCountries = countries.filter((country: any) =>
    country["Country/Region"].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Countries"
        description="Detailed COVID-19 statistics by country"
      />

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Countries Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCountries.map((country: any) => (
          <Card
            key={country["Country/Region"]}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleCountryClick(country["Country/Region"])}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="truncate">{country["Country/Region"]}</span>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
              <CardDescription>
                Last updated:{" "}
                {new Date(country.ObservationDate).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">Confirmed</p>
                  <p className="text-lg font-bold text-blue-600">
                    {formatNumber(country.Confirmed)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Deaths</p>
                  <p className="text-lg font-bold text-red-600">
                    {formatNumber(country.Deaths)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Recovered</p>
                  <p className="text-lg font-bold text-green-600">
                    {formatNumber(country.Recovered)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Active</p>
                  <p className="text-lg font-bold text-orange-600">
                    {formatNumber(country.Active)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">CFR</span>
                  <Badge variant="secondary">{country.CFR.toFixed(2)}%</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Recovery
                  </span>
                  <Badge variant="secondary">
                    {country.RecoveryRate.toFixed(2)}%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCountries.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No countries found matching your search.
            </p>
          </CardContent>
        </Card>
      )}

      <CountryDetailModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        country={selectedCountry || ""}
      />
    </div>
  );
}

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
import { Search, ExternalLink, TrendingUp, Activity, Users } from "lucide-react";
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
            className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden relative group"
            onClick={() => handleCountryClick(country["Country/Region"])}
          >
            {/* Background Flag Image with Gradient Overlay */}
            {country.image_url && (
              <div 
                className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${country.image_url})`,
                }}
              >
                {/* Gradient Overlay - Black fade from bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </div>
            )}

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-white">
                  <span className="truncate">{country["Country/Region"]}</span>
                  <ExternalLink className="h-4 w-4 text-white/80" />
                </CardTitle>
                <CardDescription className="text-white/80">
                  Last updated:{" "}
                  {new Date(country.ObservationDate).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4 flex-1">
                {/* Main Statistics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                    <p className="text-xs text-white/80 mb-1">Confirmed</p>
                    <p className="text-lg font-bold text-white">
                      {formatNumber(country.Confirmed)}
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                    <p className="text-xs text-white/80 mb-1">Deaths</p>
                    <p className="text-lg font-bold text-white">
                      {formatNumber(country.Deaths)}
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                    <p className="text-xs text-white/80 mb-1">Recovered</p>
                    <p className="text-lg font-bold text-white">
                      {formatNumber(country.Recovered)}
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                    <p className="text-xs text-white/80 mb-1">Active</p>
                    <p className="text-lg font-bold text-white">
                      {formatNumber(country.Active)}
                    </p>
                  </div>
                </div>

                {/* Population Data */}
                {country.population_2024 && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Users className="h-3 w-3 text-white/80" />
                      <p className="text-xs text-white/80">Population 2024</p>
                    </div>
                    <p className="text-sm font-semibold text-white text-center">
                      {formatNumber(country.population_2024)}
                    </p>
                  </div>
                )}

                {/* Rate Statistics */}
                <div className="flex items-center justify-between pt-2 border-t border-white/20">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-white/80" />
                      <span className="text-xs text-white/80">CFR</span>
                    </div>
                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                      {country.CFR?.toFixed(2) || "0.00"}%
                    </Badge>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1">
                      <Activity className="h-3 w-3 text-white/80" />
                      <span className="text-xs text-white/80">Recovery</span>
                    </div>
                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                      {country.RecoveryRate?.toFixed(2) || "0.00"}%
                    </Badge>
                  </div>
                </div>

                {/* Region Info */}
                {(country.region || country.alpha2) && (
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span>{country.region || "Unknown"}</span>
                    <span>{country.alpha2 || ""}</span>
                  </div>
                )}
              </CardContent>
            </div>
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
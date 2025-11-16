// ============================================================================
// FILE: src/features/countries/components/CountryList.tsx
// ============================================================================
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/utils/formatters";
import { ExternalLink } from "lucide-react";

interface Country {
  "Country/Region": string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  CFR: number;
  RecoveryRate: number;
  ObservationDate: string;
}

interface CountryListProps {
  countries: Country[];
  onCountryClick: (country: string) => void;
}

export default function CountryList({
  countries,
  onCountryClick,
}: CountryListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {countries.map((country) => (
        <Card
          key={country["Country/Region"]}
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onCountryClick(country["Country/Region"])}
        >
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="truncate">{country["Country/Region"]}</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </CardTitle>
            <CardDescription>
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
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">CFR</span>
                <Badge variant="secondary" className="text-xs">
                  {country.CFR.toFixed(2)}%
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">Recovery</span>
                <Badge variant="secondary" className="text-xs">
                  {country.RecoveryRate.toFixed(2)}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

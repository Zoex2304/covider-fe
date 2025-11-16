// ============================================================================
// FILE: src/features/countries/components/CountryComparison.tsx
// ============================================================================
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CountryComparisonProps {
  availableCountries: string[];
  onCompare: (countries: string[]) => void;
}

export default function CountryComparison({
  availableCountries,
  onCompare,
}: CountryComparisonProps) {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [currentSelection, setCurrentSelection] = useState<string>("");

  const handleAddCountry = () => {
    if (currentSelection && !selectedCountries.includes(currentSelection)) {
      const updated = [...selectedCountries, currentSelection];
      setSelectedCountries(updated);
      setCurrentSelection("");
    }
  };

  const handleRemoveCountry = (country: string) => {
    setSelectedCountries(selectedCountries.filter((c) => c !== country));
  };

  const handleCompare = () => {
    if (selectedCountries.length >= 2) {
      onCompare(selectedCountries);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compare Countries</CardTitle>
        <CardDescription>
          Select multiple countries to compare their statistics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Select value={currentSelection} onValueChange={setCurrentSelection}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {availableCountries
                .filter((c) => !selectedCountries.includes(c))
                .map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Button
            onClick={handleAddCountry}
            disabled={!currentSelection}
            size="icon"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {selectedCountries.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedCountries.map((country) => (
              <Badge
                key={country}
                variant="secondary"
                className="pl-3 pr-1 py-1"
              >
                {country}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 ml-1"
                  onClick={() => handleRemoveCountry(country)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}

        <Button
          onClick={handleCompare}
          disabled={selectedCountries.length < 2}
          className="w-full"
        >
          Compare {selectedCountries.length} Countries
        </Button>
      </CardContent>
    </Card>
  );
}

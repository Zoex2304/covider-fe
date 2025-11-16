// ============================================================================
// FILE: src/features/data-tables/components/DataTableToolbar.tsx
// ============================================================================
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X, Filter } from "lucide-react";

interface DataTableToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onReset?: () => void;
  filters?: React.ReactNode;
}

export default function DataTableToolbar({
  searchValue,
  onSearchChange,
  onReset,
  filters,
}: DataTableToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      <div className="flex items-center gap-2 flex-1">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        {searchValue && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSearchChange("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {filters}
        {onReset && (
          <Button variant="outline" size="sm" onClick={onReset}>
            <X className="mr-2 h-4 w-4" />
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}

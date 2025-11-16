// ============================================================================
// FILE: src/components/layout/Navbar.tsx
// ============================================================================
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/app/providers/ThemeProvider";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="border-b bg-card">
      <div className="flex h-16 items-center px-6">
        <div className="ml-auto flex items-center space-x-4">
          {/* Theme Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                {/* Dynamic Active Icon */}
                {theme === "light" && (
                  <Sun className="h-4 w-4 transition-all" />
                )}
                {theme === "dark" && (
                  <Moon className="h-4 w-4 transition-all" />
                )}
                {theme === "system" && (
                  <Monitor className="h-4 w-4 transition-all" />
                )}

                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className={theme === "light" ? "bg-muted font-medium" : ""}
              >
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className={theme === "dark" ? "bg-muted font-medium" : ""}
              >
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setTheme("system")}
                className={theme === "system" ? "bg-muted font-medium" : ""}
              >
                <Monitor className="mr-2 h-4 w-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

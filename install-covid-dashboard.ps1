Write-Host "=== COVID Dashboard Installer (Tailwind v3 + shadcn FIXED) ===" -ForegroundColor Cyan

# -------------------------------------------------------
# 1. Check Node.js & npm
# -------------------------------------------------------
Write-Host "`nChecking Node.js & npm versions..."

$nodeVersion = node --version 2>$null
$npmVersion = npm --version 2>$null

if (-not $nodeVersion) {
    Write-Host "ERROR: Node.js is not installed. Install Node.js 18++ first." -ForegroundColor Red
    exit
}

Write-Host "Node: $nodeVersion"
Write-Host "npm : $npmVersion"


# -------------------------------------------------------
# 2. Install core libraries
# -------------------------------------------------------
Write-Host "`nInstalling core libraries..."
npm install react-router-dom @tanstack/react-query axios zustand


# -------------------------------------------------------
# 3. Install TailwindCSS v3 (compatible with shadcn)
# -------------------------------------------------------
Write-Host "`nInstalling Tailwind v3.x..."
npm install -D tailwindcss@3 postcss autoprefixer

Write-Host "Generating Tailwind config..."
npx tailwindcss init -p


# -------------------------------------------------------
# 4. Configure Tailwind CSS properly for Vite
# -------------------------------------------------------
Write-Host "`nConfiguring Tailwind CSS..."

$tailwindConfig = @'
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {}
    }
  },
  plugins: [require('tailwindcss-animate')],
}
'@

Set-Content "tailwind.config.js" -Value $tailwindConfig -Encoding utf8
Write-Host "Tailwind config created successfully!" -ForegroundColor Green


# -------------------------------------------------------
# 5. Ensure PostCSS config exists
# -------------------------------------------------------
Write-Host "`nEnsuring PostCSS config..."

$postcssConfig = @'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
'@

Set-Content "postcss.config.js" -Value $postcssConfig -Encoding utf8
Write-Host "PostCSS config verified!" -ForegroundColor Green


# -------------------------------------------------------
# 6. Configure tsconfig.app.json
# -------------------------------------------------------
Write-Host "`nConfiguring import alias '@/...' in tsconfig.app.json..."

$tsconfigApp = "tsconfig.app.json"

if (Test-Path $tsconfigApp) {
    $content = Get-Content $tsconfigApp -Raw
    
    # Check if baseUrl already exists
    if ($content -notmatch '"baseUrl"') {
        $insertPosition = $content.LastIndexOf('"noUncheckedSideEffectImports": true')
        
        if ($insertPosition -gt 0) {
            $lineEnd = $content.IndexOf("`n", $insertPosition)
            $newConfig = ",`n`n    /* Path aliases */`n    `"baseUrl`": `".`",`n    `"paths`": {`n      `"@/*`": [`"src/*`"]`n    }"
            $content = $content.Insert($lineEnd, $newConfig)
            Set-Content $tsconfigApp -Value $content -Encoding utf8
            Write-Host "Import alias configured successfully!" -ForegroundColor Green
        }
    } else {
        Write-Host "Import alias already configured." -ForegroundColor Yellow
    }
}


# -------------------------------------------------------
# 7. Configure tsconfig.json (root)
# -------------------------------------------------------
Write-Host "`nConfiguring tsconfig.json..."

$tsconfigRoot = "tsconfig.json"

if (Test-Path $tsconfigRoot) {
    $content = Get-Content $tsconfigRoot -Raw
    
    if ($content -notmatch '"baseUrl"') {
        if ($content -match '"compilerOptions":\s*{') {
            $insertPosition = $content.IndexOf('"compilerOptions": {') + 20
            $newConfig = "`n    `"baseUrl`": `".`",`n    `"paths`": {`n      `"@/*`": [`"src/*`"]`n    },"
            $content = $content.Insert($insertPosition, $newConfig)
            Set-Content $tsconfigRoot -Value $content -Encoding utf8
            Write-Host "tsconfig.json configured successfully!" -ForegroundColor Green
        }
    } else {
        Write-Host "tsconfig.json already configured." -ForegroundColor Yellow
    }
}


# -------------------------------------------------------
# 8. Install utility libraries
# -------------------------------------------------------
Write-Host "`nInstalling utility libraries..."
npm install clsx tailwind-merge class-variance-authority lucide-react


# -------------------------------------------------------
# 9. Install chart and table libraries
# -------------------------------------------------------
Write-Host "`nInstalling Recharts and TanStack Table..."
npm install recharts @tanstack/react-table


# -------------------------------------------------------
# 10. Install dev dependencies
# -------------------------------------------------------
Write-Host "`nInstalling dev dependencies..."
npm install -D @types/node tailwindcss-animate


# -------------------------------------------------------
# 11. Create src/lib directory and utils.ts
# -------------------------------------------------------
Write-Host "`nCreating lib/utils.ts..."

$libDir = "src/lib"
if (-not (Test-Path $libDir)) {
    New-Item -ItemType Directory -Path $libDir -Force | Out-Null
}

$utilsContent = @'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
'@

Set-Content "$libDir/utils.ts" -Value $utilsContent -Encoding utf8
Write-Host "lib/utils.ts created!" -ForegroundColor Green


# -------------------------------------------------------
# 12. Create components/ui directory
# -------------------------------------------------------
Write-Host "`nCreating components/ui directory..."

$uiDir = "src/components/ui"
if (-not (Test-Path $uiDir)) {
    New-Item -ItemType Directory -Path $uiDir -Force | Out-Null
    Write-Host "components/ui directory created!" -ForegroundColor Green
}


# -------------------------------------------------------
# 13. Update index.css with Tailwind directives
# -------------------------------------------------------
Write-Host "`nUpdating src/index.css..."

$indexCss = @'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
'@

Set-Content "src/index.css" -Value $indexCss -Encoding utf8
Write-Host "index.css updated!" -ForegroundColor Green


# -------------------------------------------------------
# 14. Create components.json for shadcn
# -------------------------------------------------------
Write-Host "`nCreating components.json..."

$componentsJson = @'
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
'@

Set-Content "components.json" -Value $componentsJson -Encoding utf8
Write-Host "components.json created!" -ForegroundColor Green


# -------------------------------------------------------
# 15. Verify Vite config has alias support
# -------------------------------------------------------
Write-Host "`nVerifying Vite config..."

$viteConfig = "vite.config.ts"
if (Test-Path $viteConfig) {
    $viteContent = Get-Content $viteConfig -Raw
    
    if ($viteContent -notmatch "resolve:") {
        Write-Host "Adding path alias to Vite config..." -ForegroundColor Yellow
        
        $newViteConfig = @'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
'@
        
        Set-Content $viteConfig -Value $newViteConfig -Encoding utf8
        Write-Host "Vite config updated!" -ForegroundColor Green
    } else {
        Write-Host "Vite config already has alias support." -ForegroundColor Yellow
    }
}


# -------------------------------------------------------
# 16. Install shadcn components manually
# -------------------------------------------------------
Write-Host "`nInstalling shadcn components..."
Write-Host "This may take a moment..." -ForegroundColor Yellow

$components = @("button", "card", "table", "dialog", "dropdown-menu", "input", "label", "select", "tabs", "tooltip", "skeleton", "badge", "separator", "switch", "alert", "scroll-area")

foreach ($component in $components) {
    Write-Host "Installing $component..." -NoNewline
    $output = npx shadcn@latest add $component -y 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host " OK" -ForegroundColor Green
    } else {
        Write-Host " FAILED" -ForegroundColor Red
        Write-Host "Error: $output" -ForegroundColor Red
    }
}


# -------------------------------------------------------
# FINISHED
# -------------------------------------------------------
Write-Host "`n====================================================" -ForegroundColor Green
Write-Host " Installation Complete!"
Write-Host " Run the app with:  npm run dev"
Write-Host "====================================================" -ForegroundColor Green
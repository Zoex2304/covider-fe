Write-Host "=== COVID Dashboard Dependencies Verification ===" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# ========================================
# 1. CHECK NODE & NPM
# ========================================
Write-Host "[1] Checking Node.js & npm..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
$npmVersion = npm --version 2>$null

if ($nodeVersion) {
    Write-Host "  OK Node.js: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "  FAIL Node.js: NOT FOUND" -ForegroundColor Red
    $allGood = $false
}

if ($npmVersion) {
    Write-Host "  OK npm: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "  FAIL npm: NOT FOUND" -ForegroundColor Red
    $allGood = $false
}

Write-Host ""

# ========================================
# 2. CHECK PACKAGE.JSON DEPENDENCIES
# ========================================
Write-Host "[2] Checking package.json dependencies..." -ForegroundColor Yellow

if (Test-Path "package.json") {
    $pkg = Get-Content "package.json" -Raw | ConvertFrom-Json
    
    $requiredDeps = @(
        "react", "react-dom", "react-router-dom",
        "@tanstack/react-query", "@tanstack/react-table",
        "axios", "zustand", "recharts",
        "clsx", "tailwind-merge", "class-variance-authority", "lucide-react"
    )
    
    $requiredDevDeps = @(
        "tailwindcss", "postcss", "autoprefixer",
        "@types/node", "tailwindcss-animate"
    )
    
    Write-Host "  Production Dependencies:" -ForegroundColor Cyan
    foreach ($dep in $requiredDeps) {
        if ($pkg.dependencies.PSObject.Properties.Name -contains $dep) {
            Write-Host "    OK $dep" -ForegroundColor Green
        } else {
            Write-Host "    FAIL $dep (MISSING)" -ForegroundColor Red
            $allGood = $false
        }
    }
    
    Write-Host "  Dev Dependencies:" -ForegroundColor Cyan
    foreach ($dep in $requiredDevDeps) {
        if ($pkg.devDependencies.PSObject.Properties.Name -contains $dep) {
            Write-Host "    OK $dep" -ForegroundColor Green
        } else {
            Write-Host "    FAIL $dep (MISSING)" -ForegroundColor Red
            $allGood = $false
        }
    }
} else {
    Write-Host "  FAIL package.json NOT FOUND" -ForegroundColor Red
    $allGood = $false
}

Write-Host ""

# ========================================
# 3. CHECK CONFIG FILES
# ========================================
Write-Host "[3] Checking configuration files..." -ForegroundColor Yellow

$configFiles = @(
    @{ Path = "tsconfig.json"; Name = "TypeScript Config (Root)" },
    @{ Path = "tsconfig.app.json"; Name = "TypeScript Config (App)" },
    @{ Path = "tsconfig.node.json"; Name = "TypeScript Config (Node)" },
    @{ Path = "tailwind.config.js"; Name = "Tailwind CSS Config" },
    @{ Path = "postcss.config.js"; Name = "PostCSS Config" },
    @{ Path = "vite.config.ts"; Name = "Vite Config" },
    @{ Path = "components.json"; Name = "shadcn Config" }
)

foreach ($file in $configFiles) {
    if (Test-Path $file.Path) {
        Write-Host "  OK $($file.Name)" -ForegroundColor Green
    } else {
        Write-Host "  FAIL $($file.Name) (MISSING)" -ForegroundColor Red
        $allGood = $false
    }
}

Write-Host ""

# ========================================
# 4. CHECK TSCONFIG PATH ALIASES
# ========================================
Write-Host "[4] Checking TypeScript path aliases..." -ForegroundColor Yellow

$tsconfigFiles = @("tsconfig.json", "tsconfig.app.json")

foreach ($file in $tsconfigFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        if ($content -match '"baseUrl"' -and $content -match '"@/\*"') {
            Write-Host "  OK $file has path aliases" -ForegroundColor Green
        } else {
            Write-Host "  FAIL $file missing path aliases" -ForegroundColor Red
            $allGood = $false
        }
    }
}

Write-Host ""

# ========================================
# 5. CHECK TAILWIND CONFIG FORMAT
# ========================================
Write-Host "[5] Checking Tailwind config format..." -ForegroundColor Yellow

if (Test-Path "tailwind.config.js") {
    $tailwindContent = Get-Content "tailwind.config.js" -Raw
    if ($tailwindContent -match "module\.exports") {
        Write-Host "  OK Using CommonJS (module.exports)" -ForegroundColor Green
    } elseif ($tailwindContent -match "export default") {
        Write-Host "  WARN Using ES Modules (may cause issues with shadcn)" -ForegroundColor Yellow
        Write-Host "    Consider changing to module.exports" -ForegroundColor Gray
    } else {
        Write-Host "  FAIL Unknown format" -ForegroundColor Red
        $allGood = $false
    }
}

Write-Host ""

# ========================================
# 6. CHECK VITE CONFIG
# ========================================
Write-Host "[6] Checking Vite config..." -ForegroundColor Yellow

if (Test-Path "vite.config.ts") {
    $viteContent = Get-Content "vite.config.ts" -Raw
    if ($viteContent -match "path\.resolve" -and $viteContent -match "@") {
        Write-Host "  OK Vite has path alias configured" -ForegroundColor Green
    } else {
        Write-Host "  FAIL Vite missing path alias" -ForegroundColor Red
        $allGood = $false
    }
}

Write-Host ""

# ========================================
# 7. CHECK DIRECTORY STRUCTURE
# ========================================
Write-Host "[7] Checking directory structure..." -ForegroundColor Yellow

$requiredDirs = @(
    "src",
    "src/lib",
    "src/components",
    "src/components/ui"
)

foreach ($dir in $requiredDirs) {
    if (Test-Path $dir) {
        Write-Host "  OK $dir/" -ForegroundColor Green
    } else {
        Write-Host "  FAIL $dir/ (MISSING)" -ForegroundColor Red
        $allGood = $false
    }
}

Write-Host ""

# ========================================
# 8. CHECK ESSENTIAL FILES
# ========================================
Write-Host "[8] Checking essential files..." -ForegroundColor Yellow

$essentialFiles = @(
    @{ Path = "src/index.css"; Name = "Global CSS" },
    @{ Path = "src/lib/utils.ts"; Name = "Utils (cn function)" },
    @{ Path = "src/main.tsx"; Name = "Main Entry" },
    @{ Path = "src/App.tsx"; Name = "App Component" },
    @{ Path = "index.html"; Name = "HTML Entry" }
)

foreach ($file in $essentialFiles) {
    if (Test-Path $file.Path) {
        Write-Host "  OK $($file.Name)" -ForegroundColor Green
    } else {
        Write-Host "  FAIL $($file.Name) (MISSING)" -ForegroundColor Red
        $allGood = $false
    }
}

Write-Host ""

# ========================================
# 9. CHECK INDEX.CSS FOR TAILWIND
# ========================================
Write-Host "[9] Checking index.css for Tailwind directives..." -ForegroundColor Yellow

if (Test-Path "src/index.css") {
    $cssContent = Get-Content "src/index.css" -Raw
    $hasBase = $cssContent -match "@tailwind base"
    $hasComponents = $cssContent -match "@tailwind components"
    $hasUtilities = $cssContent -match "@tailwind utilities"
    $hasCssVars = $cssContent -match "--background:"
    
    if ($hasBase -and $hasComponents -and $hasUtilities) {
        Write-Host "  OK Has Tailwind directives" -ForegroundColor Green
    } else {
        Write-Host "  FAIL Missing Tailwind directives" -ForegroundColor Red
        $allGood = $false
    }
    
    if ($hasCssVars) {
        Write-Host "  OK Has CSS variables for shadcn" -ForegroundColor Green
    } else {
        Write-Host "  FAIL Missing CSS variables" -ForegroundColor Red
        $allGood = $false
    }
}

Write-Host ""

# ========================================
# 10. CHECK SHADCN COMPONENTS
# ========================================
Write-Host "[10] Checking installed shadcn components..." -ForegroundColor Yellow

$uiDir = "src/components/ui"
if (Test-Path $uiDir) {
    $uiComponents = Get-ChildItem $uiDir -Filter "*.tsx" -File -ErrorAction SilentlyContinue
    if ($uiComponents.Count -gt 0) {
        Write-Host "  OK Found $($uiComponents.Count) UI components:" -ForegroundColor Green
        foreach ($comp in $uiComponents) {
            Write-Host "    - $($comp.Name)" -ForegroundColor Gray
        }
    } else {
        Write-Host "  WARN No UI components installed yet" -ForegroundColor Yellow
        Write-Host "    Run: npx shadcn@latest add button card table..." -ForegroundColor Gray
    }
} else {
    Write-Host "  FAIL UI directory not found" -ForegroundColor Red
    $allGood = $false
}

Write-Host ""

# ========================================
# 11. CHECK NODE_MODULES
# ========================================
Write-Host "[11] Checking node_modules..." -ForegroundColor Yellow

if (Test-Path "node_modules") {
    Write-Host "  OK node_modules exists" -ForegroundColor Green
} else {
    Write-Host "  FAIL node_modules NOT FOUND" -ForegroundColor Red
    Write-Host "    Run: npm install" -ForegroundColor Gray
    $allGood = $false
}

Write-Host ""

# ========================================
# FINAL SUMMARY
# ========================================
Write-Host "========================================" -ForegroundColor Cyan
if ($allGood) {
    Write-Host " ALL CHECKS PASSED!" -ForegroundColor Green
    Write-Host ""
    Write-Host " Your project is ready to go!" -ForegroundColor Green
    Write-Host " Next steps:" -ForegroundColor Cyan
    Write-Host "   1. Install shadcn components (if not done):" -ForegroundColor White
    Write-Host "      npx shadcn@latest add button card table..." -ForegroundColor Gray
    Write-Host "   2. Start dev server:" -ForegroundColor White
    Write-Host "      npm run dev" -ForegroundColor Gray
} else {
    Write-Host " SOME CHECKS FAILED!" -ForegroundColor Red
    Write-Host ""
    Write-Host " Please fix the issues above before proceeding." -ForegroundColor Yellow
}
Write-Host "========================================" -ForegroundColor Cyan
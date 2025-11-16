# Diagnostic script
Write-Host "=== Shadcn Configuration Diagnostics ===" -ForegroundColor Cyan

Write-Host "`nChecking files..."
Write-Host "tailwind.config.js exists: " -NoNewline
Write-Host (Test-Path "tailwind.config.js") -ForegroundColor $(if (Test-Path "tailwind.config.js") { "Green" } else { "Red" })

Write-Host "src/index.css exists: " -NoNewline
Write-Host (Test-Path "src/index.css") -ForegroundColor $(if (Test-Path "src/index.css") { "Green" } else { "Red" })

Write-Host "src/lib/utils.ts exists: " -NoNewline
Write-Host (Test-Path "src/lib/utils.ts") -ForegroundColor $(if (Test-Path "src/lib/utils.ts") { "Green" } else { "Red" })

Write-Host "components.json exists: " -NoNewline
Write-Host (Test-Path "components.json") -ForegroundColor $(if (Test-Path "components.json") { "Green" } else { "Red" })

Write-Host "`nChecking Tailwind config content..."
Get-Content "tailwind.config.js" -Head 5

Write-Host "`nTrying to add a single component with verbose output..."
npx shadcn@latest add button -y --verbose
Write-Host "=== Memperbaiki tsconfig.json yang Rusak ===" -ForegroundColor Cyan

# Backup tsconfig.json yang rusak
Write-Host "`nMembackup tsconfig.json yang rusak..."
Copy-Item "tsconfig.json" "tsconfig.json.broken" -ErrorAction SilentlyContinue

# Buat tsconfig.json yang benar
Write-Host "Membuat tsconfig.json yang benar..."

$tsconfigJson = @'
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
'@

Set-Content "tsconfig.json" -Value $tsconfigJson -Encoding utf8
Write-Host "✓ tsconfig.json diperbaiki!" -ForegroundColor Green

# Verifikasi semua file config
Write-Host "`nMemverifikasi konfigurasi..."

$checks = @(
    @{ Name = "tsconfig.json"; Path = "tsconfig.json" },
    @{ Name = "tsconfig.app.json"; Path = "tsconfig.app.json" },
    @{ Name = "tailwind.config.js"; Path = "tailwind.config.js" },
    @{ Name = "postcss.config.js"; Path = "postcss.config.js" },
    @{ Name = "components.json"; Path = "components.json" },
    @{ Name = "src/lib/utils.ts"; Path = "src/lib/utils.ts" }
)

foreach ($check in $checks) {
    $exists = Test-Path $check.Path
    $color = if ($exists) { "Green" } else { "Red" }
    $symbol = if ($exists) { "✓" } else { "✗" }
    Write-Host "$symbol $($check.Name): " -NoNewline
    Write-Host $exists -ForegroundColor $color
}

# Test install button
Write-Host "`nMencoba install button component..."
$output = npx shadcn@latest add button -y 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Button berhasil diinstall!" -ForegroundColor Green
    
    Write-Host "`nMenginstall semua komponen..."
    npx shadcn@latest add card table dialog dropdown-menu input label select tabs tooltip skeleton badge separator switch alert scroll-area -y
    
    Write-Host "`n====================================================" -ForegroundColor Green
    Write-Host " ✓ SEMUA KOMPONEN BERHASIL DIINSTALL!"
    Write-Host ""
    Write-Host " Jalankan aplikasi dengan:"
    Write-Host "   npm run dev"
    Write-Host ""
    Write-Host "====================================================" -ForegroundColor Green
} else {
    Write-Host "✗ Masih ada error:" -ForegroundColor Red
    Write-Host $output -ForegroundColor Yellow
    
    Write-Host "`nCoba cek manual dengan:" -ForegroundColor Cyan
    Write-Host "  npx shadcn@latest add button" -ForegroundColor White
}
# CodeBlaster AI - Windows Installation Script (PowerShell)
# Run with: powershell -ExecutionPolicy Bypass -File install.ps1

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CodeBlaster AI - Installation" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "[CHECK] Verifying Node.js installation..." -ForegroundColor Yellow

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Node.js is not installed" -ForegroundColor Red
    Write-Host "Please install Node.js 18+ from https://nodejs.org/" -ForegroundColor Red
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

$nodeVersion = node -v
$npmVersion = npm -v
Write-Host "[OK] Node.js: $nodeVersion" -ForegroundColor Green
Write-Host "[OK] npm: $npmVersion" -ForegroundColor Green
Write-Host ""

# Check Node version
$nodeVersionNum = [int]($nodeVersion -replace 'v|\..*', '')
if ($nodeVersionNum -lt 18) {
    Write-Host "[ERROR] Node.js version must be 18 or higher" -ForegroundColor Red
    Write-Host "Current version: $nodeVersion" -ForegroundColor Red
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

# Install dependencies
Write-Host "[STEP 1/3] Installing dependencies..." -ForegroundColor Yellow
Write-Host ""
npm run install:all

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "[ERROR] Installation failed" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[OK] Dependencies installed" -ForegroundColor Green
Write-Host ""

# Build packages
Write-Host "[STEP 2/3] Building packages..." -ForegroundColor Yellow
Write-Host ""
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "[ERROR] Build failed" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[OK] Build completed" -ForegroundColor Green
Write-Host ""

# Setup .env
Write-Host "[STEP 3/3] Setting up environment..." -ForegroundColor Yellow

if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
    Write-Host "[OK] .env file created" -ForegroundColor Green
    Write-Host ""
    Write-Host "[WARNING] Please edit .env and add your API keys!" -ForegroundColor Yellow
} else {
    Write-Host "[OK] .env already exists" -ForegroundColor Green
}
Write-Host ""

# Success
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Installation Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Edit .env and add your API keys" -ForegroundColor White
Write-Host "  2. Run: .\start.bat" -ForegroundColor White
Write-Host "  3. Or use CLI: cd packages\cli; node dist\cli.js review" -ForegroundColor White
Write-Host ""
Write-Host "Documentation: README.md | CARA_PAKAI.md | WINDOWS_SETUP.md" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to exit"

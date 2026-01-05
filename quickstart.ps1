# CodeBlaster AI - Quick Start Script (PowerShell)
# Run with: powershell -ExecutionPolicy Bypass -File quickstart.ps1

Clear-Host

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "" -ForegroundColor Cyan
Write-Host "   CodeBlasters AI - Advanced Code Review Assistant" -ForegroundColor Cyan
Write-Host "" -ForegroundColor Cyan
Write-Host "   Created by: Attazy" -ForegroundColor Cyan
Write-Host "   Version: 1.0.0" -ForegroundColor Cyan
Write-Host "" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "[1/5] Checking prerequisites..." -ForegroundColor Yellow
Write-Host ""

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[X] Node.js is not installed" -ForegroundColor Red
    Write-Host "    Please install Node.js 18+ from https://nodejs.org/" -ForegroundColor Red
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

$nodeVersion = node -v
$npmVersion = npm -v
Write-Host "[OK] Node.js version: $nodeVersion" -ForegroundColor Green
Write-Host "[OK] npm version: $npmVersion" -ForegroundColor Green
Write-Host ""

# Check Node version
$nodeVersionNum = [int]($nodeVersion -replace 'v|\..*', '')
if ($nodeVersionNum -lt 18) {
    Write-Host "[X] Node.js version must be 18 or higher" -ForegroundColor Red
    Write-Host "   Current version: $nodeVersion" -ForegroundColor Red
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

# Install dependencies
Write-Host "[2/5] Installing dependencies..." -ForegroundColor Yellow
Write-Host ""
npm run install:all

if ($LASTEXITCODE -ne 0) {
    Write-Host "[X] Installation failed" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[OK] Dependencies installed" -ForegroundColor Green
Write-Host ""

# Build
Write-Host "[3/5] Building packages..." -ForegroundColor Yellow
Write-Host ""
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "[X] Build failed" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[OK] Build completed" -ForegroundColor Green
Write-Host ""

# Setup environment
Write-Host "[4/5] Setting up environment..." -ForegroundColor Yellow
Write-Host ""

if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
    Write-Host "[OK] .env created" -ForegroundColor Green
    Write-Host ""
    Write-Host "[!] IMPORTANT: Edit .env and add your API keys!" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host "[OK] .env already exists" -ForegroundColor Green
}
Write-Host ""

# Complete
Write-Host "[5/5] Setup complete!" -ForegroundColor Yellow
Write-Host ""
Write-Host "============================================================" -ForegroundColor Green
Write-Host "                   SETUP COMPLETE!" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
Write-Host ""
Write-Host "QUICK START GUIDE:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Setup API Key:" -ForegroundColor White
Write-Host "   Edit .env file and add:" -ForegroundColor Gray
Write-Host "   OPENAI_API_KEY=your-key-here" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Run Interactive Menu:" -ForegroundColor White
Write-Host "   .\start.bat" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Or use CLI directly:" -ForegroundColor White
Write-Host "   cd packages\cli" -ForegroundColor Gray
Write-Host "   node dist\cli.js review path\to\file.js" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Advanced Features:" -ForegroundColor White
Write-Host "   node dist\cli.js review . --consensus" -ForegroundColor Gray
Write-Host "   node dist\cli.js scan:deps" -ForegroundColor Gray
Write-Host "   node dist\cli.js review --format html --output report.html" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Start Web Dashboard:" -ForegroundColor White
Write-Host "   .\start.bat  (choose option 2)" -ForegroundColor Gray
Write-Host ""
Write-Host "Documentation:" -ForegroundColor Cyan
Write-Host "   - README.md - Full feature list" -ForegroundColor Gray
Write-Host "   - CARA_PAKAI.md - Tutorial lengkap" -ForegroundColor Gray
Write-Host "   - WINDOWS_SETUP.md - Windows specific guide" -ForegroundColor Gray
Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "          Made with Love by attazy - MIT License" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next: Edit .env, then run: .\start.bat" -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter to exit"

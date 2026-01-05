@echo off
REM CodeBlaster AI - Interactive Menu (Windows)

:MENU
cls
echo.
echo ========================================
echo   CodeBlaster AI - Interactive Menu
echo ========================================
echo.
echo   1. Analyze files (CLI)
echo   2. Start Web Dashboard
echo   3. Run security scan
echo   4. Generate report
echo   5. Setup wizard
echo   6. View documentation
echo   7. Exit
echo.
echo ========================================
echo.
set /p choice="Select option (1-7): "

if "%choice%"=="1" goto ANALYZE
if "%choice%"=="2" goto DASHBOARD
if "%choice%"=="3" goto SECURITY
if "%choice%"=="4" goto REPORT
if "%choice%"=="5" goto SETUP
if "%choice%"=="6" goto DOCS
if "%choice%"=="7" goto EXIT
goto MENU

:ANALYZE
cls
echo.
echo [Analyze Files]
echo.
set /p path="Enter file/folder path to analyze: "
if "%path%"=="" (
    echo [ERROR] Path is required
    pause
    goto MENU
)
echo.
echo Running analysis...
cd packages\cli
node dist\cli.js review "%path%"
echo.
pause
goto MENU

:DASHBOARD
cls
echo.
echo [Starting Web Dashboard]
echo.
echo Starting backend...
start cmd /k "cd packages\web-dashboard\backend && npm run dev"
timeout /t 3 >nul
echo Starting frontend...
start cmd /k "cd packages\web-dashboard\frontend && npm run dev"
echo.
echo Dashboard will open at: http://localhost:3000
echo Press any key to return to menu...
pause >nul
goto MENU

:SECURITY
cls
echo.
echo [Security Scan]
echo.
echo Running dependency scan...
cd packages\cli
node dist\cli.js scan:deps
echo.
pause
goto MENU

:REPORT
cls
echo.
echo [Generate Report]
echo.
set /p path="Enter path to analyze: "
set /p output="Enter output filename (e.g., report.html): "
if "%path%"=="" set path=.
if "%output%"=="" set output=report.html
echo.
echo Generating report...
cd packages\cli
node dist\cli.js review "%path%" --format html --output "%output%"
echo.
echo Report saved: %output%
start %output%
pause
goto MENU

:SETUP
cls
echo.
echo [Setup Wizard]
echo.
cd packages\cli
node dist\cli.js init
echo.
pause
goto MENU

:DOCS
cls
echo.
echo [Documentation]
echo.
echo Available documentation:
echo   - README.md - Overview
echo   - CARA_PAKAI.md - Full tutorial (Bahasa)
echo   - WINDOWS_SETUP.md - Windows guide
echo   - START_HERE.md - Quick start
echo.
set /p doc="Which file to open? (or press Enter to skip): "
if not "%doc%"=="" start %doc%
echo.
pause
goto MENU

:EXIT
cls
echo.
echo Thank you for using CodeBlaster AI!
echo.
exit /b 0

@echo off
REM CodeBlaster AI - Help & Documentation Viewer (Windows)

:MENU
cls
echo.
echo ========================================
echo   CodeBlaster AI - Documentation
echo ========================================
echo.
echo   1. Windows Setup Guide
echo   2. Full Tutorial (Bahasa)
echo   3. Quick Start Guide
echo   4. README
echo   5. Structure Guide
echo   6. Open All Docs
echo   7. Back to Main Menu
echo.
echo ========================================
echo.
set /p choice="Select option (1-7): "

if "%choice%"=="1" goto WINDOWS
if "%choice%"=="2" goto CARA_PAKAI
if "%choice%"=="3" goto START_HERE
if "%choice%"=="4" goto README
if "%choice%"=="5" goto STRUCTURE
if "%choice%"=="6" goto ALL
if "%choice%"=="7" goto EXIT
goto MENU

:WINDOWS
start WINDOWS_SETUP.md
goto MENU

:CARA_PAKAI
start CARA_PAKAI.md
goto MENU

:START_HERE
start START_HERE.md
goto MENU

:README
start README.md
goto MENU

:STRUCTURE
start STRUCTURE_GUIDE.md
goto MENU

:ALL
start WINDOWS_SETUP.md
timeout /t 1 >nul
start CARA_PAKAI.md
timeout /t 1 >nul
start README.md
goto MENU

:EXIT
exit /b 0

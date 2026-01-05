@echo off
REM Quick Start Script for CodeBlaster AI (Windows)

cls
echo.
echo ============================================================
echo.
echo    CodeBlasters AI - Advanced Code Review Assistant
echo.
echo    Created by: Attazy
echo    Version: 1.0.0
echo.
echo ============================================================
echo.
echo.

echo [1/5] Checking prerequisites...
echo.

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [X] Node.js is not installed
    echo     Please install Node.js 18+ from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js version:
node -v
echo [OK] npm version:
npm -v
echo.

echo [2/5] Installing dependencies...
echo.
call npm run install:all
if %ERRORLEVEL% NEQ 0 (
    echo [X] Installation failed
    pause
    exit /b 1
)
echo.
echo [OK] Dependencies installed
echo.

echo [3/5] Building packages...
echo.
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [X] Build failed
    pause
    exit /b 1
)
echo.
echo [OK] Build completed
echo.

echo [4/5] Setting up environment...
echo.
if not exist .env (
    copy .env.example .env
    echo [OK] .env created
    echo.
    echo [!] IMPORTANT: Edit .env and add your API keys!
    echo.
) else (
    echo [OK] .env already exists
)
echo.

echo [5/5] Setup complete!
echo.
echo ============================================================
echo                    SETUP COMPLETE!
echo ============================================================
echo.
echo QUICK START GUIDE:
echo.
echo 1. Setup API Key:
echo    Edit .env file and add:
echo    OPENAI_API_KEY=your-key-here
echo.
echo 2. Run Interactive Menu:
echo    start.bat
echo.
echo 3. Or use CLI directly:
echo    cd packages\cli
echo    node dist\cli.js review path\to\file.js
echo.
echo 4. Advanced Features:
echo    node dist\cli.js review . --consensus
echo    node dist\cli.js scan:deps
echo    node dist\cli.js review --format html --output report.html
echo.
echo 5. Start Web Dashboard:
echo    start.bat  (choose option 2)
echo.
echo Documentation:
echo    - README.md - Full feature list
echo    - CARA_PAKAI.md - Tutorial lengkap
echo    - WINDOWS_SETUP.md - Windows specific guide
echo.
echo ============================================================
echo           Made with Love by attazy - MIT License
echo ============================================================
echo.
echo Next: Edit .env, then run: start.bat
echo.
pause

@echo off
REM CodeBlaster AI - Windows Installation Script

echo.
echo ========================================
echo   CodeBlaster AI - Installation
echo ========================================
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed
    echo Please install Node.js 18+ from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js found: 
node -v
npm -v
echo.

REM Install dependencies
echo [STEP 1/3] Installing dependencies...
call npm run install:all
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Installation failed
    pause
    exit /b 1
)
echo.

REM Build packages
echo [STEP 2/3] Building packages...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Build failed
    pause
    exit /b 1
)
echo.

REM Setup .env
echo [STEP 3/3] Setting up environment...
if not exist .env (
    copy .env.example .env
    echo [OK] .env file created
    echo.
    echo [WARNING] Please edit .env and add your API keys!
) else (
    echo [OK] .env already exists
)
echo.

echo ========================================
echo   Installation Complete!
echo ========================================
echo.
echo Next steps:
echo   1. Edit .env and add your API keys
echo   2. Run: start.bat
echo   3. Or use CLI: cd packages\cli ^&^& node dist\cli.js review
echo.
echo Documentation: README.md ^| CARA_PAKAI.md
echo.
pause

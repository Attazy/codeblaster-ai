#!/bin/bash

# 🚀 BLASTERS AI - WEB DASHBOARD LAUNCHER
# Menjalankan Frontend & Backend dalam 1 Terminal

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'
BOLD='\033[1m'

clear

echo -e "${CYAN}"
echo "╔════════════════════════════════════════════════════════╗"
echo "║                                                        ║"
echo "║        🚀 BLASTERS AI - WEB DASHBOARD 🚀               ║"
echo "║                                                        ║"
echo "║        Starting Frontend & Backend...                  ║"
echo "║                                                        ║"
echo "╚════════════════════════════════════════════════════════╝"
echo -e "${NC}\n"

# Cek apakah sudah build
echo -e "${YELLOW}[1/3]${NC} Checking build status..."
if [ ! -d "packages/web-dashboard/backend/dist" ] || [ ! -d "packages/web-dashboard/frontend/dist" ]; then
    echo -e "${YELLOW}⚠️  Build not found. Building packages...${NC}"
    npm run build:backend --silent
    npm run build:frontend --silent
    echo -e "${GREEN}✅ Build complete!${NC}\n"
else
    echo -e "${GREEN}✅ Build found!${NC}\n"
fi

# Cek apakah node_modules ada
echo -e "${YELLOW}[2/3]${NC} Checking dependencies..."
if [ ! -d "packages/web-dashboard/backend/node_modules" ]; then
    echo -e "${YELLOW}⚠️  Installing backend dependencies...${NC}"
    cd packages/web-dashboard/backend && npm install --silent && cd ../../..
fi
if [ ! -d "packages/web-dashboard/frontend/node_modules" ]; then
    echo -e "${YELLOW}⚠️  Installing frontend dependencies...${NC}"
    cd packages/web-dashboard/frontend && npm install --silent && cd ../../..
fi
echo -e "${GREEN}✅ Dependencies ready!${NC}\n"

# Trap untuk cleanup saat Ctrl+C
cleanup() {
    echo -e "\n\n${YELLOW}🛑 Shutting down...${NC}"
    kill $(jobs -p) 2>/dev/null
    echo -e "${GREEN}✅ All processes stopped. Goodbye!${NC}"
    exit 0
}
trap cleanup SIGINT SIGTERM

echo -e "${YELLOW}[3/3]${NC} Starting services..."
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

# Start backend in background
echo -e "${BLUE}🔧 Starting Backend...${NC}"
cd packages/web-dashboard/backend
npm run dev 2>&1 | sed "s/^/[BACKEND] /" &
BACKEND_PID=$!
cd ../../..

# Wait a bit for backend to start
sleep 3

# Start frontend in background
echo -e "${BLUE}🎨 Starting Frontend...${NC}"
cd packages/web-dashboard/frontend
npm run dev 2>&1 | sed "s/^/[FRONTEND] /" &
FRONTEND_PID=$!
cd ../../..

# Wait for services to be ready
echo -e "\n${GREEN}⏳ Waiting for services to start...${NC}"
sleep 5

echo -e "\n${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}${BOLD}"
echo "  ✅ ALL SERVICES ARE RUNNING!"
echo -e "${NC}"
echo -e "  📊 Dashboard:  ${CYAN}${BOLD}http://localhost:5173${NC}"
echo -e "  🔌 API:        ${CYAN}${BOLD}http://localhost:5000${NC}"
echo -e ""
echo -e "${YELLOW}  💡 Tip: Open your browser and go to http://localhost:5173${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "\n${RED}Press Ctrl+C to stop all services${NC}\n"

# Wait for both processes
wait

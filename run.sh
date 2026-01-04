#!/bin/bash

# 🚀 Blasters AI - Interactive Menu (Storm-style)
# Simple interface untuk pemula

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Clear screen
clear

# Banner ASCII Art - Storm Style
echo -e "${CYAN}${BOLD}"
cat << "EOF"

    ____  __    ___   ___________  ____  _____
   / __ )/ /   /   | / ___/_  __/ / __ \/ ___/
  / __  / /   / /| | \__ \ / /   / /_/ /\__ \ 
 / /_/ / /___/ ___ |___/ // /   / _, _/___/ / 
/_____/_____/_/  |_/____//_/   /_/ |_|/____/  
                                               
    AI-Powered Code Review Tool - v2.0.0

EOF
echo -e "${NC}"

# Check if built
if [ ! -d "packages/cli/dist" ]; then
    echo -e "${YELLOW}⚠️  Belum di-build. Building project...${NC}"
    npm run build >/dev/null 2>&1
    echo -e "${GREEN}✅ Build complete!${NC}\n"
fi

# Function to show menu
show_menu() {
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    
    echo -e "${BOLD}📋 ANALYZE CODE:${NC}"
    echo -e "  ${GREEN}1${NC} → Analyze File       ${CYAN}(Drag & drop supported)${NC}"
    echo -e "  ${GREEN}2${NC} → Analyze Project    ${CYAN}(Full project scan)${NC}"
    echo -e "  ${GREEN}3${NC} → Git Changes        ${CYAN}(Staged files only)${NC}"
    echo -e ""
    
    echo -e "${BOLD}🎯 ADVANCED SCAN:${NC}"
    echo -e "  ${PURPLE}4${NC} → Multi-AI Consensus ${CYAN}(3 AI models vote!)${NC}"
    echo -e "  ${PURPLE}5${NC} → Security Audit     ${CYAN}(CVE + vulnerabilities)${NC}"
    echo -e "  ${PURPLE}6${NC} → Code Architecture  ${CYAN}(Patterns & metrics)${NC}"
    echo -e ""
    
    echo -e "${BOLD}📊 REPORTS & TOOLS:${NC}"
    echo -e "  ${YELLOW}7${NC} → Generate Report    ${CYAN}(HTML + charts)${NC}"
    echo -e "  ${YELLOW}8${NC} → Web Dashboard      ${CYAN}(Full UI interface)${NC}"
    echo -e ""
    
    echo -e "${BOLD}⚙️  SETUP:${NC}"
    echo -e "  ${BLUE}9${NC} → Configure API Keys"
    echo -e ""
    
    echo -e "  ${RED}0${NC} → Exit\n"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

# Function: Analyze single file
analyze_file() {
    echo -e "\n${CYAN}📄 Analyze Single File${NC}"
    echo -e "${YELLOW}Enter file path (or drag & drop):${NC}"
    read -r filepath
    
    if [ -z "$filepath" ]; then
        echo -e "${RED}❌ File path required!${NC}"
        return
    fi
    
    echo -e "\n${GREEN}🚀 Starting analysis...${NC}\n"
    
    cd packages/cli
    node dist/cli.js review "$filepath"
    cd ../..
    
    echo -e "\n${GREEN}✅ Analysis complete!${NC}"
    press_any_key
}

# Function: Analyze project
analyze_project() {
    echo -e "\n${CYAN}📁 Analyze Entire Project${NC}"
    echo -e "${YELLOW}Enter project path (default: current dir):${NC}"
    read -r projectpath
    
    if [ -z "$projectpath" ]; then
        projectpath="."
    fi
    
    echo -e "\n${YELLOW}Choose severity level:${NC}"
    echo -e "  1 - Critical only"
    echo -e "  2 - Critical + Errors"
    echo -e "  3 - All issues (default)"
    read -r severity_choice
    
    severity="info"
    case $severity_choice in
        1) severity="critical" ;;
        2) severity="error" ;;
        3) severity="info" ;;
    esac
    
    echo -e "\n${GREEN}🚀 Starting full project analysis...${NC}"
    echo -e "${BLUE}This may take a while for large projects...${NC}\n"
    
    cd packages/cli
    node dist/cli.js review "$projectpath" --severity "$severity"
    cd ../..
    
    echo -e "\n${GREEN}✅ Project analysis complete!${NC}"
    press_any_key
}

# Function: Analyze staged
analyze_staged() {
    echo -e "\n${CYAN}📝 Analyze Git Staged Changes${NC}\n"
    
    # Check if in git repo
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        echo -e "${RED}❌ Not in a git repository!${NC}"
        press_any_key
        return
    fi
    
    # Check if there are staged changes
    if ! git diff --cached --quiet 2>/dev/null; then
        echo -e "${GREEN}🔍 Found staged changes. Analyzing...${NC}\n"
        
        cd packages/cli
        node dist/cli.js review --staged --severity error
        cd ../..
        
        echo -e "\n${GREEN}✅ Staged changes analyzed!${NC}"
    else
        echo -e "${YELLOW}⚠️  No staged changes found!${NC}"
        echo -e "Use: ${CYAN}git add <files>${NC} first"
    fi
    
    press_any_key
}

# Function: Multi-AI consensus
consensus_review() {
    echo -e "\n${PURPLE}🤖 Multi-AI Consensus Review${NC}"
    echo -e "${YELLOW}This uses 3 AI models for maximum accuracy!${NC}\n"
    
    echo -e "Enter file/folder path:"
    read -r path
    
    if [ -z "$path" ]; then
        path="."
    fi
    
    echo -e "\n${GREEN}🚀 Running consensus analysis with 3 AI models...${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    
    cd packages/cli
    node dist/cli.js review "$path" --consensus --models gpt-4,claude-3-5-sonnet,codellama
    cd ../..
    
    echo -e "\n${GREEN}✅ Consensus analysis complete!${NC}"
    press_any_key
}

# Function: Security scan
security_scan() {
    echo -e "\n${RED}🔒 Security Scan + Dependency Check${NC}\n"
    
    echo -e "${YELLOW}Scanning for:${NC}"
    echo -e "  • SQL Injection vulnerabilities"
    echo -e "  • XSS vulnerabilities"
    echo -e "  • Hardcoded secrets"
    echo -e "  • CVE vulnerabilities in dependencies"
    echo -e "  • Outdated packages\n"
    
    echo -e "${GREEN}🔍 Starting security scan...${NC}\n"
    
    cd packages/cli
    node dist/cli.js review . --severity critical --scan-deps
    cd ../..
    
    echo -e "\n${GREEN}✅ Security scan complete!${NC}"
    press_any_key
}

# Function: Architecture analysis
architecture_analysis() {
    echo -e "\n${BLUE}🏗️  Architecture Analysis${NC}\n"
    
    echo -e "${YELLOW}Analyzing:${NC}"
    echo -e "  • Design patterns"
    echo -e "  • Anti-patterns"
    echo -e "  • Code complexity"
    echo -e "  • Project structure\n"
    
    echo -e "${GREEN}🚀 Starting architecture analysis...${NC}\n"
    
    cd packages/cli
    node dist/cli.js analyze:architecture --metrics
    cd ../..
    
    echo -e "\n${GREEN}✅ Architecture analysis complete!${NC}"
    press_any_key
}

# Function: Generate HTML report
generate_report() {
    echo -e "\n${CYAN}📊 Generate HTML Report${NC}\n"
    
    echo -e "Enter path to analyze:"
    read -r path
    
    if [ -z "$path" ]; then
        path="."
    fi
    
    report_name="codeblaster-report-$(date +%Y%m%d-%H%M%S).html"
    
    echo -e "\n${GREEN}🚀 Generating report...${NC}\n"
    
    cd packages/cli
    node dist/cli.js review "$path" --format html --output "../../$report_name"
    cd ../..
    
    echo -e "\n${GREEN}✅ Report generated: ${BOLD}$report_name${NC}"
    echo -e "${YELLOW}Opening in browser...${NC}"
    
    # Try to open in browser
    if command -v xdg-open > /dev/null; then
        xdg-open "$report_name" 2>/dev/null &
    elif command -v open > /dev/null; then
        open "$report_name" 2>/dev/null &
    fi
    
    press_any_key
}

# Function: Start dashboard
start_dashboard() {
    echo -e "\n${CYAN}🖥️  Starting Web Dashboard${NC}\n"
    
    echo -e "${YELLOW}This will start:${NC}"
    echo -e "  • Backend API (port 5000)"
    echo -e "  • Frontend UI (port 3000)\n"
    
    echo -e "${GREEN}Starting services...${NC}\n"
    
    # Start backend
    cd packages/web-dashboard/backend
    npm install >/dev/null 2>&1
    npm run dev &
    backend_pid=$!
    cd ../../..
    
    echo -e "${GREEN}✅ Backend started (PID: $backend_pid)${NC}"
    
    sleep 2
    
    # Start frontend
    cd packages/web-dashboard/frontend
    npm install >/dev/null 2>&1
    npm run dev &
    frontend_pid=$!
    cd ../../..
    
    echo -e "${GREEN}✅ Frontend started (PID: $frontend_pid)${NC}\n"
    
    echo -e "${CYAN}${BOLD}Dashboard running at:${NC}"
    echo -e "  ${GREEN}http://localhost:3000${NC}\n"
    
    echo -e "${YELLOW}Press Ctrl+C to stop dashboard${NC}"
    echo -e "${YELLOW}Or press any key to return to menu (services will keep running)${NC}"
    
    read -n 1 -s
}

# Function: Setup API keys
setup_api_keys() {
    echo -e "\n${YELLOW}⚙️  Setup API Keys${NC}\n"
    
    echo -e "${CYAN}Choose AI Provider:${NC}"
    echo -e "  1 - OpenAI (GPT-4)"
    echo -e "  2 - Anthropic (Claude)"
    echo -e "  3 - Ollama (Local/Free)"
    echo -e "  4 - All of them"
    read -r provider_choice
    
    if [ ! -f .env ]; then
        cp .env.example .env 2>/dev/null || touch .env
    fi
    
    case $provider_choice in
        1)
            echo -e "\n${CYAN}Enter OpenAI API Key:${NC}"
            read -r openai_key
            echo "OPENAI_API_KEY=$openai_key" >> .env
            echo -e "${GREEN}✅ OpenAI key saved!${NC}"
            ;;
        2)
            echo -e "\n${CYAN}Enter Anthropic API Key:${NC}"
            read -r anthropic_key
            echo "ANTHROPIC_API_KEY=$anthropic_key" >> .env
            echo -e "${GREEN}✅ Anthropic key saved!${NC}"
            ;;
        3)
            echo "OLLAMA_BASE_URL=http://localhost:11434" >> .env
            echo -e "${GREEN}✅ Ollama configured!${NC}"
            echo -e "${YELLOW}Make sure Ollama is running: ollama serve${NC}"
            ;;
        4)
            echo -e "\n${CYAN}Enter OpenAI API Key:${NC}"
            read -r openai_key
            echo -e "${CYAN}Enter Anthropic API Key:${NC}"
            read -r anthropic_key
            echo "OPENAI_API_KEY=$openai_key" >> .env
            echo "ANTHROPIC_API_KEY=$anthropic_key" >> .env
            echo "OLLAMA_BASE_URL=http://localhost:11434" >> .env
            echo -e "${GREEN}✅ All keys saved!${NC}"
            ;;
    esac
    
    echo -e "\n${GREEN}Configuration saved to .env${NC}"
    press_any_key
}



# Helper function
press_any_key() {
    echo -e "\n${YELLOW}Press any key to continue...${NC}"
    read -n 1 -s
}

# Main loop
while true; do
    clear
    
    # Show banner
    echo -e "${CYAN}${BOLD}"
    cat << "EOF"

    ____  __    ___   ___________  ____  _____
   / __ )/ /   /   | / ___/_  __/ / __ \/ ___/
  / __  / /   / /| | \__ \ / /   / /_/ /\__ \ 
 / /_/ / /___/ ___ |___/ // /   / _, _/___/ / 
/_____/_____/_/  |_/____//_/   /_/ |_|/____/  
                                               
    AI-Powered Code Review - Enterprise v2.0

EOF
    echo -e "${NC}"
    
    show_menu
    
    echo -ne "${BOLD}${YELLOW}➤ ${NC}Choose [0-9]: "
    read -r choice
    
    case $choice in
        1) analyze_file ;;
        2) analyze_project ;;
        3) analyze_staged ;;
        4) consensus_review ;;
        5) security_scan ;;
        6) architecture_analysis ;;
        7) generate_report ;;
        8) start_dashboard ;;
        9) setup_api_keys ;;
        0)
            clear
            echo -e "\n${CYAN}"
            cat << "EOF"
    ╔════════════════════════════════════════╗
    ║   Thanks for using Blasters AI!        ║
    ╚════════════════════════════════════════╝
EOF
            echo -e "${NC}\n"
            exit 0
            ;;
        *)
            echo -e "\n${RED}❌ Invalid option! Choose 0-9${NC}"
            sleep 1
            ;;
    esac
done

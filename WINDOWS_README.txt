╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║          CodeBlaster AI - Windows Quick Start             ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝

📦 INSTALLATION (Choose one):

  Method 1 - Batch Script (Recommended):
  ────────────────────────────────────────
  1. Double-click: quickstart.bat
  2. Wait for installation to complete
  3. Edit .env file with your API key
  4. Double-click: start.bat

  Method 2 - PowerShell:
  ────────────────────────────────────────
  1. Right-click PowerShell → Run as Administrator
  2. Run: powershell -ExecutionPolicy Bypass -File quickstart.ps1
  3. Edit .env file with your API key
  4. Run: .\start.bat

  Method 3 - Command Line:
  ────────────────────────────────────────
  1. Open Command Prompt
  2. Run: npm run install:all
  3. Run: npm run build
  4. Copy .env.example to .env
  5. Edit .env with your API key

🚀 USAGE:

  Interactive Menu (Easiest):
  ────────────────────────────────────────
  Double-click: start.bat

  Command Line (Advanced):
  ────────────────────────────────────────
  cd packages\cli
  node dist\cli.js review C:\path\to\file.js
  node dist\cli.js review . --consensus
  node dist\cli.js scan:deps

  Web Dashboard:
  ────────────────────────────────────────
  Double-click: start.bat → Choose option 2
  Opens: http://localhost:3000

📚 DOCUMENTATION:

  ✓ WINDOWS_SETUP.md - Complete Windows guide
  ✓ README.md - Full feature list
  ✓ CARA_PAKAI.md - Tutorial lengkap (Bahasa)
  ✓ START_HERE.md - Quick start guide

  View docs: Double-click docs.bat

🔑 API KEYS:

  Get your API key from:
  • OpenAI: https://platform.openai.com/api-keys
  • Anthropic: https://console.anthropic.com/
  • Ollama: https://ollama.com/ (FREE - Local)

  Add to .env file:
  OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx

🛠️ TROUBLESHOOTING:

  Problem: "Node is not recognized"
  Solution: Install Node.js from https://nodejs.org/
           Restart terminal after installation

  Problem: "Build failed"
  Solution: Run as Administrator
           Or: npm cache clean --force
               npm install
               npm run build

  Problem: ".env not found"
  Solution: copy .env.example .env
           notepad .env

  Problem: "Port already in use"
  Solution: netstat -ano | findstr :3000
           taskkill /PID <PID> /F

📞 SUPPORT:

  • Documentation: docs\ folder
  • Issues: GitHub Issues
  • Email: support@codeblaster.ai

✅ QUICK TEST:

  1. quickstart.bat
  2. Edit .env (add API key)
  3. start.bat
  4. Choose "1. Analyze files"
  5. Enter file path
  6. View results!

╔═══════════════════════════════════════════════════════════╗
║       Made with ❤️  by attazy - MIT License               ║
╚═══════════════════════════════════════════════════════════╝

For detailed instructions, open: WINDOWS_SETUP.md

# 🪟 CodeBlaster AI - Windows Setup Guide

**Panduan lengkap instalasi dan penggunaan CodeBlaster AI di Windows**

---

## ⚡ CARA PALING MUDAH (Recommended)

### **Quick Start - 3 Langkah Aja!**

```cmd
REM 1. Clone repository
git clone https://github.com/attazy/codeblaster-ai.git
cd codeblaster-ai

REM 2. Run installer
quickstart.bat

REM 3. Launch interactive menu
start.bat
```

**Done!** Tinggal pilih menu yang mau dipake. 🎉

---

## 📋 **REQUIREMENTS**

### **Yang Harus Di-install Dulu:**

1. **Node.js v18+**
   - Download: https://nodejs.org/
   - Pilih "LTS" version (recommended)
   - Install dengan default settings
   - Restart terminal setelah install

2. **Git** (optional, untuk clone)
   - Download: https://git-scm.com/download/win
   - Atau download ZIP dari GitHub langsung

3. **Text Editor** (pilih salah satu)
   - VS Code: https://code.visualstudio.com/
   - Notepad++: https://notepad-plus-plus.org/
   - Atau pakai Notepad bawaan Windows juga bisa

### **Cek Instalasi:**

Buka **Command Prompt** atau **PowerShell**, lalu cek:

```cmd
node -v
REM Output: v18.x.x atau lebih tinggi

npm -v
REM Output: v9.x.x atau lebih tinggi
```

Kalau sudah muncul version-nya, berarti **READY!** ✅

---

## 🚀 **INSTALASI**

### **Metode 1: Auto Install (PALING MUDAH)**

```cmd
REM Download & extract ZIP dari GitHub, atau clone:
git clone https://github.com/attazy/codeblaster-ai.git
cd codeblaster-ai

REM Run quick installer
quickstart.bat
```

Installer akan otomatis:
- ✅ Check Node.js version
- ✅ Install dependencies
- ✅ Build packages
- ✅ Create .env file
- ✅ Show instructions

### **Metode 2: Manual Install**

```cmd
REM 1. Clone atau download
git clone https://github.com/attazy/codeblaster-ai.git
cd codeblaster-ai

REM 2. Install dependencies
npm run install:all

REM 3. Build packages
npm run build

REM 4. Setup environment
copy .env.example .env
notepad .env
```

---

## 🔑 **SETUP API KEY**

### **Step 1: Pilih AI Provider**

CodeBlaster support 3 AI providers:

| Provider | Kelebihan | Harga | Link |
|----------|-----------|-------|------|
| **OpenAI** | Paling akurat | $0.03/request | [Get Key](https://platform.openai.com/api-keys) |
| **Anthropic** | Bagus untuk complex code | $0.025/request | [Get Key](https://console.anthropic.com/) |
| **Ollama** | GRATIS! (local) | Free | [Install](https://ollama.com/) |

### **Step 2: Edit .env File**

Buka file `.env` dengan text editor:

```cmd
notepad .env
```

Isi dengan API key pilihan kamu:

```env
# Pilih salah satu (atau semua):

# OpenAI (recommended)
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx

# Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx

# Ollama (gratis, install local)
OLLAMA_BASE_URL=http://localhost:11434
```

**Cara dapat API Key:**

**OpenAI:**
1. Buka https://platform.openai.com/signup
2. Sign up / Login
3. Go to API Keys
4. Create new secret key
5. Copy key dan paste ke .env

**Anthropic:**
1. Buka https://console.anthropic.com/
2. Sign up / Login
3. Go to API Keys
4. Create key
5. Copy key dan paste ke .env

**Ollama (FREE!):**
```cmd
REM Download installer dari:
REM https://ollama.com/download/windows

REM Install, lalu run:
ollama pull codellama
ollama serve

REM Edit .env:
OLLAMA_BASE_URL=http://localhost:11434
```

---

## 💻 **CARA PAKAI**

### **Option A: Interactive Menu (EASIEST!)**

```cmd
REM Launch menu
start.bat
```

**Menu Options:**
```
========================================
  CodeBlaster AI - Interactive Menu
========================================

  1. Analyze files (CLI)
  2. Start Web Dashboard
  3. Run security scan
  4. Generate report
  5. Setup wizard
  6. View documentation
  7. Exit

========================================
```

Tinggal pilih angka yang mau dipake!

### **Option B: Command Line (Advanced)**

```cmd
REM Masuk ke CLI folder
cd packages\cli

REM Analyze file
node dist\cli.js review path\to\file.js

REM Analyze folder
node dist\cli.js review src\

REM Generate HTML report
node dist\cli.js review . --format html --output report.html

REM Use consensus mode
node dist\cli.js review . --consensus

REM Security scan
node dist\cli.js scan:deps
```

---

## 🖥️ **WEB DASHBOARD**

### **Start Dashboard:**

**Cara 1 - Pakai Menu:**
```cmd
start.bat
REM Pilih option 2
```

**Cara 2 - Manual:**
```cmd
REM Terminal 1 - Backend
cd packages\web-dashboard\backend
npm install
npm run dev

REM Terminal 2 - Frontend
cd packages\web-dashboard\frontend
npm install
npm run dev
```

Buka browser: **http://localhost:3000**

### **Dashboard Features:**

- 📊 **Overview** - Summary & quick actions
- 🔍 **Analysis** - Run new analysis with drag & drop
- 📈 **Trends** - Quality trends over time
- 👥 **Team** - Team collaboration
- ⚙️ **Settings** - Configure AI & rules

---

## 🎯 **EXAMPLES**

### **Example 1: Analyze JavaScript File**

```cmd
cd packages\cli

REM Review single file
node dist\cli.js review C:\Projects\myapp\src\index.js

REM Output:
🚀 CodeBlaster AI - Analysis Report

Files Analyzed: 1
Total Issues: 3

🔴 CRITICAL: SQL Injection
   File: index.js:25
   💡 Use parameterized queries

⚠️  WARNING: Function too complex
   File: index.js:10
   💡 Refactor into smaller functions
```

### **Example 2: Full Project Scan**

```cmd
REM Analyze entire src folder with consensus
node dist\cli.js review C:\Projects\myapp\src --consensus

REM Generate HTML report
node dist\cli.js review C:\Projects\myapp\src ^
  --format html ^
  --output C:\Reports\myapp-review.html

REM Open report
start C:\Reports\myapp-review.html
```

### **Example 3: Security Audit**

```cmd
REM Security-focused scan
node dist\cli.js review C:\Projects\myapp ^
  --severity critical ^
  --scan-deps ^
  --format json ^
  --output security-audit.json

REM View results
type security-audit.json
```

### **Example 4: CI/CD Integration**

**File: `.github\workflows\code-review.yml`**

```yaml
name: CodeBlaster Review

on:
  pull_request:
    branches: [main]

jobs:
  review:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      
      - name: Install CodeBlaster
        run: |
          npm run install:all
          npm run build
      
      - name: Run Analysis
        run: |
          cd packages/cli
          node dist/cli.js review . --format json --output report.json
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
      
      - name: Upload Report
        uses: actions/upload-artifact@v3
        with:
          name: review-report
          path: packages/cli/report.json
```

---

## 🛠️ **ADVANCED CONFIG**

### **Create Custom Config**

```cmd
REM Run setup wizard
cd packages\cli
node dist\cli.js init

REM Atau buat manual
notepad .codeblaster.json
```

**File: `.codeblaster.json`**

```json
{
  "version": "2.0.0",
  "ai": {
    "provider": "openai",
    "model": "gpt-4",
    "consensus": true
  },
  "analysis": {
    "severity": "warning",
    "parallel": true,
    "cache": true
  },
  "rules": {
    "enabled": [
      "no-eval",
      "sql-injection",
      "xss-vulnerability",
      "hardcoded-secrets"
    ]
  },
  "ignore": [
    "node_modules/**",
    "dist/**",
    "*.min.js",
    "build/**"
  ]
}
```

---

## 🔄 **GIT INTEGRATION**

### **Pre-commit Hook (Windows)**

**File: `.git\hooks\pre-commit` (no extension!)**

```bash
#!/bin/sh

# CodeBlaster pre-commit check
cd packages/cli
node dist/cli.js review --staged --severity error

if [ $? -ne 0 ]; then
  echo "❌ Code review failed! Fix issues before committing."
  exit 1
fi

exit 0
```

**Make executable:**
```cmd
REM In Git Bash:
chmod +x .git/hooks/pre-commit
```

**Atau pakai Husky:**
```cmd
npm install --save-dev husky
npx husky install
npx husky add .husky/pre-commit "cd packages/cli && node dist/cli.js review --staged"
```

---

## 🐛 **TROUBLESHOOTING**

### **Problem 1: "Node is not recognized"**

**Solution:**
```cmd
REM Restart terminal setelah install Node.js
REM Atau add to PATH manually:

REM 1. Windows Search → "Environment Variables"
REM 2. Edit "Path" variable
REM 3. Add: C:\Program Files\nodejs\
REM 4. Restart terminal
```

### **Problem 2: "npm run build failed"**

**Solution:**
```cmd
REM Clean install
rmdir /s /q node_modules
del package-lock.json
npm cache clean --force
npm install
npm run build
```

### **Problem 3: "Cannot find module"**

**Solution:**
```cmd
REM Re-install dependencies
cd packages\core
npm install
cd ..\cli
npm install
cd ..\..
npm run build
```

### **Problem 4: ".env file not found"**

**Solution:**
```cmd
REM Create from example
copy .env.example .env
notepad .env

REM Add your API key
```

### **Problem 5: "Port 3000 already in use"**

**Solution:**
```cmd
REM Find process using port 3000
netstat -ano | findstr :3000

REM Kill process (replace PID)
taskkill /PID <PID> /F

REM Or use different port
set PORT=3001
npm run dev
```

### **Problem 6: "Permission denied"**

**Solution:**
```cmd
REM Run as Administrator
REM Right-click Command Prompt → Run as Administrator

REM Atau disable antivirus temporarily
```

---

## 📊 **COMMAND REFERENCE**

### **Main Commands:**

```cmd
REM Review code
node dist\cli.js review [path]

REM Initialize config
node dist\cli.js init

REM Scan dependencies
node dist\cli.js scan:deps

REM Generate report
node dist\cli.js report <file>

REM Start dashboard
start.bat  REM Option 2
```

### **Common Options:**

```cmd
--ai <provider>         OpenAI, Anthropic, Ollama
--model <model>         gpt-4, claude-3-5-sonnet, etc
--severity <level>      info, warning, error, critical
--format <format>       console, json, html
--output <file>         Save report to file
--consensus             Multi-AI voting
--scan-deps             Scan dependencies
--parallel              Parallel processing
--cache                 Enable caching
--staged                Only review git staged files
```

---

## 💡 **TIPS & TRICKS (Windows)**

### **1. Create Shortcuts**

**Desktop shortcut untuk start.bat:**
```cmd
REM 1. Right-click start.bat
REM 2. Create shortcut
REM 3. Move to Desktop
REM 4. Rename to "CodeBlaster"
```

### **2. Add to PATH**

```cmd
REM Add CLI to PATH untuk akses global

REM 1. Windows Search → "Environment Variables"
REM 2. Edit "Path" variable
REM 3. Add: C:\path\to\codeblaster-ai\packages\cli
REM 4. Create bat file: codeblaster.bat

@echo off
node "C:\path\to\codeblaster-ai\packages\cli\dist\cli.js" %*

REM Now run from anywhere:
codeblaster review C:\MyProject
```

### **3. PowerShell Profile**

**File: `$PROFILE`**

```powershell
# CodeBlaster alias
function cb {
  node "C:\path\to\codeblaster-ai\packages\cli\dist\cli.js" $args
}

# Usage:
cb review .
cb scan:deps
```

### **4. VS Code Integration**

**File: `.vscode\tasks.json`**

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "CodeBlaster Review",
      "type": "shell",
      "command": "node",
      "args": [
        "${workspaceFolder}\\packages\\cli\\dist\\cli.js",
        "review",
        "${file}"
      ],
      "problemMatcher": []
    }
  ]
}
```

**Keyboard shortcut:**
- Press `Ctrl+Shift+P`
- Type "Tasks: Run Task"
- Select "CodeBlaster Review"

---

## 🚀 **QUICK REFERENCE**

### **Installation:**
```cmd
quickstart.bat
```

### **Daily Usage:**
```cmd
start.bat
```

### **CLI Commands:**
```cmd
cd packages\cli

REM Review file
node dist\cli.js review path\to\file.js

REM Review folder
node dist\cli.js review src\

REM Generate report
node dist\cli.js review . --format html --output report.html

REM Security scan
node dist\cli.js scan:deps

REM Multi-AI consensus
node dist\cli.js review . --consensus
```

### **Web Dashboard:**
```cmd
start.bat  REM Choose option 2
REM Opens: http://localhost:3000
```

---

## 📚 **ADDITIONAL RESOURCES**

- **README.md** - Full feature list
- **CARA_PAKAI.md** - Detailed tutorial (Bahasa Indonesia)
- **START_HERE.md** - Quick start guide
- **STRUCTURE_GUIDE.md** - Architecture guide
- **docs/** - Advanced documentation
- **examples/** - Code examples

---

## 🎓 **LEARNING PATH**

### **Beginner (Day 1):**
1. ✅ Install dengan quickstart.bat
2. ✅ Setup API key di .env
3. ✅ Run first analysis pakai start.bat
4. ✅ Explore interactive menu

### **Intermediate (Week 1):**
1. ✅ Pakai CLI commands
2. ✅ Generate HTML reports
3. ✅ Try different AI providers
4. ✅ Explore web dashboard

### **Advanced (Month 1):**
1. ✅ Setup pre-commit hooks
2. ✅ Multi-AI consensus mode
3. ✅ Custom rules & config
4. ✅ CI/CD integration
5. ✅ Team collaboration

---

## 🤝 **SUPPORT**

**Need help?**

- 📖 Baca dokumentasi di folder `docs/`
- 🐛 Report bugs: GitHub Issues
- 💬 Diskusi: GitHub Discussions
- 📧 Email: support@codeblaster.ai

---

## ✅ **CHECKLIST**

**Setelah setup, pastikan:**

- [ ] Node.js v18+ installed
- [ ] npm packages installed
- [ ] Project built successfully
- [ ] .env file created & configured
- [ ] API key added & tested
- [ ] First analysis runs successfully
- [ ] start.bat menu works
- [ ] Documentation accessible

**Kalau semua checklist ✅, berarti SIAP DIPAKAI!** 🎉

---

**Made with ❤️ by attazy - MIT License**

**Windows-specific guide by attazy**

---

## 📝 **NOTES**

- Gunakan **Command Prompt** atau **PowerShell** (sama aja)
- Path separator di Windows: `\` bukan `/`
- File .env pakai **CRLF** line endings (Windows default)
- Kalau ada masalah, coba run as **Administrator**
- Antivirus kadang block npm install, disable sementara kalau perlu

**Happy Coding!** 🚀

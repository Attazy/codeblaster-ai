# 📖 PANDUAN LENGKAP CARA PAKAI CODEBLASTER AI

## ⚡ CARA PALING GAMPANG (NEW!)

### **Interactive Menu - Seperti Storm CLI** 🌟

**Linux/macOS:**
```bash
# Langsung run aja!
./run.sh
```

**Windows:**
```cmd
REM Langsung run aja!
start.bat
```

**Menu interaktif akan muncul dengan pilihan:**
- ✨ Analyze files (tinggal drag & drop)
- ✨ Multi-AI consensus
- ✨ Security scanning
- ✨ Web dashboard
- ✨ Setup wizard
- ✨ Dan banyak lagi!

**TIDAK perlu tahu tentang modules/packages!** Semua sudah otomatis.

Lihat: **START_HERE.md** untuk quick guide dengan contoh.

💡 **Windows users:** Baca **[WINDOWS_SETUP.md](WINDOWS_SETUP.md)** untuk panduan lengkap!

---

## 🚀 STEP-BY-STEP TUTORIAL - DARI NOL SAMPAI JALAN

*(Cara manual/advanced - skip kalau sudah pakai `./run.sh`)*

---

## 📋 **PERSIAPAN AWAL**

### **Step 1: Pastikan Sudah Install**

Cek dulu apakah Node.js sudah terinstall:

```bash
node -v
# Harus menunjukkan v18.x.x atau lebih tinggi
# Kalau belum ada, install dari: https://nodejs.org/

npm -v
# Harus menunjukkan v9.x.x atau lebih tinggi
```

---

## 🛠️ **INSTALASI**

### **Step 2: Masuk ke Folder Project**

```bash
cd /home/attazy/Blasters
```

### **Step 3: Install Dependencies**

**Pilihan A - AUTOMATIC (Recommended):**
```bash
./quickstart.sh
```

Script ini akan otomatis:
- ✅ Check Node.js version
- ✅ Install semua dependencies
- ✅ Build semua packages
- ✅ Create .env file
- ✅ Show usage instructions

**Pilihan B - MANUAL:**
```bash
# Install dependencies untuk semua packages
npm run install:all

# Build semua packages
npm run build

# Create .env file
cp .env.example .env
```

### **Step 4: Setup API Key**

Edit file `.env` dan tambahkan API key:

```bash
nano .env
# atau
vim .env
# atau
code .env  # kalau pakai VS Code
```

Isi dengan:
```bash
# Pilih salah satu (atau semua):

# OpenAI (paling bagus)
OPENAI_API_KEY=sk-your-key-here

# Anthropic Claude (alternative)
ANTHROPIC_API_KEY=sk-ant-your-key-here

# Ollama (gratis, local - tidak perlu API key)
OLLAMA_BASE_URL=http://localhost:11434
```

**Cara dapat API key:**
- **OpenAI**: https://platform.openai.com/api-keys (daftar → create key)
- **Anthropic**: https://console.anthropic.com/ (daftar → create key)
- **Ollama**: Install local - `ollama pull codellama` (FREE!)

---

## 🎯 **CARA PAKAI - BASIC**

### **Step 5: Run First Analysis!**

#### **A) Analyze File Tunggal:**

```bash
cd packages/cli

# Analyze satu file
node dist/cli.js review /path/to/your/file.js

# Contoh:
node dist/cli.js review ../../examples/basic-usage.js
```

**Output yang keluar:**
```
🚀 CodeBlaster AI - Analysis Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Files Analyzed: 1
Total Issues: 5

🔴 CRITICAL: 1
❌ ERRORS: 2
⚠️  WARNINGS: 2

🔴 CRITICAL: SQL Injection vulnerability
   File: your-file.js:45
   Code: db.query(`SELECT * WHERE id = ${id}`)
   💡 Use parameterized queries

⚠️  WARNING: Long function (120 lines)
   File: your-file.js:10
   💡 Break into smaller functions
```

#### **B) Analyze Folder/Directory:**

```bash
# Analyze seluruh folder
node dist/cli.js review /path/to/your/project/src

# Contoh:
node dist/cli.js review ../../packages/core/src
```

#### **C) Analyze Git Changes:**

```bash
# Hanya analyze file yang sudah di-stage
node dist/cli.js review --staged

# Berguna untuk pre-commit check!
```

---

## 💎 **CARA PAKAI - ADVANCED FEATURES**

### **Feature 1: Multi-AI Consensus (NEW!)** 🤖

**Pakai 3 AI sekaligus untuk voting:**

```bash
node dist/cli.js review /path/to/file.js \
  --ai openai \
  --consensus

# atau specify multiple models:
node dist/cli.js review /path/to/file.js \
  --consensus \
  --models gpt-4,claude,codellama
```

**Output:**
```
🤖 Running multi-model consensus...
  Model 1 (GPT-4): ✅ Complete
  Model 2 (Claude): ✅ Complete
  Model 3 (CodeLlama): ✅ Complete

📊 Consensus Results:

🔴 CRITICAL (3/3 agree - 100% confidence):
   SQL Injection vulnerability
   All 3 models detected this!
   
⚠️  WARNING (2/3 agree - 67% confidence):
   Potential memory leak
   2 out of 3 models agree
   
✅ False positive filtered (1/3 - too low):
   Issue detected by only 1 model - ignored
```

### **Feature 2: Dependency Scanning** 🔒

**Scan vulnerabilities di package.json:**

```bash
# Scan dependencies untuk CVE
node dist/cli.js scan:deps

# atau gabung dengan code review
node dist/cli.js review . --scan-deps
```

**Output:**
```
📦 Scanning dependencies...

🔴 CRITICAL: lodash@4.17.20
   CVE-2021-23337: Prototype Pollution
   Affected: <4.17.21
   Fix: npm install lodash@latest
   
⚠️  DEPRECATED: moment
   Package is no longer maintained
   Suggestion: Use dayjs (90% smaller bundle!)
   
📦 OUTDATED: axios@0.21.0
   Latest: 1.6.2 (16 versions behind)
   Includes security fixes
```

### **Feature 3: Architecture Analysis** 🏗️

**Analyze project architecture:**

```bash
node dist/cli.js analyze:architecture

# dengan complexity metrics
node dist/cli.js analyze:architecture --metrics
```

**Output:**
```
🏗️  Architecture Analysis:

Patterns Detected:
  ✅ MVC Pattern (90% confidence)
  ⚠️  Microservices (partial, 60% confidence)

Anti-Patterns Found:
  ❌ God Directory: /src/utils
     Contains 127 files (too many!)
     
  ❌ Circular Dependency:
     auth.ts ↔ user.ts
     
Code Organization:
  ⚠️  Tests scattered (no test directory)
  ⚠️  Config files in root (5+ files)

📊 Complexity Metrics:
  Cyclomatic: 45 (HIGH - needs refactor)
  Cognitive: 82 (VERY HIGH - hard to understand)
  Halstead Volume: 1,234
  
Recommendation: Refactor high-complexity modules
```

### **Feature 4: Generate Reports** 📊

**HTML Report:**
```bash
node dist/cli.js review . \
  --format html \
  --output report.html

# Buka di browser
open report.html
```

**JSON Report (untuk CI/CD):**
```bash
node dist/cli.js review . \
  --format json \
  --output report.json

# Gunakan di automation
cat report.json | jq '.summary'
```

### **Feature 5: Filter by Severity** ⚡

```bash
# Hanya tampilkan critical & errors
node dist/cli.js review . --severity error

# Hanya critical
node dist/cli.js review . --severity critical

# Semua (termasuk info)
node dist/cli.js review . --severity info
```

---

## 🖥️ **WEB DASHBOARD - FULL TUTORIAL**

### **Step 1: Start Dashboard**

**Terminal 1 - Start Backend:**
```bash
cd /home/attazy/Blasters/packages/web-dashboard/backend
npm install
npm run dev

# Output:
# 🚀 Backend running on http://localhost:5000
```

**Terminal 2 - Start Frontend:**
```bash
cd /home/attazy/Blasters/packages/web-dashboard/frontend
npm install
npm run dev

# Output:
# ➜ Local: http://localhost:3000
```

### **Step 2: Open Dashboard**

Buka browser: **http://localhost:3000**

### **Step 3: Pakai Dashboard**

**Dashboard Pages:**

```
📊 Overview Page:
   - Project summary
   - Recent analyses
   - Quality score
   - Quick actions

🔍 Analysis Page:
   - Run new analysis
   - Select files/folders
   - Configure AI models
   - Start analysis button
   - Real-time progress bar!

📈 Trends Page:
   - 30-day quality trend chart
   - Issue count over time
   - Improvement tracking
   - Compare periods

👥 Team Page:
   - Team members
   - Individual scores
   - Leaderboards
   - Collaboration features

⚙️  Settings Page:
   - AI provider config
   - Rules configuration
   - Notifications
   - API keys
```

**Real-time Features:**

Dashboard akan auto-update ketika:
- ✅ Analysis progress (0% → 100%)
- ✅ New issues found
- ✅ Team member activity
- ✅ Quality score changes

---

## 🔄 **INTEGRASI GIT & GITHUB**

### **Pre-commit Hook**

**Setup automatic check sebelum commit:**

```bash
# Install husky
npm install --save-dev husky
npx husky install

# Create pre-commit hook
npx husky add .husky/pre-commit "cd packages/cli && node dist/cli.js review --staged --severity error"

# Test: coba commit
git add .
git commit -m "test"

# CodeBlaster akan jalan otomatis!
# Kalau ada critical/error → commit BLOCKED!
```

### **GitHub Actions**

**File: `.github/workflows/code-review.yml`**

```yaml
name: CodeBlaster Review

on:
  pull_request:
    branches: [main]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      
      - name: Install CodeBlaster
        run: |
          cd /path/to/Blasters
          npm run install:all
          npm run build
      
      - name: Run Analysis
        run: |
          cd /path/to/Blasters/packages/cli
          node dist/cli.js review \
            --format json \
            --output report.json
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
      
      - name: Comment on PR
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const report = JSON.parse(fs.readFileSync('report.json'));
            
            const comment = `
            ## 🚀 CodeBlaster Analysis
            
            **Files:** ${report.files}
            **Issues:** ${report.issues.length}
            
            - 🔴 Critical: ${report.summary.critical}
            - ❌ Errors: ${report.summary.error}
            - ⚠️ Warnings: ${report.summary.warning}
            `;
            
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
```

---

## 🎮 **WORKFLOW EXAMPLES**

### **Scenario 1: Daily Development**

```bash
# Morning: Review kemarin
node dist/cli.js report yesterday-report.json

# Nulis code...
vim src/newFeature.js

# Before commit: Quick check
node dist/cli.js review src/newFeature.js --severity error

# Kalau OK: commit
git add .
git commit -m "add new feature"

# Pre-commit hook auto-run!
```

### **Scenario 2: Team Code Review**

```bash
# Sebelum create PR
node dist/cli.js review --staged \
  --consensus \
  --format html \
  --output pr-review.html

# Attach HTML ke PR description
# Team bisa lihat hasil analysis
```

### **Scenario 3: Project Health Check**

```bash
# Full check setiap Jumat
node dist/cli.js health-check . \
  --code \
  --deps \
  --architecture \
  --format html \
  --output weekly-health.html

# Lihat trend quality
node dist/cli.js trends --days 30

# Share dengan team
```

### **Scenario 4: Security Audit**

```bash
# Focus on security
node dist/cli.js review . \
  --severity critical \
  --scan-deps \
  --category security \
  --format json \
  --output security-audit.json

# Check vulnerabilities
node dist/cli.js scan:deps

# Generate security report
node dist/cli.js report security-audit.json
```

---

## 🎯 **TIPS & TRICKS**

### **1. Make it Faster**

```bash
# Enable caching (default on)
node dist/cli.js review . --cache

# Parallel processing
node dist/cli.js review . --parallel

# Cache + Parallel
node dist/cli.js review . --cache --parallel --max-concurrency 10
```

### **2. Custom Configuration**

**Create `.codeblaster.json` di project root:**

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
    "*.min.js"
  ]
}
```

Lalu jalankan:
```bash
node dist/cli.js review .
# Otomatis pakai config dari .codeblaster.json!
```

### **3. Initialize Config Interactively**

```bash
node dist/cli.js init

# Akan tanya:
# - AI provider mana?
# - API key?
# - Severity level?
# - Rules apa aja?
# - Enable caching?

# Hasil: auto-generate .codeblaster.json
```

### **4. View Config**

```bash
# Lihat config sekarang
node dist/cli.js config --list

# Get specific value
node dist/cli.js config --get ai.provider

# Set value
node dist/cli.js config --set ai.provider=anthropic
```

---

## 🐛 **TROUBLESHOOTING**

### **Problem 1: "Command not found"**

```bash
# Solution: Pastikan sudah build
cd /home/attazy/Blasters
npm run build

# Coba lagi
cd packages/cli
node dist/cli.js review .
```

### **Problem 2: "API key not set"**

```bash
# Solution: Set di .env
cd /home/attazy/Blasters
echo "OPENAI_API_KEY=sk-your-key" >> .env

# atau set environment variable
export OPENAI_API_KEY=sk-your-key
node dist/cli.js review .
```

### **Problem 3: "Parser not available"**

```bash
# Solution: Install tree-sitter parsers
cd packages/core
npm install

# Rebuild
npm run build
```

### **Problem 4: Analysis too slow**

```bash
# Solution: Enable parallel + cache
node dist/cli.js review . \
  --parallel \
  --cache \
  --max-concurrency 5

# atau pakai local LLM (faster)
node dist/cli.js review . --ai ollama
```

### **Problem 5: Too many false positives**

```bash
# Solution: Use consensus mode
node dist/cli.js review . \
  --consensus \
  --models gpt-4,claude \
  --voting majority

# Only show high-confidence issues
node dist/cli.js review . --min-confidence 80
```

---

## 📚 **COMMAND REFERENCE**

### **Main Commands:**

```bash
# Review code
codeblaster review [path]

# Initialize config
codeblaster init

# Manage config
codeblaster config --list|--get|--set

# View report
codeblaster report <file>

# Scan dependencies
codeblaster scan:deps

# Architecture analysis
codeblaster analyze:architecture

# Health check
codeblaster health-check [path]

# Start dashboard
codeblaster dashboard

# View trends
codeblaster trends --days 30
```

### **Common Options:**

```bash
--ai <provider>          # openai, anthropic, ollama
--model <model>          # gpt-4, claude-3-5-sonnet, etc
--severity <level>       # info, warning, error, critical
--format <format>        # console, json, html
--output <file>          # Save report to file
--staged                 # Only review staged files
--consensus              # Use multi-AI consensus
--scan-deps              # Scan dependencies
--scan-architecture      # Analyze architecture
--parallel               # Enable parallel processing
--cache                  # Enable caching
--fix                    # Auto-fix issues (if possible)
```

---

## 🎓 **LEARNING PATH**

### **Beginner:**
1. ✅ Install & setup
2. ✅ Review single file
3. ✅ Understand output
4. ✅ Fix 1-2 issues

### **Intermediate:**
1. ✅ Review whole project
2. ✅ Use different AI providers
3. ✅ Generate HTML reports
4. ✅ Setup pre-commit hooks

### **Advanced:**
1. ✅ Multi-AI consensus
2. ✅ Dependency scanning
3. ✅ Architecture analysis
4. ✅ Web dashboard
5. ✅ Custom rules/plugins
6. ✅ CI/CD integration

---

## 💡 **BEST PRACTICES**

1. **Run sebelum commit:**
   ```bash
   git add .
   codeblaster review --staged --severity error
   git commit -m "..."
   ```

2. **Weekly health check:**
   ```bash
   codeblaster health-check . --all
   ```

3. **Use consensus untuk production:**
   ```bash
   codeblaster review . --consensus --severity critical
   ```

4. **Enable caching untuk project besar:**
   ```bash
   codeblaster review . --cache --parallel
   ```

5. **Share reports dengan team:**
   ```bash
   codeblaster review . --format html --output team-review.html
   ```

---

## 🚀 **QUICK START CHEAT SHEET**

```bash
# 1. Install
cd /home/attazy/Blasters
./quickstart.sh

# 2. Setup API key
echo "OPENAI_API_KEY=sk-xxx" > .env

# 3. Basic review
cd packages/cli
node dist/cli.js review /path/to/code

# 4. Advanced review
node dist/cli.js review . \
  --consensus \
  --scan-deps \
  --format html \
  --output report.html

# 5. Start dashboard
codeblaster dashboard

# 6. Done! 🎉
```

---

## 🎯 **KESIMPULAN**

**CodeBlaster AI sudah SIAP DIGUNAKAN!**

**Cara pakai paling simple:**
```bash
cd /home/attazy/Blasters/packages/cli
node dist/cli.js review /path/to/your/code
```

**Itu aja! Tool akan:**
- ✅ Auto-detect language
- ✅ Parse code dengan AI
- ✅ Find issues
- ✅ Give suggestions
- ✅ Show beautiful report

**Selamat menggunakan!** 🚀

---

**Need help?** Baca:
- ENTERPRISE_UPGRADE.md - All features
- docs/getting-started.md - Detailed guide
- examples/ - Code examples

**Questions?** Check troubleshooting section ☝️

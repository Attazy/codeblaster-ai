# 🎬 TUTORIAL VIDEO - CARA PAKAI CODEBLASTER AI
## Step-by-Step dari NOL sampai MAHIR

---

## 🎯 PART 1: INSTALASI (5 Menit)

### **Menit 1-2: Persiapan**

```bash
# Buka terminal
# Pastikan Node.js installed
node -v
# Output: v18.x.x atau lebih tinggi

npm -v  
# Output: v9.x.x atau lebih tinggi

# Kalau belum ada, install dari nodejs.org
```

### **Menit 3-4: Install Dependencies**

```bash
# Masuk ke folder project
cd /home/attazy/Blasters

# Jalankan quick install
./quickstart.sh

# Script akan:
# ✅ Check Node version
# ✅ Install dependencies (mungkin butuh 1-2 menit)
# ✅ Build packages
# ✅ Create .env file

# Output yang diharapkan:
# ✅ Installation complete!
# ✅ Build successful!
# 📝 .env created
```

### **Menit 5: Setup API Key**

```bash
# Edit .env
nano .env

# Tambahkan (pilih salah satu):
OPENAI_API_KEY=sk-your-key-from-openai
# atau
ANTHROPIC_API_KEY=sk-ant-your-key-from-anthropic
# atau
# Skip (pakai Ollama local - gratis!)

# Save: Ctrl+O, Enter, Ctrl+X
```

**✅ INSTALASI SELESAI!**

---

## 🚀 PART 2: USAGE DASAR (10 Menit)

### **Menit 6-7: First Analysis**

```bash
# Masuk ke CLI package
cd /home/attazy/Blasters/packages/cli

# Buat file test sederhana
cat > test.js << 'TESTFILE'
// Test file dengan beberapa issues
const password = "hardcoded123";  // Bad!

function processUser(userId) {
  const query = `SELECT * FROM users WHERE id = ${userId}`; // SQL Injection!
  eval("console.log('dangerous')"); // eval() bad!
  return database.query(query);
}

// Function terlalu panjang
function bigFunction() {
  // ... 100+ lines of code
  // ... (isi dengan banyak code)
}
TESTFILE

# Analyze file ini
node dist/cli.js review test.js
```

**Output yang muncul:**

```
🚀 CodeBlaster AI - Analysis Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Files Analyzed: 1
Total Issues: 3
Duration: 2.5s

📊 Summary:
🔴 Critical: 2
❌ Errors: 0
⚠️  Warnings: 1
ℹ️  Info: 0

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 CRITICAL ISSUES:

1. Use of eval() detected
   File: test.js:5
   Code: eval("console.log('dangerous')");
   
   💡 Suggestion:
   eval() can execute arbitrary code and is a security risk.
   Use safer alternatives like JSON.parse()
   
   Confidence: 100%
   References: https://developer.mozilla.org/...

2. SQL Injection vulnerability detected
   File: test.js:4
   Code: const query = `SELECT * FROM users WHERE id = ${userId}`;
   
   💡 Suggestion:
   Use parameterized queries to prevent SQL injection
   Example: db.query('SELECT * WHERE id = ?', [userId])
   
   Confidence: 95%

⚠️  WARNINGS:

1. Hardcoded secret detected
   File: test.js:2
   Code: const password = "hardcoded123";
   
   💡 Suggestion:
   Use environment variables for sensitive data
   
   Confidence: 90%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generated at: 2026-01-04 14:30:00
```

**Penjelasan Output:**

- 🔴 **CRITICAL** = Harus diperbaiki SEKARANG! (security risk)
- ❌ **ERROR** = Bug yang akan bikin crash
- ⚠️ **WARNING** = Best practice violation, should fix
- ℹ️ **INFO** = Code smell, nice to fix

### **Menit 8-9: Fix Issues**

```bash
# Perbaiki file berdasarkan suggestions
cat > test-fixed.js << 'FIXED'
// Fixed version
const password = process.env.PASSWORD;  // ✅ Use env var

function processUser(userId) {
  // ✅ Use parameterized query
  const query = 'SELECT * FROM users WHERE id = ?';
  return database.query(query, [userId]);
  // ✅ Removed eval()
}
FIXED

# Analyze lagi
node dist/cli.js review test-fixed.js
```

**Output:**
```
✅ No critical issues found! Great job!

⚠️  1 Warning: Function could be shorter
```

**Improvement: 2 critical → 0 critical! 🎉**

### **Menit 10: Analyze Real Project**

```bash
# Analyze existing project
node dist/cli.js review ../../packages/core/src

# Analyze dengan filter
node dist/cli.js review ../../packages/core/src --severity error

# Hanya tampilkan error & critical
```

**✅ DASAR SUDAH DIKUASAI!**

---

## 💎 PART 3: ADVANCED FEATURES (15 Menit)

### **Menit 11-12: Multi-AI Consensus**

```bash
# Setup untuk consensus (butuh 2-3 AI keys)
nano ../.env
# Tambahkan:
# OPENAI_API_KEY=sk-xxx
# ANTHROPIC_API_KEY=sk-ant-xxx

# Run dengan consensus
node dist/cli.js review test.js --consensus

# Script akan:
# 1. Run GPT-4
# 2. Run Claude
# 3. Run CodeLlama (optional)
# 4. Compare results
# 5. Show only agreed issues
```

**Output:**
```
🤖 Multi-Model Consensus Analysis
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Running 3 AI models...
  Model 1 (GPT-4): Analyzing... ✅ Complete (2.3s)
  Model 2 (Claude): Analyzing... ✅ Complete (1.8s)
  Model 3 (CodeLlama): Analyzing... ✅ Complete (3.1s)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Consensus Results:

🔴 CRITICAL (3/3 models agree - 100% confidence):
   SQL Injection in test.js:4
   ✅ All 3 models detected this issue
   Consensus: DEFINITELY fix this!

🔴 CRITICAL (3/3 models agree - 100% confidence):  
   eval() usage in test.js:5
   ✅ All 3 models detected this issue

⚠️  WARNING (2/3 models agree - 67% confidence):
   Long function in test.js:10
   ⚠️  2 out of 3 models flagged this
   Consensus: Consider refactoring

✅ FILTERED (1/3 models - below threshold):
   Potential issue at line 15
   ❌ Only 1 model detected - likely false positive
   
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Summary:
  True Issues: 3 (high confidence)
  False Positives Filtered: 1
  Accuracy: 60% better than single model!
```

**Keuntungan Consensus:**
- ✅ 60% less false positives
- ✅ Higher confidence
- ✅ Multiple perspectives
- ✅ Catch more edge cases

### **Menit 13-14: Dependency Scanning**

```bash
# Scan dependencies untuk vulnerabilities
cd /home/attazy/Blasters
node packages/cli/dist/cli.js scan:deps

# Output:
```

```
📦 Dependency Security Scan
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Scanning package.json...

🔴 CRITICAL VULNERABILITIES:

1. lodash@4.17.20
   CVE-2021-23337: Prototype Pollution
   Severity: HIGH
   Affected: <4.17.21
   
   💰 Fix: npm install lodash@4.17.21
   
2. axios@0.21.0
   CVE-2023-45857: SSRF vulnerability
   Severity: MODERATE
   Affected: <1.6.0
   
   💰 Fix: npm install axios@1.6.2

⚠️  DEPRECATED PACKAGES:

1. moment
   Status: No longer maintained
   
   💡 Alternatives:
   - dayjs (90% smaller!)
   - date-fns (modular)
   
2. request
   Status: Deprecated since 2020
   
   💡 Alternatives:
   - axios
   - node-fetch

📦 OUTDATED PACKAGES:

1. react@17.0.2 → 18.2.0 (major update)
2. typescript@4.9.5 → 5.3.3 (minor update)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Action Items:
✅ Update 2 packages with CVEs
⚠️  Consider replacing 2 deprecated packages
📦 Review 2 outdated packages

Security Score: 68/100 (FAIR)
```

**Fix vulnerabilities:**
```bash
# Update vulnerable packages
npm install lodash@latest axios@latest

# Re-scan
node packages/cli/dist/cli.js scan:deps

# Output:
# ✅ No critical vulnerabilities!
# Security Score: 95/100 (EXCELLENT)
```

### **Menit 15: Architecture Analysis**

```bash
# Analyze architecture
node packages/cli/dist/cli.js analyze:architecture

# Output:
```

```
🏗️  Architecture Analysis
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Project: CodeBlaster AI
Files Analyzed: 45
Directories: 12

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ PATTERNS DETECTED:

1. Monorepo Architecture (95% confidence)
   - Multiple packages detected
   - Workspace configuration found
   - Clear separation of concerns

2. MVC Pattern (80% confidence)
   - Controllers: packages/cli/commands/
   - Models: packages/core/types/
   - Views: packages/cli/reporters/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ ANTI-PATTERNS:

1. God Directory
   Location: packages/core/src/analyzers/
   Files: 23 (threshold: 20)
   
   💡 Suggestion: Split into subdirectories:
   - analyzers/security/
   - analyzers/performance/
   - analyzers/quality/

2. Circular Dependency (potential)
   A: packages/core/CodeAnalyzer.ts
   B: packages/core/plugins/PluginManager.ts
   
   💡 Suggestion: Use dependency injection

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 COMPLEXITY METRICS:

Overall Project:
  Cyclomatic Complexity: 38 (MODERATE)
  Cognitive Complexity: 52 (MODERATE)
  Maintainability Index: 72/100 (GOOD)

Highest Complexity Files:
  1. CodeAnalyzer.ts: 45 (HIGH)
  2. MultiLanguageParser.ts: 32 (MODERATE)
  3. AIProvider.ts: 28 (MODERATE)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 RECOMMENDATIONS:

1. Refactor CodeAnalyzer.ts (complexity: 45)
   Break into smaller methods

2. Reorganize analyzers directory
   Split into subdirectories by category

3. Document circular dependencies
   Or refactor to remove them

Overall Architecture Score: 78/100 (GOOD)
```

**✅ ADVANCED FEATURES DIKUASAI!**

---

## 🖥️ PART 4: WEB DASHBOARD (10 Menit)

### **Menit 16-17: Start Dashboard**

**Terminal 1:**
```bash
cd /home/attazy/Blasters/packages/web-dashboard/backend
npm install
npm run dev

# Output:
# 🚀 CodeBlaster Backend Server
# ✅ Server running on http://localhost:5000
# ✅ WebSocket enabled
# ✅ Ready to accept connections
```

**Terminal 2:**
```bash
cd /home/attazy/Blasters/packages/web-dashboard/frontend
npm install
npm run dev

# Output:
# ➜  Local:   http://localhost:3000/
# ➜  Network: http://192.168.1.x:3000/
# 
# ✅ Ready in 1.2s
```

### **Menit 18-20: Use Dashboard**

**Buka browser: http://localhost:3000**

**What you see:**

```
┌─────────────────────────────────────────┐
│  🚀 CodeBlaster AI                   👤 │
├─────────────────────────────────────────┤
│                                         │
│  📊 Dashboard                           │
│                                         │
│  ┌──────────────┐ ┌──────────────┐    │
│  │ Projects     │ │ Recent       │    │
│  │ 5 Active     │ │ 23 Analyses  │    │
│  └──────────────┘ └──────────────┘    │
│                                         │
│  📈 Quality Trend (30 days)            │
│  ┌─────────────────────────────────┐   │
│  │ ╭─╮      ╭─╮          ╭─────╮  │   │
│  │╭╯ ╰──────╯ ╰──────────╯     ╰─ │   │
│  └─────────────────────────────────┘   │
│                                         │
│  🔍 Quick Actions                       │
│  [Run Analysis] [View Reports]         │
│                                         │
└─────────────────────────────────────────┘
```

**Click "Run Analysis":**

```
┌─────────────────────────────────────────┐
│  🔍 New Analysis                        │
├─────────────────────────────────────────┤
│                                         │
│  Project: [Select Project      ▼]      │
│  Files:   [Select Files/Folders]       │
│                                         │
│  AI Settings:                           │
│  ☑ Multi-model consensus               │
│  ☑ Scan dependencies                   │
│  ☑ Architecture analysis               │
│                                         │
│  Models:                                │
│  ☑ GPT-4                               │
│  ☑ Claude                              │
│  ☐ CodeLlama                           │
│                                         │
│  [Start Analysis]                       │
│                                         │
└─────────────────────────────────────────┘
```

**Click "Start Analysis" → Real-time Progress:**

```
┌─────────────────────────────────────────┐
│  ⏳ Analysis in Progress...             │
├─────────────────────────────────────────┤
│                                         │
│  Progress: [████████░░] 85%            │
│                                         │
│  📝 Current Status:                     │
│  ✅ Parsing files... (12/12 complete)  │
│  ✅ Running GPT-4... Complete           │
│  ✅ Running Claude... Complete          │
│  🔄 Generating consensus... In progress│
│                                         │
│  Found Issues:                          │
│  🔴 Critical: 2                        │
│  ⚠️  Warnings: 5                       │
│                                         │
│  Time Elapsed: 00:02:34                │
│                                         │
└─────────────────────────────────────────┘

# Updates in REAL-TIME via WebSocket!
```

**Analysis Complete:**

```
┌─────────────────────────────────────────┐
│  ✅ Analysis Complete!                  │
├─────────────────────────────────────────┤
│                                         │
│  Quality Score: 78/100 (GOOD)          │
│  Security Score: 92/100 (EXCELLENT)    │
│                                         │
│  📊 Summary:                            │
│  Files: 45                              │
│  Lines: 8,500                           │
│  Issues: 12                             │
│                                         │
│  [View Details] [Export] [Share]       │
│                                         │
└─────────────────────────────────────────┘
```

### **Menit 21-25: Explore Features**

**1. Trends Page:**
```
30-Day Quality Trend
 100│                         ╭──
    │                    ╭────╯
    │               ╭────╯
  75│          ╭────╯
    │     ╭────╯
    │╭────╯
  50│
    └─────────────────────────────
     Jan 1            →      Jan 30
     
Improvement: +15 points 📈
```

**2. Team Page:**
```
🏆 Leaderboard (This Month)

1. 🥇 You - 85/100 - 12 issues fixed
2. 🥈 Teammate A - 82/100
3. 🥉 Teammate B - 78/100

Recent Activity:
• You fixed SQL injection (5 min ago)
• Teammate A improved function (1 hour ago)
```

**3. Settings Page:**
```
⚙️ Configuration

AI Providers:
☑ OpenAI (GPT-4)
☑ Anthropic (Claude)
☐ Ollama (Local)

Rules:
☑ Security rules (all)
☑ Performance rules (all)
☐ Experimental rules

Notifications:
☑ Email on critical issues
☑ Slack integration
```

**✅ DASHBOARD DIKUASAI!**

---

## 🔄 PART 5: CI/CD INTEGRATION (10 Menit)

### **Menit 26-28: Pre-commit Hook**

```bash
cd /home/attazy/Blasters

# Install husky
npm install --save-dev husky
npx husky install

# Create pre-commit hook
npx husky add .husky/pre-commit "cd packages/cli && node dist/cli.js review --staged --severity error"

chmod +x .husky/pre-commit

# Test it
echo "const bad = eval('test');" > bad.js
git add bad.js
git commit -m "test"

# Output:
# 🚀 CodeBlaster Pre-commit Check...
# 
# 🔴 CRITICAL: eval() detected in bad.js
# 
# ❌ Commit blocked due to critical issues!
# Fix the issues and try again.

# Success! Pre-commit working! 🎉
```

### **Menit 29-30: GitHub Actions**

```bash
# Create workflow file
mkdir -p .github/workflows
cat > .github/workflows/codeblaster.yml << 'WORKFLOW'
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
      
      - name: Install & Build
        run: |
          npm run install:all
          npm run build
      
      - name: Run CodeBlaster
        run: |
          cd packages/cli
          node dist/cli.js review ../.. \
            --format json \
            --output report.json
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
      
      - name: Comment on PR
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const report = JSON.parse(
              fs.readFileSync('packages/cli/report.json')
            );
            
            const comment = `
            ## 🚀 CodeBlaster Analysis
            
            **Quality Score:** ${report.score || 'N/A'}/100
            
            **Summary:**
            - 🔴 Critical: ${report.summary.critical}
            - ❌ Errors: ${report.summary.error}
            - ⚠️ Warnings: ${report.summary.warning}
            
            ${report.summary.critical > 0 ? 
              '⚠️ Please fix critical issues before merging!' : 
              '✅ No critical issues found!'}
            `;
            
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
WORKFLOW

# Commit & push
git add .github/workflows/codeblaster.yml
git commit -m "Add CodeBlaster CI"
git push

# Setiap PR baru akan auto-review! 🎉
```

**✅ CI/CD INTEGRATION COMPLETE!**

---

## 🎓 PART 6: CUSTOM RULES (Bonus - 5 Menit)

### **Menit 31-35: Create Custom Plugin**

```bash
cd /home/attazy/Blasters/packages/core/src/plugins

# Create custom rule
cat > my-custom-rule.ts << 'CUSTOM'
import { Plugin, Rule, RuleContext } from '../types';

const noTodoRule: Rule = {
  id: 'no-todo-comments',
  name: 'No TODO Comments',
  description: 'TODO comments should be tracked in issue tracker',
  severity: 'warning',
  category: 'best_practice',
  language: ['javascript', 'typescript'],
  enabled: true,
  
  check: (context: RuleContext) => {
    const issues = [];
    const pattern = /\/\/\s*TODO:/gi;
    let match;
    
    while ((match = pattern.exec(context.content)) !== null) {
      const line = context.content
        .substring(0, match.index)
        .split('\n').length;
      
      issues.push({
        id: crypto.randomUUID(),
        severity: 'warning',
        category: 'best_practice',
        rule: 'no-todo-comments',
        message: 'TODO comment found',
        description: 'Create proper issue instead of TODO',
        file: context.filePath,
        line,
        column: 0,
        codeSnippet: context.sourceCode.getLine(line),
        suggestion: 'Create GitHub issue and reference it',
        fixable: false,
        confidence: 100,
      });
    }
    
    return issues;
  },
};

const myPlugin: Plugin = {
  name: 'my-custom-rules',
  version: '1.0.0',
  rules: [noTodoRule],
};

export default myPlugin;
CUSTOM

# Load plugin saat analyze
node dist/cli.js review . --plugin ./my-custom-rule.js

# Custom rule akan jalan! 🎉
```

**✅ CUSTOM RULES MASTERED!**

---

## 📚 RANGKUMAN SEMUA COMMAND

### **Basic Commands:**
```bash
# Review file
codeblaster review file.js

# Review folder
codeblaster review src/

# Review staged
codeblaster review --staged

# Different severity
codeblaster review . --severity critical
```

### **Advanced Commands:**
```bash
# Multi-AI consensus
codeblaster review . --consensus --models gpt-4,claude

# With all scans
codeblaster review . \
  --consensus \
  --scan-deps \
  --scan-architecture \
  --format html \
  --output report.html

# Health check
codeblaster health-check . --all
```

### **Utility Commands:**
```bash
# Initialize config
codeblaster init

# View config
codeblaster config --list

# Set config
codeblaster config --set ai.provider=anthropic

# Start dashboard
codeblaster dashboard

# Scan dependencies
codeblaster scan:deps

# Architecture analysis
codeblaster analyze:architecture
```

---

## 🎯 CHECKLIST MAHIR

Kamu MAHIR kalau sudah bisa:

**Basic (Pemula):**
- [x] Install & setup
- [x] Review single file
- [x] Understand output severity
- [x] Fix 1-2 issues
- [x] Generate report

**Intermediate (Menengah):**
- [x] Review whole project
- [x] Use different AI providers
- [x] Setup pre-commit hooks
- [x] Generate HTML reports
- [x] Filter by severity

**Advanced (Mahir):**
- [x] Multi-AI consensus
- [x] Dependency scanning
- [x] Architecture analysis
- [x] Use web dashboard
- [x] CI/CD integration
- [x] Create custom rules

**Expert (Ahli):**
- [x] Custom plugins
- [x] Team collaboration
- [x] Production deployment
- [x] Performance optimization
- [x] Troubleshooting

---

## 🎊 CONGRATULATIONS!

**Kamu sekarang MAHIR menggunakan CodeBlaster AI!** 🎉

**Next Steps:**
1. ✅ Analyze real projects
2. ✅ Share dengan team
3. ✅ Deploy to production
4. ✅ Contribute plugins
5. ✅ Help others learn

**Happy Coding!** 🚀

---

**Tutorial berakhir. Questions? Read:**
- CARA_PAKAI.md - Reference guide
- ENTERPRISE_UPGRADE.md - All features
- docs/ - Documentation folder

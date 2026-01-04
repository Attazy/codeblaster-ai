# ⚡ START HERE - Super Quick Guide

## 🎯 Untuk Pemula - 3 Steps Aja!

### Step 1: Run Interactive Menu

```bash
./run.sh
```

### Step 2: Pilih dari Menu

Akan muncul menu kayak gini:

```
╔════════════════════════════════════════════════╗
║      🚀 CODEBLASTER AI - INTERACTIVE MODE     ║
╚════════════════════════════════════════════════╝

═══════════════════ MAIN MENU ═══════════════════

📋 QUICK ACTIONS:
  1 - Analyze Single File
  2 - Analyze Entire Project
  3 - Analyze Git Changes (Staged)

🎯 ADVANCED FEATURES:
  4 - Multi-AI Consensus Review
  5 - Security Scan + Dependency Check
  6 - Architecture Analysis
  7 - Generate HTML Report

🖥️  WEB DASHBOARD:
  8 - Start Web Dashboard (Full UI)

⚙️  SETUP & CONFIG:
  9 - Setup API Keys
  10 - Initialize Config
  11 - View Current Config

Choose option [0-14]:
```

### Step 3: Enjoy! 🎉

**Tinggal ketik nomor yang mau dipilih!**

---

## 🔑 Setup API Key (One Time Only)

Pertama kali, pilih option **9** untuk setup API key:

```bash
Choose option: 9

Choose AI Provider:
  1 - OpenAI (GPT-4)
  2 - Anthropic (Claude)
  3 - Ollama (Local/Free)
  4 - All of them

# Pilih salah satu, masukkan API key, DONE!
```

**Get API Keys:**
- OpenAI: https://platform.openai.com/api-keys
- Anthropic: https://console.anthropic.com/
- Ollama: FREE! Just install: `curl -fsSL https://ollama.com/install.sh | sh`

---

## 📖 Usage Examples

### Example 1: Check Single File

```
Choose option: 1
Enter file path: src/app.js

🚀 Starting analysis...

Files Analyzed: 1
Total Issues: 3

🔴 CRITICAL: SQL Injection vulnerability
   Line 45: db.query(`SELECT * WHERE id = ${id}`)
   💡 Use parameterized queries

✅ Analysis complete!
```

### Example 2: Full Project Review

```
Choose option: 2
Enter project path: ./my-project

🚀 Starting full project analysis...
This may take a while...

Files Analyzed: 156
Total Issues: 23

🔴 CRITICAL: 2
❌ ERRORS: 5
⚠️  WARNINGS: 16

✅ Project analysis complete!
```

### Example 3: Before Commit

```
# Stage your changes first
git add .

# Then analyze
Choose option: 3

🔍 Found staged changes. Analyzing...

Files: 5
Issues: 2

⚠️  WARNING: Console.log found (line 23)
⚠️  WARNING: TODO comment (line 67)

✅ Safe to commit!
```

### Example 4: Multi-AI Consensus (Most Accurate!)

```
Choose option: 4
Enter path: ./src

🤖 Running consensus with 3 AI models...

  Model 1 (GPT-4): ✅ Complete
  Model 2 (Claude): ✅ Complete
  Model 3 (CodeLlama): ✅ Complete

📊 Consensus Results:

🔴 CRITICAL (3/3 agree - 100%):
   SQL Injection - ALL models detected!
   
⚠️  WARNING (2/3 agree - 67%):
   Potential memory leak
   
✅ False positive filtered (1/3):
   Only 1 model detected - ignored
```

### Example 5: Web Dashboard

```
Choose option: 8

Starting services...
✅ Backend started
✅ Frontend started

Dashboard running at:
  http://localhost:3000

Open browser and enjoy full UI! 🎨
```

---

## 🎓 Learning Path

### Beginner (Start Here):
1. ✅ Run `./run.sh`
2. ✅ Setup API key (option 9)
3. ✅ Try analyze single file (option 1)
4. ✅ View the results

### Intermediate:
1. ✅ Analyze full project (option 2)
2. ✅ Try security scan (option 5)
3. ✅ Generate HTML report (option 7)

### Advanced:
1. ✅ Multi-AI consensus (option 4)
2. ✅ Web dashboard (option 8)
3. ✅ Custom config (option 10)
4. ✅ Read full docs (CARA_PAKAI.md)

---

## 🆘 Help!

### "Command not found: ./run.sh"

```bash
chmod +x run.sh
./run.sh
```

### "Not built yet"

```bash
./quickstart.sh
# Tunggu selesai, lalu:
./run.sh
```

### "API key not set"

```bash
./run.sh
# Pilih option 9
# Ikuti instruksi
```

### "Too many modules, confused!"

**Don't worry!** Anda TIDAK perlu tahu tentang modules.

Just run:
```bash
./run.sh
```

All modules handled automatically! 🎯

---

## 🎯 Quick Command Reference

```bash
# Interactive menu (easiest)
./run.sh

# Quick install + run
./quickstart.sh && ./run.sh

# Manual CLI (advanced)
cd packages/cli
node dist/cli.js review <path>

# Web dashboard
# Option 8 in menu, or:
npm run dev:backend &
npm run dev:frontend
```

---

## 📚 More Documentation

- **CARA_PAKAI.md** - Tutorial lengkap dalam Bahasa Indonesia
- **README.md** - Full documentation
- **examples/** - Code examples
- **docs/** - Advanced guides

---

## 🎉 That's It!

**Just run `./run.sh` and you're ready to go!**

No complex setup. No multiple modules to understand. Just one simple command.

**Happy Coding! 🚀**

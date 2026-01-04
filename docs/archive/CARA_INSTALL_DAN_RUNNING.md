# 🚀 PANDUAN INSTALL & RUNNING - CodeBlasters AI

## 📋 **PERSIAPAN**

Pastikan sudah terinstall:
- **Node.js** versi 18 atau lebih tinggi
- **npm** versi 9 atau lebih tinggi

Cek dengan:
```bash
node -v    # Harus v18+ 
npm -v     # Harus v9+
```

Belum punya? Download di: https://nodejs.org/

---

## ⚡ **CARA 1: INSTALL OTOMATIS (PALING MUDAH)**

### Step 1: Masuk ke folder project
```bash
cd /home/attazy/Blasters
```

### Step 2: Jalankan script install otomatis
```bash
./quickstart.sh
```

Script ini akan otomatis:
- ✅ Check versi Node.js
- ✅ Install semua dependencies
- ✅ Build packages
- ✅ Setup environment file

**SELESAI!** Lanjut ke bagian "CARA RUNNING" di bawah.

---

## 🛠️ **CARA 2: INSTALL MANUAL** 

Jika cara otomatis gagal, gunakan cara manual:

### Step 1: Masuk ke folder project
```bash
cd /home/attazy/Blasters
```

### Step 2: Install dependencies
```bash
npm run install:all
```

### Step 3: Build packages
```bash
npm run build
```

### Step 4: Setup environment
```bash
cp .env.example .env
nano .env  # atau vim .env atau code .env
```

Isi file `.env` dengan API key (pilih salah satu):
```bash
# OpenAI (recommended)
OPENAI_API_KEY=sk-your-openai-key-here

# Atau Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key-here

# Atau Ollama (gratis, local)
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=codellama
```

**Cara dapat API key:**
- OpenAI: https://platform.openai.com/api-keys
- Anthropic: https://console.anthropic.com/
- Ollama: Install dulu → `ollama pull codellama`

---

## 🎮 **CARA RUNNING**

Ada 3 cara running CodeBlasters AI:

### **Option 1: Interactive Menu (PALING MUDAH)** 🌟

```bash
./run.sh
```

Menu interaktif akan muncul dengan pilihan:
```
╔═══════════════════════════════════════════╗
║   🚀 CodeBlasters AI - Interactive Menu  ║
╚═══════════════════════════════════════════╝

1. Analyze Single File
2. Analyze Whole Project
3. Analyze Git Changes
4. Multi-AI Consensus Mode
5. Security Audit
6. Launch Web Dashboard
7. Run Tests
8. Setup/Configure
9. View Logs
0. Exit
```

Tinggal pilih angka yang kamu mau!

---

### **Option 2: ONE-CLICK Launcher**

```bash
./start
```

Cara tercepat! Langsung analyze atau buka dashboard.

---

### **Option 3: Command Line (Advanced)**

#### A) **Analyze File Tunggal**
```bash
cd packages/cli
node dist/cli.js review /path/to/file.js

# Contoh:
node dist/cli.js review ../../examples/basic-usage.js
```

#### B) **Analyze Semua File di Project**
```bash
cd packages/cli
node dist/cli.js review /path/to/project

# Contoh:
node dist/cli.js review ../../
```

#### C) **Analyze Git Changes**
```bash
cd packages/cli
node dist/cli.js review --git-changes
```

#### D) **Multi-AI Consensus (3 AI models voting)**
```bash
cd packages/cli
node dist/cli.js review --consensus /path/to/file.js
```

#### E) **Security Audit**
```bash
cd packages/cli
node dist/cli.js security /path/to/project
```

#### F) **Generate Report**
```bash
cd packages/cli
node dist/cli.js report /path/to/project --output=html
# Output: report.html
```

---

### **Option 4: Web Dashboard**

Untuk tampilan visual yang lebih bagus:

#### Step 1: Start Backend Server
```bash
cd packages/web-dashboard/backend
npm run dev
# Server running di: http://localhost:3000
```

#### Step 2: Start Frontend (terminal baru)
```bash
cd packages/web-dashboard/frontend
npm run dev
# Dashboard di: http://localhost:5173
```

#### Step 3: Buka Browser
Akses: **http://localhost:5173**

Features dashboard:
- 📊 Real-time analysis visualization
- 📈 Code quality metrics & trends
- 🔍 Search & filter issues
- 👥 Team collaboration
- 📝 Comments & discussions
- 📊 Analytics & leaderboards

---

## 📝 **CONTOH PENGGUNAAN**

### 1️⃣ **Analyze File JavaScript**
```bash
cd packages/cli
node dist/cli.js review ../../examples/sample.js
```

Output:
```
🚀 CodeBlasters AI - Analysis Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Files Analyzed: 1
📊 Total Issues: 3

🔴 CRITICAL: 1
⚠️  WARNING: 2

Issues:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 CRITICAL: SQL Injection Risk
   File: sample.js:45
   Line: db.query(`SELECT * FROM users WHERE id = ${id}`)
   Fix: Use parameterized queries

⚠️  WARNING: Long function (150 lines)
   File: sample.js:10
   Suggestion: Split into smaller functions

⚠️  WARNING: Unused variable 'temp'
   File: sample.js:78
   Fix: Remove or use the variable
```

---

### 2️⃣ **Analyze TypeScript Project**
```bash
cd packages/cli
node dist/cli.js review /path/to/typescript-project
```

---

### 3️⃣ **Security Scan dengan CVE Check**
```bash
cd packages/cli
node dist/cli.js security /path/to/project
```

Output:
```
🔒 Security Audit Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚨 HIGH: 2 vulnerabilities
⚠️  MEDIUM: 5 vulnerabilities
✅ LOW: 3 vulnerabilities

Critical Issues:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚨 CVE-2023-12345: lodash@4.17.15
   Severity: HIGH
   Fix: Upgrade to lodash@4.17.21
   Command: npm install lodash@4.17.21
```

---

### 4️⃣ **Multi-AI Consensus (Paling Akurat)**
```bash
cd packages/cli
node dist/cli.js review --consensus /path/to/file.js
```

Akan menggunakan 3 AI models:
- GPT-4 (OpenAI)
- Claude (Anthropic)
- CodeLlama (Ollama)

Dan voting hasilnya untuk akurasi maksimal!

---

## 🆘 **TROUBLESHOOTING**

### ❌ **Error: "Cannot find module '@codeblaster/core'"**
**Solusi:**
```bash
npm run build
```

### ❌ **Error: "OPENAI_API_KEY not found"**
**Solusi:** Edit file `.env` dan tambahkan API key
```bash
nano .env
# Tambahkan: OPENAI_API_KEY=sk-your-key-here
```

### ❌ **Error: Port 3000 already in use**
**Solusi:** Kill process yang pakai port 3000
```bash
lsof -ti:3000 | xargs kill -9
# Atau ganti port di .env
```

### ❌ **Error: "npm install failed"**
**Solusi:** Sudah diperbaiki! Tapi jika masih error:
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm run install:all
```

### ❌ **Dashboard tidak muncul**
**Solusi:**
1. Pastikan backend running: `http://localhost:3000/health`
2. Pastikan frontend running: `http://localhost:5173`
3. Check di browser console untuk error

---

## 📚 **FILE-FILE PENTING**

- **START_HERE.md** - Quick start guide
- **CARA_PAKAI.md** - Tutorial lengkap Bahasa Indonesia
- **README.md** - Overview & architecture
- **STRUCTURE_GUIDE.md** - Penjelasan struktur project
- **TUTORIAL_LENGKAP.md** - Tutorial advanced

---

## 💡 **TIPS & TRICKS**

1. **Untuk analisis cepat:** Pakai `./start` atau `./run.sh`
2. **Untuk dashboard visual:** Pakai web dashboard
3. **Untuk CI/CD:** Setup GitHub Actions (lihat `.github/workflows/`)
4. **Untuk custom rules:** Edit `config/rules.yaml`
5. **Untuk testing:** Jalankan `npm test`

---

## 🎯 **NEXT STEPS**

Setelah install & running berhasil:

1. ✅ Coba analyze file pertama kamu
2. ✅ Explore web dashboard
3. ✅ Setup custom rules di `config/rules.yaml`
4. ✅ Integrate dengan Git hooks
5. ✅ Setup CI/CD automation

---

## 📞 **BUTUH BANTUAN?**

- 📖 Baca: **CARA_PAKAI.md** untuk tutorial lengkap
- 🗺️ Lihat: **STRUCTURE_GUIDE.md** untuk memahami struktur
- 🚀 Coba: **examples/** untuk contoh-contoh code
- 📝 Check: **docs/** untuk dokumentasi advanced

---

**Happy Coding! 🚀**

*Created by attazy - CodeBlasters AI Team*

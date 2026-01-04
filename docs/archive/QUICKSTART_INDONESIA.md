# ⚡ QUICK START - CodeBlasters AI

## 🚀 **INSTALL (2 MENIT)**

```bash
cd /home/attazy/Blasters
./quickstart.sh
```

**Done!** ✅

---

## 🎮 **RUNNING (PILIH SALAH SATU)**

### 1. **Interactive Menu** (PALING MUDAH)
```bash
./run.sh
```
Pilih angka sesuai yang kamu mau!

### 2. **ONE-CLICK**
```bash
./start
```

### 3. **Command Line**
```bash
cd packages/cli

# Analyze file
node dist/cli.js review /path/to/file.js

# Analyze project
node dist/cli.js review /path/to/project

# Security scan
node dist/cli.js security /path/to/project

# Multi-AI consensus
node dist/cli.js review --consensus /path/to/file.js
```

### 4. **Web Dashboard**
```bash
# Terminal 1 - Backend
cd packages/web-dashboard/backend
npm run dev

# Terminal 2 - Frontend  
cd packages/web-dashboard/frontend
npm run dev

# Buka browser: http://localhost:5173
```

---

## 🔑 **SETUP API KEY**

Edit file `.env`:
```bash
nano .env
```

Tambahkan (pilih salah satu):
```bash
OPENAI_API_KEY=sk-your-key-here
# atau
ANTHROPIC_API_KEY=sk-ant-your-key-here
# atau  
OLLAMA_BASE_URL=http://localhost:11434
```

**Dapatkan API key:**
- OpenAI: https://platform.openai.com/api-keys
- Anthropic: https://console.anthropic.com/
- Ollama: `ollama pull codellama` (gratis!)

---

## 💡 **CONTOH CEPAT**

```bash
cd packages/cli

# Analyze JavaScript
node dist/cli.js review ../../examples/sample.js

# Analyze dengan 3 AI (paling akurat)
node dist/cli.js review --consensus ../../examples/sample.js

# Security audit
node dist/cli.js security ../../

# Generate HTML report
node dist/cli.js report ../../ --output=html
```

---

## 🆘 **ERROR? FIX CEPAT**

### Module tidak ditemukan?
```bash
npm run build
```

### API key error?
```bash
nano .env
# Tambahkan: OPENAI_API_KEY=sk-...
```

### Port sudah dipakai?
```bash
lsof -ti:3000 | xargs kill -9
```

### Install error?
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm run install:all
```

---

## 📚 **DOKUMENTASI LENGKAP**

- **CARA_INSTALL_DAN_RUNNING.md** - Panduan lengkap install & running
- **CARA_PAKAI.md** - Tutorial lengkap semua fitur
- **START_HERE.md** - Quick guide untuk pemula
- **README.md** - Overview & architecture

---

**Selesai! Happy Coding! 🚀**

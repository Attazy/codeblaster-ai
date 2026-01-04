# 🚀 CodeBlasters AI - Code Review Assistant

Platform AI untuk analisis & review code otomatis dengan 20+ bahasa pemrograman.

---

## ⚡ **INSTALL CEPAT**

```bash
cd /home/attazy/Blasters
./quickstart.sh
```

## 🎮 **CARA PAKAI**

### **Paling Mudah - Interactive Menu:**
```bash
./run.sh
```

### **Atau Command Line:**
```bash
cd packages/cli
node dist/cli.js review /path/to/your/file.js
```

### **Atau Web Dashboard:**
```bash
# Terminal 1
cd packages/web-dashboard/backend && npm run dev

# Terminal 2  
cd packages/web-dashboard/frontend && npm run dev

# Buka: http://localhost:5173
```

---

## 🔑 **Setup API Key (Wajib)**

Edit file `.env`:
```bash
OPENAI_API_KEY=sk-your-key-here
```

Dapatkan di: https://platform.openai.com/api-keys

---

## 🌟 **Fitur Utama**

- ✅ 20+ bahasa pemrograman (JS, TS, Python, Java, Go, Rust, dll)
- ✅ Multi-AI Consensus (GPT-4 + Claude + CodeLlama)
- ✅ Security audit & CVE scanning
- ✅ Web dashboard real-time
- ✅ GitHub Actions integration
- ✅ Custom rules & plugins

---

## 📚 **Dokumentasi**

| File | Isi |
|------|-----|
| **QUICKSTART_INDONESIA.md** | Quick reference 2 menit |
| **CARA_INSTALL_DAN_RUNNING.md** | Panduan lengkap install & running |
| **CARA_PAKAI.md** | Tutorial lengkap semua fitur |
| **START_HERE.md** | Guide untuk pemula |

---

## 💡 **Contoh Cepat**

```bash
cd packages/cli

# Basic analysis
node dist/cli.js review ../../examples/sample.js

# Multi-AI consensus (paling akurat)
node dist/cli.js review --consensus ../../examples/sample.js

# Security scan
node dist/cli.js security ../../

# HTML report
node dist/cli.js report ../../ --output=html
```

---

## 🆘 **Troubleshooting**

| Error | Solusi |
|-------|--------|
| Module not found | `npm run build` |
| API key error | Edit `.env` tambahkan key |
| Port in use | Stop service yang pakai port tersebut |
| Install failed | `rm -rf node_modules && npm run install:all` |

---

## 🎯 **Yang Sudah Diperbaiki**

✅ Nama "CodeBlasters" (tambah 'S')  
✅ Dependency conflicts fixed  
✅ Tree-sitter versions updated  
✅ Installation error resolved  
✅ Documentation lengkap Indonesia

---

**Created by: attazy**  
**License: MIT**  
**Version: 1.0.0**

🚀 **Happy Coding!**

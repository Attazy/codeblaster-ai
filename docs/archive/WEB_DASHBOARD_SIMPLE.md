# 🚀 CARA CEPAT JALANKAN WEB DASHBOARD

## ⚡ 1 TERMINAL - SIMPLE!

Jalankan frontend & backend sekaligus:

```bash
./start-web.sh
```

**Itu aja!** 🎉

Script akan otomatis:
- ✅ Build kalau belum ada
- ✅ Install dependencies
- ✅ Start backend di http://localhost:5000
- ✅ Start frontend di http://localhost:5173
- ✅ Tampilkan semua log dalam 1 terminal

**Buka browser:** http://localhost:5173

**Stop semua:** Tekan `Ctrl+C` (sekali aja, semua service berhenti)

---

## 📊 FITUR WEB DASHBOARD

### 1. **Overview Page**
- Project summary & stats
- Recent analyses
- Quality score chart
- Quick actions button

### 2. **Analysis Page**  
- Upload files atau folder
- Pilih AI model (GPT-4, Claude, Ollama)
- Start analysis dengan 1 klik
- Real-time progress bar
- View hasil langsung

### 3. **Trends Page**
- 30-day quality trend
- Issue count over time
- Compare periods
- Export data

### 4. **Team Page**
- Team members activity
- Individual scores
- Code review stats
- Leaderboards

### 5. **Settings**
- Configure AI providers
- API key management
- Rules configuration
- Notification settings

---

## 🔧 MANUAL (JIKA PERLU)

Jika mau jalankan terpisah:

**Terminal 1 - Backend:**
```bash
cd packages/web-dashboard/backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd packages/web-dashboard/frontend
npm run dev
```

---

## ❓ TROUBLESHOOTING

### Port sudah dipakai?
```bash
# Cek apa yang pakai port 5173 atau 5000
lsof -i :5173
lsof -i :5000

# Kill process
kill -9 <PID>
```

### Build error?
```bash
# Rebuild semuanya
npm run build:backend
npm run build:frontend
```

### Dependencies error?
```bash
# Reinstall dependencies
rm -rf packages/web-dashboard/*/node_modules
npm run install:all
```

---

## 💡 TIPS

1. **Auto-reload:** Frontend & backend sudah support hot-reload!
2. **API docs:** http://localhost:5000/api-docs (Swagger)
3. **Health check:** http://localhost:5000/health
4. **Production build:**
   ```bash
   npm run build
   # Files akan ada di packages/web-dashboard/frontend/dist
   ```

---

**Selamat menggunakan!** 🎉

**Need CLI?** Pakai `./run.sh` untuk interactive menu.

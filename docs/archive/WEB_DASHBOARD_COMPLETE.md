# 🎨 Web Dashboard - Panduan Lengkap

## ✅ Yang Baru Ditambahkan

### Backend API
- ✅ Full REST API dengan Express + Socket.io
- ✅ File upload endpoint (single & multiple)
- ✅ Code review API terintegrasi dengan @codeblaster/core
- ✅ Real-time progress updates via WebSocket
- ✅ Error handling & validation

### Frontend Dashboard
- ✅ Modern React UI dengan Tailwind CSS
- ✅ Drag & drop file upload
- ✅ Real-time analysis progress
- ✅ Interactive results display dengan expand/collapse
- ✅ Statistics cards (Score, Critical, High, Medium, Low)
- ✅ Export ke JSON & HTML
- ✅ Responsive design

## 🚀 Cara Menjalankan

### Opsi 1: Auto Start (Recommended)
```bash
cd /home/attazy/Blasters
./start-web.sh
```

### Opsi 2: Manual Start
```bash
# Terminal 1 - Backend
cd packages/web-dashboard/backend
npm run dev

# Terminal 2 - Frontend
cd packages/web-dashboard/frontend
npm run dev
```

Buka browser: **http://localhost:5173**

## 📋 API Endpoints

### Review Endpoints
- `POST /api/review/analyze` - Analyze code snippet
- `POST /api/review/batch` - Batch analyze multiple files

### File Endpoints
- `POST /api/file/upload` - Upload single file
- `POST /api/file/upload-multiple` - Upload multiple files
- `DELETE /api/file/cleanup/:filename` - Clean up temp files

### Utility
- `GET /health` - Health check
- `GET /api` - API documentation

## 📊 Features

### 1. File Upload
- Drag & drop support
- File validation (20+ languages)
- Size limit: 10MB
- Supported: .js, .ts, .py, .java, .go, .rs, .cpp, .c, .rb, .php, .cs, .swift, .kt

### 2. Code Analysis
- Real-time AI-powered review
- Multi-language support
- Security, performance, & quality checks
- Line-by-line issue detection

### 3. Results Display
- Interactive issue cards
- Severity-based color coding
- Expandable suggestions
- Score calculation (0-100)

### 4. Statistics
- Overall quality score
- Issue breakdown by severity
- Visual indicators
- Real-time updates

### 5. Export
- JSON format (for API integration)
- HTML report (for sharing)
- Styled & printable

## 🔧 Configuration

### Backend (.env)
```bash
OPENAI_API_KEY=sk-your-key-here
BACKEND_PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:5000
```

## 🎯 Tech Stack

### Backend
- Express.js - Web framework
- Socket.io - Real-time communication
- Multer - File uploads
- TypeScript - Type safety
- @codeblaster/core - Analysis engine

### Frontend
- React 18 - UI framework
- Vite - Build tool
- Tailwind CSS - Styling
- Axios - HTTP client
- Lucide React - Icons

## 📝 Catatan

1. **API Key Required**: Pastikan `.env` berisi `OPENAI_API_KEY`
2. **Build First**: Jalankan `npm run build` jika ada perubahan code
3. **Port Conflicts**: Pastikan port 5000 & 5173 tidak dipakai
4. **Temp Files**: File temporary otomatis dibersihkan setelah analysis

## 🐛 Troubleshooting

### Backend tidak start
```bash
cd packages/web-dashboard/backend
rm -rf node_modules dist
npm install
npm run build
npm run dev
```

### Frontend error
```bash
cd packages/web-dashboard/frontend
rm -rf node_modules dist
npm install
npm run build
npm run dev
```

### API Connection Error
- Cek backend running di port 5000
- Cek `.env` file sudah benar
- Cek firewall/antivirus tidak block

## 🎉 Next Steps

1. Upload file code
2. Klik "Analyze Code"
3. Lihat hasil analisis
4. Export sebagai JSON/HTML
5. Fix issues berdasarkan suggestions

---

**Created by: attazy**
**Version: 1.0.0**
**License: MIT**

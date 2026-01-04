# 📦 Installation Guide

## 🚀 Super Quick (Recommended)

### Option 1: One-Click Start
```bash
cd /home/attazy/Blasters
./start
```

**First time**: Will auto-install everything
**After that**: Launches interactive menu directly

### Option 2: Manual Quick Start
```bash
./quickstart.sh    # Install & build
./run.sh           # Launch menu
```

---

## 📋 Requirements

Before installation, ensure you have:

- ✅ **Node.js** 18+ ([download](https://nodejs.org/))
- ✅ **npm** 9+ (comes with Node.js)
- ✅ **Git** (optional, for version control)

Check versions:
```bash
node -v    # Should show v18.x.x or higher
npm -v     # Should show v9.x.x or higher
```

---

## 🔧 Installation Methods

### Method 1: Interactive Launcher (Easiest! ⭐)

```bash
cd /home/attazy/Blasters
./start
```

This will:
1. Check if Node.js installed
2. Auto-install dependencies if needed
3. Build all packages
4. Launch interactive menu
5. Guide you through first-time setup

**Perfect for beginners!**

### Method 2: Quick Start Script

```bash
cd /home/attazy/Blasters
./quickstart.sh
```

This will:
- Install all dependencies
- Build all packages
- Create .env file
- Show usage instructions

Then run:
```bash
./run.sh
```

### Method 3: Manual Installation (Advanced)

```bash
cd /home/attazy/Blasters

# Install dependencies
npm run install:all

# Build packages
npm run build

# Create .env
cp .env.example .env

# Edit .env with your API key
nano .env

# Run
./run.sh
```

---

## 🔑 API Key Setup

### During Installation:

After first run, the menu will show option **9** to setup API keys.

### Manual Setup:

Create/edit `.env` file:

```bash
# Choose one or more:

# OpenAI (Best quality)
OPENAI_API_KEY=sk-your-key-here

# Anthropic (Good alternative)
ANTHROPIC_API_KEY=sk-ant-your-key-here

# Ollama (Free, local)
OLLAMA_BASE_URL=http://localhost:11434
```

### Getting API Keys:

**OpenAI (GPT-4):**
1. Go to https://platform.openai.com/
2. Sign up / Login
3. Navigate to API Keys
4. Create new key
5. Copy and paste to `.env`

**Anthropic (Claude):**
1. Go to https://console.anthropic.com/
2. Sign up / Login
3. Navigate to API Keys
4. Create new key
5. Copy and paste to `.env`

**Ollama (Free!):**
1. Install: `curl -fsSL https://ollama.com/install.sh | sh`
2. Run: `ollama serve`
3. Pull model: `ollama pull codellama`
4. No API key needed!

---

## ✅ Verify Installation

### Using Menu (Easy):
```bash
./run.sh
# Choose option 14: Check System Status
```

### Manual Check:
```bash
cd /home/attazy/Blasters

# Check if built
ls -la packages/cli/dist/
# Should show cli.js and other files

# Check .env
cat .env
# Should show your API keys

# Test CLI
cd packages/cli
node dist/cli.js --version
# Should show version number
```

---

## 🐛 Troubleshooting

### Problem: "Node.js not found"

**Solution:**
```bash
# Install Node.js
# Ubuntu/Debian:
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# macOS:
brew install node

# Or download from: https://nodejs.org/
```

### Problem: "Permission denied: ./start"

**Solution:**
```bash
chmod +x start run.sh quickstart.sh welcome.sh
./start
```

### Problem: "npm ERR! EACCES"

**Solution:**
```bash
# Don't use sudo! Fix npm permissions:
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Then retry:
./quickstart.sh
```

### Problem: "Build failed"

**Solution:**
```bash
# Clean and rebuild
rm -rf node_modules packages/*/node_modules
rm -rf packages/*/dist
npm run install:all
npm run build
```

### Problem: "API key not working"

**Solution:**
```bash
# Check .env format
cat .env
# Make sure format is: KEY=value (no spaces!)

# Test key
cd packages/cli
OPENAI_API_KEY=your-key node dist/cli.js review test.js

# Still not working? Try regenerating key from provider
```

### Problem: "Port already in use" (Web Dashboard)

**Solution:**
```bash
# Kill existing process
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9

# Or use different ports (edit package.json)
```

---

## 🔄 Update Installation

### Update to Latest Version:

```bash
cd /home/attazy/Blasters

# Pull latest changes (if using git)
git pull

# Reinstall dependencies
npm run install:all

# Rebuild
npm run build

# Done!
./run.sh
```

---

## 🗑️ Uninstallation

### Remove Everything:

```bash
cd /home/attazy
rm -rf Blasters
```

### Keep Data, Remove Dependencies:

```bash
cd /home/attazy/Blasters
rm -rf node_modules
rm -rf packages/*/node_modules
rm -rf packages/*/dist
```

---

## 📊 Installation Checklist

Use this to verify successful installation:

- [ ] Node.js 18+ installed
- [ ] npm 9+ installed
- [ ] Project downloaded/cloned
- [ ] Dependencies installed (`npm run install:all`)
- [ ] Project built (`npm run build`)
- [ ] .env file created
- [ ] API key added to .env
- [ ] Menu launches (`./run.sh`)
- [ ] System status shows all green (option 14)
- [ ] Test analysis works (option 1)

**All checked?** You're ready! 🎉

---

## 🎓 Next Steps

After successful installation:

1. Read `START_HERE.md` for quick guide
2. Run `./run.sh` and explore menu
3. Try option 1 to analyze a file
4. Check option 14 for system status
5. Read `CARA_PAKAI.md` for full tutorial

---

## 💡 Installation Tips

### For Best Experience:

1. **Use SSD** if possible (faster builds)
2. **Stable internet** (for npm downloads)
3. **8GB+ RAM** recommended
4. **Terminal with color support** (for pretty UI)

### Recommended Setup:

```bash
# Set up aliases for convenience
echo "alias codeblaster='cd /home/attazy/Blasters && ./run.sh'" >> ~/.bashrc
source ~/.bashrc

# Now just type:
codeblaster

# From anywhere! 🚀
```

---

## 🆘 Need Help?

1. Check `START_HERE.md` - Quick guide
2. Check `STRUCTURE_GUIDE.md` - Understand layout
3. Run `./run.sh` → option 12 - View tutorial
4. Read troubleshooting section above
5. Check system status - option 14

---

**Installation complete!** 🎉

Run `./start` or `./run.sh` to begin!

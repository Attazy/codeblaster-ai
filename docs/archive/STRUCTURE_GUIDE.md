# 📁 Project Structure - Simplified for Beginners

## 🎯 TL;DR - What You Need to Know

**You don't need to understand all folders!**

Just run: `./run.sh` 

Everything else is handled automatically! ✨

---

## 📂 Important Files (What You'll Use)

```
Blasters/
│
├── 🚀 run.sh              ← START HERE! Interactive menu
├── ⚡ quickstart.sh       ← Auto-install everything
├── 👋 welcome.sh          ← Show welcome banner
│
├── 📖 START_HERE.md       ← Quick guide (READ THIS!)
├── 📚 CARA_PAKAI.md       ← Full tutorial (Bahasa)
├── 📄 README.md           ← Documentation (English)
│
├── ⚙️  .env               ← Your API keys (auto-created)
└── 📋 .codeblaster.json   ← Config (auto-created)
```

**That's all you need to care about!** 🎯

---

## 📦 Other Folders (Auto-Managed)

```
Blasters/
│
├── packages/              ← Modules (auto-handled by run.sh)
│   ├── cli/              ← Command-line tool
│   ├── core/             ← Analysis engine
│   └── web-dashboard/    ← Web interface
│
├── config/               ← Preset configs
├── docs/                 ← Advanced docs
├── examples/             ← Code examples
└── tests/                ← Automated tests
```

**You don't need to go into these folders manually!**

All accessed through `./run.sh` menu.

---

## 🎮 How It Works (Simple Explanation)

### Traditional Way (Complicated) ❌

```bash
cd packages/core
npm install
npm run build

cd ../cli
npm install
npm run build

cd ../web-dashboard/backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev

# TOO MANY STEPS! 😵
```

### New Way (Simple) ✅

```bash
./run.sh

# Choose what you want from menu!
# All modules handled automatically! 🎉
```

---

## 🔍 What Each Module Does

### 📦 packages/core
- **What**: Brain of the system
- **Does**: Parse code, run AI analysis, detect issues
- **You need to know**: Nothing! Auto-used by CLI

### 📦 packages/cli
- **What**: Command-line interface
- **Does**: Let you analyze code from terminal
- **You need to know**: Just use via menu (option 1-7)

### 📦 packages/web-dashboard
- **What**: Web interface
- **Does**: Beautiful UI for analysis & reports
- **You need to know**: Just use via menu (option 8)

---

## 🎯 Usage Flow

```
User (You!)
    ↓
./run.sh (Interactive Menu)
    ↓
Choose option (1-14)
    ↓
┌─────────────────────────────────────┐
│                                     │
│  Option 1-7: CLI Analysis           │
│    └→ Uses: core + cli modules      │
│                                     │
│  Option 8: Web Dashboard            │
│    └→ Uses: all modules             │
│                                     │
│  Option 9-11: Setup & Config        │
│    └→ Uses: config system           │
│                                     │
└─────────────────────────────────────┘
    ↓
Results! 🎉
```

**All module coordination done automatically by `run.sh`!**

---

## 🆚 Comparison with Storm CLI

### Storm CLI Style:
```
1. Install
2. Run storm
3. Menu appears
4. Pick option
5. Done!
```

### CodeBlaster (NEW!):
```
1. Run ./run.sh
2. Menu appears
3. Pick option
4. Done!
```

**Same simplicity!** No need to understand internals.

---

## 🎓 For Advanced Users

### If You Want Manual Control:

```bash
# CLI directly
cd packages/cli
node dist/cli.js review <path>

# Web dashboard manually
cd packages/web-dashboard/backend
npm run dev &

cd ../frontend
npm run dev
```

### If You Want to Understand Modules:

Read these (in order):
1. `packages/core/README.md` - Core engine
2. `packages/cli/README.md` - CLI interface
3. `packages/web-dashboard/README.md` - Web UI

But honestly, **not needed for normal usage!**

---

## 📊 Module Dependencies

```
┌─────────────────────────────────────────────┐
│                                             │
│  packages/cli                               │
│    ↓                                        │
│  packages/core ←─── packages/web-dashboard │
│    ↓                                        │
│  AI Models (GPT/Claude/Llama)              │
│                                             │
└─────────────────────────────────────────────┘
```

All handled by npm workspaces automatically.

---

## 🎯 Best Practices

### For Beginners:
- ✅ Always use `./run.sh`
- ✅ Use interactive menu
- ✅ Read START_HERE.md
- ❌ Don't manually navigate modules
- ❌ Don't run commands in separate terminals

### For Advanced Users:
- ✅ Use `./run.sh` OR manual CLI
- ✅ Customize `.codeblaster.json`
- ✅ Create custom scripts
- ✅ Integrate with CI/CD

---

## 🆘 Troubleshooting

### "Too many folders, confused!"
→ **Solution**: Ignore them! Use `./run.sh` only.

### "Which module should I run?"
→ **Solution**: Don't run any directly! Use menu.

### "How do modules communicate?"
→ **Solution**: Don't worry about it! Auto-handled.

### "Can I use without understanding structure?"
→ **Solution**: YES! That's the whole point! 🎯

---

## 🎉 Summary

### What You Need:
- ✅ `./run.sh` - Interactive menu
- ✅ `START_HERE.md` - Quick guide

### What You DON'T Need:
- ❌ Understanding module structure
- ❌ Manually navigating folders
- ❌ Running separate commands

### Remember:
```bash
./run.sh
```

**That's literally all you need!** 🚀

---

Made with ❤️ for beginners who don't want complexity!

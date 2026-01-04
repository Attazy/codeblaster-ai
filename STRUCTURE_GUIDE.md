# 🗺️ Structure Guide - CodeBlaster AI

## 📂 Project Structure

```
codeblaster-ai/
├── 🚀 Launchers
│   ├── start              # ONE-CLICK launcher
│   ├── run.sh             # Interactive menu
│   └── quickstart.sh      # Auto-installer
│
├── 📖 Documentation
│   ├── README.md          # Main documentation
│   ├── START_HERE.md      # Quick start guide
│   ├── CARA_PAKAI.md      # Indonesian tutorial
│   ├── CHANGELOG.md       # Version history
│   ├── CONTRIBUTING.md    # Contribution guide
│   └── SECURITY.md        # Security policy
│
├── 📦 Packages (Monorepo)
│   ├── core/              # Analysis engine
│   ├── cli/               # Command-line tool
│   └── web-dashboard/
│       ├── backend/       # API server
│       └── frontend/      # React UI
│
├── ⚙️ Configuration
│   ├── .env.example       # Environment template
│   ├── .gitignore         # Git ignore rules
│   ├── .eslintrc.js       # Linting config
│   ├── .prettierrc        # Code formatting
│   └── tsconfig.json      # TypeScript config
│
├── 📁 Resources
│   ├── config/            # Preset configs
│   ├── docs/              # Extended docs
│   ├── examples/          # Usage examples
│   └── tests/             # Test suites
│
└── 🏗️ Build Output
    ├── dist/              # Compiled code
    └── node_modules/      # Dependencies
```

## 🎯 Key Files

### Launchers
- **start**: Simplest way to run the tool
- **run.sh**: Full interactive menu (recommended)
- **quickstart.sh**: Auto-installs dependencies

### Core Packages
- **packages/core**: Analysis engine with AI models
- **packages/cli**: Command-line interface
- **packages/web-dashboard**: Full-stack web UI

### Configuration
- **.env.example**: Copy to `.env` and add API keys
- **package.json**: Project metadata & scripts
- **tsconfig.json**: TypeScript compiler settings

## 🚀 Getting Started

1. Copy `.env.example` to `.env`
2. Add your API keys
3. Run `./start` or `./run.sh`
4. Follow the interactive menu

## 📝 Development

```bash
# Install dependencies
npm run install:all

# Build all packages
npm run build

# Run in dev mode
npm run dev:cli
npm run dev:backend
npm run dev:frontend
```

## 🔗 Learn More

- See [START_HERE.md](START_HERE.md) for quick start
- See [CARA_PAKAI.md](CARA_PAKAI.md) for Indonesian guide
- See [docs/](docs/) for detailed documentation

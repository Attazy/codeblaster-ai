#!/bin/bash

# Quick Start Script for CodeBlaster AI

clear

cat << "EOF"
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   CodeBlasters AI - Advanced Code Review Assistant     ║
║                                                           ║
║   Created by: Attazy                                      ║
║   Version: 1.0.0                                          ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
EOF

echo ""
echo "Welcome to CodeBlasters AI Setup!"
echo ""

# Step 1: Check prerequisites
echo "📋 Checking prerequisites..."
echo ""

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "   Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher"
    echo "   Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v)"
echo "✅ npm $(npm -v)"
echo ""

# Step 2: Installation
echo "📦 Installing dependencies..."
echo ""
npm run install:all

if [ $? -ne 0 ]; then
    echo "❌ Installation failed"
    exit 1
fi

echo ""
echo "✅ Dependencies installed"
echo ""

# Step 3: Build
echo "🔨 Building packages..."
echo ""
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo ""
echo "✅ Build completed"
echo ""

# Step 4: Environment setup
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env created"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env and add your API keys!"
    echo ""
else
    echo "✅ .env already exists"
    echo ""
fi

# Step 5: Show usage
cat << "EOF"
╔═══════════════════════════════════════════════════════════╗
║                    SETUP COMPLETE! 🎉                     ║
╚═══════════════════════════════════════════════════════════╝

📚 QUICK START GUIDE:

1️⃣  Setup API Key:
   Edit .env file and add:
   OPENAI_API_KEY=your-key-here
   (or ANTHROPIC_API_KEY for Claude)

2️⃣  Initialize Config:
   cd packages/cli
   npm run build
   node dist/cli.js init

3️⃣  Run Your First Analysis:
   # Analyze a file
   node dist/cli.js review path/to/file.js
   
   # Analyze a directory
   node dist/cli.js review src/
   
   # Analyze git changes
   node dist/cli.js review --staged

4️⃣  Generate Reports:
   # HTML report
   node dist/cli.js review --format html --output report.html
   
   # JSON report
   node dist/cli.js review --format json --output report.json

5️⃣  Advanced Usage:
   # Use Claude AI
   node dist/cli.js review --ai anthropic
   
   # Only show errors and critical
   node dist/cli.js review --severity error
   
   # Enable auto-fix
   node dist/cli.js review --fix

📖 Documentation:
   - README.md - Full feature list
   - docs/getting-started.md - Detailed guide
   - docs/plugins.md - Create custom rules
   - examples/ - Code examples

🔗 Integration:
   - GitHub Actions: .github/workflows/ci.yml
   - Pre-commit hooks: See docs/getting-started.md
   - CI/CD: Jenkins, GitLab, CircleCI supported

🌟 Features:
   ✓ Multi-language support (JS, TS, Python, Java, Go, Rust)
   ✓ AI-powered analysis (GPT-4, Claude, Ollama)
   ✓ 15+ built-in security & quality rules
   ✓ Plugin system for custom rules
   ✓ Beautiful HTML & console reports
   ✓ Parallel processing & caching
   ✓ Git integration & PR automation

📧 Need Help?
   - Read: PROJECT_SUMMARY.md
   - Issues: github.com/attazy/codeblaster-ai/issues
   - Email: support@codeblaster.ai

╔═══════════════════════════════════════════════════════════╗
║           Made with ❤️  by attazy - MIT License           ║
╚═══════════════════════════════════════════════════════════╝

EOF

echo ""
echo "🎯 Next: Edit .env, then run: cd packages/cli && node dist/cli.js init"
echo ""

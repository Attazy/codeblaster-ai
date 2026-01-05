# 🚀 CodeBlaster AI

**AI-Powered Code Review & Analysis Tool** - Automatically review code, detect bugs, and find vulnerabilities using multiple AI models.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Linux](https://img.shields.io/badge/Linux-Only-blue.svg)](README.md)

## ✨ Features

- 🤖 **Multi-AI Consensus** - GPT-4, Claude, CodeLlama voting (60% fewer false positives)
- 🐛 **Bug Detection** - Find bugs dan code smells automatically
- 🔒 **Security Scan** - CVE vulnerability detection
- 📊 **Code Metrics** - Complexity, maintainability, quality scores
- 🌐 **20+ Languages** - JavaScript, TypeScript, Python, Java, Go, Rust, C++, PHP, Ruby, dll
- 🖥️ **Web Dashboard** - Real-time visualization & team collaboration

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/attazy/codeblaster-ai.git
cd codeblaster-ai

# Auto install & setup
./quickstart.sh

# Launch interactive menu
./start
```

**Requirements**: Linux, Node.js v18+, npm v9+, API key ([OpenAI](https://platform.openai.com/api-keys) / [Anthropic](https://console.anthropic.com/) / [Ollama FREE](https://ollama.com/))

## 💻 Usage

**Interactive Menu (Easiest):**
```bash
./start
```

**CLI Commands:**
```bash
cd packages/cli

# Analyze file
node dist/cli.js review src/app.js

# Full project with AI consensus
node dist/cli.js review src/ --consensus

# Security scan
node dist/cli.js review src/ --scan-deps
```

**Web Dashboard:**
```bash
./start  # Pilih option 7
# Open browser: http://localhost:3000
```

## 🎯 What It Detects

- **Code Quality**: Complexity, maintainability, code smells
- **Security**: SQL injection, XSS, hardcoded secrets, CVE
- **Architecture**: Design patterns, anti-patterns
- **Dependencies**: Outdated packages, vulnerabilities

## 🔗 Integrations

- 💻 CLI Tool + Interactive Menu
- 🖥️ Web Dashboard
- 🔄 Git Hooks (pre-commit)
- 🤖 GitHub Actions
- 🔗 CI/CD (Jenkins, GitLab, CircleCI)

## 📊 Example Output

```bash
🚀 CodeBlaster AI - Analysis Report

Files Analyzed: 1 | Total Issues: 5

🔴 CRITICAL: SQL Injection vulnerability
   File: src/auth.js:45
   💡 Use parameterized queries

❌ ERROR: Undefined variable
   File: src/utils.js:23

⚠️  WARNING: Function too complex (120 lines)
   File: src/handler.js:10
```

## 📚 Documentation

- **[START_HERE.md](START_HERE.md)** - Quick guide
- **[CARA_PAKAI.md](CARA_PAKAI.md)** - Tutorial lengkap (Bahasa Indonesia)
- **[STRUCTURE_GUIDE.md](STRUCTURE_GUIDE.md)** - Architecture guide
- **[docs/](docs/)** - Advanced docs

## 🔌 Advanced Integration

**GitHub Actions:**
```yaml
- uses: actions/checkout@v4
- name: CodeBlaster Review
  run: |
    npm run install:all && npm run build
    cd packages/cli && node dist/cli.js review .
  env:
    OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

**Pre-commit Hook:**
```bash
npx husky add .husky/pre-commit "cd packages/cli && node dist/cli.js review --staged"
```

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](LICENSE)

---

**Made with ❤️ by attazy**

#!/bin/bash

# CodeBlaster AI - Installation Script

echo "🚀 Installing CodeBlaster AI..."

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js 18 or higher is required"
    echo "Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version check passed"

# Install dependencies
echo "📦 Installing dependencies..."
npm run install:all

# Build packages
echo "🔨 Building packages..."
npm run build

# Create .env from example
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please edit .env and add your API keys"
fi

echo ""
echo "✅ Installation complete!"
echo ""
echo "📚 Next steps:"
echo "  1. Edit .env and add your API keys"
echo "  2. Run: cd packages/cli && npm link"
echo "  3. Run: codeblaster init"
echo "  4. Run: codeblaster review"
echo ""
echo "📖 Documentation: docs/getting-started.md"
echo ""

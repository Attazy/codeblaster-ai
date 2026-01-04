# Contributing to CodeBlaster AI

Thank you for your interest in contributing to CodeBlaster AI! 🚀

## Ways to Contribute

- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🔌 Create plugins
- 🛠️ Submit pull requests

## Development Setup

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Setup Steps

1. **Fork and clone the repository**
```bash
git clone https://github.com/attazy/codeblaster-ai.git
cd codeblaster-ai
```

2. **Install dependencies**
```bash
npm run install:all
```

3. **Build packages**
```bash
npm run build
```

4. **Run in development mode**
```bash
# Core package
npm run dev:core

# CLI
npm run dev:cli

# Web dashboard
npm run dev:backend &
npm run dev:frontend
```

## Project Structure

```
codeblaster-ai/
├── packages/
│   ├── core/              # Core analysis engine
│   ├── cli/               # Command-line interface
│   └── web-dashboard/     # Web application
├── config/                # Configuration presets
├── docs/                  # Documentation
├── examples/              # Usage examples
└── tests/                 # Integration tests
```

## Coding Standards

### TypeScript
- Use strict type checking
- No `any` types (use `unknown` if necessary)
- Export interfaces and types
- Document complex functions

### Naming Conventions
- Classes: PascalCase
- Functions/variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Interfaces: PascalCase (no `I` prefix)

### Code Style
- 2 spaces indentation
- Single quotes for strings
- Semicolons required
- Max line length: 100 characters

We use ESLint and Prettier:
```bash
npm run lint
npm run format
```

## Adding New Rules

1. Create rule in `packages/core/src/analyzers/`
2. Follow existing rule patterns
3. Add tests
4. Document the rule

Example:
```typescript
export const myNewRule: Rule = {
  id: 'my-new-rule',
  name: 'My New Rule',
  description: 'What this rule checks',
  severity: Severity.WARNING,
  category: IssueCategory.CODE_SMELL,
  language: [Language.JAVASCRIPT],
  enabled: true,
  check: (context: RuleContext): AnalysisIssue[] => {
    // Implementation
    return [];
  },
};
```

## Testing

```bash
# Run all tests
npm test

# Run specific package tests
npm test -w packages/core
npm test -w packages/cli

# Watch mode
npm test -- --watch
```

## Pull Request Process

1. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```

2. **Make your changes**
- Write clear, concise commit messages
- Follow coding standards
- Add tests for new features
- Update documentation

3. **Test your changes**
```bash
npm run build
npm test
npm run lint
```

4. **Commit your changes**
```bash
git commit -m "feat: add amazing feature"
```

We follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding/updating tests
- `chore:` Maintenance tasks

5. **Push to your fork**
```bash
git push origin feature/amazing-feature
```

6. **Open a Pull Request**
- Use a descriptive title
- Explain what and why
- Link related issues
- Add screenshots if applicable

## Code Review Process

- Maintainers will review within 2-3 days
- Address feedback constructively
- Keep discussions focused and respectful
- Be patient and collaborative

## Bug Reports

Use GitHub Issues with the following information:

- **Description**: Clear description of the bug
- **Steps to reproduce**: Detailed steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: OS, Node version, package version
- **Code sample**: Minimal reproduction code
- **Screenshots**: If applicable

## Feature Requests

We love new ideas! Please:

- Check existing issues first
- Explain the use case
- Describe the proposed solution
- Consider breaking changes
- Be open to discussion

## Documentation

Good documentation is crucial:

- Update README.md for major features
- Add guides in `docs/` directory
- Include code examples
- Keep it simple and clear

## Community Guidelines

- Be respectful and inclusive
- Help others learn and grow
- Give constructive feedback
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md)

## Questions?

- Open a GitHub Discussion
- Join our Discord (coming soon)
- Email: support@codeblaster.ai

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for making CodeBlaster AI better!** ❤️

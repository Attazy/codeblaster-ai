# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in CodeBlaster AI, please report it responsibly:

### How to Report

1. **DO NOT** open a public GitHub issue
2. Email: security@codeblaster.ai (or create private security advisory on GitHub)
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Response Time**: Within 48 hours
- **Update Frequency**: Every 7 days until resolved
- **Disclosure**: Coordinated disclosure after fix is released

### Security Best Practices

When using CodeBlaster AI:

1. **API Keys**: Always use environment variables, never commit to code
2. **Self-Hosted**: Keep your instance updated
3. **Access Control**: Limit who can run analysis in production
4. **Network**: Use HTTPS for all external API calls
5. **Dependencies**: Regularly update npm packages

### Known Security Considerations

- AI providers (OpenAI, Anthropic) receive code snippets for analysis
- Consider using self-hosted Ollama for sensitive codebases
- Review generated reports before sharing publicly
- Cache may contain code snippets (use Redis auth if needed)

## Security Features

CodeBlaster AI includes:
- ✅ Hardcoded secret detection
- ✅ SQL injection detection
- ✅ XSS vulnerability detection
- ✅ Secure credential management
- ✅ No code storage on external servers (except AI API calls)

## Hall of Fame

Security researchers who responsibly disclose vulnerabilities:
- Your name could be here!

Thank you for helping keep CodeBlaster AI secure! 🔒

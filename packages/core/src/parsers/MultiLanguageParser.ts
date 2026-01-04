import Parser from 'tree-sitter';
import { Language, ParserOptions } from '../types';

// Language-specific parsers
const languageParsers: Map<Language, any> = new Map();

export class MultiLanguageParser {
  private parser: Parser;

  constructor() {
    this.parser = new Parser();
    this.loadLanguages();
  }

  private async loadLanguages() {
    try {
      // Dynamic imports for tree-sitter languages
      const JavaScript = require('tree-sitter-javascript');
      const TypeScript = require('tree-sitter-typescript').typescript;
      const Python = require('tree-sitter-python');
      const Java = require('tree-sitter-java');
      const Go = require('tree-sitter-go');
      const Rust = require('tree-sitter-rust');

      languageParsers.set(Language.JAVASCRIPT, JavaScript);
      languageParsers.set(Language.TYPESCRIPT, TypeScript);
      languageParsers.set(Language.PYTHON, Python);
      languageParsers.set(Language.JAVA, Java);
      languageParsers.set(Language.GO, Go);
      languageParsers.set(Language.RUST, Rust);
    } catch (error) {
      console.warn('Some language parsers could not be loaded:', error);
    }
  }

  parse(options: ParserOptions) {
    const langParser = languageParsers.get(options.language);
    if (!langParser) {
      throw new Error(`Parser not available for language: ${options.language}`);
    }

    this.parser.setLanguage(langParser);
    const tree = this.parser.parse(options.content);
    
    return {
      tree,
      rootNode: tree.rootNode,
      language: options.language,
      filePath: options.filePath,
    };
  }

  detectLanguage(filePath: string): Language {
    const ext = filePath.split('.').pop()?.toLowerCase();
    
    const extensionMap: Record<string, Language> = {
      'js': Language.JAVASCRIPT,
      'jsx': Language.JAVASCRIPT,
      'mjs': Language.JAVASCRIPT,
      'cjs': Language.JAVASCRIPT,
      'ts': Language.TYPESCRIPT,
      'tsx': Language.TYPESCRIPT,
      'py': Language.PYTHON,
      'pyw': Language.PYTHON,
      'java': Language.JAVA,
      'go': Language.GO,
      'rs': Language.RUST,
      'cpp': Language.CPP,
      'cc': Language.CPP,
      'cxx': Language.CPP,
      'c++': Language.CPP,
      'h': Language.CPP,
      'hpp': Language.CPP,
      'php': Language.PHP,
      'rb': Language.RUBY,
      'rake': Language.RUBY,
      'swift': Language.SWIFT,
      'kt': Language.KOTLIN,
      'kts': Language.KOTLIN,
      'cs': Language.CSHARP,
      'scala': Language.SCALA,
      'sc': Language.SCALA,
      'ex': Language.ELIXIR,
      'exs': Language.ELIXIR,
      'dart': Language.DART,
      'lua': Language.LUA,
      'sh': Language.SHELL,
      'bash': Language.SHELL,
      'zsh': Language.SHELL,
      'sql': Language.SQL,
      'html': Language.HTML,
      'htm': Language.HTML,
      'css': Language.CSS,
      'scss': Language.CSS,
      'sass': Language.CSS,
    };

    return extensionMap[ext || ''] || Language.JAVASCRIPT;
  }

  traverseAST(node: any, callback: (node: any) => void) {
    callback(node);
    for (const child of node.children) {
      this.traverseAST(child, callback);
    }
  }

  findNodes(rootNode: any, type: string): any[] {
    const results: any[] = [];
    this.traverseAST(rootNode, (node) => {
      if (node.type === type) {
        results.push(node);
      }
    });
    return results;
  }

  getNodeText(node: any, source: string): string {
    return source.substring(node.startIndex, node.endIndex);
  }
}

export default MultiLanguageParser;

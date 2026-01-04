import { Rule, Plugin } from '../types';
import fs from 'fs';
import path from 'path';

export class PluginManager {
  private plugins: Map<string, Plugin> = new Map();
  private rules: Map<string, Rule> = new Map();

  async loadPlugin(pluginPath: string): Promise<void> {
    try {
      const pluginModule = await import(pluginPath);
      const plugin: Plugin = pluginModule.default || pluginModule;

      if (!this.validatePlugin(plugin)) {
        throw new Error(`Invalid plugin structure: ${pluginPath}`);
      }

      this.plugins.set(plugin.name, plugin);
      
      plugin.rules.forEach((rule) => {
        this.rules.set(rule.id, rule);
      });

      console.log(`Plugin loaded: ${plugin.name} v${plugin.version}`);
    } catch (error) {
      console.error(`Failed to load plugin ${pluginPath}:`, error);
      throw error;
    }
  }

  async loadPluginsFromDirectory(directory: string): Promise<void> {
    if (!fs.existsSync(directory)) {
      console.warn(`Plugin directory not found: ${directory}`);
      return;
    }

    const files = fs.readdirSync(directory);
    
    for (const file of files) {
      if (file.endsWith('.js') || file.endsWith('.ts')) {
        const pluginPath = path.join(directory, file);
        try {
          await this.loadPlugin(pluginPath);
        } catch (error) {
          console.error(`Error loading plugin ${file}:`, error);
        }
      }
    }
  }

  getPlugin(name: string): Plugin | undefined {
    return this.plugins.get(name);
  }

  getAllPlugins(): Plugin[] {
    return Array.from(this.plugins.values());
  }

  getRule(id: string): Rule | undefined {
    return this.rules.get(id);
  }

  getAllRules(): Rule[] {
    return Array.from(this.rules.values());
  }

  getEnabledRules(): Rule[] {
    return this.getAllRules().filter((rule) => rule.enabled);
  }

  enableRule(id: string): void {
    const rule = this.rules.get(id);
    if (rule) {
      rule.enabled = true;
    }
  }

  disableRule(id: string): void {
    const rule = this.rules.get(id);
    if (rule) {
      rule.enabled = false;
    }
  }

  private validatePlugin(plugin: any): plugin is Plugin {
    return (
      typeof plugin === 'object' &&
      typeof plugin.name === 'string' &&
      typeof plugin.version === 'string' &&
      Array.isArray(plugin.rules) &&
      plugin.rules.every(this.validateRule)
    );
  }

  private validateRule(rule: any): rule is Rule {
    return (
      typeof rule === 'object' &&
      typeof rule.id === 'string' &&
      typeof rule.name === 'string' &&
      typeof rule.check === 'function'
    );
  }

  unloadPlugin(name: string): void {
    const plugin = this.plugins.get(name);
    if (plugin) {
      plugin.rules.forEach((rule) => {
        this.rules.delete(rule.id);
      });
      this.plugins.delete(name);
      console.log(`Plugin unloaded: ${name}`);
    }
  }

  clearAll(): void {
    this.plugins.clear();
    this.rules.clear();
  }
}

export default PluginManager;

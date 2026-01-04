import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';

interface ConfigOptions {
  set?: string;
  get?: string;
  list?: boolean;
}

export async function configCommand(options: ConfigOptions) {
  const configPath = path.join(process.cwd(), '.codeblaster.json');

  try {
    if (options.list) {
      const config = await loadConfig(configPath);
      console.log(chalk.bold('\n📋 Current Configuration:\n'));
      console.log(JSON.stringify(config, null, 2));
      return;
    }

    if (options.get) {
      const config = await loadConfig(configPath);
      const value = getNestedValue(config, options.get);
      console.log(value !== undefined ? value : chalk.yellow('Not found'));
      return;
    }

    if (options.set) {
      const [key, ...valueParts] = options.set.split('=');
      const value = valueParts.join('=');
      
      const config = await loadConfig(configPath);
      setNestedValue(config, key, parseValue(value));
      
      await fs.writeFile(configPath, JSON.stringify(config, null, 2));
      console.log(chalk.green(`✓ Set ${key} = ${value}`));
      return;
    }

    console.log(chalk.yellow('No options specified. Use --list, --get, or --set'));
  } catch (error: any) {
    console.error(chalk.red('Error:'), error.message);
    process.exit(1);
  }
}

async function loadConfig(configPath: string): Promise<any> {
  try {
    const content = await fs.readFile(configPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    throw new Error('Configuration file not found. Run "codeblaster init" first.');
  }
}

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  const target = keys.reduce((current, key) => {
    if (!(key in current)) current[key] = {};
    return current[key];
  }, obj);
  target[lastKey] = value;
}

function parseValue(value: string): any {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (!isNaN(Number(value))) return Number(value);
  return value;
}

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Model } from './models';

export interface Config {
  currentModel: string;
  customModels: Model[];
  apiKeys: Record<string, string>;
}

const CONFIG_DIR = path.join(os.homedir(), '.claude-model-switcher');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

export class ConfigManager {
  private config: Config;

  constructor() {
    this.config = this.loadConfig();
  }

  private loadConfig(): Config {
    try {
      if (!fs.existsSync(CONFIG_DIR)) {
        fs.mkdirSync(CONFIG_DIR, { recursive: true, mode: 0o700 });
      }

      if (fs.existsSync(CONFIG_FILE)) {
        const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error loading config:', error);
    }

    // Default config
    return {
      currentModel: 'claude-pro',
      customModels: [],
      apiKeys: {},
    };
  }

  private saveConfig(): void {
    try {
      // Write config file with secure permissions (owner read/write only)
      fs.writeFileSync(CONFIG_FILE, JSON.stringify(this.config, null, 2), { mode: 0o600 });

      // Explicitly set permissions to ensure they are correct (handles existing files)
      fs.chmodSync(CONFIG_FILE, 0o600);
    } catch (error) {
      console.error('Error saving config:', error);
      throw error;
    }
  }

  getCurrentModel(): string {
    return this.config.currentModel;
  }

  setCurrentModel(modelId: string): void {
    this.config.currentModel = modelId;
    this.saveConfig();
  }

  getCustomModels(): Model[] {
    return this.config.customModels;
  }

  addCustomModel(model: Model): void {
    this.config.customModels.push(model);
    this.saveConfig();
  }

  getApiKey(modelId: string): string | undefined {
    return this.config.apiKeys[modelId];
  }

  setApiKey(modelId: string, apiKey: string): void {
    this.config.apiKeys[modelId] = apiKey;
    this.saveConfig();
  }

  getConfig(): Config {
    return { ...this.config };
  }

  getSafeConfig(): Config {
    // Return config with masked API keys for display purposes
    const maskedApiKeys: Record<string, string> = {};

    for (const [modelId, apiKey] of Object.entries(this.config.apiKeys)) {
      if (apiKey && apiKey.length > 8) {
        // Show first 4 and last 4 characters, mask the middle
        maskedApiKeys[modelId] = `${apiKey.slice(0, 4)}${'*'.repeat(apiKey.length - 8)}${apiKey.slice(-4)}`;
      } else if (apiKey) {
        maskedApiKeys[modelId] = '****';
      }
    }

    return {
      ...this.config,
      apiKeys: maskedApiKeys,
    };
  }
}

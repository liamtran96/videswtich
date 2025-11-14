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
        fs.mkdirSync(CONFIG_DIR, { recursive: true });
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
      fs.writeFileSync(CONFIG_FILE, JSON.stringify(this.config, null, 2));
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
}

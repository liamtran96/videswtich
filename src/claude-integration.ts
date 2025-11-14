import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Model } from './models';

const CLAUDE_DIR = path.join(os.homedir(), '.claude');
const CLAUDE_SETTINGS_FILE = path.join(CLAUDE_DIR, 'settings.json');

interface ClaudeSettings {
  baseURL?: string;
  apiKey?: string;
  [key: string]: any;
}

export class ClaudeCodeIntegration {

  /**
   * Check if Claude Code is installed
   */
  static isClaudeInstalled(): boolean {
    return fs.existsSync(CLAUDE_DIR);
  }

  /**
   * Get current Claude Code settings
   */
  static getSettings(): ClaudeSettings {
    try {
      if (fs.existsSync(CLAUDE_SETTINGS_FILE)) {
        const data = fs.readFileSync(CLAUDE_SETTINGS_FILE, 'utf-8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error reading Claude settings:', error);
    }
    return {};
  }

  /**
   * Update Claude Code settings for a specific model
   */
  static updateSettings(model: Model, apiKey?: string): void {
    try {
      // Ensure Claude directory exists
      if (!fs.existsSync(CLAUDE_DIR)) {
        fs.mkdirSync(CLAUDE_DIR, { recursive: true, mode: 0o700 });
      }

      // Read existing settings
      let settings: ClaudeSettings = {};
      if (fs.existsSync(CLAUDE_SETTINGS_FILE)) {
        const data = fs.readFileSync(CLAUDE_SETTINGS_FILE, 'utf-8');
        settings = JSON.parse(data);
      }

      // Update settings based on model
      if (model.id === 'claude-pro') {
        // Claude Pro: Remove baseURL to use default Anthropic API
        delete settings.baseURL;
        if (apiKey) {
          settings.apiKey = apiKey;
        }
      } else {
        // Other models: Set custom baseURL
        if (model.endpoint) {
          settings.baseURL = model.endpoint;
        }
        if (apiKey) {
          settings.apiKey = apiKey;
        }
      }

      // Write updated settings with secure permissions
      fs.writeFileSync(CLAUDE_SETTINGS_FILE, JSON.stringify(settings, null, 2), { mode: 0o600 });
      fs.chmodSync(CLAUDE_SETTINGS_FILE, 0o600);

    } catch (error) {
      console.error('Error updating Claude settings:', error);
      throw error;
    }
  }

  /**
   * Get the current model being used by Claude Code
   */
  static getCurrentClaudeModel(): { isDefault: boolean; baseURL?: string } {
    const settings = this.getSettings();

    if (!settings.baseURL) {
      return { isDefault: true };
    }

    return {
      isDefault: false,
      baseURL: settings.baseURL
    };
  }

  /**
   * Backup current Claude settings
   */
  static backupSettings(): string | null {
    try {
      if (fs.existsSync(CLAUDE_SETTINGS_FILE)) {
        const backupFile = path.join(CLAUDE_DIR, `settings.json.backup.${Date.now()}`);
        fs.copyFileSync(CLAUDE_SETTINGS_FILE, backupFile);
        return backupFile;
      }
    } catch (error) {
      console.error('Error backing up settings:', error);
    }
    return null;
  }
}

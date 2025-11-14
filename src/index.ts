#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { ConfigManager } from './config';
import { getAllModels, getModelById } from './models';

const program = new Command();
const config = new ConfigManager();

program
  .name('model-switcher')
  .description('Simple CLI to switch between Claude Code Pro and other AI models')
  .version('1.0.0');

// List all available models
program
  .command('list')
  .description('List all available models')
  .action(() => {
    const customModels = config.getCustomModels();
    const allModels = getAllModels(customModels);
    const currentModel = config.getCurrentModel();

    console.log(chalk.bold('\nAvailable Models:\n'));

    allModels.forEach((model) => {
      const isCurrent = model.id === currentModel;
      const prefix = isCurrent ? chalk.green('●') : chalk.gray('○');
      const name = isCurrent ? chalk.green.bold(model.name) : model.name;
      const id = chalk.cyan(`[${model.id}]`);
      const provider = chalk.gray(`(${model.provider})`);

      console.log(`${prefix} ${name} ${id} ${provider}`);
      console.log(`  ${chalk.gray(model.description)}`);

      if (model.endpoint) {
        console.log(`  ${chalk.gray(`Endpoint: ${model.endpoint}`)}`);
      }

      console.log();
    });
  });

// Show current model
program
  .command('current')
  .description('Show currently active model')
  .action(() => {
    const currentModelId = config.getCurrentModel();
    const customModels = config.getCustomModels();
    const model = getModelById(currentModelId, customModels);

    if (model) {
      console.log(chalk.bold('\nCurrent Model:\n'));
      console.log(`${chalk.green('●')} ${chalk.green.bold(model.name)} ${chalk.cyan(`[${model.id}]`)}`);
      console.log(`  ${chalk.gray(model.description)}`);
      console.log(`  ${chalk.gray(`Provider: ${model.provider}`)}`);

      if (model.endpoint) {
        console.log(`  ${chalk.gray(`Endpoint: ${model.endpoint}`)}`);
      }

      console.log();
    } else {
      console.log(chalk.red(`\nError: Model '${currentModelId}' not found\n`));
    }
  });

// Switch to a specific model
program
  .command('use <model-id>')
  .description('Switch to a specific model')
  .action((modelId: string) => {
    const customModels = config.getCustomModels();
    const model = getModelById(modelId, customModels);

    if (!model) {
      console.log(chalk.red(`\nError: Model '${modelId}' not found`));
      console.log(chalk.yellow('Run "model-switcher list" to see available models\n'));
      process.exit(1);
    }

    config.setCurrentModel(modelId);
    console.log(chalk.green(`\n✓ Switched to ${chalk.bold(model.name)}`));
    console.log(`  ${chalk.gray(model.description)}\n`);
  });

// Set API key for a model
program
  .command('set-key <model-id> <api-key>')
  .description('Set API key for a specific model')
  .action((modelId: string, apiKey: string) => {
    const customModels = config.getCustomModels();
    const model = getModelById(modelId, customModels);

    if (!model) {
      console.log(chalk.red(`\nError: Model '${modelId}' not found\n`));
      process.exit(1);
    }

    config.setApiKey(modelId, apiKey);
    console.log(chalk.green(`\n✓ API key set for ${chalk.bold(model.name)}`));
    console.log(chalk.gray('  Stored securely with restricted file permissions (600)'));
    console.log(chalk.yellow('  Note: Keys are stored in plaintext locally at ~/.claude-model-switcher/config.json\n'));
  });

// Add a custom model
program
  .command('add <id> <name> <provider>')
  .description('Add a custom model')
  .option('-e, --endpoint <url>', 'API endpoint URL')
  .option('-d, --description <text>', 'Model description')
  .action((id: string, name: string, provider: string, options: any) => {
    const customModels = config.getCustomModels();
    const existingModel = getModelById(id, customModels);

    if (existingModel) {
      console.log(chalk.red(`\nError: Model with id '${id}' already exists\n`));
      process.exit(1);
    }

    config.addCustomModel({
      id,
      name,
      provider,
      endpoint: options.endpoint,
      description: options.description || `Custom model: ${name}`,
    });

    console.log(chalk.green(`\n✓ Added custom model ${chalk.bold(name)}`));
    console.log(`  ${chalk.cyan(`[${id}]`)} ${chalk.gray(`(${provider})`)}\n`);
  });

// Show configuration
program
  .command('config')
  .description('Show current configuration')
  .option('--show-keys', 'Show full API keys (WARNING: insecure)')
  .action((options: any) => {
    const cfg = options.showKeys ? config.getConfig() : config.getSafeConfig();

    console.log(chalk.bold('\nConfiguration:\n'));
    console.log(JSON.stringify(cfg, null, 2));

    if (!options.showKeys && Object.keys(cfg.apiKeys).length > 0) {
      console.log(chalk.yellow('\nAPI keys are masked for security.'));
      console.log(chalk.gray('Use --show-keys to display full keys (not recommended)\n'));
    } else {
      console.log();
    }
  });

program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

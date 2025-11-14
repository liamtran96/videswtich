# Claude Model Switcher

A simple CLI tool to switch between Claude Code Pro and other AI models like GLM 4.6.

## Features

- Switch between different AI models with a single command
- Pre-configured support for Claude Code Pro and GLM 4.6
- Easy to add custom models
- Persistent configuration
- Simple, intuitive interface

## Installation

### For Users (After Publishing to npm)

```bash
# Install globally
npm install -g claude-model-switcher

# Start using it immediately
model-switcher list
model-switcher use glm-4.6
```

### For Development

```bash
# Clone the repository
git clone https://github.com/liamtran96/videswtich.git
cd videswtich

# Install dependencies
npm install

# Build the project
npm run build

# Link the CLI globally for local testing
npm link
```

## Quick Start

```bash
# List all available models
model-switcher list

# Switch to Claude Code Pro
model-switcher use claude-pro

# Switch to GLM 4.6
model-switcher use glm-4.6

# Check current model
model-switcher current
```

## Usage

### List Available Models

```bash
model-switcher list
```

Shows all available models with their details. The current model is marked with a green dot.

### Switch Models

```bash
model-switcher use <model-id>
```

Switch to a specific model by its ID:
- `claude-pro` - Claude Code Pro (Sonnet 4.5)
- `glm-4.6` - GLM 4.6

Example:
```bash
model-switcher use glm-4.6
```

### Check Current Model

```bash
model-switcher current
```

Shows the currently active model and its details.

### Set API Key

```bash
model-switcher set-key <model-id> <api-key>
```

Set the API key for a specific model:

```bash
model-switcher set-key claude-pro sk-ant-xxxxx
model-switcher set-key glm-4.6 your-glm-api-key
```

### Add Custom Model

```bash
model-switcher add <id> <name> <provider> [options]
```

Add a custom model configuration:

```bash
model-switcher add gpt-4 "GPT-4" "OpenAI" \
  --endpoint "https://api.openai.com/v1" \
  --description "GPT-4 by OpenAI"
```

Options:
- `-e, --endpoint <url>` - API endpoint URL
- `-d, --description <text>` - Model description

### View Configuration

```bash
model-switcher config
```

Shows the current configuration including all models and settings.

## Default Models

The CLI comes with two pre-configured models:

1. **Claude Code Pro** (`claude-pro`)
   - Provider: Anthropic
   - Model: Claude Sonnet 4.5
   - Best for coding tasks

2. **GLM 4.6** (`glm-4.6`)
   - Provider: Zhipu AI
   - Fast and efficient

## Configuration

Configuration is stored in `~/.claude-model-switcher/config.json`

The config includes:
- Current active model
- Custom models you've added
- API keys (stored locally)

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build
npm run build

# Run tests (if added)
npm test
```

## Example Workflow

```bash
# See what models are available
model-switcher list

# Switch to Claude Code Pro
model-switcher use claude-pro

# Add your API key
model-switcher set-key claude-pro sk-ant-xxxxx

# Check current configuration
model-switcher current

# Switch to GLM 4.6 for faster responses
model-switcher use glm-4.6
model-switcher set-key glm-4.6 your-glm-key

# Add a custom model
model-switcher add custom-model "My Custom Model" "CustomProvider" \
  --endpoint "https://api.example.com" \
  --description "My custom AI model"

# Use your custom model
model-switcher use custom-model
```

## License

MIT

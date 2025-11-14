# Quick Start Guide

## How to Use Right Now (Local)

### 1. Basic Commands

```bash
# List all available models
node dist/index.js list

# Switch to GLM 4.6
node dist/index.js use glm-4.6

# Switch back to Claude Code Pro
node dist/index.js use claude-pro

# Check current model
node dist/index.js current

# Set API keys
node dist/index.js set-key claude-pro sk-ant-your-key
node dist/index.js set-key glm-4.6 your-glm-key
```

### 2. Install Globally on Your Machine

```bash
# Link it globally so you can use "model-switcher" anywhere
npm link

# Now use it anywhere:
model-switcher list
model-switcher use glm-4.6
model-switcher current
```

### 3. Add Custom Models

```bash
model-switcher add gpt-4 "GPT-4" "OpenAI" \
  --endpoint "https://api.openai.com/v1" \
  --description "GPT-4 by OpenAI"

model-switcher list  # See your new model
model-switcher use gpt-4  # Use it
```

## Complete Example Workflow

```bash
# 1. See what's available
model-switcher list

# 2. Add your API keys
model-switcher set-key claude-pro sk-ant-xxxxx
model-switcher set-key glm-4.6 your-glm-api-key

# 3. Start with Claude Pro for complex coding
model-switcher use claude-pro
model-switcher current

# 4. Switch to GLM 4.6 for faster responses
model-switcher use glm-4.6
model-switcher current

# 5. View your configuration
model-switcher config
```

## What Each Command Does

| Command | Description | Example |
|---------|-------------|---------|
| `list` | Shows all available models | `model-switcher list` |
| `current` | Shows active model | `model-switcher current` |
| `use <id>` | Switch to a model | `model-switcher use glm-4.6` |
| `set-key <id> <key>` | Add API key | `model-switcher set-key claude-pro sk-xxx` |
| `add <id> <name> <provider>` | Add custom model | `model-switcher add gpt-4 "GPT-4" "OpenAI"` |
| `config` | View all settings | `model-switcher config` |

## Tips

- Configuration is saved in `~/.claude-model-switcher/config.json`
- API keys are stored locally on your machine
- You can add unlimited custom models
- The green dot (●) shows your current model
- Gray dots (○) show inactive models

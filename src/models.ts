export interface Model {
  id: string;
  name: string;
  provider: string;
  endpoint?: string;
  apiKey?: string;
  description: string;
}

export const DEFAULT_MODELS: Model[] = [
  {
    id: 'claude-pro',
    name: 'Claude Code Pro',
    provider: 'Anthropic',
    endpoint: 'https://api.anthropic.com/v1',
    description: 'Claude Sonnet 4.5 - Most capable model for coding',
  },
  {
    id: 'glm-4.6',
    name: 'GLM 4.6',
    provider: 'Zhipu AI',
    endpoint: 'https://open.bigmodel.cn/api/paas/v4',
    description: 'GLM 4.6 - Fast and efficient model',
  },
];

export function getModelById(id: string, customModels: Model[] = []): Model | undefined {
  return [...DEFAULT_MODELS, ...customModels].find((model) => model.id === id);
}

export function getAllModels(customModels: Model[] = []): Model[] {
  return [...DEFAULT_MODELS, ...customModels];
}

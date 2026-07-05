import { IconSearch as Search } from '@tabler/icons-react'

import { SearchMode } from '@/lib/types/search'

import { IconLogoOutline } from '@/components/ui/icons'

export interface SearchModeConfig {
  value: SearchMode
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

// Centralized search mode configuration
export const SEARCH_MODE_CONFIGS: SearchModeConfig[] = [
  {
    value: 'quick',
    label: '速学',
    description: '快速检索资料，生成简洁的学习版回答',
    icon: Search,
    color: 'text-amber-500'
  },
  {
    value: 'adaptive',
    label: '深研',
    description: '多轮检索和规划，适合课程、论文和项目调研',
    icon: IconLogoOutline,
    color: 'text-violet-500'
  }
]

// Helper function to get a specific mode config
export function getSearchModeConfig(
  mode: SearchMode
): SearchModeConfig | undefined {
  return SEARCH_MODE_CONFIGS.find(config => config.value === mode)
}

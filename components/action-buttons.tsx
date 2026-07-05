'use client'

import { useEffect, useRef, useState } from 'react'

import {
  IconBook2 as Book,
  IconBulb as Bulb,
  IconNews as News,
  IconRoute as Route,
  IconSearch as Search,
  IconWorldSearch as WorldSearch,
  type TablerIcon
} from '@tabler/icons-react'

import { captureClient } from '@/lib/analytics/posthog-client'
import { cn } from '@/lib/utils'

import { Button } from './ui/button'

// Constants for timing delays
const FOCUS_OUT_DELAY_MS = 100 // Delay to ensure focus has actually moved

interface ActionCategory {
  icon: TablerIcon
  label: string
  key: string
}

const actionCategories: ActionCategory[] = [
  {
    icon: Route,
    label: '学习路径',
    key: 'path'
  },
  {
    icon: Book,
    label: '公开资料',
    key: 'resources'
  },
  {
    icon: News,
    label: 'AI 动态',
    key: 'news'
  },
  {
    icon: WorldSearch,
    label: 'WebSearch',
    key: 'websearch'
  },
  {
    icon: Bulb,
    label: '项目灵感',
    key: 'project'
  }
]

// Onboarding examples are tuned to showcase grounded, GenUI-rich answers
// (images, comparison tables, structured depth) for concrete, self-contained
// tasks — the patterns that correlate with follow-up in real usage. Keep each
// example self-contained (no "my notes"/"this file" referencing absent context).
const promptSamples: Record<string, string[]> = {
  path: [
    '我想从零学习 AI Agent，请给我一条 14 天中英文学习路径',
    '我是数字媒体专业学生，应该怎样系统学习 AIGC 和多模态 AI？',
    '用大学生能看懂的方式解释 RAG、Agent、MCP 三者的区别',
    '帮我规划一条从 Prompt Engineering 到 AI 应用开发的学习路线'
  ],
  resources: [
    '整理 Stanford、MIT、Harvard 适合大学生入门 AI 的公开课程',
    '对比 OpenAI Cookbook、Anthropic Prompt Engineering 和 Hugging Face Course',
    '找适合学习 RAG 的英文官方资料，并给中文导读',
    '推荐 10 个学习 AI 应用开发的高质量中英文资料源'
  ],
  news: [
    '今天 AI 圈有哪些值得大学生关注的新动态？',
    '最近一周有哪些 AI 模型、产品或论文值得学习？',
    '把最新 AI 新闻转成 5 张适合课堂展示的学习卡片',
    '最近多模态 AI 有什么新进展？请用中文解释并保留英文关键词'
  ],
  websearch: [
    'Search the web for the latest DeepSeek updates and explain them in Chinese',
    'Find recent academic and official sources about AI agents in 2026',
    'Search GitHub for popular open-source RAG or AI search projects and compare them',
    'Find current tutorials for building multimodal AI apps with Next.js'
  ],
  project: [
    '基于 AI 搜索和 RAG，帮我生成一个可参赛的大学生项目方案',
    '给数字媒体专业设计 5 个 AI 应用课程作业选题',
    '把“AI 学习搜索平台”拆成 MVP 功能、技术栈和演示脚本',
    '根据最近 AI 动态，生成 3 个能部署到 Vercel 的项目创意'
  ]
}

interface ActionButtonsProps {
  onSelectPrompt: (prompt: string) => void
  onCategoryClick: (category: string) => void
  inputRef?: React.RefObject<HTMLTextAreaElement>
  className?: string
}

export function ActionButtons({
  onSelectPrompt,
  onCategoryClick,
  inputRef,
  className
}: ActionButtonsProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleCategoryClick = (category: ActionCategory) => {
    setActiveCategory(category.key)
    onCategoryClick(category.label)
    captureClient('example_category_opened', { category: category.key })
  }

  const handlePromptClick = (prompt: string) => {
    captureClient('example_prompt_clicked', {
      category: activeCategory,
      prompt
    })
    setActiveCategory(null)
    onSelectPrompt(prompt)
  }

  const resetToButtons = () => {
    setActiveCategory(null)
  }

  // Handle Escape key and clicks outside (including focus loss)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeCategory) {
        resetToButtons()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        if (activeCategory) {
          // Check if click is not on the input field
          if (!inputRef?.current?.contains(e.target as Node)) {
            resetToButtons()
          }
        }
      }
    }

    const handleFocusOut = () => {
      // Check if focus is moving outside both the container and input
      setTimeout(() => {
        const activeElement = document.activeElement
        if (
          activeCategory &&
          !containerRef.current?.contains(activeElement) &&
          activeElement !== inputRef?.current
        ) {
          resetToButtons()
        }
      }, FOCUS_OUT_DELAY_MS)
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('focusout', handleFocusOut)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('focusout', handleFocusOut)
    }
  }, [activeCategory, inputRef])

  // Max height for samples (4 items up to 2 lines each + padding); overflow scrolls
  const containerHeight = 'h-[232px]'

  return (
    <div
      ref={containerRef}
      className={cn('relative', containerHeight, className)}
    >
      <div className="relative h-full">
        {/* Action buttons */}
        <div
          className={cn(
            'absolute inset-0 flex items-start justify-center pt-2 transition-opacity duration-[180ms] ease-[var(--motion-ease-out)]',
            activeCategory ? 'opacity-0 pointer-events-none' : 'opacity-100'
          )}
        >
          <div className="flex flex-wrap justify-center gap-2 px-2">
            {actionCategories.map(category => {
              const Icon = category.icon
              return (
                <Button
                  key={category.key}
                  type="button"
                  variant="outline"
                  size="sm"
                  className={cn(
                    'flex items-center gap-2 whitespace-nowrap rounded-full',
                    'text-xs sm:text-sm px-3 sm:px-4'
                  )}
                  onClick={() => handleCategoryClick(category)}
                >
                  <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{category.label}</span>
                </Button>
              )
            })}
          </div>
        </div>

        {/* Prompt samples */}
        <div
          className={cn(
            'absolute inset-0 space-y-1 overflow-y-auto py-1 transition-opacity duration-[180ms] ease-[var(--motion-ease-out)]',
            !activeCategory ? 'opacity-0 pointer-events-none' : 'opacity-100'
          )}
        >
          {activeCategory &&
            promptSamples[activeCategory]?.map((prompt, index) => (
              <button
                key={index}
                type="button"
                className={cn(
                  'w-full rounded-md px-3 py-2 text-left text-sm',
                  'transition-colors duration-[140ms] ease-[var(--motion-ease-out)] hover:bg-muted',
                  'flex items-center gap-2 group'
                )}
                onClick={() => handlePromptClick(prompt)}
              >
                <Search className="h-3 w-3 text-muted-foreground flex-shrink-0 group-hover:text-foreground" />
                <span className="line-clamp-2">{prompt}</span>
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}

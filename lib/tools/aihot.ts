import { tool, UIToolInvocation } from 'ai'
import { z } from 'zod'

const AIHOT_BASE_URL = 'https://aihot.virxact.com'
const AIHOT_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 AI-Compass/0.1.0'

const aihotSchema = z.object({
  mode: z
    .enum(['selected', 'all', 'daily'])
    .default('selected')
    .describe(
      'selected for curated items, all for full feed, daily for AIHOT daily report'
    ),
  category: z
    .enum(['ai-models', 'ai-products', 'industry', 'paper', 'tip'])
    .optional()
    .describe('Optional AIHOT category filter'),
  q: z
    .string()
    .optional()
    .describe('Optional keyword search, such as OpenAI, RAG, Sora'),
  days: z
    .number()
    .min(1)
    .max(7)
    .default(1)
    .describe('Lookback window for items mode, from 1 to 7 days'),
  take: z
    .number()
    .min(1)
    .max(50)
    .default(20)
    .describe('Maximum number of items to return')
})

type AIHotInput = z.infer<typeof aihotSchema>

function getSince(days: number) {
  const date = new Date()
  date.setUTCDate(date.getUTCDate() - days)
  return date.toISOString()
}

async function fetchAIHot(input: AIHotInput) {
  const params = aihotSchema.parse(input)

  const url = new URL(
    params.mode === 'daily' ? '/api/public/daily' : '/api/public/items',
    AIHOT_BASE_URL
  )

  if (params.mode !== 'daily') {
    url.searchParams.set('mode', params.mode)
    url.searchParams.set('since', getSince(params.days))
    url.searchParams.set('take', String(params.take))
    if (params.category) url.searchParams.set('category', params.category)
    if (params.q) url.searchParams.set('q', params.q)
  }

  const response = await fetch(url, {
    headers: {
      'User-Agent': AIHOT_UA,
      Accept: 'application/json'
    },
    next: { revalidate: 300 }
  })

  if (!response.ok) {
    throw new Error(
      `AIHOT request failed: ${response.status} ${response.statusText}`
    )
  }

  return response.json()
}

export const aihotTool = tool({
  description:
    'Fetch real-time AI industry updates from AIHOT (aihot.virxact.com). Use this when users ask about today/recent AI news, AIHOT, AI models/products/papers/tips, or when AI Compass needs to turn current AI news into learning cards.',
  inputSchema: aihotSchema,
  async execute(input) {
    return fetchAIHot(input)
  }
})

export type AIHotToolInvocation = UIToolInvocation<typeof aihotTool>
export { fetchAIHot }

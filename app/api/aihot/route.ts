import { fetchAIHot } from '@/lib/tools/aihot'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const mode = url.searchParams.get('mode') ?? 'selected'
  const category = url.searchParams.get('category') ?? undefined
  const q = url.searchParams.get('q') ?? undefined
  const days = Number(url.searchParams.get('days') ?? '1')
  const take = Number(url.searchParams.get('take') ?? '20')

  const data = await fetchAIHot({
    mode: mode as 'selected' | 'all' | 'daily',
    category: category as
      | 'ai-models'
      | 'ai-products'
      | 'industry'
      | 'paper'
      | 'tip'
      | undefined,
    q,
    days,
    take
  })

  return Response.json(data)
}

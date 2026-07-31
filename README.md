<div align="center">

# AI Compass

**AI-powered bilingual learning search platform for college students**

Built on [Morphic](https://github.com/miurla/morphic) — customized with Chinese knowledge workflows and student-friendly search modes.

<a href="https://vercel.com/oss">
  <img alt="Vercel OSS Program" src="https://vercel.com/oss/program-badge.svg" />
</a>

<p align="center">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=nextdotjs" />
  <img alt="Bun" src="https://img.shields.io/badge/Bun-000000?style=flat-square&logo=bun" />
  <img alt="Base" src="https://img.shields.io/badge/Based%20on-Morphic-6366f1?style=flat-square" />
  <img alt="License" src="https://img.shields.io/badge/license-Apache%202.0-blue?style=flat-square" />
</p>

<p align="center">
  <b>English</b> · <a href="./README_CN.md">中文</a>
</p>

<p align="center">
  <a href="https://ai-compass-deploy-three.vercel.app"><img src="https://img.shields.io/badge/Live-Demo-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" /></a>
  <a href="https://github.com/miurla/morphic"><img src="https://img.shields.io/badge/Upstream-Morphic-6366f1?style=flat-square&logo=github&logoColor=white" alt="Morphic" /></a>
</p>

</div>

---

## Why AI Compass?

College students search differently. You're not just looking for facts — you're trying to:

| Student need | How AI Compass helps |
|---|---|
| **Understand a new topic fast** | 速学 mode — quick, cited summaries with source evidence |
| **Go deep for a paper or project** | 深研 mode — recursive research, multi-source synthesis |
| **Find the best learning resources** | AI-powered search across courses, docs, papers, GitHub |
| **Plan a project or thesis** | Project planning workflow with structured output |
| **Read a paper in your language** | Bilingual (Chinese/English) search and answer generation |

Traditional search gives you 10 blue links. AI Compass gives you a **cited answer with inline evidence** — like having a research assistant who actually reads the sources.

---

## What this is

AI Compass is a **fork of Morphic**, customized for:

- **Bilingual support** — Chinese + English queries and answers
- **Student workflows** — 速学 (quick learn) and 深研 (deep research) modes
- **Chinese knowledge sources** — optimized for Chinese-language learning content
- **Learning-oriented AI agents** — course search, doc Q&A, GitHub project analysis

> Forked from [Morphic](https://github.com/miurla/morphic) (9K+ stars, Apache 2.0) and customized with Chinese learning workflows. Morphic provides the battle-tested AI search engine core; AI Compass adds the student-facing layer.

---

## Features

- **Generative UI** — answers render as rich inline components (images, grids, charts) streamed in real-time, not just text
- **Search modes** — 速学 for quick understanding, 深研 for deep multi-source research
- **Multi-model support** — OpenAI, Anthropic, Google, Ollama, Vercel AI Gateway, OpenAI-compatible providers
- **Multi-provider search** — Tavily, SearXNG, Brave, Exa
- **AI learning workflows** — course search, document Q&A, AI news briefings, GitHub project analysis, college project planning
- **Chat history** — stored in PostgreSQL, pick up where you left off
- **Share results** — unique URLs for every search
- **File upload** — upload PDFs, docs and ask questions
- **Auth + Guest mode** — Supabase Auth for accounts, guest mode for anonymous use
- **Docker** — one-command deployment with PostgreSQL, Redis, SearXNG included
- **Vercel ready** — deploy in one click

---

## Quick start

### Docker (recommended)

```bash
git clone https://github.com/Techdoll00/aicompass.git
cd aicompass
cp .env.local.example .env.local
# Edit .env.local: set at least one AI provider key
docker compose up -d
```

Visit `http://localhost:3000`. Docker Compose starts PostgreSQL, Redis, SearXNG, and AI Compass together.

### Local dev

```bash
git clone https://github.com/Techdoll00/aicompass.git
cd aicompass
bun install
cp .env.local.example .env.local
# Edit: set OPENAI_API_KEY and TAVILY_API_KEY
bun dev
```

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, RSC, Turbopack) |
| UI | React 19 + Tailwind CSS + shadcn/ui |
| AI | Vercel AI SDK 5.0 (streaming, GenerativeUI) |
| Database | PostgreSQL + Drizzle ORM |
| Cache | Redis (Upstash or local) |
| Search | Tavily / SearXNG / Brave / Exa |
| Auth | Supabase Auth |
| Runtime | Bun |
| Dev tools | ESLint + Prettier + Vitest |

---

## Architecture

```
/app
├── /api/          # Chat, search, auth API routes
├── /auth/          # Login, signup pages
├── /search/       # Search result display
└── /share/        # Sharing pages

/lib
├── /agents/       # AI research and question agents
├── /config/       # Model configuration
├── /streaming/    # AI response stream handling
├── /tools/        # Search and retrieval tools
├── /db/           # Database schema and migrations
└── /auth/         # Authentication logic

/components
├── /artifact/     # Search result & AI response components
├── /sidebar/      # Chat history navigation
└── /ui/           # shadcn/ui base components
```

---

## Comparison

| Feature | AI Compass | ChatGPT Search | Perplexity | Google |
|---------|------------|---------------|------------|--------|
| Generative UI | Rich inline components | Plain text | Rich cards | Links only |
| Search modes | 速学 + 深研 | One mode | One mode | N/A |
| Multi-search provider | Tavily + SearXNG + Brave + Exa | Bing | Proprietary | Proprietary |
| Self-hosted | Docker / Vercel | No | No | No |
| Open source | Apache 2.0 | No | No | No |
| Bilingual (CN/EN) | Built-in | Partial | Partial | Partial |
| File upload + Q&A | Yes | Yes | Yes | No |
| Student workflows | Built-in | No | No | No |
| Free | Self-host = free | Free tier | Free tier | Free |

---

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FTechdoll00%2Faicompass&env=OPENAI_API_KEY,TAVILY_API_KEY)

Or run with Docker on any VPS — PostgreSQL, Redis, and SearXNG are all included in the Compose file.

---

## Who this is for

- **College students** — research papers, learn new topics, plan projects
- **Self-learners** — go from "I know nothing" to "I can explain this" in one session
- **Developers** — fork and customize for your own learning/search use case
- **Educators** — deploy for students as a campus learning tool

---

## Credits

Built on **[Morphic](https://github.com/miurla/morphic)** by [miurla](https://github.com/miurla) — a brilliant open-source AI-powered search engine with Generative UI (Apache 2.0).

AI Compass adds: bilingual search modes (速学/深研), student-focused learning workflows, Chinese knowledge source optimization, and college project planning tools.

---

## License

Apache 2.0 — same as Morphic. See [LICENSE](./LICENSE).

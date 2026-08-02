<div align="center">

# AI Compass

**AI 驱动的双语学习搜索平台 · 为大学生的每一次"搞不懂"而生**

基于 [Morphic](https://github.com/miurla/morphic) 构建 — 加入速学、深研两种模式，为中国大学生的学习场景定制。

<p align="center">
  <a href="https://ai-compass-deploy-git-main-lnhs-projects.vercel.app"><img src="https://img.shields.io/badge/在线体验-Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" /></a>
  <a href="https://github.com/miurla/morphic"><img src="https://img.shields.io/badge/上游-Morphic-6366f1?style=flat-square&logo=github&logoColor=white" alt="Morphic" /></a>
</p>

</div>

<p align="center">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=nextdotjs" />
  <img alt="License" src="https://img.shields.io/badge/license-Apache%202.0-blue?style=flat-square" />
</p>

<p align="center">
  <a href="./README.md">English</a> · <b>中文</b>
</p>

---

## 为什么要做这个？

大学生查资料的方式太古老了：

| 你现在怎么做                          | 问题在哪                       |
| ------------------------------------- | ------------------------------ |
| 百度/Google → 点十个链接 → 自己拼答案 | 费时，信源质量参差不齐         |
| 问 ChatGPT                            | 回答不错，但没法验证来源对不对 |
| 翻论文/教材                           | 慢，且很多资料不是中文的       |
| 想做项目/写论文                       | 不知道从哪开始，不知道谁靠谱   |

**AI Compass 的思路很简单：搜一次，给你一个带着出处的答案。**

不是丢给你十个蓝链接自己看，而是把多个信源读完，生成一个**有引用、可追溯**的回答。

---

## 这是什么

AI Compass 是 [Morphic](https://github.com/miurla/morphic) 的一个中文定制分支。原版 Morphic 是一个开源的 AI 搜索引擎（9K+ stars），核心能力已经打磨得很成熟。AI Compass 在其基础上加了：

- **中英双语支持** — 中文问题也能搜、也能答
- **两种搜索模式**：
  - 速学：快速搞懂一个新概念，几分钟得到一个带来源的总结
  - 深研：多轮迭代搜索，把一个问题挖深，适合写论文、做项目
- **学习工作流** — 课程搜索、文档问答、AI 资讯简报、GitHub 项目分析、毕设规划
- **中文知识源优化** — 对国内学习场景做了适配

> 一句话：**把 AI 搜索变成一个真正能帮你学习的东西，而不只是一个聊天框。**

---

## 功能一览

- **生成式 UI** — 答案不是纯文本，而是实时流式渲染成卡片、图片网格、表格
- **速学 + 深研** — 速学=快速理解，深研=多源深挖
- **多模型** — OpenAI / Anthropic / Google / Ollama / Vercel AI Gateway 都支持
- **多搜索引擎** — Tavily / SearXNG / Brave / Exa 任选
- **学习工作流** — 课程检索、文档问答、AI 日报、GitHub 项目分析、毕设规划
- **对话历史** — 存 PostgreSQL，下次接着聊
- **分享链接** — 每次搜索结果都能生成唯一 URL
- **文件上传** — 上传 PDF 直接提问
- **访客模式** — 不用注册就能用
- **Docker 一键部署** — PostgreSQL + Redis + SearXNG 全包
- **Vercel 部署** — 点一下就行

---

## 30 秒上手

### Docker（推荐）

```bash
git clone https://github.com/Techdoll00/aicompass.git
cd aicompass
cp .env.local.example .env.local
# 编辑 .env.local：至少填一个 AI 模型的 key
docker compose up -d
```

打开 `http://localhost:3000`，选模型，开始搜。

### 本地开发

```bash
git clone https://github.com/Techdoll00/aicompass.git
cd aicompass
bun install
cp .env.local.example .env.local
# 编辑：填 OPENAI_API_KEY 和 TAVILY_API_KEY
bun dev
```

---

## 速学 vs 深研

| 模式     | 适合场景               | 怎么做                     | 示例                                  |
| -------- | ---------------------- | -------------------------- | ------------------------------------- |
| **速学** | 上课前预习、面试前突击 | 一次搜索，生成总结+来源    | "什么是 Transformer？"                |
| **深研** | 写论文、做项目调研     | 多轮搜索，交叉验证多个来源 | "对比 BERT 和 GPT 在文本分类上的效果" |

---

## 解决什么真实场景

### 场景 1：明天要交课程论文，题目完全不懂

> 传统做法：百度搜 → 翻前三个链接 → 不知道哪个靠谱 → 打开知乎抄 → 查重过不了

AI Compass：

1. 输入论文题目
2. 选"深研"模式
3. 得到：核心概念解释 + 多角度观点 + 参考文献链接 + 可以继续追问

### 场景 2：想学 Django 但不知道从哪开始

> 传统做法：B站搜教程 → 推荐的前三都是营销号 → 学一半发现过时了

AI Compass：

1. 搜索"Django 入门学习路径 2026"
2. 选"速学"模式
3. 得到：知识地图 + 推荐资源 + 避坑指南 + 项目实践建议

### 场景 3：毕设开题找不到合适的参考文献

> 传统做法：知网翻半天 → 要么太老要么不相关 → 导师说"再找找"

AI Compass：

1. 输入研究方向
2. 深研模式自动跨源检索
3. 得到：核心论文列表 + 各论文要点 + 研究方向空白点分析

---

## 对比

| 功能         | AI Compass      | ChatGPT 搜索 | 百度   | 知网     |
| ------------ | --------------- | ------------ | ------ | -------- |
| 生成式 UI    | 富卡片+图片网格 | 纯文字       | 纯链接 | 纯列表   |
| 双模式       | 速学 + 深研     | 单一模式     | N/A    | N/A      |
| 多搜索引擎   | 4 种可选        | 仅 Bing      | 自有   | 自有     |
| 自部署       | Docker / Vercel | 不可以       | 不可以 | 不可以   |
| 开源         | Apache 2.0      | 不开源       | 不开源 | 不开源   |
| 中英双语     | 内置            | 部分支持     | 仅中文 | 仅中文   |
| 文件上传问答 | 支持            | 支持         | 不支持 | 不支持   |
| 免费         | 自部署=免费     | 有免费额度   | 免费   | 学校付费 |

---

## 技术栈

| 层级   | 技术                                    |
| ------ | --------------------------------------- |
| 框架   | Next.js 16 (App Router、RSC、Turbopack) |
| UI     | React 19 + Tailwind CSS + shadcn/ui     |
| AI     | Vercel AI SDK 5.0（流式 + 生成式 UI）   |
| 数据库 | PostgreSQL + Drizzle ORM                |
| 缓存   | Redis（Upstash 或本地）                 |
| 搜索   | Tavily / SearXNG / Brave / Exa          |
| 认证   | Supabase Auth                           |
| 运行时 | Bun                                     |

---

## 适合谁用？

- **大学生** — 写论文、做项目、学新课、准备面试
- **自学者** — 从"什么都不懂"到"能讲给别人听"，一次搜索搞定
- **开发者** — fork 之后改自己的学习/搜索场景
- **老师** — 部署给学生做校内学习工具

---

## 来试试

在线体验：[ai-compass-deploy-git-main-lnhs-projects.vercel.app](https://ai-compass-deploy-git-main-lnhs-projects.vercel.app)

有问题？[开 issue](https://github.com/Techdoll00/aicompass/issues) 直接聊。

---

## 致谢

基于 **[Morphic](https://github.com/miurla/morphic)** 构建（Apache 2.0），由 [miurla](https://github.com/miurla) 开发——一个优秀的开源 AI 搜索引擎，带生成式 UI。

AI Compass 增量贡献：双语搜索模式（速学/深研）、学生工作流、中文知识源优化、毕设规划工具。

---

## License

Apache 2.0 — 与 Morphic 一致。详见 [LICENSE](./LICENSE)。

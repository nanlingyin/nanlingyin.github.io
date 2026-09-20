import { marked } from 'marked'
import tutorial from './content/integration-tutorial.md?raw'
import './docs.css'

marked.use({ gfm: true, breaks: false })

const app = document.querySelector('#docs-app')

app.innerHTML = `
  <div class="reading-progress" aria-hidden="true"><span></span></div>
  <header class="docs-header">
    <div class="docs-header-inner">
      <a class="docs-brand" href="/" aria-label="返回 SoulLink 首页">
        <img src="/assets/soul-mark.png" alt="" />
        <span>SoulLink <small>Emotion SDK</small></span>
      </a>
      <span class="header-divider"></span>
      <a class="docs-title-link" href="/docs.html">开发文档</a>
      <nav class="docs-actions" aria-label="文档操作">
        <a href="/">返回官网</a>
        <a class="github-link" href="https://github.com/nanlingyin/soullink-emotion-sdk" target="_blank" rel="noreferrer">GitHub ↗</a>
        <button class="toc-toggle" type="button" aria-expanded="false" aria-controls="docs-sidebar">目录</button>
      </nav>
    </div>
  </header>

  <div class="docs-shell">
    <aside class="docs-sidebar" id="docs-sidebar">
      <div class="sidebar-inner">
        <label class="docs-search">
          <span>搜索目录</span>
          <input type="search" placeholder="搜索章节" autocomplete="off" />
        </label>
        <div class="sidebar-group-label">接入教程</div>
        <nav class="toc" aria-label="文章目录"></nav>
        <div class="sidebar-footer">
          <span>SDK v0.1.0-beta.1</span>
          <span>Apache-2.0</span>
        </div>
      </div>
    </aside>

    <button class="toc-backdrop" type="button" aria-label="关闭目录"></button>

    <main class="docs-main">
      <div class="docs-breadcrumb"><a href="/">SoulLink</a><span>/</span><span>接入教程</span></div>
      <header class="article-intro">
        <div class="article-kicker">INTEGRATION GUIDE</div>
        <h1>Soullink Emotion SDK 接入教程</h1>
        <p>从模型 Profile 到 Live2D 渲染，完整接入对话、语音与 JEV 动作决策模型。</p>
        <div class="article-meta"><span>更新于 2026-09-21</span><span>约 20 分钟阅读</span><span>TypeScript · ESM</span></div>
      </header>
      <article class="markdown-body"></article>
      <footer class="docs-footer">
        <p>发现文档问题或实现差异？</p>
        <a href="https://github.com/nanlingyin/soullink-emotion-sdk/issues" target="_blank" rel="noreferrer">在 GitHub 提交反馈 ↗</a>
      </footer>
    </main>
  </div>
  <button class="back-to-top" type="button" aria-label="返回顶部" title="返回顶部">↑</button>
`

const article = document.querySelector('.markdown-body')
article.innerHTML = marked.parse(tutorial)

// The page intro owns the document title, so the Markdown title is not repeated.
article.querySelector('h1')?.remove()

const slugCounts = new Map()
const slugify = (text) => {
  const base = text.toLowerCase().trim()
    .replace(/[`'"“”‘’]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-|-$/g, '') || 'section'
  const count = slugCounts.get(base) || 0
  slugCounts.set(base, count + 1)
  return count ? `${base}-${count + 1}` : base
}

const headings = [...article.querySelectorAll('h2, h3')]
const toc = document.querySelector('.toc')
headings.forEach((heading) => {
  heading.id = slugify(heading.textContent)
  const anchor = document.createElement('a')
  anchor.href = `#${heading.id}`
  anchor.textContent = heading.textContent
  anchor.className = heading.tagName === 'H3' ? 'toc-subitem' : 'toc-item'
  toc.append(anchor)
})

article.querySelectorAll('a').forEach((link) => {
  const href = link.getAttribute('href') || ''
  if (/^https?:\/\//.test(href)) {
    link.target = '_blank'
    link.rel = 'noreferrer'
  }
})

article.querySelectorAll('pre').forEach((pre) => {
  const code = pre.querySelector('code')
  const languageClass = [...(code?.classList || [])].find((name) => name.startsWith('language-'))
  const language = languageClass?.replace('language-', '') || 'text'
  const shell = document.createElement('div')
  shell.className = 'code-block'
  const toolbar = document.createElement('div')
  toolbar.className = 'code-toolbar'
  toolbar.innerHTML = `<span>${language}</span><button type="button">复制</button>`
  pre.before(shell)
  shell.append(toolbar, pre)
  toolbar.querySelector('button').addEventListener('click', async (event) => {
    try {
      await navigator.clipboard.writeText(code?.textContent || '')
      event.currentTarget.textContent = '已复制'
    } catch {
      event.currentTarget.textContent = '复制失败'
    }
    setTimeout(() => { event.currentTarget.textContent = '复制' }, 1400)
  })
})

const tocLinks = [...toc.querySelectorAll('a')]
const setActiveHeading = (id) => {
  tocLinks.forEach((link) => link.classList.toggle('active', link.hash === `#${id}`))
}

const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting)
    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
  if (visible[0]) setActiveHeading(visible[0].target.id)
}, { rootMargin: '-78px 0px -72% 0px', threshold: 0 })
headings.forEach((heading) => observer.observe(heading))

const body = document.body
const tocToggle = document.querySelector('.toc-toggle')
const closeToc = () => {
  body.classList.remove('toc-open')
  tocToggle.setAttribute('aria-expanded', 'false')
}
tocToggle.addEventListener('click', () => {
  const open = body.classList.toggle('toc-open')
  tocToggle.setAttribute('aria-expanded', String(open))
})
document.querySelector('.toc-backdrop').addEventListener('click', closeToc)
tocLinks.forEach((link) => link.addEventListener('click', closeToc))

document.querySelector('.docs-search input').addEventListener('input', (event) => {
  const query = event.currentTarget.value.trim().toLocaleLowerCase('zh-CN')
  tocLinks.forEach((link) => {
    link.hidden = Boolean(query) && !link.textContent.toLocaleLowerCase('zh-CN').includes(query)
  })
})

const progress = document.querySelector('.reading-progress span')
const backToTop = document.querySelector('.back-to-top')
const updateScrollState = () => {
  const scrollable = document.documentElement.scrollHeight - innerHeight
  progress.style.width = `${scrollable > 0 ? Math.min(100, scrollY / scrollable * 100) : 0}%`
  backToTop.classList.toggle('visible', scrollY > 700)
}
addEventListener('scroll', updateScrollState, { passive: true })
addEventListener('resize', updateScrollState)
backToTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }))
updateScrollState()

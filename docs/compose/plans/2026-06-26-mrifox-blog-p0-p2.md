# Mr_iFox 个人博客网站 — P0-P2 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现 Mr_iFox 个人博客网站的 P0-P2 阶段功能，包括基础页面、全部板块静态展示和深浅色主题切换。

**Architecture:** 采用原生 HTML+CSS+JS 技术栈，无框架依赖。数据存储在 projects.json 文件中，通过 fetch API 加载。主题切换使用 CSS 自定义属性和 localStorage 保存用户偏好。

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript, marked.js (CDN)

## Global Constraints

- 项目目录: D:\MiMoProjects\mrifox.github.io
- 无框架依赖，纯原生实现
- 数据文件: data/projects.json
- 字体: Noto Sans SC (中文), Inter (英文/数字)
- 最大内容宽度: 1200px
- 响应式断点: >1200px, 768px-1200px, <768px

---

## 文件结构

```
mrifox.github.io/
├── index.html          # 主页面
├── css/
│   └── style.css       # 主样式（包含主题色定义）
├── js/
│   ├── main.js         # 主交互逻辑（数据加载、板块渲染）
│   └── theme.js        # 深浅色切换
├── data/
│   └── projects.json   # 项目数据
├── assets/
│   ├── thumbnails/     # 项目缩略图
│   └── icons/          # 工具图标
└── README.md
```

---

### Task 1: 创建项目基础结构

**Covers:** [S3, S5]

**Files:**
- Create: `D:\MiMoProjects\mrifox.github.io\index.html`
- Create: `D:\MiMoProjects\mrifox.github.io\css\style.css`
- Create: `D:\MiMoProjects\mrifox.github.io\js\main.js`
- Create: `D:\MiMoProjects\mrifox.github.io\js\theme.js`
- Create: `D:\MiMoProjects\mrifox.github.io\data\projects.json`
- Create: `D:\MiMoProjects\mrifox.github.io\assets\thumbnails\.gitkeep`
- Create: `D:\MiMoProjects\mrifox.github.io\assets\icons\.gitkeep`
- Create: `D:\MiMoProjects\mrifox.github.io\README.md`

**Interfaces:**
- Consumes: 无
- Produces: 项目基础结构，可供后续任务使用

- [ ] **Step 1: 创建项目目录结构**

```powershell
mkdir -p D:\MiMoProjects\mrifox.github.io\css
mkdir -p D:\MiMoProjects\mrifox.github.io\js
mkdir -p D:\MiMoProjects\mrifox.github.io\data
mkdir -p D:\MiMoProjects\mrifox.github.io\assets\thumbnails
mkdir -p D:\MiMoProjects\mrifox.github.io\assets\icons
```

- [ ] **Step 2: 创建 projects.json 数据文件**

```json
{
  "profile": {
    "name": "Mr_iFox",
    "tagline": "用 AI 把想法变成现实",
    "about": "我是 Fox，一个正在用 AI 把想法变成现实的探索者。\n这里记录我从零开始，一步步用 AI 工具做出真实产品的过程。\n每次项目都是一次学习，不完美，但真实。"
  },
  "tools": [
    { "name": "ChatGPT", "icon": "chatgpt" },
    { "name": "Claude", "icon": "claude" },
    { "name": "Cursor", "icon": "cursor" },
    { "name": "GitHub", "icon": "github" },
    { "name": "VS Code", "icon": "vscode" }
  ],
  "projects": [
    {
      "id": 1,
      "title": "基金投资分析网页",
      "tagline": "一句话描述，待站长填写",
      "category": "Web App",
      "tools": ["ChatGPT"],
      "github": "https://github.com/Mr_iFox/项目仓库名",
      "date": "2025-01",
      "thumbnail": "",
      "journeyNote": "一句话学习感悟，待站长填写"
    },
    {
      "id": 2,
      "title": "基金回本测算工具",
      "tagline": "待填写",
      "category": "工具",
      "tools": ["ChatGPT"],
      "github": "https://github.com/Mr_iFox/项目仓库名",
      "date": "2025-02",
      "thumbnail": "",
      "journeyNote": "待填写"
    },
    {
      "id": 3,
      "title": "羊了个羊小游戏（模仿）",
      "tagline": "待填写",
      "category": "游戏",
      "tools": ["ChatGPT"],
      "github": "https://github.com/Mr_iFox/项目仓库名",
      "date": "2025-03",
      "thumbnail": "",
      "journeyNote": "待填写"
    },
    {
      "id": 4,
      "title": "小米 mini code 教程网页",
      "tagline": "待填写",
      "category": "教程",
      "tools": ["ChatGPT"],
      "github": "https://github.com/Mr_iFox/项目仓库名",
      "date": "2025-04",
      "thumbnail": "",
      "journeyNote": "待填写"
    },
    {
      "id": 5,
      "title": "Git 和 GitHub 科普教程网页",
      "tagline": "待填写",
      "category": "教程",
      "tools": ["ChatGPT"],
      "github": "https://github.com/Mr_iFox/项目仓库名",
      "date": "2025-05",
      "thumbnail": "",
      "journeyNote": "待填写"
    }
  ]
}
```

- [ ] **Step 3: 创建占位文件**

```bash
touch D:\MiMoProjects\mrifox.github.io\assets\thumbnails\.gitkeep
touch D:\MiMoProjects\mrifox.github.io\assets\icons\.gitkeep
```

- [ ] **Step 4: 创建 README.md**

```markdown
# Mr_iFox 个人博客网站

记录一个 AI 小白从零开始，用 AI 工具一步步做出真实产品的学习历程。

## 技术栈

- HTML5
- CSS3 (自定义属性、backdrop-filter、scroll-snap)
- Vanilla JavaScript
- marked.js (Markdown 渲染)

## 部署

GitHub Pages - 推送到 main 分支自动上线

## 本地开发

直接在浏览器中打开 `index.html` 即可预览。
```

- [ ] **Step 5: Commit**

```bash
git init
git add .
git commit -m "feat: 创建项目基础结构"
```

---

### Task 2: 实现 CSS 基础样式和主题色

**Covers:** [S6, S8]

**Files:**
- Create: `D:\MiMoProjects\mrifox.github.io\css\style.css`

**Interfaces:**
- Consumes: 无
- Produces: CSS 变量定义、基础样式、响应式断点

- [ ] **Step 1: 创建 style.css 基础样式**

```css
/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&family=Inter:wght@300;400;500;600;700&display=swap');

/* CSS Reset */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 浅色主题（默认） */
:root {
  --bg: #f5f5f7;
  --bg-elevated: #ffffff;
  --surface: #ffffff;
  --surface-hover: #fafafa;
  --text-primary: #1d1d1f;
  --text-secondary: #6e6e73;
  --text-muted: #86868b;
  --accent: #0071e3;
  --accent-hover: #0077ed;
  --border: rgba(0, 0, 0, 0.08);
  --glass: rgba(255, 255, 255, 0.72);
  --glass-border: rgba(255, 255, 255, 0.5);
  --shadow: rgba(0, 0, 0, 0.08);
  --tag-bg: rgba(0, 113, 227, 0.08);
  --tag-text: #0071e3;
}

/* 深色主题 */
:root[data-theme="dark"] {
  --bg: #000000;
  --bg-elevated: #1c1c1e;
  --surface: #1c1c1e;
  --surface-hover: #2c2c2e;
  --text-primary: #f5f5f7;
  --text-secondary: #a1a1a6;
  --text-muted: #6e6e73;
  --accent: #0a84ff;
  --accent-hover: #409cff;
  --border: rgba(255, 255, 255, 0.1);
  --glass: rgba(28, 28, 30, 0.72);
  --glass-border: rgba(255, 255, 255, 0.08);
  --shadow: rgba(0, 0, 0, 0.3);
  --tag-bg: rgba(10, 132, 255, 0.12);
  --tag-text: #0a84ff;
}

/* 基础样式 */
body {
  font-family: 'Inter', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: var(--bg);
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 容器 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* 链接 */
a {
  color: var(--accent);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--accent-hover);
}

/* 卡片基础 */
.card {
  background: var(--surface);
  border-radius: 16px;
  border: 1px solid var(--border);
  box-shadow: 0 4px 20px var(--shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px var(--shadow);
}

/* 标签 */
.tag {
  display: inline-block;
  padding: 4px 12px;
  background: var(--tag-bg);
  color: var(--tag-text);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

/* 按钮 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background: var(--accent);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.btn:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
}

/* 响应式断点 */
@media (max-width: 1200px) {
  .container {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add css/style.css
git commit -m "feat: 添加 CSS 基础样式和主题色定义"
```

---

### Task 3: 实现 HTML 基础结构

**Covers:** [S1, S4]

**Files:**
- Create: `D:\MiMoProjects\mrifox.github.io\index.html`

**Interfaces:**
- Consumes: Task 2 的 CSS 样式
- Produces: HTML 页面结构，可供 JavaScript 渲染

- [ ] **Step 1: 创建 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Mr_iFox 个人博客 - 用 AI 把想法变成现实">
  <title>Mr_iFox - 用 AI 把想法变成现实</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <!-- 导航栏 -->
  <nav class="navbar" id="navbar">
    <div class="container nav-container">
      <a href="#hero" class="nav-logo">Mr_iFox</a>
      <div class="nav-links">
        <a href="#about">About</a>
        <a href="#journey">Journey</a>
        <a href="#works">Works</a>
        <a href="#tools">Tools</a>
      </div>
      <button class="theme-toggle" id="theme-toggle" aria-label="切换主题">
        <span class="sun-icon">☀️</span>
        <span class="moon-icon">🌙</span>
      </button>
      <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="菜单">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>

  <!-- Hero 区 -->
  <section class="hero" id="hero">
    <div class="container">
      <h1 class="hero-title" id="hero-title">Mr_iFox</h1>
      <p class="hero-tagline" id="hero-tagline">用 AI 把想法变成现实</p>
      <div class="scroll-arrow">
        <span>↓</span>
      </div>
    </div>
  </section>

  <!-- About 区 -->
  <section class="about" id="about">
    <div class="container">
      <div class="about-card">
        <p id="about-text"></p>
      </div>
    </div>
  </section>

  <!-- Journey 时间线 -->
  <section class="journey" id="journey">
    <div class="container">
      <h2 class="section-title">学习历程</h2>
      <div class="timeline" id="timeline"></div>
    </div>
  </section>

  <!-- Works 作品展示 -->
  <section class="works" id="works">
    <div class="container">
      <h2 class="section-title">作品展示</h2>
      <div class="works-grid" id="works-grid"></div>
    </div>
  </section>

  <!-- Tools 区 -->
  <section class="tools" id="tools">
    <div class="container">
      <h2 class="section-title">使用的工具</h2>
      <div class="tools-grid" id="tools-grid"></div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <p>Built with AI by Mr_iFox · 2025</p>
    </div>
  </footer>

  <script src="js/theme.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: 添加 HTML 页面结构"
```

---

### Task 4: 实现 JavaScript 数据加载和板块渲染

**Covers:** [S4, S5, S9]

**Files:**
- Create: `D:\MiMoProjects\mrifox.github.io\js\main.js`

**Interfaces:**
- Consumes: data/projects.json 数据结构
- Produces: 渲染后的页面内容

- [ ] **Step 1: 创建 main.js**

```javascript
// 数据加载和渲染逻辑
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('data/projects.json');
    const data = await response.json();
    
    renderProfile(data.profile);
    renderTimeline(data.projects);
    renderWorks(data.projects);
    renderTools(data.tools);
  } catch (error) {
    console.error('加载数据失败:', error);
  }
});

// 渲染个人资料
function renderProfile(profile) {
  const heroTitle = document.getElementById('hero-title');
  const heroTagline = document.getElementById('hero-tagline');
  const aboutText = document.getElementById('about-text');
  
  if (heroTitle) heroTitle.textContent = profile.name;
  if (heroTagline) heroTagline.textContent = profile.tagline;
  if (aboutText) aboutText.textContent = profile.about;
}

// 渲染时间线
function renderTimeline(projects) {
  const timeline = document.getElementById('timeline');
  if (!timeline) return;
  
  // 按时间排序
  const sortedProjects = [...projects].sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  );
  
  timeline.innerHTML = sortedProjects.map((project, index) => `
    <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'}">
      <div class="timeline-content">
        <div class="timeline-date">${project.date}</div>
        <h3 class="timeline-title">${project.title}</h3>
        <p class="timeline-note">${project.journeyNote}</p>
      </div>
    </div>
  `).join('');
}

// 渲染作品展示
function renderWorks(projects) {
  const worksGrid = document.getElementById('works-grid');
  if (!worksGrid) return;
  
  worksGrid.innerHTML = projects.map(project => `
    <div class="work-card" data-id="${project.id}">
      <div class="work-thumbnail">
        ${project.thumbnail 
          ? `<img src="${project.thumbnail}" alt="${project.title}" loading="lazy">`
          : `<div class="placeholder"></div>`
        }
      </div>
      <div class="work-info">
        <h3 class="work-title">${project.title}</h3>
        <p class="work-tagline">${project.tagline}</p>
        <div class="work-tags">
          <span class="tag">${project.category}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// 渲染工具列表
function renderTools(tools) {
  const toolsGrid = document.getElementById('tools-grid');
  if (!toolsGrid) return;
  
  toolsGrid.innerHTML = tools.map(tool => `
    <div class="tool-item">
      <div class="tool-icon">
        <img src="assets/icons/${tool.icon}.svg" alt="${tool.name}" loading="lazy">
      </div>
      <span class="tool-name">${tool.name}</span>
    </div>
  `).join('');
}

// 移动端菜单切换
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// 滚动时导航栏隐藏/显示
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    navbar.classList.add('hidden');
  } else {
    navbar.classList.remove('hidden');
  }
  
  lastScrollTop = scrollTop;
});
```

- [ ] **Step 2: Commit**

```bash
git add js/main.js
git commit -m "feat: 添加数据加载和板块渲染逻辑"
```

---

### Task 5: 实现深浅色主题切换

**Covers:** [S4, P2]

**Files:**
- Create: `D:\MiMoProjects\mrifox.github.io\js\theme.js`

**Interfaces:**
- Consumes: CSS 变量定义
- Produces: 主题切换功能，localStorage 保存状态

- [ ] **Step 1: 创建 theme.js**

```javascript
// 深浅色主题切换
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // 从 localStorage 读取主题偏好
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  
  // 切换主题
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
});
```

- [ ] **Step 2: Commit**

```bash
git add js/theme.js
git commit -m "feat: 添加深浅色主题切换功能"
```

---

### Task 6: 实现导航栏和板块样式

**Covers:** [S6, S8]

**Files:**
- Modify: `D:\MiMoProjects\mrifox.github.io\css\style.css`

**Interfaces:**
- Consumes: Task 2 的 CSS 变量
- Produces: 导航栏、Hero、About、Journey、Works、Tools、Footer 样式

- [ ] **Step 1: 添加导航栏样式**

```css
/* 导航栏 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--glass);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--glass-border);
  transition: transform 0.3s ease;
}

.navbar.hidden {
  transform: translateY(-100%);
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.nav-logo {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
}

.nav-links {
  display: flex;
  gap: 32px;
}

.nav-links a {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: var(--text-primary);
}

/* 主题切换按钮 */
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s ease;
}

.theme-toggle:hover {
  background: var(--surface-hover);
}

.sun-icon,
.moon-icon {
  font-size: 20px;
}

[data-theme="light"] .moon-icon {
  display: none;
}

[data-theme="dark"] .sun-icon {
  display: none;
}

/* 移动端菜单按钮 */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.mobile-menu-btn span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--text-primary);
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .nav-links {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: center;
    gap: 0;
    background: var(--glass);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--glass-border);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }
  
  .nav-links.active {
    max-height: 300px;
  }
  
  .nav-links a {
    padding: 16px;
    width: 100%;
    text-align: center;
  }
  
  .mobile-menu-btn {
    display: flex;
  }
}
```

- [ ] **Step 2: 添加 Hero 区样式**

```css
/* Hero 区 */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 60px;
}

.hero-title {
  font-size: 72px;
  font-weight: 700;
  letter-spacing: -2px;
  margin-bottom: 16px;
  animation: fadeInUp 0.8s ease forwards;
}

.hero-tagline {
  font-size: 24px;
  color: var(--text-secondary);
  margin-bottom: 48px;
  animation: fadeInUp 0.8s ease 0.2s forwards;
  opacity: 0;
}

.scroll-arrow {
  animation: bounce 2s infinite;
  font-size: 24px;
  color: var(--text-muted);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}
```

- [ ] **Step 3: 添加 About 区样式**

```css
/* About 区 */
.about {
  padding: 120px 0;
}

.about-card {
  background: var(--surface);
  border-radius: 16px;
  padding: 48px;
  border: 1px solid var(--border);
  box-shadow: 0 4px 20px var(--shadow);
  max-width: 800px;
  margin: 0 auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.about-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px var(--shadow);
}

.about-card p {
  font-size: 18px;
  line-height: 1.8;
  color: var(--text-secondary);
  white-space: pre-line;
}
```

- [ ] **Step 4: 添加 Journey 时间线样式**

```css
/* Journey 时间线 */
.journey {
  padding: 120px 0;
}

.section-title {
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 64px;
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border);
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  width: 50%;
  padding: 20px 40px;
}

.timeline-item.left {
  left: 0;
  text-align: right;
}

.timeline-item.right {
  left: 50%;
  text-align: left;
}

.timeline-item::before {
  content: '';
  position: absolute;
  top: 30px;
  width: 12px;
  height: 12px;
  background: var(--accent);
  border-radius: 50%;
  border: 3px solid var(--bg);
}

.timeline-item.left::before {
  right: -6px;
}

.timeline-item.right::before {
  left: -6px;
}

.timeline-content {
  background: var(--surface);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--border);
  box-shadow: 0 2px 10px var(--shadow);
}

.timeline-date {
  font-size: 14px;
  color: var(--accent);
  font-weight: 600;
  margin-bottom: 8px;
}

.timeline-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.timeline-note {
  font-size: 14px;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .timeline::before {
    left: 20px;
  }
  
  .timeline-item {
    width: 100%;
    padding-left: 50px;
    padding-right: 0;
    text-align: left;
  }
  
  .timeline-item.left,
  .timeline-item.right {
    left: 0;
  }
  
  .timeline-item::before {
    left: 14px;
    right: auto;
  }
}
```

- [ ] **Step 5: 添加 Works 作品展示样式**

```css
/* Works 作品展示 */
.works {
  padding: 120px 0;
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.work-card {
  background: var(--surface);
  border-radius: 16px;
  border: 1px solid var(--border);
  box-shadow: 0 4px 20px var(--shadow);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.work-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px var(--shadow);
}

.work-thumbnail {
  aspect-ratio: 16/9;
  background: linear-gradient(135deg, var(--accent), #00c6ff);
  display: flex;
  align-items: center;
  justify-content: center;
}

.work-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.work-thumbnail .placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--accent), #00c6ff);
}

.work-info {
  padding: 24px;
}

.work-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.work-tagline {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.work-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

@media (max-width: 768px) {
  .works-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 6: 添加 Tools 区样式**

```css
/* Tools 区 */
.tools {
  padding: 120px 0;
}

.tools-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 48px;
}

.tool-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  opacity: 0.7;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.tool-item:hover {
  opacity: 1;
  transform: translateY(-4px);
}

.tool-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface);
  border-radius: 16px;
  border: 1px solid var(--border);
  box-shadow: 0 2px 10px var(--shadow);
}

.tool-icon img {
  width: 32px;
  height: 32px;
}

.tool-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
}
```

- [ ] **Step 7: 添加 Footer 样式**

```css
/* Footer */
.footer {
  padding: 48px 0;
  text-align: center;
  border-top: 1px solid var(--border);
}

.footer p {
  font-size: 14px;
  color: var(--text-muted);
}
```

- [ ] **Step 8: 添加响应式样式**

```css
/* 响应式样式 */
@media (max-width: 1200px) {
  .works-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 48px;
  }
  
  .hero-tagline {
    font-size: 18px;
  }
  
  .section-title {
    font-size: 28px;
    margin-bottom: 48px;
  }
  
  .about-card {
    padding: 32px;
  }
  
  .about-card p {
    font-size: 16px;
  }
}
```

- [ ] **Step 9: Commit**

```bash
git add css/style.css
git commit -m "feat: 添加导航栏、Hero、About、Journey、Works、Tools、Footer 样式"
```

---

### Task 7: 测试和优化

**Covers:** [S10]

**Files:**
- 无新增文件

**Interfaces:**
- Consumes: 所有之前任务的输出
- Produces: 经过测试和优化的完整网站

- [ ] **Step 1: 测试页面加载**

在浏览器中打开 `index.html`，验证：
- 页面正常加载
- 数据从 projects.json 正确加载
- 各板块正常显示
- 主题切换正常工作

- [ ] **Step 2: 测试响应式布局**

在不同设备尺寸下测试：
- 桌面端 (>1200px)：正常显示
- 平板端 (768px-1200px)：Works 卡片两列
- 手机端 (<768px)：单列布局，汉堡菜单正常

- [ ] **Step 3: 测试主题切换**

点击主题切换按钮，验证：
- 浅色主题正常显示
- 深色主题正常显示
- 主题状态保存到 localStorage
- 刷新页面后主题状态保持

- [ ] **Step 4: 测试导航栏**

滚动页面，验证：
- 导航栏固定在顶部
- 向下滚动时导航栏隐藏
- 向上滚动时导航栏显示
- 毛玻璃效果正常

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: 完成 P0-P2 阶段功能开发"
```
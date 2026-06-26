let appData = null;
let readmeCache = {};

const fallbackData = {
  "profile": {
    "name": "Mr_iFox",
    "tagline": "用 AI 把想法变成现实",
    "about": "我是 Fox，一个正在用 AI 把想法变成现实的探索者。\n这里记录我从零开始，一步步用 AI 工具做出真实产品的过程。\n每次项目都是一次学习，不完美，但真实。"
  },
  "tools": [
    { "name": "MiMo Chat", "icon": "mimo-chat.png" },
    { "name": "MiMo Code", "icon": "mimo-code.png" },
    { "name": "GitHub", "icon": "github.png" }
  ],
  "projects": [
    {
      "id": 1,
      "title": "Git 和 GitHub 科普教程",
      "tagline": "给新手看的Git入门指南",
      "category": "教程",
      "tools": ["MiMo Code"],
      "github": "https://github.com/Mr_iFox/git-tutorial",
      "date": "2025-05",
      "thumbnail": "assets/thumbnails/project1.svg",
      "journeyNote": "边学边教，把Git知识整理成网页，也巩固了自己的理解"
    },
    {
      "id": 2,
      "title": "MiMo Code 教程",
      "tagline": "从零开始学习AI编程助手MiMo Code",
      "category": "教程",
      "tools": ["MiMo Code"],
      "github": "https://github.com/Mr_iFox/mimo-tutorial",
      "date": "2025-04",
      "thumbnail": "assets/thumbnails/project2.svg",
      "journeyNote": "第一次用MiMo Code做项目，体验比ChatGPT更流畅"
    },
    {
      "id": 3,
      "title": "羊了个羊小游戏",
      "tagline": "模仿热门小游戏，挑战三消玩法",
      "category": "游戏",
      "tools": ["ChatGPT"],
      "github": "",
      "date": "2025-03",
      "thumbnail": "assets/thumbnails/project3.svg",
      "journeyNote": "从静态页面到交互游戏，感受到了AI辅助开发的效率"
    },
    {
      "id": 4,
      "title": "基金回本测算工具",
      "tagline": "帮我算算基金回本需要涨多少",
      "category": "工具",
      "tools": ["ChatGPT"],
      "github": "",
      "date": "2025-02",
      "thumbnail": "assets/thumbnails/project4.svg",
      "journeyNote": "开始理解如何把需求转化成代码，AI让我少走了很多弯路"
    },
    {
      "id": 5,
      "title": "基金投资分析网页",
      "tagline": "我的第一个AI作品，用ChatGPT做出的基金数据分析页面",
      "category": "Web App",
      "tools": ["ChatGPT"],
      "github": "",
      "date": "2025-01",
      "thumbnail": "assets/thumbnails/project5.svg",
      "journeyNote": "第一次尝试用AI写代码，虽然简陋，但迈出了第一步"
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initMobileMenu();
    initScrollNav();
    initModal();
});

async function loadData() {
    try {
        const response = await fetch('data/projects.json');
        if (!response.ok) throw new Error('Network response was not ok');
        appData = await response.json();
    } catch (error) {
        console.warn('无法加载 projects.json，使用内置数据:', error.message);
        appData = fallbackData;
    }
    renderProfile();
    renderTimeline();
    renderWorks();
    renderTools();
}

function renderProfile() {
    if (!appData?.profile) return;
    const { name, tagline, about } = appData.profile;
    document.getElementById('profileName').textContent = name;
    document.getElementById('profileTagline').textContent = tagline;
    document.getElementById('profileAbout').innerHTML = about.replace(/\n/g, '<br>');
}

function renderTimeline() {
    if (!appData?.projects) return;
    const container = document.getElementById('timeline');

    container.innerHTML = appData.projects.map(project => `
        <div class="timeline-item">
            <div class="timeline-date">${formatDate(project.date)}</div>
            <div class="timeline-title">${project.title}</div>
            <div class="timeline-note">${project.journeyNote || '学习中...'}</div>
        </div>
    `).join('');
}

function renderWorks() {
    if (!appData?.projects) return;
    const container = document.getElementById('worksGrid');

    container.innerHTML = appData.projects.map(project => `
        <div class="card work-card" data-project-id="${project.id}">
            <div class="card-thumbnail">
                ${project.thumbnail
                    ? `<img src="${project.thumbnail}" alt="${project.title}" loading="lazy">`
                    : `<div class="thumbnail-placeholder"></div>`
                }
            </div>
            <div class="card-content">
                <div class="card-title">${project.title}</div>
                <div class="card-tagline">${project.tagline}</div>
                <div class="card-meta">
                    <span class="tag">${project.category}</span>
                    ${project.tools.map(tool => `<span class="tag secondary">${tool}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');

    container.addEventListener('click', (e) => {
        const card = e.target.closest('.work-card');
        if (card) {
            const projectId = parseInt(card.dataset.projectId);
            const project = appData.projects.find(p => p.id === projectId);
            if (project) openModal(project);
        }
    });
}

function renderTools() {
    if (!appData?.tools) return;
    const container = document.getElementById('toolsGrid');
    
    container.innerHTML = appData.tools.map(tool => `
        <div class="card tool-card">
            <div class="tool-icon">
                <img src="assets/icons/${tool.icon}" alt="${tool.name}" onerror="this.style.display='none'">
            </div>
            <div class="tool-name">${tool.name}</div>
        </div>
    `).join('');
}

function formatDate(dateStr) {
    const [year, month] = dateStr.split('-');
    const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    return `${year}年 ${months[parseInt(month) - 1]}`;
}

function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const links = document.getElementById('navLinks');

    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        links.classList.toggle('active');
        btn.setAttribute('aria-expanded', links.classList.contains('active'));
    });

    links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            btn.classList.remove('active');
            links.classList.remove('active');
            btn.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('click', (e) => {
        if (!btn.contains(e.target) && !links.contains(e.target)) {
            btn.classList.remove('active');
            links.classList.remove('active');
            btn.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && links.classList.contains('active')) {
            btn.classList.remove('active');
            links.classList.remove('active');
            btn.setAttribute('aria-expanded', 'false');
        }
    });
}

function initScrollNav() {
    const nav = document.getElementById('navbar');
    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                if (currentScroll > lastScroll && currentScroll > 100) {
                    nav.classList.add('hide');
                } else {
                    nav.classList.remove('hide');
                }
                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    });
}

function initModal() {
    const overlay = document.getElementById('workModal');
    const closeBtn = document.getElementById('modalClose');

    closeBtn.addEventListener('click', closeModal);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeModal();
        }
    });
}

function openModal(project) {
    const overlay = document.getElementById('workModal');
    const title = document.getElementById('modalTitle');
    const tags = document.getElementById('modalTags');
    const tools = document.getElementById('modalTools');
    const readme = document.getElementById('modalReadme');
    const github = document.getElementById('modalGithub');

    title.textContent = project.title;
    tags.innerHTML = `<span class="tag">${project.category}</span>`;
    tools.textContent = project.tools.join(', ');
    github.href = project.github;

    readme.innerHTML = '<div class="modal-loading">加载 README 中...</div>';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    loadReadme(project.github, readme);
}

function closeModal() {
    const overlay = document.getElementById('workModal');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

async function loadReadme(githubUrl, container) {
    const repoMatch = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!repoMatch) {
        container.innerHTML = '<div class="modal-readme-content"><p>无法解析仓库地址</p></div>';
        return;
    }

    const [, owner, repo] = repoMatch;
    const cacheKey = `${owner}/${repo}`;

    if (readmeCache[cacheKey]) {
        renderReadme(readmeCache[cacheKey], container);
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`);
        if (!response.ok) {
            throw new Error('README not found');
        }
        const data = await response.json();
        const content = atob(data.content.replace(/\n/g, ''));
        readmeCache[cacheKey] = content;
        renderReadme(content, container);
    } catch (error) {
        container.innerHTML = '<div class="modal-readme-content"><p>暂无 README 内容</p></div>';
    }
}

function renderReadme(markdown, container) {
    if (typeof marked !== 'undefined') {
        container.innerHTML = `<div class="modal-readme-content">${marked.parse(markdown)}</div>`;
    } else {
        container.innerHTML = `<div class="modal-readme-content"><pre>${markdown}</pre></div>`;
    }
}
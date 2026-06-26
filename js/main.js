let appData = null;

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initMobileMenu();
    initScrollNav();
});

async function loadData() {
    try {
        const response = await fetch('data/projects.json');
        appData = await response.json();
        renderProfile();
        renderTimeline();
        renderWorks();
        renderTools();
    } catch (error) {
        console.error('加载数据失败:', error);
    }
}

function renderProfile() {
    if (!appData?.profile) return;
    const { name, tagline, about } = appData.profile;
    document.getElementById('profileName').textContent = name;
    document.getElementById('profileTagline').textContent = tagline;
    document.getElementById('profileAbout').textContent = about;
}

function renderTimeline() {
    if (!appData?.projects) return;
    const container = document.getElementById('timeline');
    const sorted = [...appData.projects].sort((a, b) => b.date.localeCompare(a.date));
    
    container.innerHTML = sorted.map(project => `
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
        <div class="card" onclick="window.open('${project.github}', '_blank')">
            <div class="card-title">${project.title}</div>
            <div class="card-tagline">${project.tagline}</div>
            <div class="card-meta">
                <span class="tag">${project.category}</span>
                ${project.tools.map(tool => `<span class="tag secondary">${tool}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function renderTools() {
    if (!appData?.tools) return;
    const container = document.getElementById('toolsGrid');
    
    container.innerHTML = appData.tools.map(tool => `
        <div class="card tool-card">
            <div class="tool-icon">
                <img src="assets/icons/${tool.icon}.svg" alt="${tool.name}" onerror="this.style.display='none'">
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
        links.classList.toggle('active');
    });
    
    links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => links.classList.remove('active'));
    });
}

function initScrollNav() {
    const nav = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.classList.add('hide');
        } else {
            nav.classList.remove('hide');
        }
        lastScroll = currentScroll;
    });
}
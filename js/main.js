// 主交互逻辑
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
});

async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const data = await response.json();
        renderProjects(data.projects);
    } catch (error) {
        console.error('加载项目数据失败:', error);
    }
}

function renderProjects(projects) {
    const container = document.getElementById('project-list');
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.tagline}</p>
            <span>${project.category}</span>
        `;
        container.appendChild(card);
    });
}

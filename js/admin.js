(function() {
    // 密码哈希（SHA-256），避免明文存储
    const ADMIN_PASSWORD_HASH = '7c0a41af8c654b963ce57180e32ef481165b0bca1c5da547d53b8cc867bdd89c';
    const DATA_PATH = 'data/projects.json';

    let data = null;
    let currentSection = 'profile';
    let editingProjectId = null;
    let hasChanges = false;

    const els = {
        loginOverlay: document.getElementById('loginOverlay'),
        adminApp: document.getElementById('adminApp'),
        passwordInput: document.getElementById('passwordInput'),
        loginBtn: document.getElementById('loginBtn'),
        loginError: document.getElementById('loginError'),
        tokenStatus: document.getElementById('tokenStatus'),
        configTokenBtn: document.getElementById('configTokenBtn'),
        saveBtn: document.getElementById('saveBtn'),
        logoutBtn: document.getElementById('logoutBtn'),
        projectList: document.getElementById('projectList'),
        addProjectBtn: document.getElementById('addProjectBtn'),
        profileName: document.getElementById('profileName'),
        profileTagline: document.getElementById('profileTagline'),
        profileAbout: document.getElementById('profileAbout'),
        toolsList: document.getElementById('toolsList'),
        addToolBtn: document.getElementById('addToolBtn'),
        saveProfileBtn: document.getElementById('saveProfileBtn'),
        heroImageInput: document.getElementById('heroImageInput'),
        uploadHeroBtn: document.getElementById('uploadHeroBtn'),
        heroImageFileName: document.getElementById('heroImageFileName'),
        heroImagePreview: document.getElementById('heroImagePreview'),
        heroImage: document.getElementById('heroImage'),
        sectionProfile: document.getElementById('sectionProfile'),
        sectionTools: document.getElementById('sectionTools'),
        sectionProject: document.getElementById('sectionProject'),
        projectForm: document.getElementById('projectForm'),
        projectFormTitle: document.getElementById('projectFormTitle'),
        projectId: document.getElementById('projectId'),
        projectTitle: document.getElementById('projectTitle'),
        projectTagline: document.getElementById('projectTagline'),
        projectCategory: document.getElementById('projectCategory'),
        projectTools: document.getElementById('projectTools'),
        projectGithub: document.getElementById('projectGithub'),
        projectUrl: document.getElementById('projectUrl'),
        projectDate: document.getElementById('projectDate'),
        projectThumbnail: document.getElementById('projectThumbnail'),
        projectThumbnailInput: document.getElementById('projectThumbnailInput'),
        uploadThumbnailBtn: document.getElementById('uploadThumbnailBtn'),
        thumbnailFileName: document.getElementById('thumbnailFileName'),
        thumbnailPreview: document.getElementById('thumbnailPreview'),
        projectNote: document.getElementById('projectNote'),
        deleteProjectBtn: document.getElementById('deleteProjectBtn'),
        tokenModal: document.getElementById('tokenModal'),
        tokenModalClose: document.getElementById('tokenModalClose'),
        tokenInput: document.getElementById('tokenInput'),
        repoOwnerInput: document.getElementById('repoOwnerInput'),
        repoNameInput: document.getElementById('repoNameInput'),
        tokenSaveBtn: document.getElementById('tokenSaveBtn'),
        toast: document.getElementById('toast')
    };

    function init() {
        if (localStorage.getItem('admin_auth') === 'true') {
            showAdmin();
        }
        bindEvents();
        checkToken();
    }

    function bindEvents() {
        els.loginBtn.addEventListener('click', login);
        els.passwordInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') login();
        });
        els.logoutBtn.addEventListener('click', logout);

        els.configTokenBtn.addEventListener('click', function() {
            var stored = getToken();
            els.tokenInput.value = stored.token || '';
            els.repoOwnerInput.value = stored.owner || 'Mr_iFox';
            els.repoNameInput.value = stored.repo || 'mrifox.github.io';
            els.tokenModal.classList.add('active');
        });
        els.tokenModalClose.addEventListener('click', function() {
            els.tokenModal.classList.remove('active');
        });
        els.tokenModal.addEventListener('click', function(e) {
            if (e.target === els.tokenModal) els.tokenModal.classList.remove('active');
        });
        els.tokenSaveBtn.addEventListener('click', saveToken);

        els.saveBtn.addEventListener('click', saveToGitHub);

        document.querySelectorAll('.sidebar-item').forEach(function(btn) {
            btn.addEventListener('click', function() {
                switchSection(this.dataset.section);
            });
        });

        els.addProjectBtn.addEventListener('click', function() {
            addNewProject();
        });

        els.projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProject();
        });
        els.deleteProjectBtn.addEventListener('click', function() {
            deleteProject();
        });

        els.uploadThumbnailBtn.addEventListener('click', function() {
            els.projectThumbnailInput.click();
        });

        els.projectThumbnailInput.addEventListener('change', function(e) {
            var file = e.target.files[0];
            if (file) {
                if (file.size > 500 * 1024) {
                    showToast('图片大小不能超过 500KB');
                    return;
                }
                var reader = new FileReader();
                reader.onload = function(event) {
                    els.projectThumbnail.value = event.target.result;
                    els.thumbnailFileName.textContent = file.name;
                    els.thumbnailPreview.innerHTML = '<img src="' + event.target.result + '" alt="预览">';
                    markChanged();
                };
                reader.readAsDataURL(file);
            }
        });

        els.addToolBtn.addEventListener('click', function() {
            data.tools.push({ name: '', icon: '' });
            renderTools();
            markChanged();
        });

        els.saveProfileBtn.addEventListener('click', function() {
            saveProfile();
        });

        els.uploadHeroBtn.addEventListener('click', function() {
            els.heroImageInput.click();
        });

        els.heroImageInput.addEventListener('change', function(e) {
            var file = e.target.files[0];
            if (file) {
                if (file.size > 1000 * 1024) {
                    showToast('图片大小不能超过 1MB');
                    return;
                }
                var reader = new FileReader();
                reader.onload = function(event) {
                    els.heroImage.value = event.target.result;
                    els.heroImageFileName.textContent = file.name;
                    els.heroImagePreview.innerHTML = '<img src="' + event.target.result + '" alt="预览">';
                    markChanged();
                };
                reader.readAsDataURL(file);
            }
        });

        els.profileName.addEventListener('input', markChanged);
        els.profileTagline.addEventListener('input', markChanged);
        els.profileAbout.addEventListener('input', markChanged);
    }

    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    async function login() {
        var pw = els.passwordInput.value.trim();
        if (!pw) {
            els.loginError.textContent = '请输入密码';
            return;
        }
        const hash = await hashPassword(pw);
        if (hash === ADMIN_PASSWORD_HASH) {
            localStorage.setItem('admin_auth', 'true');
            showAdmin();
        } else {
            els.loginError.textContent = '密码错误';
        }
    }
    }

    function logout() {
        localStorage.removeItem('admin_auth');
        els.adminApp.classList.add('hidden');
        els.loginOverlay.classList.remove('hidden');
        els.passwordInput.value = '';
        els.loginError.textContent = '';
    }

    function showAdmin() {
        els.loginOverlay.classList.add('hidden');
        els.adminApp.classList.remove('hidden');
        loadData();
    }

    function loadData() {
        fetch(DATA_PATH + '?t=' + Date.now())
            .then(function(res) {
                if (!res.ok) throw new Error('Network error');
                return res.json();
            })
            .then(function(json) {
                data = json;
                renderAll();
            })
            .catch(function(err) {
                console.warn('无法加载 projects.json，使用内置数据');
                data = getFallbackData();
                renderAll();
            });
    }

    function renderAll() {
        renderProfile();
        renderTools();
        renderProjectList();
        if (data.projects.length > 0) {
            selectProject(data.projects[0].id);
        }
    }

    function getFallbackData() {
        return {
            "profile": {
                "name": "Mr_iFox",
                "tagline": "用 AI 把想法变成现实",
                "about": "我是 Fox，一个正在用 AI 把想法变成现实的探索者。\n这里记录我从零开始，一步步用 AI 工具做出真实产品的过程。\n每次项目都是一次学习，不完美，但真实。"
            },
            "tools": [
                { "name": "MiMo Chat", "icon": "mimo-chat.png", "url": "https://aistudio.xiaomimimo.com" },
                { "name": "MiMo Code", "icon": "mimo-code.png", "url": "https://mimo.xiaomi.com/coder" },
                { "name": "GitHub", "icon": "github.png", "url": "https://github.com" }
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
    }

    function renderProfile() {
        els.profileName.value = data.profile.name || '';
        els.profileTagline.value = data.profile.tagline || '';
        els.profileAbout.value = data.profile.about || '';

        if (data.heroImage) {
            els.heroImage.value = data.heroImage;
            els.heroImageFileName.textContent = data.heroImage.includes('data:') ? '已上传图片' : data.heroImage;
            els.heroImagePreview.innerHTML = '<img src="' + data.heroImage + '" alt="预览">';
        } else {
            els.heroImageFileName.textContent = '未选择文件';
            els.heroImagePreview.innerHTML = '';
        }
        els.heroImageInput.value = '';
    }

    function renderTools() {
        els.toolsList.innerHTML = '';
        data.tools.forEach(function(tool, i) {
            var item = document.createElement('div');
            item.className = 'tool-edit-item';
            item.innerHTML =
                '<input type="text" placeholder="工具名称" value="' + escapeAttr(tool.name) + '" data-index="' + i + '" data-field="name">' +
                '<input type="text" placeholder="图标标识" value="' + escapeAttr(tool.icon) + '" data-index="' + i + '" data-field="icon">' +
                '<input type="url" placeholder="官网链接" value="' + escapeAttr(tool.url || '') + '" data-index="' + i + '" data-field="url">' +
                '<button type="button" class="tool-remove-btn" data-index="' + i + '">&times;</button>';
            els.toolsList.appendChild(item);
        });

        els.toolsList.querySelectorAll('input').forEach(function(input) {
            input.addEventListener('input', function() {
                var idx = parseInt(this.dataset.index);
                var field = this.dataset.field;
                data.tools[idx][field] = this.value;
                markChanged();
            });
        });

        els.toolsList.querySelectorAll('.tool-remove-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var idx = parseInt(this.dataset.index);
                data.tools.splice(idx, 1);
                renderTools();
                markChanged();
            });
        });
    }

    function renderProjectList() {
        els.projectList.innerHTML = '';
        data.projects.forEach(function(project) {
            var item = document.createElement('button');
            item.className = 'project-list-item' + (project.id === editingProjectId ? ' active' : '');
            item.innerHTML =
                '<span class="project-list-item-id">#' + project.id + '</span>' +
                '<span>' + escapeHtml(project.title) + '</span>';
            item.addEventListener('click', function() {
                selectProject(project.id);
            });
            els.projectList.appendChild(item);
        });
    }

    function selectProject(id) {
        editingProjectId = id;
        var project = data.projects.find(function(p) { return p.id === id; });
        if (!project) return;

        els.projectFormTitle.textContent = '编辑项目 #' + id;
        els.projectId.value = id;
        els.projectTitle.value = project.title || '';
        els.projectTagline.value = project.tagline || '';
        els.projectCategory.value = project.category || '';
        els.projectTools.value = (project.tools || []).join(', ');
        els.projectGithub.value = project.github || '';
        els.projectUrl.value = project.url || '';
        els.projectDate.value = project.date || '';
        els.projectThumbnail.value = project.thumbnail || '';
        els.projectNote.value = project.journeyNote || '';

        if (project.thumbnail) {
            els.thumbnailFileName.textContent = project.thumbnail.includes('data:') ? '已上传图片' : project.thumbnail;
            els.thumbnailPreview.innerHTML = '<img src="' + project.thumbnail + '" alt="预览">';
        } else {
            els.thumbnailFileName.textContent = '未选择文件';
            els.thumbnailPreview.innerHTML = '';
        }
        els.projectThumbnailInput.value = '';

        document.querySelectorAll('.sidebar-item').forEach(function(btn) {
            btn.classList.remove('active');
        });
        switchSection('project');
        renderProjectList();
    }

    function addNewProject() {
        var maxId = 0;
        data.projects.forEach(function(p) {
            if (p.id > maxId) maxId = p.id;
        });
        var newProject = {
            id: maxId + 1,
            title: '新项目',
            tagline: '',
            category: '',
            tools: [],
            github: '',
            date: '',
            thumbnail: '',
            journeyNote: ''
        };
        data.projects.push(newProject);
        renderProjectList();
        selectProject(newProject.id);
        markChanged();
        showToast('已创建新项目 #' + newProject.id);
    }

    function saveProfile() {
        data.profile.name = els.profileName.value.trim();
        data.profile.tagline = els.profileTagline.value.trim();
        data.profile.about = els.profileAbout.value.trim();
        data.heroImage = els.heroImage.value.trim();
        markChanged();
        showToast('个人资料已保存');
    }

    function saveProject() {
        var id = parseInt(els.projectId.value);
        var project = data.projects.find(function(p) { return p.id === id; });
        if (!project) return;

        project.title = els.projectTitle.value.trim();
        project.tagline = els.projectTagline.value.trim();
        project.category = els.projectCategory.value.trim();
        project.tools = els.projectTools.value.split(',').map(function(s) { return s.trim(); }).filter(Boolean);
        project.github = els.projectGithub.value.trim();
        project.url = els.projectUrl.value.trim();
        project.date = els.projectDate.value.trim();
        project.thumbnail = els.projectThumbnail.value.trim();
        project.journeyNote = els.projectNote.value.trim();

        renderProjectList();
        markChanged();
        showToast('项目 #' + id + ' 已保存');
    }

    function deleteProject() {
        var id = parseInt(els.projectId.value);
        if (!confirm('确定要删除项目 #' + id + ' 吗？此操作不可撤销。')) return;

        data.projects = data.projects.filter(function(p) { return p.id !== id; });
        editingProjectId = null;
        renderProjectList();

        if (data.projects.length > 0) {
            selectProject(data.projects[0].id);
        } else {
            switchSection('profile');
        }
        markChanged();
        showToast('项目 #' + id + ' 已删除');
    }

    function switchSection(section) {
        currentSection = section;
        document.querySelectorAll('.admin-section').forEach(function(el) {
            el.classList.remove('active');
        });

        document.querySelectorAll('.sidebar-item').forEach(function(btn) {
            btn.classList.remove('active');
            if (btn.dataset.section === section) btn.classList.add('active');
        });

        if (section === 'profile') {
            data.profile.name = els.profileName.value.trim();
            data.profile.tagline = els.profileTagline.value.trim();
            data.profile.about = els.profileAbout.value.trim();
            els.sectionProfile.classList.add('active');
        } else if (section === 'tools') {
            els.sectionTools.classList.add('active');
        } else if (section === 'project') {
            els.sectionProject.classList.add('active');
        }
    }

    function markChanged() {
        hasChanges = true;
        els.saveBtn.disabled = false;
    }

    function checkToken() {
        var stored = getToken();
        if (stored.token) {
            els.tokenStatus.textContent = 'Token: 已配置';
            els.tokenStatus.classList.add('configured');
        } else {
            els.tokenStatus.textContent = 'Token: 未配置';
            els.tokenStatus.classList.remove('configured');
        }
    }

    function getToken() {
        return {
            token: localStorage.getItem('gh_token') || '',
            owner: localStorage.getItem('gh_owner') || '',
            repo: localStorage.getItem('gh_repo') || ''
        };
    }

    function saveToken() {
        var token = els.tokenInput.value.trim();
        var owner = els.repoOwnerInput.value.trim();
        var repo = els.repoNameInput.value.trim();

        if (!token || !owner || !repo) {
            showToast('请填写完整信息');
            return;
        }

        localStorage.setItem('gh_token', token);
        localStorage.setItem('gh_owner', owner);
        localStorage.setItem('gh_repo', repo);

        els.tokenModal.classList.remove('active');
        checkToken();
        showToast('Token 已保存');
    }

    function saveToGitHub() {
        var stored = getToken();
        if (!stored.token) {
            showToast('请先配置 GitHub Token');
            els.configTokenBtn.click();
            return;
        }

        syncProfileToData();
        syncToolsToData();

        var jsonStr = JSON.stringify(data, null, 2);
        var owner = stored.owner;
        var repo = stored.repo;
        var path = DATA_PATH;

        els.saveBtn.disabled = true;
        els.saveBtn.textContent = '提交中...';

        fetch('https://api.github.com/repos/' + owner + '/' + repo + '/contents/' + path, {
            headers: {
                'Authorization': 'token ' + stored.token,
                'Accept': 'application/vnd.github.v3+json'
            }
        })
        .then(function(res) {
            if (!res.ok) {
                if (res.status === 401) throw new Error('Token 无效或已过期');
                if (res.status === 404) throw new Error('文件不存在，请先手动创建');
                if (res.status === 403) throw new Error('Token 权限不足，需要 repo 权限');
                throw new Error('获取文件 SHA 失败 (状态码: ' + res.status + ')');
            }
            return res.json();
        })
        .then(function(fileData) {
            return fetch('https://api.github.com/repos/' + owner + '/' + repo + '/contents/' + path, {
                method: 'PUT',
                headers: {
                    'Authorization': 'token ' + stored.token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.github.v3+json'
                },
                body: JSON.stringify({
                    message: 'Update projects.json via Admin',
                    content: btoa(unescape(encodeURIComponent(jsonStr))),
                    sha: fileData.sha
                })
            });
        })
        .then(function(res) {
            if (!res.ok) throw new Error('提交失败');
            return res.json();
        })
        .then(function() {
            hasChanges = false;
            els.saveBtn.disabled = false;
            els.saveBtn.textContent = '保存到 GitHub';
            showToast('已成功保存到 GitHub');
        })
        .catch(function(err) {
            els.saveBtn.disabled = false;
            els.saveBtn.textContent = '保存到 GitHub';
            showToast('保存失败: ' + err.message);
        });
    }

    function syncProfileToData() {
        data.profile.name = els.profileName.value.trim();
        data.profile.tagline = els.profileTagline.value.trim();
        data.profile.about = els.profileAbout.value.trim();
    }

    function syncToolsToData() {
        var items = els.toolsList.querySelectorAll('.tool-edit-item');
        var tools = [];
        items.forEach(function(item) {
            var inputs = item.querySelectorAll('input');
            tools.push({
                name: inputs[0].value.trim(),
                icon: inputs[1].value.trim(),
                url: inputs[2] ? inputs[2].value.trim() : ''
            });
        });
        data.tools = tools;
    }

    function showToast(msg) {
        els.toast.textContent = msg;
        els.toast.classList.add('show');
        setTimeout(function() {
            els.toast.classList.remove('show');
        }, 3000);
    }

    function escapeHtml(str) {
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function escapeAttr(str) {
        return (str || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    init();
})();

# Mr_iFox 个人博客

用 AI 把想法变成现实 — 记录一个 AI 小白从零开始的学习历程。

🔗 **在线访问：** [mrifox.github.io](https://mrifox.github.io)

## 功能特性

-   深色/浅色主题切换
- ✨ 光标跟随、卡片倾斜等交互动画
-   粒子波浪背景效果
-   滚动视差效果
-   响应式设计，适配手机/平板/桌面
-   作品详情弹窗（README 渲染）
-   管理后台（admin.html）

## 技术栈

- HTML5
- CSS3（自定义属性、动画、响应式）
- 原生 JavaScript（零框架依赖）
- marked.js（Markdown 渲染）

## 项目结构

```
mrifox.github.io/
├── index.html          # 主页面
├── admin.html          # 管理后台
├── css/
│   ├── style.css       # 主样式
│   └── admin.css       # 管理后台样式
├── js/
│   ├── main.js         # 主逻辑
│   ├── theme.js        # 主题切换
│   ├── cursor.js       # 光标效果
│   ├── tilt.js         # 卡片倾斜
│   ├── parallax.js     # 视差效果
│   ├── particles.js    # 粒子背景
│   ├── snap.js         # 磁吸滚动
│   └── admin.js        # 管理后台逻辑
├── data/
│   └── projects.json   # 项目数据
└── assets/
    ├── avatar.jpg      # 个人照片
    ├── icons/          # 工具图标
    └── thumbnails/     # 项目缩略图
```

## 本地开发

直接在浏览器中打开 `index.html` 即可预览。

或使用本地服务器：

```bash
# Python
python -m http.server 8000

# Node.js
npx serve .
```

## 部署

推送到 GitHub 仓库的 `main` 分支，GitHub Pages 会自动构建部署。

## License

MIT

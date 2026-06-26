# Mr_iFox 个人博客网站

记录一个 AI 小白从零开始，用 AI 工具一步步做出真实产品的学习历程。

## 功能特性

- 响应式设计，支持桌面、平板、手机
- 深浅色主题切换（自动保存偏好）
- 导航栏毛玻璃效果，固定定位
- 数据动态加载（projects.json）
- 作品弹窗详情（支持 Markdown 渲染）
- 鼠标光标光晕效果
- 3D 倾斜卡片交互
- 视差滚动效果
- 粒子背景动画
- 滚动吸附导航
- 无障碍支持（prefers-reduced-motion）

## 技术栈

- HTML5
- CSS3（自定义属性、响应式设计、毛玻璃效果）
- Vanilla JavaScript
- marked.js（Markdown 渲染）

## 项目结构

```
├── index.html          # 主页面
├── admin.html          # 数据管理页面
├── css/
│   ├── style.css       # 主样式
│   └── admin.css       # 管理页面样式
├── js/
│   ├── main.js         # 主逻辑（数据加载、弹窗）
│   ├── theme.js        # 主题切换
│   ├── cursor.js       # 光标光晕
│   ├── tilt.js         # 3D 倾斜效果
│   ├── parallax.js     # 视差滚动
│   ├── particles.js    # 粒子背景
│   └── snap.js         # 滚动吸附
├── data/
│   └── projects.json   # 项目数据
└── assets/
    ├── icons/          # 图标资源
    └── thumbnails/     # 缩略图资源
```

## 部署

GitHub Pages - 推送到 main 分支自动上线

## 本地开发

直接在浏览器中打开 `index.html` 即可预览。

## 数据管理

编辑 `data/projects.json` 修改项目数据，或通过 `admin.html` 可视化管理。

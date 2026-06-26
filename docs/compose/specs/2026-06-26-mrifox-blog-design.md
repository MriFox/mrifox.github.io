# Mr_iFox 个人博客网站 — 设计文档

## [S1] 项目概述

**网站名称**: Mr_iFox 个人站
**定位**: 记录一个 AI 小白从零开始，用 AI 工具一步步做出真实产品的学习历程
**目标用户**: 访问者（潜在同路人、招聘方、好奇者）以及站长自己（管理项目）
**部署方式**: GitHub Pages（静态站点，主分支自动上线）
**域名**: 默认 `mrifox.github.io`，后续可绑定自定义域名

## [S2] 技术栈

| 层级 | 技术 | 说明 |
|---|---|---|
| 结构 | HTML5 | 语义化标签 |
| 样式 | CSS3 | 自定义属性、backdrop-filter、scroll-snap、animation |
| 交互 | Vanilla JavaScript | 零框架依赖，原生 JS |
| Markdown 渲染 | marked.js（CDN 引入） | 将 README 的 Markdown 渲染为 HTML |
| 部署 | GitHub Pages | 推送到 main 分支自动上线 |

## [S3] 文件结构

```
mrifox.github.io/
├── index.html          # 主页面
├── admin.html          # 管理页面（P6阶段实现）
├── css/
│   ├── style.css       # 主样式
│   └── admin.css       # 管理页面样式（P6阶段实现）
├── js/
│   ├── main.js         # 主交互逻辑
│   ├── theme.js        # 深浅色切换（P2阶段实现）
│   └── admin.js        # 管理页面逻辑（P6阶段实现）
├── data/
│   └── projects.json   # 项目数据（唯一需要编辑的文件）
├── assets/
│   ├── thumbnails/     # 项目缩略图
│   └── icons/          # 工具图标
└── README.md
```

## [S4] P0-P2 阶段功能范围

### P0: 基础页面 + 数据读取
- index.html 基础结构
- style.css 基础样式
- projects.json 数据加载

### P1: 全部板块静态展示
- Hero 区：站名 + 定位语 + 粒子波浪背景（简化版）
- About 区：个人介绍卡片
- Journey 时间线：垂直时间线，左右交替排列
- Works 作品展示：网格卡片布局
- Tools 区：图标网格展示
- Footer：极简收尾
- 固定导航栏：毛玻璃半透明效果

### P2: 深浅色主题切换
- CSS 自定义属性定义主题色
- 切换按钮（太阳/月亮图标）
- 主题状态保存到 localStorage

## [S5] 数据结构

### projects.json
```json
{
  "profile": {
    "name": "Mr_iFox",
    "tagline": "用 AI 把想法变成现实",
    "about": "我是 Fox，一个正在用 AI 把想法变成现实的探索者。"
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
    }
  ]
}
```

## [S6] 设计规范

### 色彩系统
使用 CSS 自定义属性定义主题色，支持浅色和深色主题切换。

### 字体
- 中文：Noto Sans SC
- 英文 / 数字：Inter

### 布局原则
- 大量留白，板块之间间距充足
- 不对称但有韵律感，打破等分网格
- 最大内容宽度：1200px，居中
- 响应式：适配桌面、平板、手机

### 圆角与阴影
- 卡片圆角：16px
- 弹窗圆角：20px
- 阴影：柔和扩散，不用硬阴影
- 按钮圆角：10px

## [S7] 交互效果（P3+阶段，本次不实现）

| 编号 | 效果名称 | 实现方式 | 应用位置 |
|---|---|---|---|
| A | 光标光晕跟随 | JS 监听 mousemove | 全局 |
| B | 卡片 3D 倾斜 hover | JS 监听 mousemove on card | Works 卡片 |
| C | 滚动视差 | CSS transform + JS scroll | 各板块背景元素 |
| D | 粒子波浪背景 | Canvas 轻量粒子动画 | Hero 区 |
| E | 磁吸滚动 | CSS scroll-snap | 各板块之间 |
| G | 液态变形深浅色切换 | 以按钮为圆心扩散圆形 clip-path | 主题切换按钮 |

## [S8] 响应式断点

| 断点 | 设备 | 布局调整 |
|---|---|---|
| > 1200px | 大桌面 | 最大宽度 1200px，居中 |
| 768px - 1200px | 平板 | Works 卡片两列，导航保持 |
| < 768px | 手机 | 单列布局，导航变汉堡菜单 |

## [S9] 实现步骤

1. 创建项目目录结构
2. 编写 index.html 基础结构
3. 编写 style.css 基础样式和主题色
4. 创建 projects.json 数据文件
5. 实现数据加载逻辑（main.js）
6. 实现各板块静态展示
7. 实现固定导航栏
8. 实现深浅色主题切换（theme.js）
9. 实现响应式适配
10. 测试和优化

## [S10] 验证标准

- 页面在桌面、平板、手机上正常显示
- 深浅色主题切换正常
- 导航栏固定且毛玻璃效果正常
- 数据从 projects.json 正确加载
- 各板块布局符合设计规范
# TOOLS.md - 执行能力与约束

## 执行能力

| 能力名 | 用途 | 约束 |
|--------|------|------|
| `preview-page` | 在项目目录中启动本地 Vite/Node 预览 | 必须在当前项目根目录执行；统一从 `.webgen/config.json` 读取配置 |
| `package-page` | 构建并整理页面交付产物 | 必须先完成验证；构建命令来自 `.webgen/config.json` |
| `api-integration` | 接远端 API 或生成 mock 契约 | 先确认 API 契约和鉴权方式；开发期优先走本地 `/api` 代理 |
| `browser-tools` | 浏览器自动化、截图、校验 | 默认 headless；优先用于预览验证 |
| `frontend-design` | 兜底页面实现能力 | 只在已完成 Discovery 和 Readiness Gate 后使用 |

## 默认浏览器侧资源

- Axios
  `<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>`
- Tailwind CSS
  `<script src="https://cdn.tailwindcss.com"></script>`
- Lucide Icons
  `<script src="https://unpkg.com/lucide@latest"></script>`
- Web Awesome 样式
  `<link rel="stylesheet" href="https://ka-f.webawesome.com/webawesome@3.8.0/styles/webawesome.css" />`
- Web Awesome loader
  `<script type="module" src="https://ka-f.webawesome.com/webawesome@3.8.0/webawesome.loader.js"></script>`

## 使用原则

- 页面默认是单页面。
- 默认优先使用公共 CDN，而不是先安装本地前端依赖。
- 页面组件优先复用 Web Awesome 或其它成熟开源能力。
- 同一任务中若需多次调用 API，优先复用已有连接。
- 任何实际预览、构建或打包动作，都必须在项目目录内完成。

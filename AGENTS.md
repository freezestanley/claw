# AGENTS.md — WebGen 工作区

这是 WebGen agent 的工作区。WebGen 只在 OpenClaw 内运行，职责是：**基于模板生成和迭代单页面项目，并提供本地预览、远端 API 代理、打包交付能力**。

## OpenClaw 运行边界

- WebGen 必须使用 OpenClaw 原生的 `agent`、`session`、`workspace` 和 startup context。
- 不允许在 workspace 内再维护独立于 OpenClaw 的第二套 session 系统。
- 项目状态通过项目目录中的文档和状态文件恢复，不依赖隐藏上下文。

## Session 与项目规则

- **一个 session = 一个项目。**
- 当前 session 只服务当前项目，不跨项目混用上下文。
- 项目统一放在 `projects/<project-slug>/`。
- 每个项目必须至少包含：
  - `PROJECT.md`
  - `DISCOVERY.md`
  - `ASSETS.md`
  - `API.md`
  - `HANDOFF.md`
  - `.webgen/`
- 首次进入一个新 session 时：
  1. 根据用户需求或 session-key 确定 `project-slug`。
  2. 使用模板创建 `projects/<project-slug>/`。
  3. 写入项目文档和 `.webgen` 状态文件。
- 后续回到同一 session 时，先读 `PROJECT.md`，再按需读 `HANDOFF.md`、`DISCOVERY.md`、`ASSETS.md`、`API.md`。

## 产出约束

- 默认只创建**单页面项目**。
- 默认项目应支持本地 Node/Vite 预览。
- 页面使用远端接口时，开发期应优先走本地 `/api` 代理。
- 对浏览器侧轻量依赖，优先使用批准的公共 CDN，而不是先引入本地打包依赖。
- 页面功能优先复用已有开源工具或组件；只有在复用收益不足时，才自行编码。

## Readiness Gate

在以下信息确认前，不允许进入最终页面实现：

- `DISCOVERY.md`：页面目标、用户、结构、风格已澄清
- `ASSETS.md`：logo、图片、品牌色、字体、占位策略已确认
- `API.md`：接口、鉴权、返回结构、代理方式已确认
- `.webgen/preview.json`：本地预览方式、端口、代理规则已确认
- `.webgen/deps.json`：依赖与命令已确认

若素材或 API 仍为 blocker，只能继续收集信息，不进入最终生成。

## 文件与目录边界

- 所有写操作都必须限制在当前项目目录内。
- 不允许跨项目修改文件。
- 不允许直接修改其它项目、全局 runtime 或外部目录中的业务文件。
- 如需进行路径写入或目录创建，应优先经过项目级 guard 脚本。

## 默认资源策略

默认优先使用以下浏览器侧 CDN 资源：

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

## 预览与验证

- 单页面项目默认通过 `vite` 或其它 Node dev server 本地预览。
- 页面涉及远端接口时，预览必须支持本地代理。
- 交付前必须给出：
  - 改了哪些文件
  - 文件在哪
  - 如何预览
  - 当前 blocker 或剩余风险
- 在声称完成前，尽量完成实际验证。

## 记忆

- 通用经验写入 `memory/`。
- 单个项目的当前状态、背景、交接信息写入项目文档。

## 红线

- 不删除或覆盖非本项目文件。
- 破坏性操作前先确认。
- `trash` 优于 `rm`。
- 不绕开 OpenClaw 运行边界。

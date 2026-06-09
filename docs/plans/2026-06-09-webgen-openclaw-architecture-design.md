# WebGen OpenClaw 兼容架构设计

## 目标

将 `webgen` 设计为一个仅运行在 OpenClaw 内部的常驻 agent，严格遵守 OpenClaw 的 `agent / session / workspace` 约定，并能够稳定地创建、迭代、预览、打包和交付页面项目。

## 核心约束

- 只允许在 OpenClaw 内运行。
- 必须使用 OpenClaw 原生的 `agent`、`session`、`workspace`、startup context 和 internal hooks 模式。
- 不引入独立于 OpenClaw 的外部运行时平台。
- 不再维护第二套 session 真相源。
- 严格保持 `一个 session = 一个项目`。
- 默认只创建单页面项目，除非未来明确修改 workspace 规范。
- 所有文件和命令操作都必须限制在当前项目目录内。
- 最终页面生成前必须通过 Readiness Gate。
- 浏览器侧常见依赖优先使用稳定的公共 CDN。
- 页面功能优先复用成熟开源工具或组件，只有在收益不足时才自行编码。

## 范围

本设计覆盖：

- workspace 目录结构
- session 与 project 的绑定关系
- 技能体系与流程约束
- 人类可读与脚本可读的项目状态分层
- 模板式项目创建
- 素材 / API / 预览三类 readiness gate
- 基于 Node 或 Vite 的本地预览与远端接口代理
- 打包与交付流程
- 单页面输出约束
- CDN 与组件库复用策略

本设计不假设：

- OpenClaw 存在新的平台级 API
- 可以直接注册自定义原生 hook 名称并自动触发
- 仅靠 metadata 文件就能获得系统级沙盒能力

## OpenClaw 与 Workspace 的职责边界

### 由 OpenClaw 提供

- Agent 注册与运行
- Session 生命周期与持久化
- Workspace startup context
- 平台内置 internal hooks
- 通道消息路由与模型调用

### 由 WebGen workspace 提供

- `AGENTS.md` 中的 workspace 规则
- `SOUL.md` 中的 agent 身份与工作方式
- `BOOTSTRAP.md` 中的首次引导
- `SKILLS.md` 中的技能目录与流程规则
- 项目模板
- 项目状态文件
- 项目脚本

## Session 与 Project 模型

- 一个 `webgen` agent 可以长期服务多个 OpenClaw session。
- 每个 OpenClaw session 只绑定一个项目。
- 每个项目都位于 `projects/<project-slug>/`。
- 项目上下文必须通过文件恢复，而不是依赖隐藏记忆。
- 项目的持续对话状态由项目文档和状态文件表达，而不是单独的运行时服务。

## Workspace 目录结构

```text
webgen-workspace/
  AGENTS.md
  SOUL.md
  BOOTSTRAP.md
  TOOLS.md
  SKILLS.md
  memory/
    global/
  templates/
    vite-page/
    next-admin/
    landing-page/
  scripts/
    project-init.sh
    project-guard.sh
    project-preview.sh
    project-package.sh
  docs/
    plans/
  projects/
    <project-slug>/
      PROJECT.md
      DISCOVERY.md
      ASSETS.md
      API.md
      HANDOFF.md
      .webgen/
        project.json
        deps.json
        preview.json
        apis.json
        assets.json
        env-status.json
```

## 单页面项目约束

- 每个生成项目的主交付物都应是单页面。
- 默认目标是可本地预览的单页面应用，或单个静态页面。
- 默认不生成多页面路由结构。
- 即使用户要更多功能，也优先保持在单页面内完成，除非未来显式修改 workspace 规则。

## Markdown 与 JSON 的分层

### 面向人和 agent 恢复上下文的 Markdown 文档

`PROJECT.md`

- 项目摘要
- 当前目标
- 模板与技术栈
- 文件清单
- 预览方式
- 当前 blocker
- 关联文档链接

`DISCOVERY.md`

- 澄清后的需求
- 目标用户
- 页面目标
- 已确认结构
- 未决问题

`ASSETS.md`

- Logo 状态
- 图片清单
- 品牌色与字体
- 是否允许 placeholder / stock / AI 图

`API.md`

- 外部接口清单
- 鉴权方式
- 接口语义
- 请求响应示例说明
- 代理策略

`HANDOFF.md`

- 当前状态
- 最近改动
- 下一步建议
- 风险和注意事项

### 面向脚本执行与 Gate 判断的 JSON 状态

`.webgen/project.json`

- 项目 slug、名称、模板、技术栈、状态

`.webgen/deps.json`

- 包管理器
- Node/Python 版本
- install/dev/build/preview/package 命令

`.webgen/preview.json`

- 运行时类型
- 本地端口
- 健康检查地址
- 远端 API 代理映射

`.webgen/apis.json`

- base URL
- proxy prefix
- 鉴权模式
- endpoint 列表
- 是否允许 mock
- 是否阻塞生成

`.webgen/assets.json`

- 素材完整度
- 必需图片
- 是否允许 placeholder
- 是否阻塞生成

`.webgen/env-status.json`

- 依赖安装状态
- 最近检查、build、preview 时间

## CDN 与组件复用策略

### 默认浏览器侧 CDN 资源

- Axios
  `<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>`
- Tailwind CSS
  `<script src="https://cdn.tailwindcss.com"></script>`
- Lucide Icons
  `<script src="https://unpkg.com/lucide@latest"></script>`
- Web Awesome 样式
  `<link rel="stylesheet" href="https://ka-f.webawesome.com/webawesome@3.8.0/styles/webawesome.css" />`
- Web Awesome Loader
  `<script type="module" src="https://ka-f.webawesome.com/webawesome@3.8.0/webawesome.loader.js"></script>`

### 使用规则

- 对轻量浏览器页面，优先使用上述 CDN 资源。
- 默认单页面模板中应为这些资源预留使用位，即使后续某些项目改为本地依赖打包。
- 对简单浏览器请求，优先用全局 Axios。
- 对快速可预览的单页面 UI，优先使用 Tailwind CDN，除非模板本身明确需要打包版 Tailwind。
- 图标优先使用 Lucide CDN。
- 组件库优先使用 Web Awesome，当它的 primitives 可以替代自写组件或更重的本地组件体系时，应优先复用。

### 复用优先策略

- 在自定义编码前，必须先评估现有开源工具、库或组件是否已满足需求。
- 当复用明显降低实现成本、维护成本或风险时，应优先复用。
- 对非常简单的功能，如果引入库反而更重，则允许自写。
- 对重要的复用或放弃复用决策，应在项目文档中记录原因。

## 技能体系

### 必需流程技能

- `superpowers:using-superpowers`
- `superpowers:brainstorming`
- `superpowers:writing-plans`
- `superpowers:subagent-driven-development`
- `superpowers:verification-before-completion`

### 主设计技能

- `impeccable init`
- `impeccable shape`
- `impeccable critique`
- `impeccable audit`
- `impeccable polish`
- `impeccable adapt`
- `impeccable harden`

### 兜底实现技能

- `frontend-design`

### 需要新增的 workspace 技能

- `project-template-bootstrap`
- `project-delivery`

## 工作流

### 1. Session 启动

- OpenClaw 恢复 session。
- WebGen 优先使用 startup context。
- 如果项目已存在，优先读取 `PROJECT.md` 和 `HANDOFF.md`。
- 如果项目不存在，则进入新项目初始化。

### 2. Discovery

- 使用 `superpowers:brainstorming`。
- 收集页面目标、目标用户、视觉方向、范围和主要结构。
- 将结果写入 `DISCOVERY.md`。

### 3. Readiness Gate

在以下内容确认前，不允许进入最终页面生成：

- `ASSETS.md` 与 `.webgen/assets.json`
- `API.md` 与 `.webgen/apis.json`
- `.webgen/preview.json`
- `.webgen/deps.json`

#### 素材准备

- 确认 logo 来源与文件路径
- 确认所需图片清单
- 确认是否允许 placeholder、stock 或 AI 图
- 确认品牌色和字体

#### API 准备

- 确认远端 base URL
- 确认接口 method 和 path
- 确认鉴权方式与凭据来源
- 确认返回结构或 mock 契约
- 确认是否允许 mock

#### 预览准备

- 确认 Node/Vite 运行时
- 确认本地 dev 命令
- 确认端口与健康检查地址
- 确认本地代理前缀，例如 `/api`
- 确认远端代理目标

#### 复用决策

- 确认页面所需功能是否已有可复用开源能力
- 对每个重要功能做成本收益判断
- 没有合适复用项时，才进入自定义实现

### 4. 页面设计

- 在 Discovery 和 Readiness 完成后，使用 `impeccable shape` 整理页面方案。
- 用户确认后，才进入实现。

### 5. 实现

- 只允许在当前项目根目录内创建或修改文件。
- 优先使用模板默认结构。
- 使用 `.webgen/apis.json` 与 `.webgen/assets.json` 作为执行输入。
- 最终交付必须保持为单页面。
- 浏览器侧需求优先使用 Axios、Tailwind CSS、Lucide 和 Web Awesome 的 CDN 版本，除非当前模板明确要求打包依赖。
- 任何功能实现优先复用已有开源工具或组件。

### 6. 预览

- 在项目根目录中启动本地 Node 或 Vite dev server。
- 通过本地 `/api` 前缀代理远端接口。
- 验证本地预览地址可访问。
- 在受管沙盒或受限执行环境中，本地端口监听可能需要额外授权或提权。

### 7. 验证与打包

- 在完成前执行验证。
- 构建生产产物。
- 打包输出，并生成交付说明。

## 模板策略

每个模板至少应包含：

- `template.json`
- `TEMPLATE.md`
- `scaffold/`
- `post-init/`

第一优先模板为 `vite-page`，应包含：

- `package.json`
- `vite.config.ts`
- `.env.example`
- `src/lib/api.ts`
- `src/assets/placeholders/`
- `docs/api/`

并默认满足：

- 单页面项目结构
- 合理支持 CDN 优先的浏览器资源使用
- 可代理远端 API 的本地预览能力
- 优先复用开源工具与组件

## Guard 与沙盒策略

本设计不把 metadata 文件视为真实沙盒。

真正的约束来自：

- `AGENTS.md` 中的 workspace 规则
- 所有命令只在项目根目录执行
- 辅助脚本中的路径校验
- 拒绝对 `projects/<slug>/` 外部进行写操作

`scripts/project-guard.sh` 是项目级路径与写入约束的统一入口。

## 已验证的运行时发现

- 模板初始化、依赖安装、构建打包可以在当前 workspace 内完成。
- 本地 Vite 预览在受管沙盒中可能无法直接绑定监听端口，需要按 OpenClaw 当前执行环境申请放宽权限。
- 预览进程的长期存活不应只依赖一次性 shell 启动，后续如需更稳定预览，应补充进程管理策略。

## 验收标准

满足以下条件时，本设计视为完整：

- Agent 只使用 OpenClaw 原生 session/workspace 行为
- 默认输出被限制为单页面项目
- 新项目必须由模板创建
- Discovery 与 Readiness 成为强制门槛
- 素材与 API 要求同时以 Markdown 和 JSON 两种形式持久化
- 本地预览通过 Node/Vite 启动，并代理远端 API
- 常用浏览器侧依赖和默认组件库可通过批准的公共 CDN 提供
- 实现阶段明确执行复用优先、再自定义编码的决策规则
- 打包与交付流程文档化且可脚本化

## 实施说明

- 对话与项目记忆优先放 Markdown
- 脚本输入和 gate 判断优先放 JSON
- 第一阶段实现应保持模板驱动、约束明确
- 默认偏向单页面输出、CDN 优先和组件复用优先
- 对任何未在 OpenClaw 中确认的平台能力，暂不做前置假设

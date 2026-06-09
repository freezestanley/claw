# WebGen OpenClaw 实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**目标：** 将当前 WebGen workspace 改造成一个只在 OpenClaw 内运行的单页面生成 agent，具备模板驱动项目创建、Readiness Gate、本地 Vite/Node 预览、远端接口代理以及打包交付能力。

**架构：** OpenClaw 继续作为 runtime 与 session 的唯一拥有者。workspace 负责提供单页面模板、项目文档、项目状态文件、辅助脚本与技能规则。对话和项目上下文主要存放在 Markdown 中，执行关键配置统一存放在 `.webgen/config.json` 中。

**技术栈：** OpenClaw workspace 文件、Markdown、JSON、POSIX shell 脚本、Node/Vite 模板、可选的项目内 Python 工具，以及在合适场景下使用的公共 CDN：Axios、Tailwind CSS、Lucide、Web Awesome。

---

### Task 1：对齐 workspace 顶层规范文件

**文件：**
- 修改：`AGENTS.md`
- 修改：`SOUL.md`
- 修改：`BOOTSTRAP.md`
- 修改：`TOOLS.md`
- 新建：`SKILLS.md`

**Step 1：重写 `AGENTS.md`，明确 OpenClaw-only 规则**

- 保持 `一个 session = 一个项目`
- 保持输出约束为单页面项目
- 保持页面引用资源文件只允许 `.js`
- 保持适配目标至少覆盖 `PC / Pad / H5`
- 强制 `Discovery + Readiness Gate` 后才能进入最终生成
- 强制所有文件操作只能在 `projects/<slug>/` 下进行
- 规定 `PROJECT.md` 是项目恢复时的首要入口
- 加入“先复用开源能力，再考虑自定义实现”的原则

**Step 2：重写 `SOUL.md`**

- 强调 WebGen 的职责是生成可运行、可预览、可代理 API 的页面
- 明确缺少素材或 API 信息时，必须先收集，不直接实现

**Step 3：重写 `BOOTSTRAP.md`**

- 将其限定为首次引导
- 加入 `templates/`、`SKILLS.md`、Node/Python 可用性检查
- 删除项目级依赖安装和长期编排假设

**Step 4：重写 `TOOLS.md`**

- 只保留执行能力和约束
- 增加 preview/build/package/proxy 约定
- 增加默认 CDN 资源约定：Axios、Tailwind CSS、Lucide、Web Awesome

**Step 5：创建 `SKILLS.md`**

- 记录 superpowers 流程链
- 记录 Impeccable 设计链
- 记录 `adapt` 作为默认适配技能
- 记录 `impeccable` 负责设计与校正、`frontend-design` 负责实现的职责边界
- 记录 Readiness Gate
- 记录复用优先规则
- 记录 workspace 自定义 skill 占位

**Step 6：验证规范文件内容**

Run: `rg -n "Readiness Gate|一个 session = 一个项目|单页面|vite|proxy|axios|webawesome|复用" AGENTS.md SOUL.md BOOTSTRAP.md TOOLS.md SKILLS.md`

Expected：关键规则已出现在更新后的文档中。

### Task 2：建立 workspace 模板结构

**文件：**
- 新建：`templates/vite-page/template.json`
- 新建：`templates/vite-page/TEMPLATE.md`
- 新建：`templates/vite-page/scaffold/package.json`
- 新建：`templates/vite-page/scaffold/vite.config.js`
- 新建：`templates/vite-page/scaffold/.env.example`
- 新建：`templates/vite-page/scaffold/src/lib/api.js`
- 新建：`templates/vite-page/scaffold/src/assets/placeholders/.gitkeep`
- 新建：`templates/vite-page/scaffold/docs/api/.gitkeep`

**Step 1：定义 `template.json`**

- 写入模板 id、stack、包管理器、默认命令、默认 skill 指引
- 明确模板默认只生成单页面

**Step 2：编写 `TEMPLATE.md`**

- 说明模板用途
- 说明 API 代理机制
- 说明素材放置规则
- 说明默认 CDN 资源与何时仍需打包依赖

**Step 3：搭建最小可预览的 Vite 单页面模板**

- 在 `vite.config.js` 中配置代理
- 在 `src/lib/api.js` 中提供统一请求层
- 保持单页面默认结构
- 为 Axios、Tailwind CSS、Lucide、Web Awesome 的 CDN 使用预留位置
- 明确禁止模板生成 `.ts` / `.tsx` 资源引用

**Step 4：验证模板完整性**

Run: `find templates/vite-page -type f | sort`

Expected：模板文件齐全。

### Task 3：建立项目 Markdown 骨架

**文件：**
- 新建：`projects/.gitkeep`
- 新建：`templates/vite-page/post-init/PROJECT.md.tpl`
- 新建：`templates/vite-page/post-init/DISCOVERY.md.tpl`
- 新建：`templates/vite-page/post-init/ASSETS.md.tpl`
- 新建：`templates/vite-page/post-init/API.md.tpl`
- 新建：`templates/vite-page/post-init/HANDOFF.md.tpl`

**Step 1：创建通用 Markdown 模板**

- 提供摘要、blocker、预览方式、readiness 状态等段落
- 提供 `PC / Pad / H5` 的适配目标与断点策略段落

**Step 2：在模板中引用 JSON 状态**

- `PROJECT.md` 链接 `DISCOVERY.md`、`ASSETS.md`、`API.md`、`HANDOFF.md`
- `ASSETS.md` 说明 `.webgen/config.json` 中的 `assets` 节点
- `API.md` 说明 `.webgen/config.json` 中的 `apis` / `preview` 节点

**Step 3：增强文档约束表达**

- 在 `PROJECT.md.tpl` 中显式写明“单页面项目”
- 在 `ASSETS.md.tpl` 与 `API.md.tpl` 中加入“Blocking / Ready / Not Ready” 段落
- 在相关模板中加入复用决策记录区

**Step 4：验证模板可读性**

Run: `sed -n '1,200p' templates/vite-page/post-init/PROJECT.md.tpl`

Expected：输出为清晰的人类可读项目骨架。

### Task 4：建立 `.webgen` 状态骨架

**文件：**
- 新建：`templates/vite-page/post-init/config.json.tpl`

**Step 1：创建最小 JSON 模板**

- 只保留执行关键字段
- 不重复冗长 Markdown 内容
- 在项目元数据中加入单页面模式标记

**Step 2：将 Readiness Gate 编码进 `config.json`**

- `config.assets` 与 `config.apis` 必须包含 `blocking`
- `config.preview` 必须包含 runtime、port、healthcheck、proxy
- `config.adaptation` 必须包含 targets、breakpoints、orientation、interaction
- `config.deps` 必须包含 install/dev/build/preview/package 命令

**Step 3：验证 JSON 有效性**

Run: `node -e "JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8')); console.log('ok')" templates/vite-page/post-init/config.json.tpl`

Expected：输出 `ok`

### Task 5：实现项目辅助脚本

**文件：**
- 新建：`scripts/project-init.sh`
- 新建：`scripts/project-guard.sh`
- 新建：`scripts/project-preview.sh`
- 新建：`scripts/project-package.sh`

**Step 1：实现 `project-guard.sh`**

- 校验 slug 输入
- 解析并校验 realpath
- 拒绝写入 `projects/<slug>/` 外路径

**Step 2：实现 `project-init.sh`**

- 复制所选模板 scaffold
- 将 Markdown / JSON 模板渲染到项目目录
- 创建 `.webgen/`

**Step 3：实现 `project-preview.sh`**

- 读取 `.webgen/config.json`
- 在项目根目录启动本地 dev server
- 检查本地健康检查地址

**Step 4：实现 `project-package.sh`**

- 读取 `.webgen/config.json` 中的 `deps.commands.build`
- 收集产物路径
- 输出交付说明

**Step 5：校验脚本语法**

Run: `bash -n scripts/project-init.sh scripts/project-guard.sh scripts/project-preview.sh scripts/project-package.sh`

Expected：无输出，退出码为 0。

### Task 6：编码 Readiness Gate 工作流

**文件：**
- 修改：`SKILLS.md`
- 修改：`templates/vite-page/post-init/PROJECT.md.tpl`
- 修改：`templates/vite-page/post-init/DISCOVERY.md.tpl`
- 修改：`templates/vite-page/post-init/ASSETS.md.tpl`
- 修改：`templates/vite-page/post-init/API.md.tpl`

**Step 1：记录 Gate 顺序**

- Discovery
- Assets
- APIs
- Preview
- Reuse Decision
- Adaptation
- Design Confirmation
- Implementation

**Step 1.5：记录默认实战链**

- `superpowers:brainstorming`
- `impeccable shape`
- `impeccable adapt`
- `impeccable harden`
- `frontend-design`
- `impeccable audit`
- `impeccable polish`
- `superpowers:verification-before-completion`

**Step 2：在 Markdown 模板中显式展示 blocker**

- 增加 `Blocking` 段落
- 增加 `Ready / Not Ready` 检查点
- 增加 `复用还是自定义实现` 的简短决策区

**Step 3：验证文档可自解释**

Run: `rg -n "Blocking|Ready|Not Ready|Readiness Gate|复用" SKILLS.md templates/vite-page/post-init/*.tpl`

Expected：关键 gate 概念都已出现。

### Task 7：加入预览、代理与 CDN 默认值

**文件：**
- 修改：`templates/vite-page/scaffold/vite.config.js`
- 修改：`templates/vite-page/scaffold/src/lib/api.js`
- 修改：`templates/vite-page/scaffold/package.json`
- 修改：`templates/vite-page/post-init/config.json.tpl`

**Step 1：统一代理路径**

- 本地统一使用 `/api`
- 通过 Vite proxy 转发到远端 base URL

**Step 2：统一 API 客户端行为**

- 开发期请求优先走本地 `/api` 前缀
- 对简单浏览器侧请求，优先使用 CDN 版 Axios，而不是先打包本地 axios

**Step 3：统一默认 CDN 资源**

- 在模板中记录并预留：
  - Axios CDN
  - Tailwind CDN
  - Lucide CDN
  - Web Awesome 样式和 loader
- 只有在模板或功能复杂度明确要求时，才保留打包依赖替代方案

**Step 4：验证模板具备预览与依赖默认值**

Run: `rg -n "/api|proxy|target|healthcheck|axios|tailwindcss|lucide|webawesome|main\\.js|api\\.js|vite\\.config\\.js" templates/vite-page/scaffold/vite.config.js templates/vite-page/scaffold/src/lib/api.js templates/vite-page/scaffold/src/main.js templates/vite-page/scaffold/package.json templates/vite-page/post-init/config.json.tpl`

Expected：代理和默认依赖约束都已出现。

### Task 8：加入交付与交接约定

**文件：**
- 修改：`SKILLS.md`
- 修改：`templates/vite-page/post-init/HANDOFF.md.tpl`
- 修改：`scripts/project-package.sh`

**Step 1：定义交付输出**

- Preview URL
- Build 命令
- 产物目录
- Outstanding blockers
- 对维护有影响的复用/自定义实现决策说明

**Step 2：让 `HANDOFF.md` 承担项目交接摘要**

- 增加当前状态、下一步、预览命令、打包说明段落

**Step 3：验证交付文档覆盖面**

Run: `rg -n "preview|build|artifact|next actions|复用" SKILLS.md templates/vite-page/post-init/HANDOFF.md.tpl scripts/project-package.sh`

Expected：交付与交接要点都已覆盖。

### Task 9：执行端到端 dry run

**文件：**
- 使用：`scripts/project-init.sh`
- 使用：`scripts/project-preview.sh`
- 使用：`scripts/project-package.sh`

**Step 1：创建演示项目**

Run: `bash scripts/project-init.sh demo-site vite-page`

Expected：创建 `projects/demo-site/`，其中包含 Markdown 文档、`.webgen/` 状态文件以及页面 scaffold。

**Step 2：在项目内安装依赖**

Run: `cd projects/demo-site && pnpm install`

Expected：项目内依赖安装完成。

**Step 3：启动预览**

Run: `bash scripts/project-preview.sh demo-site`

Expected：输出本地预览地址，健康检查成功。

**Step 4：执行打包**

Run: `bash scripts/project-package.sh demo-site`

Expected：构建产物生成，交付说明输出。

**Step 5：检查最终文件**

Run: `find projects/demo-site -maxdepth 3 -type f | sort`

Expected：项目文档、`.webgen` 文件和页面 scaffold 都已生成。

**Step 6：验证约束是否落地**

Run: `rg -n "单页面|axios|tailwindcss|lucide|webawesome|复用" projects/demo-site PROJECT.md templates/vite-page/TEMPLATE.md`

Expected：演示项目和模板文档都体现了单页面、CDN 组件库和复用优先约束。

### Task 10：文档收口

**文件：**
- 修改：`docs/plans/2026-06-09-webgen-openclaw-architecture-design.md`
- 修改：`docs/plans/2026-06-09-webgen-openclaw-implementation-plan.md`

**Step 1：回写实施中发现的真实约束**

- 如果 OpenClaw 实际约束与设计不同，则更新设计文档
- 如果路径或命令在实施时调整，则同步更新计划文档

**Step 2：记录残余风险**

- 平台 hook 扩展点不足
- 远端 API 鉴权处理仍有缺口
- Preview 进程清理与端口复用问题
- 受管沙盒下的本地端口监听可能需要提权或额外授权

**Step 3：提交**

```bash
git add AGENTS.md SOUL.md BOOTSTRAP.md TOOLS.md SKILLS.md templates scripts docs/plans
git commit -m "docs: define OpenClaw-compatible WebGen architecture and rollout plan"
```

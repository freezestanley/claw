# AGENTS.md — WebGen 工作区

这是 WebGen agent 的家。专职：**自动生成系统页面 / 网站**。

## 多项目 / 多 Session 规则（重要）

- **每个 session 对应一个独立项目**，项目文件存放在独立文件夹：
  - 根目录：`~/.openclaw/webgen-workspace/projects/`
  - 每个项目一个子目录：`projects/<project-slug>/`
- **首次进入一个新 session 时：**
  1. 根据用户需求或 session-key 确定一个 `project-slug`（小写、连字符，如 `admin-dashboard`、`landing-saas`）。
  2. 创建 `projects/<project-slug>/` 目录，所有产物都写在这里。
  3. 在该目录内维护一个 `PROJECT.md`，记录：项目名、目标、技术栈、文件清单、预览方式、进度。
- **后续回到同一 session 时：** 先读该项目目录的 `PROJECT.md` 恢复上下文，再继续。
- 不要跨项目修改其它目录的文件。

## 产出约定

- 静态网站：`index.html` + `assets/`（css/js/img），可直接 `open` 预览。
- 系统页面（后台/表单/管理端）：按所选框架组织目录，附 `README` 说明启动命令。
- 每次交付都汇报：**改了哪些文件 / 文件在哪 / 怎么预览**。

## 预览与验证

- 静态：`open projects/<slug>/index.html`，或 `python3 -m http.server` 起本地服务。
- 框架项目：给出 `npm install && npm run dev` 一类命令。
- 交付前尽量自己验证（语法、能否打开）。

## 记忆

- 跨项目的通用经验写入 `~/.openclaw/webgen-workspace/memory/`。
- 单个项目的状态写入该项目目录的 `PROJECT.md`。

## 红线

- 不删除/覆盖非本项目文件。
- 破坏性操作（删目录、清空文件）前先确认。
- `trash` 优于 `rm`。

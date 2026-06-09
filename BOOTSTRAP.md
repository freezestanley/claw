# BOOTSTRAP.md - 首次启动引导

欢迎使用墨界。

当前检查到的缺失配置：
1. `NEXT_PUBLIC_BASE_API_URL` 未设置，请提供后端 API 地址。
2. 未检测到 GitHub 仓库，请在对话中说“创建仓库 <name>”。

**初始化步骤**：
1. 我将在 30 秒后开始扫描目录，确认是否有 Node.js 项目文件。
2. 如果缺失 `package.json`，我将触发 `npm init` 并安装 Next.js 依赖。
3. 安装完成后，创建示例页面 `app/page.tsx`。
4. 输出骨架后提示用户：“初始化完成。是否需要我生成 Landing Page？”

> ⚠️ 注意：此文件将在初始化完成后自动删除，再次重启不会重新触发引导。
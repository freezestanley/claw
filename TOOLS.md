# TOOLS.md - 我的工具箱

| 工具名 | 用途 | 使用规范 |
|--------|------|----------|
| `frontend-design` | 将设计稿转为 HTML/CSS 骨架 | 输出需包含 Tailwind 类名和响应式断点；生成的代码不要修改现有路由逻辑 |
| `github-pages-deploy` | 一键部署到 GitHub Pages / Cloudflare Pages | 必须配置 `NEXT_PUBLIC_` 环境变量；部署前运行 `npm run build` 确保无报错 |
| `api-integration` | 调用第三方 API 生成模拟数据或真实接口 | 调用前检查 API 密钥是否存在，缺失时提示用户配置；调用失败时有 3 次重试机制 |
| `browser-tools` | 浏览器自动化（测试、截图） | 仅在 headless 模式下运行；默认使用 `chromium` 并配置 viewport 为 1920x1080 |

**工具调用原则**：
- 同一任务中若需多次调用 API，优先复用已有连接（避免重复握手）
- 调用外部服务前先检查网络连通性，超时设置为 30 秒
- 所有工具的调用日志必须记录到 `workspace/logs/tools.log`
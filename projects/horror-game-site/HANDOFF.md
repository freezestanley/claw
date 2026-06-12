# HANDOFF.md

## 当前状态
- 首版恐怖游戏官网已生成并通过 CDP 实地验证（dev-preview）。
- 预览地址：http://127.0.0.1:4521/ （vite dev，PORT=4521）

## 文件结构
- `index.html` — head/字体/Tailwind 配置/全局样式（grain/vignette/flicker/reduced-motion）
- `src/main.js` — 入口，渲染 + 初始化动效
- `src/site/data.js` — 全部文案与图片 URL（改内容只动这里）
- `src/site/render.js` — 各 section 模板（nav/hero/trailer/story/features/gallery/cast/platforms/newsletter/footer）
- `src/site/motion.js` — 滚动揭示、hero intro、nav 滚动、表单、预告占位
- `.webgen/cdp-check.mjs` — CDP 验证脚本（端口 9333）

## 验证结果
- HTTP 200；8 个板块齐全；11/11 图片加载、0 破图；控制台 0 报错；390px 移动端无横向溢出。

## 已知占位 / 待迭代
- 游戏名、文案、平台、发售日均为占位（见 DISCOVERY.md）。
- 图片为 Unsplash 热链，待人工核对贴题性（见 ASSETS.md）。
- 预告片为占位卡片（无真实视频）；订阅表单仅前端校验。

## 后端联调区（新增）
- 入口：`#/tools`（hash 路由），与 ASHFALL 首页共存，dev-tool 清爽风延续暗黑配色。
- 文件：`src/tools/api.js`（fetch 封装+token+兜底）、`src/tools/render.js`（UI）、`src/tools/controller.js`（交互）。
- 三接口：POST /upload、GET /users/search、POST /auth/login（详见 API.md）。
- CDP 实测：3 panel DOM 齐全、role 下拉(admin/user/editor)、移动端 390px 无溢出、0 报错；后端真实在跑，搜索返回 6 条真实数据、登录成功；路由首页↔tools 往返正常。

## 预览/构建命令
- dev: `PORT=4521 pnpm dev`
- build: `pnpm build`（产出 dist/ + dist.zip）

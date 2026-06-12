# HANDOFF.md — dunk-hero

## 项目
飞跃 FLYDUNK · 漫画风篮球飞人单页宣传站（占位品牌，自绘 SVG 插画，避免侵权）。

## 当前状态
首版已实现并通过 DOM/HTTP 级验证。预览运行中。等待老板确认是否还要调整，再决定是否 build。

## 改了哪些文件
- `index.html` —— 标题/描述、comic 字体（Bangers/Archivo Black/Noto Sans SC）、CSS 变量配色、reduced-motion 降级。
- `src/main.js` —— 让生成页全屏接管 `#app`（营销页不套预览壳卡片）。
- `src/generated/page.js` —— 主页面：导航 / Hero / 能力值 / 招牌动作分镜 / 数据战绩 / 画廊 / 报名CTA / 页脚。
- `src/generated/svg-art.js` —— 自绘 inline SVG：飞人扣篮主插画、logo、分镜动作、画廊剪影。
- `src/generated/motion.js` —— anime.js 轻动效：reveal 入场、数字滚动、拟声词弹入；尊重 prefers-reduced-motion。
- `src/generated/form.js` —— 报名表单前端校验 + mock 提交 + 成功态（预留 `/api` 接口位）。
- 文档：DISCOVERY.md / ASSETS.md / API.md。

## 如何预览
- 启动：`sh scripts/project-preview.sh dunk-hero`（在 workspace 根目录）
- 地址：http://127.0.0.1:4282/
- 停止：`sh scripts/project-preview-stop.sh dunk-hero`

## 设计要点
- American comic 风：米白纸张底 + 纯黑粗描边 + 撞色（电光蓝/烈焰橙红/明黄/洋红）+ 半调网点 + speed lines + 拟声词。
- 反模板：无 AI 紫渐变、无居中深色 hero 套路、面板带 6px 黑色硬阴影、分镜错位。
- 适配 PC/Pad/H5，触控热区 ≥44px，hover 效果均有非 hover 基础态。

## 验证记录
- HTTP 200：`/`、`/src/generated/page.js`、`/src/generated/svg-art.js`。
- CDP DOM 校验：title/H1/6 sections/16 SVG（0 破图）/导航单行 68px/表单 2 输入/拟声词可见/hero SVG 442×442/body 背景米白。
- 控制台 0 error、0 exception。
- **未做截图级视觉校验**：image 视觉模型当前不可用（403），按工作区约定跳过截图环节，以 DOM/HTTP 校验替代。

## 剩余风险 / 待办
- 视觉级（贴题性/构图美感）未经人工或视觉模型确认，建议老板浏览器实地过目。
- 报名表单为前端 mock，无真实后端；接真实接口时改 `form.js` 走 `runtime.api.post('/api/signup', ...)`。
- SVG 飞人为占位风格剪影，如需更精致插画可迭代。
- 数字滚动依赖滚动进入视口触发（IntersectionObserver），首屏静止显示为预期。

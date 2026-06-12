# 动画技术栈与模板默认（常驻）

## 背景
WebGen 生成页面需要统一的动画方案：轻量动效用什么、复杂动画用什么，并在模板里默认就绪。

## 规则（用户 2026-06-11 确认）

### 轻量动效 → anime.js
- scaffold `index.html`（vite-page / demo-site 两个模板）已默认引入：
  ```html
  <script src="https://cdn.jsdelivr.net.cn/npm/animejs/dist/bundles/anime.umd.min.js"></script>
  <script>window.anime && (window.animate = anime.animate || anime);</script>
  ```
- 用法：`const { animate } = anime;`（UMD 从全局 `anime` 暴露）。
- 适用：淡入、位移、缩放、数字滚动等轻量场景。

### 复杂动画 → GSAP + gsap-skills
- 时间轴编排、ScrollTrigger 滚动驱动、SVG MorphSVG/MotionPath、Flip 布局过渡等，优先用 GSAP。
- 已安装 GSAP 官方 AI 技能包 `greensock/gsap-skills`（多技能包，根目录无单一 SKILL.md，按子目录逐个安装）。
- 已装入 webgen 工作区 `skills/` 的 8 个技能（均 ✓ ready）：
  gsap-core / gsap-timeline / gsap-scrolltrigger / gsap-plugins / gsap-react / gsap-frameworks / gsap-performance / gsap-utils
- 设计/实现动画时参考这些技能获取正确用法与最佳实践。

### 通用约束
- 动画须尊重 `prefers-reduced-motion`，提供降级，不阻碍首屏关键内容可用。

## 安装方式备忘（gsap-skills 多技能包）
- 该仓库根目录无 SKILL.md，`openclaw skills install git:<repo>` 会报 "archive is missing SKILL.md"。
- 正确做法：clone 后对 `skills/<name>/` 逐个安装：
  `openclaw skills install <local-skill-dir> --agent webgen --as <name> --force`

## 相关位置
- 约束：`AGENTS.md`「默认资源策略」「动画策略」；`TOOLS.md`「默认浏览器侧资源」。
- 模板：`templates/vite-page`（TEMPLATE.md 动画策略段；template.json defaultSkills 含 gsap-skills）、`templates/demo-site` scaffold index.html。

# vite-page 模板

## 目标

这个模板用于创建 **单页面** 项目，默认支持：

- 本地 Vite 预览
- 开发期 `/api` 代理远端接口
- 浏览器侧 CDN 优先资源
- 后续打包交付
- 全程使用 JavaScript，不使用 TypeScript
- 页面中引用的入口、模块和配置文件均应为 `.js`
- 设计与实现默认要求兼顾 `PC / Pad / H5` 三类设备
- 生成前必须先确认断点、触控热区、Pad 横竖屏和 H5 首屏重点

## 默认资源策略

优先使用以下公共 CDN：

- Axios
- Tailwind CSS
- Lucide
- Web Awesome
- anime.js（页面轻量动效）
  `<script src="https://cdn.jsdelivr.net.cn/npm/animejs/dist/bundles/anime.umd.min.js"></script>`
  使用：`const { animate } = anime;`

只有在模板或功能复杂度明确要求时，才改为本地依赖打包。

## 动画策略

- **轻量动效**（淡入、位移、缩放、数字滚动等）优先用 **anime.js**（已在 scaffold `index.html` 引入）。
- **复杂动画**（时间轴编排、ScrollTrigger 滚动驱动、SVG MorphSVG/MotionPath、Flip 布局过渡等）优先用 **GSAP**，并参考已安装的 `gsap-skills`（GSAP 官方 AI 技能：core/timeline/ScrollTrigger/插件用法与最佳实践）。
- 动画须尊重 `prefers-reduced-motion`，提供降级。

## API 代理

- 开发期本地请求统一优先走 `/api`
- `vite.config.js` 负责将 `/api` 转发到远端目标
- 项目级目标地址后续统一写入 `.webgen/config.json`

## 素材约定

- Logo、图片、品牌色和字体需在实现前完成确认
- 缺失素材时，必须在 `ASSETS.md` 中标明是否允许 placeholder / stock / AI 图

## 复用优先

- 组件优先复用 Web Awesome 或其它成熟开源组件
- 对简单功能，只有在复用收益不足时才自定义编码

## 适配要求

- 默认适配技能为 `adapt`
- 页面不能只做桌面布局缩放，必须明确 `PC / Pad / H5` 的信息重排策略
- 默认最小触控热区不小于 `44px`
- 不允许把核心功能仅绑定在 hover 交互上

# vite-page 模板

## 目标

这个模板用于创建 **单页面** 项目，默认支持：

- 本地 Vite 预览
- 开发期 `/api` 代理远端接口
- 浏览器侧 CDN 优先资源
- 后续打包交付

## 默认资源策略

优先使用以下公共 CDN：

- Axios
- Tailwind CSS
- Lucide
- Web Awesome

只有在模板或功能复杂度明确要求时，才改为本地依赖打包。

## API 代理

- 开发期本地请求统一优先走 `/api`
- `vite.config.ts` 负责将 `/api` 转发到远端目标
- 项目级目标地址后续写入 `.webgen/preview.json` 和 `.webgen/apis.json`

## 素材约定

- Logo、图片、品牌色和字体需在实现前完成确认
- 缺失素材时，必须在 `ASSETS.md` 中标明是否允许 placeholder / stock / AI 图

## 复用优先

- 组件优先复用 Web Awesome 或其它成熟开源组件
- 对简单功能，只有在复用收益不足时才自定义编码

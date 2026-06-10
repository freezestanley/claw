# demo-site 模板

## 目标

这个模板来自原 `projects/demo-site` 演示项目，现已转换为可复用模板。

默认提供：

- 单页面项目结构
- JavaScript-only 实现
- Vite 本地预览
- `/api` 远端接口代理
- Tailwind CSS、Axios、Lucide、Web Awesome 的 CDN 接入
- `PC / Pad / H5` 适配约束

## 适用场景

- 需要快速启动一个可预览的单页面项目
- 需要保留 WebGen 当前默认的 CDN 优先策略
- 需要在实现前完成素材、API 和适配信息收集

## 使用要求

- 生成前必须完成 `DISCOVERY.md`、`ASSETS.md`、`API.md`
- 仅允许使用 `.js`，禁止 `.ts` / `.tsx`
- 重要功能优先复用 Web Awesome 或其它成熟开源能力
- 开发期远端接口优先通过本地 `/api` 代理访问

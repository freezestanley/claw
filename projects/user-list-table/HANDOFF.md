# HANDOFF — user-list-table

## 当前状态
独立新项目，已锁定 slug，按默认假设直接实现。

## 预览
```
cd projects/user-list-table
npm install
npm run dev
```
默认 vite 端口见 .webgen/config.json。

## 结构
- index.html：单页面入口（CDN 资源 + 挂载点）
- src/main.js：应用逻辑（fetch/mock/渲染/分页/筛选/排序/弹层）
- vite.config.js：dev server + /api 代理
- mock：内置于 main.js 的降级数据

## 待确认
见 DISCOVERY.md 默认假设 A1–A5。

# Handoff

## 当前进度

- 项目脚手架已生成（vite-page 模板）。
- 后台管理页面已实现：侧边栏 + 顶部栏 + 工具条 + 用户数据表格 + 分页。
- 功能：搜索(防抖)、状态筛选、列排序(ID/姓名/时间)、客户端分页(每页 10/20/50)、删除/新增/编辑演示占位。
- 浅色主题，PC/Pad/H5 自适应（移动端侧栏抽屉 + 表格横向滚动）。
- 数据 mock(87 条)，预留 `GET /api/users`。

## 改了哪些文件

- `index.html`（浅色基底 + CDN）
- `src/main.js`（挂载后台页到 #app）
- `src/generated/page.js`（后台主体实现）
- `DISCOVERY.md` / `API.md` / `ASSETS.md` / `PROJECT.md` / `.webgen/config.json`

## 如何预览

```sh
cd projects/admin-table-console
pnpm install
pnpm dev   # 默认端口 4259
```

## 下一步 / 剩余风险

- 接真实数据：`src/generated/page.js` 中 `USE_MOCK=false`，后端按 API.md 提供 `GET /api/users`。
- 大数据量：建议改服务端分页（API.md 有改造说明）。
- 编辑/新增/删除目前仅前端演示，需要时接真实表单与接口。

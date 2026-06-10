# 后台管理页面 · 用户列表

- **Slug**：`admin-table-console`
- **类型**：后台管理单页面（vite-page 模板）
- **状态**：active（mock 模式，可预览交付）
- **创建来源**：main agent 转交「生成一个后台管理页面 数据table列表和分页」

## 概述

admin 风格后台管理界面：用户列表数据表格 + 分页，含搜索、状态筛选、列排序。

## 结构

- 左侧边栏（导航，PC 常驻 / 移动端抽屉）
- 顶部栏（标题 + 菜单按钮 + 头像）
- 工具条（搜索 + 状态筛选 + 新增按钮）
- 数据表格（ID/用户/角色/状态/注册时间/操作）
- 分页（页码 + 上下页 + 每页条数 10/20/50 + 总数）

## 技术

- 单页面 + Vite 本地预览
- Tailwind CDN + Lucide + Axios（无第三方表格组件，纯 JS 实现）
- 浅色主题，PC / Pad / H5 自适应
- mock 数据（87 条），预留 `GET /api/users` 真实接口

## 关键文件

- `src/generated/page.js`：后台主体（布局 + 表格 + 分页 + 筛选/排序 + mock）
- `src/main.js`：挂载到 `#app`
- `index.html`：CDN + 浅色基底
- `.webgen/config.json`：预览端口 `4259`

## 预览

```sh
cd projects/admin-table-console
pnpm install
pnpm dev   # 端口 4259（见 .webgen/config.json）
```

## 当前状态 / Blocker

- 无 blocker（mock 模式）。
- 编辑/新增/删除为前端演示占位；切真实接口见 API.md。
- 当前为客户端分页，大数据量建议改服务端分页（API.md 有说明）。

# Discovery

## Design Read

- 页面类型：开发者工具 / API 联调台（developer console），非营销站。
- 受众：开发者 / 测试，自用为主。
- 风格语言：干净清爽的 dev-tool 风格，信息密度偏高，等宽字体呈现响应/状态码/耗时；中性配色（slate/zinc）+ 单一强调色，无营销渐变。
- 设计体系：紧凑卡片分区（三块）+ 顶部全局 Base URL 配置条 + 每个请求的状态/耗时/状态码可视化。
- 档位：`DESIGN_VARIANCE=low`（工具类，重一致性与可读性）/ `MOTION_INTENSITY=low`（仅状态反馈微动效）/ `VISUAL_DENSITY=high`（联调台，密度高）。

## 页面目标

- 对三个后端接口做真实 fetch 联调，可视化响应、状态码、耗时；可切换 Base URL。

## 页面结构

1. 顶部：Base URL 配置条（存 localStorage）+ 全局连接状态。
2. 登录区 `/auth/login`：表单 + token 管理（存/清 localStorage）。
3. 搜索区 `/users/search`：多参数表单 + 结果表格 + 分页。
4. 上传区 `/upload`：多文件选择 + 上传 + 返回 files 渲染。

## 风格方向

- dev-tool / console，slate 深浅中性 + emerald 强调，JetBrains Mono 等宽呈现响应体。

## 适配目标

- PC：三块可并排/两列网格，宽表格完整呈现。
- Pad：两列或单列堆叠，表格可横向滚动。
- H5：单列堆叠，表单纵向，表格横向滚动容器，触控热区 ≥44px。

## 断点策略

- H5 ≤767，Pad 768–1023，PC ≥1024（Tailwind sm/md/lg/xl）。

## 交互约束

- 不依赖 hover（按钮/链接均有非 hover 可见状态）。
- 最小触控热区 ≥44px。
- 移动端无横向溢出（表格放 `overflow-x-auto` 容器内）。

## 适配检查清单

- [x] PC/Pad/H5 主要任务一致（都是发请求+看响应）
- [x] 内容驱动断点（lg 并排，sm 堆叠）
- [x] 导航：单页无导航，分区锚点足够
- [x] 核心内容小屏不隐藏
- [x] 按钮/表单满足触控
- [x] 表格在 Pad/H5 横向滚动降级

## 复用还是自定义实现

- 复用：Tailwind（CDN）排版、anime.js 微动效。
- 自定义：三接口的 fetch 逻辑、token 管理、分页、错误兜底（纯 vanilla JS）。

## Ready / Not Ready

- 当前状态：`Ready`

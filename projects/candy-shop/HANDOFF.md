# HANDOFF.md — candy-shop

## 当前进度
- 单页已实现并通过 CDP 验证（DOM/加购/抽屉/合计/H5 适配/0 控制台错误）。
- 预览运行中：http://127.0.0.1:4369/
- 待用户确认是否还有修改，再进入 build。

## 关键文件
- `index.html`：CDN 资源 + 挂载点
- `src/main.js`：挂载入口
- `src/generated/page.js`：整页结构与交互（含购物车）
- `vite.config.js`：dev/preview/proxy + 打包 zip

## 预览
- 见 `.webgen/config.json`（host/port）。

## 待办 / 风险
- image 视觉模型当前 403 不可用，本轮未做截图级人工核对（已用 DOM/交互/控制台校验替代）。
- 商品/价格/评价均为 mock，待替换。
- 购物车为前端内存态，刷新即清空；非真实结账。

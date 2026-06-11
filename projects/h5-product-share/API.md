# API

## 接口目标

- 提供商品详情、下单与分享相关数据（当前 mock）。

## Endpoint 清单（建议，当前未真正调用）

- `GET /api/product/:id` —— 商品详情（与 `PRODUCT` 同构）
- `POST /api/cart` —— 加入购物车 `{ productId, qty }`
- `POST /api/order` —— 下单
- `GET /api/share/:id` —— 分享参数/海报（可选）

## 代理约定

- 开发期 `/api` 代理，`.env` 配 `VITE_API_PROXY_TARGET`。

## 分享能力

- 优先 `navigator.share`（H5 原生分享面板）；不支持时回退复制链接 + 提示。
- 微信内分享通常需 JS-SDK（wx.config + updateAppMessageShareData），接入时再加。

## Blocking

- 当前状态：`Non-Blocking`（mock 模式，纯展示 + 演示交互即可预览）。

## 复用决策

- 请求复用 scaffold 自带 `src/lib/api.js`。

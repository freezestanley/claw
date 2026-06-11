# H5 产品分享页 · 无界蓝牙降噪耳机 Pro

- **Slug**：`h5-product-share`
- **类型**：H5 移动端产品分享落地页（vite-page 模板）
- **状态**：active（mock 模式，可预览交付）
- **创建来源**：main agent 转交「新建一个 H5 的产品分享页面」

## 概述

移动优先的单品分享落地页：好友分享 → 打开看专享价 → 加购/购买/再分享。

## 板块

分享来源条 → 主视觉 → 价格/促销 → 核心卖点(4) → 横向图集 → 规格参数 → 用户评价 → 底部固定行动栏 → 分享浮层

## 技术

- 单页面 + Vite 本地预览
- Tailwind CDN + Lucide（无第三方 UI 库）
- 移动优先；Pad/PC 居中 max-w 480 手机卡片承载
- 底部安全区适配 `env(safe-area-inset-bottom)`
- 分享优先 `navigator.share`，回退复制链接

## 关键文件

- `src/generated/page.js`：H5 主体（全部板块 + 分享/交互）
- `src/main.js`：挂载到 `#app`
- `index.html`：移动 viewport + OG meta + CDN
- `.webgen/config.json`：预览端口 `4320`

## 预览

```sh
cd projects/h5-product-share
pnpm install
pnpm dev   # 端口 4320（见 .webgen/config.json）
# 建议用浏览器移动端模拟(DevTools 设备模式)查看 H5 效果
```

## 当前状态 / Blocker

- 无 blocker（mock 模式）。
- 商品/下单/分享均为演示占位；商品图、下单接口、微信 JS-SDK 分享接入见 API.md。

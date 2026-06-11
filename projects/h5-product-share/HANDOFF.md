# Handoff

## 当前进度

- 项目脚手架已生成（vite-page 模板）。
- H5 产品分享页已实现，移动优先：
  分享来源条 / 主视觉 / 价格促销 / 卖点(4) / 横向图集 / 规格 / 评价 / 底部固定行动栏 / 分享浮层。
- 交互：分享浮层底部滑入、收藏切换、加购/购买演示、分享优先 navigator.share 回退复制链接。
- 大屏(Pad/PC)居中 480 手机卡片承载，底部安全区适配。

## 改了哪些文件

- `index.html`（移动 viewport + OG meta + CDN）
- `src/main.js`（挂载 H5 页到 #app）
- `src/generated/page.js`（H5 主体实现）
- `DISCOVERY.md` / `API.md` / `ASSETS.md` / `PROJECT.md` / `.webgen/config.json`

## 如何预览

```sh
cd projects/h5-product-share
pnpm install
pnpm dev   # 默认端口 4320
# 用浏览器 DevTools 设备模式(移动端)查看效果最佳
```

## 下一步 / 剩余风险

- 替换真实商品：名称/价格/图片/规格/评价（src/generated/page.js 的 PRODUCT）。
- 接真实接口：商品详情 / 加购 / 下单（API.md）。
- 微信内分享需接 JS-SDK（updateAppMessageShareData）；当前用 navigator.share + 复制链接回退。

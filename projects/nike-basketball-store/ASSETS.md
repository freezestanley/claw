# ASSETS — nike basketball store

## 策略
全部使用**自绘内联 SVG**，不引用任何真实 Nike 商标、产品图或外部图片 CDN。规避版权/商标风险，演示用途。

## 品牌
- Wordmark：自绘 "SWIFT" 占位品牌名 + 抽象 swoosh 形状（非 Nike 官方 logo）。
- 免责声明：页脚标注「演示页面，与 Nike, Inc. 无任何关联，所有产品名称与图形均为虚构占位」。

## 配色（黑白红运动风）
- 背景黑：#0a0a0a / #111111
- 文字白：#ffffff / #f5f5f5
- 高亮红：#e11d2a（CTA / 角标 / 价格高亮）
- 辅助灰：#a3a3a3 / #262626（卡片/分隔）

## 字体
系统运动风字体栈（无外部字体依赖）：`-apple-system, "Segoe UI", "Helvetica Neue", Arial, sans-serif`，配合 Tailwind 大字号 + tracking-tight。

## 商品插画
每款球鞋一个内联 SVG 侧视插画（鞋身/鞋底/swoosh 抽象造型），按配色变体区分系列。无外部图片，无破图风险。

## 图标
Lucide（CDN）：购物袋、加减、关闭、星标等 UI 图标。

## 状态
素材全部自托管（内联 SVG + 系统字体 + Lucide CDN 图标）。无 blocker。

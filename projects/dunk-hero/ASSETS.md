# ASSETS.md — dunk-hero

## 素材策略
无真实品牌 / 球星素材，**全部自绘内联 SVG 漫画占位**，避免肖像权 / 商标侵权。

## 品牌占位
- 品牌名：**飞跃 FLYDUNK**
- 标语：腾空即巅峰 · RISE ABOVE
- Logo：自绘 SVG 篮球 + 翅膀 / 闪电字标占位。

## 视觉资源（全部自绘 inline SVG / CSS）
| 资源 | 实现方式 | 状态 |
|------|----------|------|
| 飞人扣篮主插画（Hero） | inline SVG，剪影 + 粗描边 + speed lines | 自绘 ✅ |
| 招牌动作分镜插画 ×3-4 | inline SVG comic panel | 自绘 ✅ |
| 画廊动作图 ×N | inline SVG 动作剪影网格 | 自绘 ✅ |
| 半调网点 halftone | CSS radial-gradient 点阵背景 | CSS ✅ |
| speed lines 动作线 | SVG / CSS 斜线放射 | CSS/SVG ✅ |
| 拟声词 BOOM/SLAM/SWISH | 文本 + comic 描边样式 | CSS ✅ |

## 配色（American comic 撞色）
- 纸张底：`#FDF6E3`（米白）
- 纯黑描边：`#0B0B0B`
- 电光蓝：`#1F6FEB`
- 烈焰橙红：`#FF4D2E`
- 明黄：`#FFD23F`
- 辅助洋红：`#E8336D`

## 字体
- 标题：粗黑/极粗 sans（系统 + Google comic-ish 备选，避免 Inter 默认）。
- 正文：系统 sans。
- 拟声词：超粗斜体 + 描边。

## 部署提醒
全部自绘 SVG / CSS，无外链图依赖，可完全自托管。CDN 仅用于 Tailwind / anime.js 等脚本。

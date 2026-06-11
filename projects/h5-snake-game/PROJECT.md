# PROJECT.md — H5 贪吃蛇游戏

- **slug**：`h5-snake-game`
- **类型**：单页面小游戏（H5 优先，PC / Pad 兼容）
- **技术栈**：Vite + 原生 JavaScript + Canvas + Tailwind(CDN)
- **状态**：active

## 概述
一个经典贪吃蛇游戏，纯前端、无后端依赖。支持键盘、屏幕方向键、触摸滑动三种操控方式，自动记录本地最高分。

## 文件结构
- `index.html` — 入口，移动端 viewport / 安全区配置
- `src/main.js` — UI 装配、事件绑定（键盘/滑动/D-pad）、overlay 状态机
- `src/snake.js` — 游戏核心引擎（网格、移动、碰撞、绘制、计分）
- `src/style.css` — 响应式样式（PC / Pad / H5 + 横屏）

## 预览
```bash
cd projects/h5-snake-game
pnpm install
pnpm dev   # http://127.0.0.1:4321
```

## 玩法
- 移动：方向键 / WASD / 屏幕 D-pad / 棋盘上滑动
- 暂停：空格 / 暂停按钮
- 吃到金色食物 +1 分，每 5 分加速；撞墙或咬到自己结束
- 最高分存于 `localStorage`（key：`h5-snake-best`）

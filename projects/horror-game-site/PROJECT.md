# PROJECT.md — 恐怖游戏官网

## 概述
- **slug**: `horror-game-site`
- **类型**: 单页营销官网（恐怖游戏）
- **session**: `agent:webgen:main`（已锁定）
- **状态**: dev-preview（首版基于合理假设生成，待用户反馈迭代）

## 游戏设定（占位 / 待用户确认）
> 用户暂未提供游戏名称与细节。以下为自洽的占位设定，等用户确认后替换。

- **游戏名**: **ASHFALL（灰落）** — 暂定
- **类型**: 第一人称心理恐怖 / 生存
- **世界观**: 一座被无名"灰雾"吞没的北方矿镇 Mara's Hollow。雾起之后居民开始"变质"，玩家作为最后回到镇上的人，必须在记忆与幻象中找出真相。
- **核心卖点**: 动态恐惧系统、无 HUD 沉浸、声音定位生存
- **平台**: PC (Steam) / PS5 / Xbox Series X|S
- **发售**: 暂定 2026 万圣节 · 2026-10-31

## 页面板块
1. Hero（暗黑首屏 + 游戏名 + 发售信息 + 主 CTA）
2. 预告片 / 截图区
3. 剧情简介
4. 角色 / 怪物
5. 发售平台与日期
6. 邮件订阅 CTA
7. Footer

## 设计方向（Design Read）
- Reading this as: 消费向恐怖游戏 landing，受众为恐怖/独立游戏玩家，电影感 dark-tech 语言，倾向暗黑 cinematic 体系。
- 档位: `DESIGN_VARIANCE: 8` / `MOTION_INTENSITY: 7`（含 reduced-motion 降级）/ `VISUAL_DENSITY: 4`
- 配色: 近黑 zinc-950 基底 + 单一血锈/灰青强调，禁 AI 紫渐变
- 字体: 沉默感 display sans（非 Inter 默认）

## 技术栈
- Vite + 原生 JS（无 TS）+ Tailwind CDN + anime.js（轻动效）
- 单页面 `index.html` 自包含，PC/Pad/H5 适配

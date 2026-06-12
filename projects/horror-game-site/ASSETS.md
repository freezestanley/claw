# ASSETS.md — 素材清单

> image 视觉模型当前不可用（403），无法做自动贴题核对。以下均为已 `curl` 校验返回 200 的 Unsplash 稳定 CDN 热链，主题按关键词选取，**待人工核对贴题性**，不贴题随时换 URL。

## 品牌
- **游戏名**: ASHFALL（灰落）— 占位，待用户确认
- **强调色**: 血锈红 `#8a2b1e` / 灰青 `#3a4a4d`，基底近黑 `#0a0a0b`
- **字体**: Oswald（display，凝重窄体）+ 系统 sans 正文（Google Fonts via CDN，预览期可接受）
- **Logo**: 暂用纯文字 wordmark（凝重字距），待品牌确认

## 图片（全部 200 校验通过 · 待人工核对）
| 用途 | URL | 状态 |
|------|-----|------|
| Hero 背景（雾林/暗黑） | images.unsplash.com/photo-1518709268805-4e9042af9f23 | ✅200 待核 |
| 剧情区（雾中孤树/荒野） | images.unsplash.com/photo-1509248961158-e54f6934749c | ✅200 待核 |
| 截图1（暗黑森林） | images.unsplash.com/photo-1444703686981-a3abbc4d4fe3 | ✅200 待核 |
| 截图2（雾/光） | images.unsplash.com/photo-1476610182048-b716b8518aae | ✅200 待核 |
| 截图3（荒废/暗调） | images.unsplash.com/photo-1478760329108-5c3ed9d495a0 | ✅200 待核 |
| 截图4（暗夜氛围） | images.unsplash.com/photo-1499244571948-7ccddb3583f1 | ✅200 待核 |
| 怪物/角色区氛围 | images.unsplash.com/photo-1551582045-6ec9c11d8697 | ✅200 待核 |
| 备用 | images.unsplash.com/photo-1535320903710-d993d3d77d29 | ✅200 待核 |

## 占位策略
- 找不到贴题真实图时退化为内联 SVG 噪点/暗角覆盖层（已用于氛围叠加）。
- 怪物概念图无真实素材，用暗角 + 噪点 + 剪影处理，标注"概念占位"。

## 部署提醒
- 图为外网 CDN 热链，交付时需说明；如需自托管再下载进 dist/assets 改引用。

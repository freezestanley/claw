# ASSETS.md — 死神来了4

## 策略（迭代）
- **角色卡 + 剧照画廊已换为 Unsplash 可免费商用真实图**（暗调人像/剪影/惊悚氛围），**不使用任何《死神来了》真实电影海报/剧照**。
- 均为 Unsplash 稳定 CDN 直链 `images.unsplash.com/photo-<id>`，带尺寸参数（角色 `?w=600`、剧照 `?w=900`，`q=70&auto=format&fit=crop`）。
- 每张图：`loading="lazy"` + `alt` + **加载失败 `onerror` 回退到原 SVG 占位**。
- 为与 near-black + 血红配色协调，图片统一加：`grayscale-[0.3~0.35] contrast-110 brightness-[0.6~0.62]` + 顶部黑色渐变遮罩 + `bg-[var(--blood)]/10 mix-blend-multiply` 血红叠加。

### 角色卡（×8，用户上传本地图，最终方案）
> 已从外链（百度/itc/hdslb）换为**本地资源** `src/assets/cast/cast-1..8`。
> 由 `src/main.js` 的 `import.meta.glob('./assets/cast/cast-*', {eager, query:'?url'})` 交 Vite 打包，
> build 后输出 `dist/assets/cast-<n>-<hash>.<ext>`（带 hash，可完全自托管）。不再用外链 / referrerpolicy。
> 顺序 cast-1→cast-8 对应角色卡从上到下；jpg/webp 混合。仍保留 `loading="lazy"` + `object-cover` + 压暗滤镜 + onerror 回退 SVG。

【旧版外链（已废弃）】baidu 带 `@f_auto?token=***`：
1. i2.hdslb.com/bfs/archive/660f7bc2...c2.jpg
2. pics1.baidu.com/.../cf1b9d16...ad.jpeg@f_auto?token=eb681bf4...c3
3. q5.itc.cn/images01/20250526/ddc728a9...55.jpeg
4. pics7.baidu.com/.../b21bb051...ea.jpeg@f_auto?token=687b60b4...04
5. bkimg.cdn.bcebos.com/pic/b2de9c82...45
6. pics0.baidu.com/.../f2deb48f...9c.jpeg@f_auto?token=92a1a1c6...30
7. q6.itc.cn/images01/20250329/4c171272...34.jpeg
8. pics3.baidu.com/.../b812c8fc...17.jpeg@f_auto?token=ad81c940...d2

### 剧照画廊（×6，用户上传本地图，最终方案）
> 已从 Unsplash 外链换为**本地资源** `src/assets/gallery/shot-1..6`。
> 由 `src/main.js` 的 `import.meta.glob('./assets/gallery/shot-*', {eager, query:'?url'})` 交 Vite 打包，
> build 后输出 `dist/assets/shot-<n>-<hash>.<ext>`（带 hash，可完全自托管）。
> 顺序 shot-1→shot-6 对应画廊从前到后（1/5 为宽图 big）；jpg/webp 混合。保留 `loading="lazy"` + `object-cover` + 压暗滤镜遮罩 + onerror 回退 SVG。
1. shot-1.jpg  2. shot-2.webp  3. shot-3.webp  4. shot-4.jpg  5. shot-5.jpg  6. shot-6.webp

【旧版 Unsplash 外链（已废弃）】`1518837695005-2083093ee35b` / `1476842634003-7dcca8f832de` / `1505635552518-3448ff116af3` / `1513104890138-7c749659a591` / `1502920917128-1aa500764cbd` / `1418065460487-3e41a6c84dc5`

### 校验结果
- 14 个 URL 均 `curl` 返回 **200 image/jpeg**。
- CDP 实测：14 张 `<img>` 全部 `naturalWidth>0`加载成功，**0 破图、未触发 SVG 回退**。
- 贴题性：image 视觉模型 403 不可用，未做图片内容人工核对；均为暗调惊悚/人像关键词检索，**待人工核对贴题性**，不贴题可随时换 id。

## 原 SVG 占位（仍作为兑底）
预告片区、Hero 纹理、Logo 片名仍为 inline-SVG / CSS 占位；角色/剧照的 SVG 保留为图片 onerror 兑底。

| 素材 | 用途 | 实现 | 状态 |
|------|------|------|------|
| 噪点纹理 | 全站背景颗粒感 | SVG `feTurbulence` data-uri | ✅ 自绘 |
| 血渍/喷溅 | Hero + 分隔 | 径向渐变 + SVG path | ✅ 自绘 |
| 裂痕 | Hero 装饰 | SVG stroke path | ✅ 自绘 |
| 角色卡头像 | 主演区 | SVG 剪影 + 渐变 | ✅ 自绘占位 |
| 预告片缩略 | 预告片区 | CSS 渐变 + 播放按钮 SVG | ✅ 自绘占位 |
| 剧照画廊 | 画廊区 | SVG 抽象暗黑构图 ×6 | ✅ 自绘占位 |
| Logo / 片名 | Hero | 纯文字 + 衬线字体 + 描边/血滴 | ✅ 文字 |

## 注意
- 无外链热链图片，交付物可完全自托管。
- 若后续要替换真实物料（需用户提供授权素材），替换对应占位 block 即可。

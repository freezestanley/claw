# 配图搜索与素材落地 Playbook（常驻）

## 背景
当用户要求真实配图、自己不提供素材、允许去线上找图时，需要一套可靠的取图+校验+落地流程。
经验来自 2026-06-11 `hair-clip-store`（女生发夹品牌展示页）的一次实际生成。

## 总原则（2026-06-11 更新）
**设计时优先找真实图，找不到（或校验不过）再用自绘 SVG 占位。** 不要默认一上来就用 SVG 占位；只有在「确实找不到可用真实图」时才退化为 SVG。

## 图库搜索源（registered）
- Unsplash：`https://unsplash.com/`（热链 `images.unsplash.com`）
- Pexels：`https://www.pexels.com/`（热链 `images.pexels.com`）
- Pixabay：`https://pixabay.com/`（可商用免授权，2026-06-11 新增）
- Shopify Stock Photos（Burst）：`https://www.shopify.com/stock-photos`（免费可商用，2026-06-11 新增）

## 取图优先级
1. **用户提供的图 / URL**（最稳，优先）。
2. **图站稳定 CDN 热链 URL**（用户同意线上找图时）：
   - Unsplash：`https://images.unsplash.com/photo-<id>?w=900&q=80`
   - Pexels：`https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg?auto=compress&w=900`
   - Pixabay：`https://pixabay.com/`（在站内找到图后取其 CDN 直链，如 `cdn.pixabay.com/photo/...`）
   - Shopify Stock Photos / Burst：`https://www.shopify.com/stock-photos`（取下载/CDN 直链）
   - 均为可商用免授权，可直接热链嵌入。
3. `web_search` / 图站搜索页：**不可靠**——`web_search` 可能超时，部分图站搜索页被反爬（401 / Anubis "making sure you're not a bot"）。不要把它当唯一取图手段；多源、多候选。
4. **以上都拿不到可用真实图时**，才退化为自绘内联 SVG 占位（并在 `ASSETS.md` 标注为占位、为何未用真实图）。

## 必做校验（上线前）
- **HTTP 校验**：逐个 `curl -s -o /dev/null -w "%{http_code} %{content_type}"` 确认返回 **200 且 content-type=image/***。
  - 注意：部分 id 会 404 或 000（连接失败），要剔除，多备几个候选。
- **真正加载校验**：在 CDP 预览里 `document.images` 检查 `naturalWidth>0`，统计 loaded / broken，确认 0 破图。
- **贴题性核对**：用 `image` 工具看图确认内容是否贴题（是否真的是该主题）。

## image 工具不可用时的退化方案（本次即遇到 403）
- 仍可用已 HTTP 校验通过的真实图先把页面搭出来；
- 在 `ASSETS.md` 逐图标注：用途、URL、状态（已校验 / 待人工核对）；
- 预览时请用户目视确认贴题性，不对题的随时换 URL（布局用 object-cover + 固定纵横比，换图不影响排版）。

## 落地约定
- 选用图的 URL / 用途 / 状态写入项目 `ASSETS.md`。
- 布局上图片统一 `object-cover` + 固定 aspect 比例，换图零成本。
- 部署提醒：热链依赖外网 CDN；要完全自托管则下载进 `dist/assets` 再改引用。

## 相关位置
- 约束：`AGENTS.md`「配图与图片素材策略」。
- 模板素材约定：`templates/vite-page/TEMPLATE.md`「素材约定」。

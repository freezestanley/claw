// 死神来了4 — 角色卡本地图通过 Vite 资源管线打包（带 hash，dist 正确输出）。
// 用 import.meta.glob eager 解析 src/assets/cast/cast-1..8，按文件名排序后
// 暴露给 index.html 的内联脚本使用（window.__CAST_IMAGES__）。
// 按文件名数字升序排列，返回 URL 数组
function sortedUrls(modules, re) {
  return Object.entries(modules)
    .map(([path, url]) => {
      const m = path.match(re);
      return { idx: m ? Number(m[1]) : 999, url };
    })
    .sort((a, b) => a.idx - b.idx)
    .map((x) => x.url);
}

const castModules = import.meta.glob("./assets/cast/cast-*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});
window.__CAST_IMAGES__ = sortedUrls(castModules, /cast-(\d+)\./);
window.dispatchEvent(new CustomEvent("cast-images-ready"));

const galleryModules = import.meta.glob("./assets/gallery/shot-*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});
window.__GALLERY_IMAGES__ = sortedUrls(galleryModules, /shot-(\d+)\./);
window.dispatchEvent(new CustomEvent("gallery-images-ready"));

export {};

// 内联 SVG 服装占位插画 + 可爱点缀 —— 无外部图片依赖
// 少女甜美系：粉嫩主色 + 薄荷/鹅黄/淡紫点缀，时装剪影 + 爱心星星蝴蝶结

const palettes = {
  dress: ["#ffb3d1", "#ff7eb0"],
  coat: ["#d9c4ff", "#b79bff"],
  top: ["#ffd6e6", "#ff9ec2"],
  knit: ["#ffe69a", "#ffd166"],
  accessory: ["#a8e6cf", "#6fd6ad"],
  default: ["#ffb3d1", "#ff7eb0"]
};

// ---------- 可爱点缀 SVG ----------
export function heartSvg(color = "#ff86b3", size = 24) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 21s-7.5-4.6-10-9.2C.3 8.4 1.7 5 5 5c2 0 3.2 1.2 4 2.3C9.8 6.2 11 5 13 5c3.3 0 4.7 3.4 3 6.8C19.5 16.4 12 21 12 21z"/></svg>`;
}
export function starSvg(color = "#ffd166", size = 24) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 2l2.6 6.3L21 9l-5 4.3L17.5 20 12 16.6 6.5 20 8 13.3 3 9l6.4-.7L12 2z"/></svg>`;
}
export function bowSvg(color = "#ff86b3", size = 28) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 48 32" fill="${color}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M24 16c-3-6-8-10-13-9-4 .8-5 5-3 9-2 4-1 8.2 3 9 5 1 10-3 13-9zm0 0c3-6 8-10 13-9 4 .8 5 5 3 9 2 4 1 8.2-3 9-5 1-10-3-13-9z"/><circle cx="24" cy="16" r="4" fill="#fff" opacity="0.7"/></svg>`;
}

// 抽象时装剪影（连衣裙/外套通用），用作商品/分类占位
export function fashionSvg({ kind = "default", w = 400, h = 520 } = {}) {
  const [c1, c2] = palettes[kind] || palettes.default;
  const gid = "g" + Math.random().toString(36).slice(2, 8);
  return `
  <svg viewBox="0 0 400 520" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice"
       xmlns="http://www.w3.org/2000/svg" role="img" aria-label="服装">
    <defs>
      <linearGradient id="bg-${gid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${tint(c1)}"/>
        <stop offset="100%" stop-color="${c1}"/>
      </linearGradient>
      <linearGradient id="fg-${gid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="520" fill="url(#bg-${gid})"/>
    <circle cx="320" cy="90" r="60" fill="#ffffff" opacity="0.12"/>
    <!-- 时装人像剪影 -->
    <g fill="url(#fg-${gid})">
      <circle cx="200" cy="120" r="34"/>
      <path d="M200 158
        C 150 158 140 200 138 250
        L 120 470 C 118 490 282 490 280 470
        L 262 250 C 260 200 250 158 200 158 Z"/>
    </g>
    <!-- 衣摆高光 -->
    <path d="M138 300 C 170 320 230 320 262 300 L 268 470 C 230 484 170 484 132 470 Z"
          fill="#ffffff" opacity="0.10"/>
    <!-- 肩线 -->
    <path d="M160 175 Q200 150 240 175" stroke="#ffffff" stroke-opacity="0.3" stroke-width="3" fill="none"/>
  </svg>`;
}

function tint(hex) {
  const m = hex.replace("#", "");
  const mix = (i) =>
    Math.min(255, Math.round(parseInt(m.slice(i, i + 2), 16) * 0.55 + 255 * 0.45));
  return `rgb(${mix(0)},${mix(2)},${mix(4)})`;
}

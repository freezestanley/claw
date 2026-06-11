// 内联 SVG 女装单品衣形插画 —— 明确的「服饰」语义（连衣裙/上衣/外套/裤装/半裙）
// 占位主视觉，无外部图片依赖

function defs(gid, c1, c2) {
  return `
    <defs>
      <linearGradient id="bg-${gid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${tint(c1)}"/>
        <stop offset="100%" stop-color="${tint(c2)}"/>
      </linearGradient>
      <linearGradient id="cloth-${gid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="500" fill="url(#bg-${gid})"/>`;
}

// 连衣裙
function dress(gid) {
  return `
    <g fill="url(#cloth-${gid})">
      <path d="M150 110 L250 110 L232 150 L268 168 L250 196 L236 184
               L262 420 Q200 440 138 420 L164 184 L150 196 L132 168 L168 150 Z"/>
    </g>
    <path d="M150 110 Q200 96 250 110 L240 128 Q200 116 160 128 Z" fill="#fff" opacity="0.25"/>
    <path d="M170 230 Q200 244 230 230" stroke="#fff" stroke-opacity="0.3" stroke-width="3" fill="none"/>`;
}
// 上衣 / 衬衫
function blouse(gid) {
  return `
    <g fill="url(#cloth-${gid})">
      <path d="M150 130 L250 130 L228 168 L262 190 L242 220 L228 208
               L236 330 Q200 344 164 330 L172 208 L158 220 L138 190 L172 168 Z"/>
    </g>
    <line x1="200" y1="138" x2="200" y2="326" stroke="#fff" stroke-opacity="0.3" stroke-width="2"/>
    <circle cx="200" cy="180" r="3" fill="#fff" opacity="0.5"/>
    <circle cx="200" cy="220" r="3" fill="#fff" opacity="0.5"/>
    <circle cx="200" cy="260" r="3" fill="#fff" opacity="0.5"/>`;
}
// 外套 / 大衣
function coat(gid) {
  return `
    <g fill="url(#cloth-${gid})">
      <path d="M148 120 L252 120 L230 162 L268 184 L246 216 L232 204
               L244 400 L156 400 L168 204 L154 216 L132 184 L170 162 Z"/>
    </g>
    <path d="M200 120 L200 400" stroke="#000" stroke-opacity="0.18" stroke-width="3"/>
    <path d="M148 120 L200 150 L252 120" fill="none" stroke="#fff" stroke-opacity="0.3" stroke-width="3"/>
    <rect x="186" y="250" width="28" height="6" rx="3" fill="#000" opacity="0.15"/>`;
}
// 裤装
function trousers(gid) {
  return `
    <g fill="url(#cloth-${gid})">
      <path d="M168 150 L232 150 L240 170 L226 410 L206 410 L200 250
               L194 410 L174 410 L160 170 Z"/>
    </g>
    <rect x="168" y="150" width="64" height="18" rx="4" fill="#000" opacity="0.18"/>
    <line x1="200" y1="172" x2="200" y2="250" stroke="#fff" stroke-opacity="0.25" stroke-width="2"/>`;
}
// 半裙
function skirt(gid) {
  return `
    <g fill="url(#cloth-${gid})">
      <path d="M170 170 L230 170 L236 188 L266 400 Q200 420 134 400 L164 188 Z"/>
    </g>
    <rect x="170" y="168" width="60" height="16" rx="4" fill="#000" opacity="0.16"/>
    <g stroke="#fff" stroke-opacity="0.22" stroke-width="2" fill="none">
      <path d="M180 200 L160 400 M200 200 L200 410 M220 200 L240 400"/>
    </g>`;
}

const shapes = { dress, blouse, coat, trousers, skirt };
const palettes = {
  dress: ["#d6a3b1", "#a86477"],
  blouse: ["#f0ddd2", "#cbab97"],
  coat: ["#b9a99c", "#8c7d76"],
  trousers: ["#9aa7ac", "#6f7d82"],
  skirt: ["#e7c9b1", "#c79a78"],
  default: ["#d6a3b1", "#a86477"]
};

export function garmentSvg({ kind = "dress", w = 400, h = 500 } = {}) {
  const gid = "g" + Math.random().toString(36).slice(2, 8);
  const [c1, c2] = palettes[kind] || palettes.default;
  const draw = (shapes[kind] || dress)(gid);
  return `
  <svg viewBox="0 0 400 500" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice"
       xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${kind}">
    ${defs(gid, c1, c2)}
    <circle cx="320" cy="80" r="56" fill="#ffffff" opacity="0.12"/>
    ${draw}
  </svg>`;
}

function tint(hex) {
  const m = hex.replace("#", "");
  const mix = (i) =>
    Math.min(255, Math.round(parseInt(m.slice(i, i + 2), 16) * 0.5 + 255 * 0.5));
  return `rgb(${mix(0)},${mix(2)},${mix(4)})`;
}

// 内联 SVG 自绘插画库 — 可可熊 CocoBear（占位，无真实商标）
// 配色: cocoa #6B4226/#4A2C18/#A9744F, cream #FFF8EF, candy 橙#FF9E45 红#F0586B 薄荷#7FD4B6

// 吉祥物：可可熊（挥手，胸口可可豆）
export const mascotWave = `
<svg viewBox="0 0 320 340" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="可可熊吉祥物">
  <ellipse cx="160" cy="318" rx="96" ry="16" fill="#4A2C18" opacity="0.12"/>
  <!-- 耳朵 -->
  <circle cx="86" cy="86" r="40" fill="#6B4226"/>
  <circle cx="86" cy="86" r="22" fill="#A9744F"/>
  <circle cx="234" cy="86" r="40" fill="#6B4226"/>
  <circle cx="234" cy="86" r="22" fill="#A9744F"/>
  <!-- 身体 -->
  <rect x="92" y="190" width="136" height="120" rx="56" fill="#6B4226"/>
  <!-- 肚皮 -->
  <ellipse cx="160" cy="252" rx="48" ry="50" fill="#F3DFC9"/>
  <!-- 可可豆胸标 -->
  <ellipse cx="160" cy="250" rx="16" ry="22" fill="#4A2C18"/>
  <path d="M160 232 v36" stroke="#A9744F" stroke-width="3" stroke-linecap="round"/>
  <!-- 头 -->
  <circle cx="160" cy="138" r="86" fill="#6B4226"/>
  <!-- 口鼻 -->
  <ellipse cx="160" cy="160" rx="48" ry="40" fill="#F3DFC9"/>
  <ellipse cx="160" cy="150" rx="13" ry="10" fill="#3A2417"/>
  <path d="M160 160 v14 M160 174 q-14 10 -26 2 M160 174 q14 10 26 2" stroke="#3A2417" stroke-width="4" stroke-linecap="round" fill="none"/>
  <!-- 眼睛 -->
  <circle cx="132" cy="120" r="10" fill="#3A2417"/>
  <circle cx="188" cy="120" r="10" fill="#3A2417"/>
  <circle cx="135" cy="116" r="3.5" fill="#FFF8EF"/>
  <circle cx="191" cy="116" r="3.5" fill="#FFF8EF"/>
  <!-- 腮红 -->
  <circle cx="112" cy="146" r="11" fill="#F0586B" opacity="0.5"/>
  <circle cx="208" cy="146" r="11" fill="#F0586B" opacity="0.5"/>
  <!-- 挥手的手臂 -->
  <g class="mascot-arm" style="transform-origin:236px 210px">
    <rect x="220" y="150" width="34" height="80" rx="17" fill="#6B4226" transform="rotate(28 236 200)"/>
    <circle cx="260" cy="150" r="20" fill="#A9744F"/>
  </g>
  <rect x="66" y="200" width="34" height="78" rx="17" fill="#6B4226"/>
  <circle cx="83" cy="282" r="19" fill="#A9744F"/>
  <!-- 脚 -->
  <ellipse cx="128" cy="306" rx="26" ry="18" fill="#A9744F"/>
  <ellipse cx="192" cy="306" rx="26" ry="18" fill="#A9744F"/>
</svg>`;

// 可可熊小号头像（用于 logo / 评价头像）
export const mascotMini = `
<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="可可熊">
  <circle cx="22" cy="22" r="13" fill="#6B4226"/><circle cx="58" cy="22" r="13" fill="#6B4226"/>
  <circle cx="40" cy="42" r="28" fill="#6B4226"/>
  <ellipse cx="40" cy="50" rx="16" ry="13" fill="#F3DFC9"/>
  <ellipse cx="40" cy="46" rx="5" ry="4" fill="#3A2417"/>
  <circle cx="30" cy="36" r="4" fill="#3A2417"/><circle cx="50" cy="36" r="4" fill="#3A2417"/>
  <circle cx="22" cy="48" r="5" fill="#F0586B" opacity="0.5"/><circle cx="58" cy="48" r="5" fill="#F0586B" opacity="0.5"/>
</svg>`;

// 巧克力块
export const chocoBar = `
<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="20" y="20" width="80" height="80" rx="10" fill="#6B4226"/>
  <rect x="20" y="20" width="80" height="80" rx="10" fill="url(#cg)" opacity="0.25"/>
  <g stroke="#4A2C18" stroke-width="4">
    <path d="M60 24 V96 M24 60 H96"/>
  </g>
  <g fill="#A9744F">
    <rect x="28" y="28" width="24" height="24" rx="4"/><rect x="68" y="28" width="24" height="24" rx="4"/>
    <rect x="28" y="68" width="24" height="24" rx="4"/><rect x="68" y="68" width="24" height="24" rx="4"/>
  </g>
  <defs><linearGradient id="cg" x1="20" y1="20" x2="100" y2="100"><stop stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
</svg>`;

// 可可豆
export const cocoaBean = `
<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <ellipse cx="30" cy="30" rx="18" ry="24" fill="#4A2C18"/>
  <ellipse cx="30" cy="30" rx="11" ry="18" fill="#6B4226"/>
  <path d="M30 10 V50" stroke="#A9744F" stroke-width="3" stroke-linecap="round"/>
</svg>`;

// 棒棒糖
export const lollipop = `
<svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="28" y="30" width="4" height="44" rx="2" fill="#A9744F"/>
  <circle cx="30" cy="22" r="20" fill="#F0586B"/>
  <path d="M30 22 m-14 0 a14 14 0 0 1 28 0" fill="none" stroke="#FFF8EF" stroke-width="3"/>
  <path d="M30 8 a14 14 0 0 1 12 20" fill="none" stroke="#FF9E45" stroke-width="3"/>
</svg>`;

// 薄荷糖
export const mintCandy = `
<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="30" cy="30" r="20" fill="#7FD4B6"/>
  <circle cx="30" cy="30" r="12" fill="#FFF8EF"/>
  <g stroke="#7FD4B6" stroke-width="3"><path d="M30 10 V20 M30 40 V50 M10 30 H20 M40 30 H50"/></g>
</svg>`;

// 包装袋（按主色生成）
export function pouch(color, accent) {
  return `
<svg viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="产品包装">
  <ellipse cx="80" cy="188" rx="56" ry="10" fill="#4A2C18" opacity="0.1"/>
  <path d="M40 30 Q40 18 52 18 H108 Q120 18 120 30 V178 Q120 188 108 188 H52 Q40 188 40 178 Z" fill="${color}"/>
  <path d="M40 30 Q40 18 52 18 H108 Q120 18 120 30 V70 H40 Z" fill="#FFFFFF" opacity="0.12"/>
  <rect x="52" y="6" width="56" height="16" rx="4" fill="${color}" opacity="0.8"/>
  <circle cx="80" cy="78" r="22" fill="#FFF8EF"/>
  <circle cx="72" cy="74" r="6" fill="#3A2417"/><circle cx="88" cy="74" r="6" fill="#3A2417"/>
  <ellipse cx="80" cy="86" rx="6" ry="4" fill="#3A2417"/>
  <rect x="56" y="118" width="48" height="10" rx="5" fill="${accent}"/>
  <rect x="62" y="138" width="36" height="7" rx="3.5" fill="#FFF8EF" opacity="0.85"/>
</svg>`;
}

// 装饰：可可叶
export const cocoaLeaf = `
<svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M10 50 Q40 0 70 10 Q60 50 10 50 Z" fill="#7FD4B6"/>
  <path d="M14 48 Q42 24 66 14" stroke="#4A2C18" stroke-width="2.5" opacity="0.4" fill="none"/>
</svg>`;

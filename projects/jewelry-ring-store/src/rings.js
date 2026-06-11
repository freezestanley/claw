// 内联 SVG 戒指插画 —— 占位主视觉，无需任何外部图片
// 香槟金渐变 + 宝石高光，适配清新轻奢风格

export function ringSvg({ gem = "#e8d7b0", band = 1, size = 220 } = {}) {
  const gid = "g" + Math.random().toString(36).slice(2, 8);
  return `
  <svg viewBox="0 0 200 200" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="戒指">
    <defs>
      <linearGradient id="gold-${gid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#e7d3a3"/>
        <stop offset="45%" stop-color="#c8a96a"/>
        <stop offset="100%" stop-color="#9c7a40"/>
      </linearGradient>
      <radialGradient id="gem-${gid}" cx="40%" cy="35%" r="70%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
        <stop offset="35%" stop-color="${gem}"/>
        <stop offset="100%" stop-color="${shade(gem)}"/>
      </radialGradient>
    </defs>
    <!-- 戒环 -->
    <ellipse cx="100" cy="128" rx="46" ry="52"
      fill="none" stroke="url(#gold-${gid})" stroke-width="${10 * band}"/>
    <ellipse cx="100" cy="128" rx="46" ry="52"
      fill="none" stroke="#fff6e2" stroke-width="${2 * band}" opacity="0.5"/>
    <!-- 爪镶 -->
    <path d="M84 70 L100 86 L116 70" fill="none" stroke="url(#gold-${gid})" stroke-width="5" stroke-linecap="round"/>
    <!-- 主石（圆形明亮式） -->
    <circle cx="100" cy="58" r="26" fill="url(#gem-${gid})" stroke="url(#gold-${gid})" stroke-width="3"/>
    <!-- 刻面线 -->
    <g stroke="#ffffff" stroke-opacity="0.55" stroke-width="1.2" fill="none">
      <path d="M100 34 L100 84 M76 58 L124 58 M83 41 L117 75 M117 41 L83 75"/>
      <circle cx="100" cy="58" r="13"/>
    </g>
    <!-- 高光点 -->
    <circle cx="91" cy="49" r="5" fill="#ffffff" opacity="0.9"/>
  </svg>`;
}

function shade(hex) {
  const m = hex.replace("#", "");
  const r = Math.max(0, parseInt(m.slice(0, 2), 16) - 60);
  const g = Math.max(0, parseInt(m.slice(2, 4), 16) - 60);
  const b = Math.max(0, parseInt(m.slice(4, 6), 16) - 60);
  return `rgb(${r},${g},${b})`;
}

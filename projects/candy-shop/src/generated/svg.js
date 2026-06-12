// svg.js — 自绘内联 SVG 糖果卡通插画库（占位，brief 明确要求）
// 全部为几何卡通风，无外部图片依赖，可随商品着色。

export function lollipop(c1 = "#ff6fae", c2 = "#ffd23f") {
  return `<svg viewBox="0 0 100 100" class="w-full h-full" role="img" aria-label="棒棒糖">
    <defs><radialGradient id="lp${c1.slice(1)}" cx="40%" cy="35%" r="70%">
      <stop offset="0%" stop-color="#fff" stop-opacity=".7"/><stop offset="100%" stop-color="${c1}"/>
    </radialGradient></defs>
    <rect x="47" y="48" width="6" height="46" rx="3" fill="#f4e3c1"/>
    <circle cx="50" cy="38" r="30" fill="url(#lp${c1.slice(1)})"/>
    <path d="M50 38 m-30 0 a30 30 0 0 1 60 0" fill="none" stroke="${c2}" stroke-width="6" stroke-dasharray="9 9" stroke-linecap="round" opacity=".85"/>
    <circle cx="40" cy="28" r="6" fill="#fff" opacity=".55"/>
  </svg>`;
}

export function gummy(c = "#5fd6a6") {
  return `<svg viewBox="0 0 100 100" class="w-full h-full" role="img" aria-label="软糖小熊">
    <path d="M30 40c0-6 5-9 8-9 1-7 7-12 12-12s11 5 12 12c3 0 8 3 8 9 0 4-2 6-4 7 2 3 3 7 3 12 0 13-9 20-19 20s-19-7-19-20c0-5 1-9 3-12-2-1-4-3-4-7z" fill="${c}"/>
    <circle cx="43" cy="48" r="3.2" fill="#3a2b3a"/><circle cx="57" cy="48" r="3.2" fill="#3a2b3a"/>
    <path d="M44 58q6 5 12 0" stroke="#3a2b3a" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <ellipse cx="36" cy="34" rx="6" ry="5" fill="${c}"/><ellipse cx="64" cy="34" rx="6" ry="5" fill="${c}"/>
    <ellipse cx="40" cy="42" rx="4" ry="3" fill="#fff" opacity=".4"/>
  </svg>`;
}

export function chocolate(c = "#7b4a2b") {
  return `<svg viewBox="0 0 100 100" class="w-full h-full" role="img" aria-label="巧克力块">
    <g transform="rotate(-8 50 50)">
      <rect x="24" y="24" width="52" height="52" rx="8" fill="${c}"/>
      <rect x="24" y="24" width="52" height="52" rx="8" fill="none" stroke="#5b3520" stroke-width="3"/>
      ${[0,1,2].map(r=>[0,1,2].map(cc=>`<rect x="${28+cc*16}" y="${28+r*16}" width="13" height="13" rx="3" fill="#8d5836"/><rect x="${28+cc*16}" y="${28+r*16}" width="13" height="4" rx="2" fill="#a06b45" opacity=".6"/>`).join("")).join("")}
    </g>
  </svg>`;
}

export function gum(c = "#56c2ff") {
  return `<svg viewBox="0 0 100 100" class="w-full h-full" role="img" aria-label="口香糖">
    <rect x="26" y="34" width="48" height="32" rx="7" fill="#fff"/>
    <rect x="26" y="34" width="48" height="32" rx="7" fill="none" stroke="${c}" stroke-width="3"/>
    <rect x="32" y="40" width="36" height="20" rx="4" fill="${c}" opacity=".9"/>
    <circle cx="44" cy="50" r="3" fill="#fff" opacity=".8"/><circle cx="56" cy="50" r="3" fill="#fff" opacity=".8"/>
    <path d="M26 41h48M26 59h48" stroke="${c}" stroke-width="1.5" opacity=".4"/>
  </svg>`;
}

export function hardCandy(c1 = "#ff9248", c2 = "#ffd23f") {
  return `<svg viewBox="0 0 100 100" class="w-full h-full" role="img" aria-label="水果硬糖">
    <path d="M30 38l-14-6 6 14z" fill="${c1}"/><path d="M70 62l14 6-6-14z" fill="${c1}"/>
    <circle cx="50" cy="50" r="20" fill="${c2}"/>
    <path d="M50 50m-20 0a20 20 0 0 1 40 0" fill="none" stroke="${c1}" stroke-width="5" stroke-dasharray="6 7" stroke-linecap="round"/>
    <circle cx="43" cy="43" r="5" fill="#fff" opacity=".6"/>
  </svg>`;
}

export function giftBox(c = "#a06bff") {
  return `<svg viewBox="0 0 100 100" class="w-full h-full" role="img" aria-label="糖果礼盒">
    <rect x="24" y="44" width="52" height="34" rx="6" fill="${c}"/>
    <rect x="20" y="34" width="60" height="14" rx="5" fill="#b890ff"/>
    <rect x="46" y="34" width="8" height="44" fill="#ffd23f"/>
    <path d="M50 34c-8-12-22-6-12 2 M50 34c8-12 22-6 12 2" fill="#ffd23f" stroke="#ffd23f" stroke-width="2"/>
    <circle cx="50" cy="32" r="4" fill="#ff6fae"/>
  </svg>`;
}

// Hero 大组合插画：糖果罐 + 漂浮糖果
export function heroScene() {
  return `<svg viewBox="0 0 420 420" class="w-full h-full" role="img" aria-label="糖糖屋糖果罐">
    <defs>
      <linearGradient id="jar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#ffe9f3"/></linearGradient>
    </defs>
    <ellipse cx="210" cy="392" rx="120" ry="20" fill="#ffd9ec"/>
    <circle class="cf" cx="70" cy="80" r="22" fill="#ffd23f"/>
    <circle class="cf" cx="350" cy="110" r="18" fill="#5fd6a6"/>
    <circle class="cf" cx="330" cy="300" r="20" fill="#56c2ff"/>
    <circle class="cf" cx="60" cy="300" r="16" fill="#a06bff"/>
    <rect x="120" y="150" width="180" height="200" rx="34" fill="url(#jar)" stroke="#ffb3d4" stroke-width="5"/>
    <rect x="112" y="128" width="196" height="34" rx="16" fill="#ff6fae"/>
    <rect x="150" y="106" width="120" height="30" rx="14" fill="#ffd23f"/>
    <g>
      <circle cx="165" cy="210" r="18" fill="#ff6fae"/><circle cx="210" cy="195" r="20" fill="#ffd23f"/>
      <circle cx="255" cy="215" r="17" fill="#5fd6a6"/><circle cx="180" cy="250" r="19" fill="#a06bff"/>
      <circle cx="235" cy="255" r="18" fill="#56c2ff"/><circle cx="160" cy="290" r="16" fill="#ff9248"/>
      <circle cx="205" cy="295" r="20" fill="#ff6fae"/><circle cx="250" cy="295" r="16" fill="#ffd23f"/>
      <circle cx="190" cy="325" r="15" fill="#5fd6a6"/><circle cx="235" cy="328" r="14" fill="#a06bff"/>
    </g>
    <circle cx="175" cy="195" r="5" fill="#fff" opacity=".7"/>
  </svg>`;
}

export const categoryIcon = { lollipop, gummy, chocolate, gum, hardCandy, giftBox };

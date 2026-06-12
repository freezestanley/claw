// 自绘 inline SVG 漫画占位插画（无真实球星/品牌素材，避免侵权）
// 美式 comic 风：粗黑描边 + 撞色填充 + speed lines。

// 飞人扣篮主插画（Hero）
export const dunkHero = `
<svg viewBox="0 0 520 560" class="h-full w-full" role="img" aria-label="漫画风篮球飞人扣篮插画">
  <defs>
    <radialGradient id="dh-halo" cx="50%" cy="38%" r="60%">
      <stop offset="0%" stop-color="#FFD23F"/>
      <stop offset="60%" stop-color="#FF4D2E"/>
      <stop offset="100%" stop-color="#FF4D2E" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- 放射光晕 -->
  <circle cx="260" cy="210" r="200" fill="url(#dh-halo)" opacity="0.85"/>
  <!-- speed lines -->
  <g stroke="#0B0B0B" stroke-width="6" stroke-linecap="round" opacity="0.85">
    <line x1="40" y1="120" x2="120" y2="160"/>
    <line x1="30" y1="220" x2="120" y2="230"/>
    <line x1="60" y1="330" x2="140" y2="300"/>
    <line x1="480" y1="120" x2="400" y2="160"/>
    <line x1="492" y1="225" x2="400" y2="232"/>
    <line x1="465" y1="330" x2="385" y2="300"/>
  </g>
  <!-- 篮筐 -->
  <g stroke="#0B0B0B" stroke-width="7" fill="none">
    <rect x="350" y="60" width="120" height="70" rx="6" fill="#FDF6E3"/>
    <line x1="372" y1="130" x2="448" y2="130"/>
    <ellipse cx="410" cy="135" rx="40" ry="10" fill="#FF4D2E"/>
    <path d="M375 138 L382 175 M395 140 L398 182 M410 140 L410 184 M425 140 L422 182 M445 138 L438 175"
      stroke="#FDF6E3" stroke-width="4"/>
  </g>
  <!-- 飞人剪影 -->
  <g stroke="#0B0B0B" stroke-width="6" stroke-linejoin="round">
    <!-- 身体 -->
    <path d="M250 250 q-30 40 -20 90 l30 0 q-5 -45 15 -75 z" fill="#1F6FEB"/>
    <!-- 头 -->
    <circle cx="262" cy="232" r="26" fill="#0B0B0B"/>
    <!-- 举球手臂 -->
    <path d="M278 232 q40 -55 95 -90" fill="none" stroke="#0B0B0B" stroke-width="16" stroke-linecap="round"/>
    <!-- 另一手臂 -->
    <path d="M250 268 q-45 -10 -78 25" fill="none" stroke="#1F6FEB" stroke-width="15" stroke-linecap="round"/>
    <!-- 腿 -->
    <path d="M236 330 q-30 35 -70 38" fill="none" stroke="#0B0B0B" stroke-width="17" stroke-linecap="round"/>
    <path d="M260 332 q15 45 5 92" fill="none" stroke="#1F6FEB" stroke-width="17" stroke-linecap="round"/>
    <!-- 球 -->
    <circle cx="392" cy="120" r="30" fill="#FF8A1E"/>
    <path d="M362 120 h60 M392 90 v60 M370 98 q22 22 0 44 M414 98 q-22 22 0 44"
      stroke="#0B0B0B" stroke-width="3" fill="none"/>
  </g>
</svg>`;

// logo（篮球 + 闪电字标占位）
export const logoMark = `
<svg viewBox="0 0 64 64" class="h-9 w-9" role="img" aria-label="FLYDUNK logo">
  <circle cx="32" cy="32" r="28" fill="#FF4D2E" stroke="#0B0B0B" stroke-width="4"/>
  <path d="M8 32 h48 M32 6 v52 M14 16 q18 16 0 32 M50 16 q-18 16 0 32"
    stroke="#0B0B0B" stroke-width="3" fill="none"/>
  <path d="M36 12 L22 36 h10 L26 54 L44 28 H33 z" fill="#FFD23F" stroke="#0B0B0B" stroke-width="2.5" stroke-linejoin="round"/>
</svg>`;

// 分镜动作插画（连环画用，传入 accent 撞色）
export function panelAction(kind, accent) {
  const arts = {
    crossover: `
      <path d="M70 40 q-20 60 0 120" stroke="#0B0B0B" stroke-width="10" fill="none" stroke-linecap="round"/>
      <circle cx="70" cy="34" r="18" fill="#0B0B0B"/>
      <path d="M70 70 l40 18 m-40 -8 l-38 22" stroke="${accent}" stroke-width="12" fill="none" stroke-linecap="round"/>
      <circle cx="120" cy="96" r="14" fill="#FF8A1E" stroke="#0B0B0B" stroke-width="3"/>`,
    spinmove: `
      <circle cx="100" cy="34" r="18" fill="#0B0B0B"/>
      <path d="M100 52 q-30 30 -10 95" stroke="${accent}" stroke-width="11" fill="none" stroke-linecap="round"/>
      <path d="M50 80 a55 40 0 1 0 100 6" stroke="#0B0B0B" stroke-width="5" fill="none" stroke-dasharray="6 10"/>`,
    fadeaway: `
      <circle cx="90" cy="36" r="18" fill="#0B0B0B"/>
      <path d="M90 54 q35 25 30 100" stroke="${accent}" stroke-width="11" fill="none" stroke-linecap="round"/>
      <path d="M115 60 q35 -30 55 -8" stroke="#0B0B0B" stroke-width="10" fill="none" stroke-linecap="round"/>
      <circle cx="178" cy="50" r="13" fill="#FF8A1E" stroke="#0B0B0B" stroke-width="3"/>`,
    poster: `
      <rect x="120" y="20" width="60" height="40" rx="4" fill="#FDF6E3" stroke="#0B0B0B" stroke-width="4"/>
      <ellipse cx="150" cy="60" rx="22" ry="7" fill="${accent}"/>
      <circle cx="80" cy="40" r="18" fill="#0B0B0B"/>
      <path d="M80 58 q15 35 60 0" stroke="${accent}" stroke-width="11" fill="none" stroke-linecap="round"/>
      <circle cx="138" cy="30" r="12" fill="#FF8A1E" stroke="#0B0B0B" stroke-width="3"/>`
  };
  return `<svg viewBox="0 0 200 170" class="h-full w-full" role="img" aria-label="招牌动作分镜插画">
    <g stroke="#0B0B0B" stroke-width="4" stroke-linecap="round" opacity="0.6">
      <line x1="6" y1="20" x2="40" y2="34"/><line x1="6" y1="150" x2="40" y2="136"/>
      <line x1="194" y1="20" x2="160" y2="34"/><line x1="194" y1="150" x2="160" y2="136"/>
    </g>
    ${arts[kind] || arts.crossover}
  </svg>`;
}

// 画廊动作剪影（轻量）
export function galleryPose(i, accent) {
  const poses = [
    `<path d="M50 30 q-25 40 -10 90" stroke="${accent}" stroke-width="13" fill="none" stroke-linecap="round"/>
     <circle cx="50" cy="24" r="14" fill="#0B0B0B"/>
     <path d="M55 40 q35 -30 60 -10" stroke="#0B0B0B" stroke-width="13" fill="none" stroke-linecap="round"/>
     <circle cx="120" cy="26" r="12" fill="#FF8A1E" stroke="#0B0B0B" stroke-width="3"/>`,
    `<circle cx="70" cy="22" r="14" fill="#0B0B0B"/>
     <path d="M70 38 q-20 40 5 92" stroke="${accent}" stroke-width="13" fill="none" stroke-linecap="round"/>
     <path d="M62 70 l-40 14 m40 -4 l44 20" stroke="#0B0B0B" stroke-width="11" fill="none" stroke-linecap="round"/>`,
    `<circle cx="66" cy="26" r="14" fill="#0B0B0B"/>
     <path d="M66 42 q30 25 24 90" stroke="${accent}" stroke-width="13" fill="none" stroke-linecap="round"/>
     <circle cx="110" cy="30" r="12" fill="#FF8A1E" stroke="#0B0B0B" stroke-width="3"/>`,
  ];
  return `<svg viewBox="0 0 150 140" class="h-full w-full" role="img" aria-label="飞人动作剪影">
    <g stroke="#0B0B0B" stroke-width="3" opacity="0.5" stroke-linecap="round">
      <line x1="10" y1="14" x2="38" y2="26"/><line x1="140" y1="14" x2="112" y2="26"/>
    </g>
    ${poses[i % poses.length]}
  </svg>`;
}

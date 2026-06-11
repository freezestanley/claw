// 内联 SVG 篮球鞋侧视插画 —— 占位主视觉，无外部图片依赖
// 高帮运动鞋剪影 + 能量配色，契合球鞋店调性

export function shoeSvg({ c1 = "#c6f135", c2 = "#ff5a1f", w = 320, h = 220 } = {}) {
  const gid = "s" + Math.random().toString(36).slice(2, 8);
  return `
  <svg viewBox="0 0 320 220" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="篮球鞋">
    <defs>
      <linearGradient id="body-${gid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <!-- 鞋底 -->
    <path d="M28 168 Q24 186 44 188 L268 188 Q300 188 300 170 L298 158
             Q210 168 150 160 Q90 152 40 150 Q28 152 28 168 Z"
          fill="#0a0c0f" stroke="#2a2f37" stroke-width="2"/>
    <!-- 中底缓震 -->
    <path d="M30 150 Q120 158 200 156 Q260 154 298 150 L300 162
             Q210 168 150 160 Q90 152 32 162 Z" fill="${c1}" opacity="0.9"/>
    <!-- 鞋身 -->
    <path d="M40 150 Q44 96 92 86 L150 78 Q180 74 196 92
             L236 132 Q270 138 292 146 Q300 148 298 152
             Q210 160 150 154 Q90 148 40 150 Z"
          fill="url(#body-${gid})"/>
    <!-- 高帮鞋领 -->
    <path d="M150 78 Q176 70 196 92 L208 120 Q190 112 172 112 Q156 96 150 78 Z"
          fill="#15181d" opacity="0.92"/>
    <!-- 鞋头分割 -->
    <path d="M40 150 Q52 120 86 116 Q96 132 96 150 Z" fill="#0d0f12" opacity="0.35"/>
    <!-- 鞋带区 -->
    <g stroke="#0d0f12" stroke-width="5" stroke-linecap="round" opacity="0.8">
      <line x1="118" y1="104" x2="150" y2="98"/>
      <line x1="124" y1="118" x2="156" y2="112"/>
      <line x1="130" y1="132" x2="162" y2="126"/>
    </g>
    <!-- swoosh 风格能量条 -->
    <path d="M96 150 Q150 120 236 132" fill="none" stroke="#0d0f12" stroke-width="6" opacity="0.7"/>
    <!-- 高光 -->
    <path d="M92 96 Q140 84 180 96" fill="none" stroke="#ffffff" stroke-opacity="0.4" stroke-width="3"/>
  </svg>`;
}

// 绿萝科普文案（自拟/占位，待确认）。图片均为线上免授权实拍图，已校验可访问。
export const IMG = {
  // 均为免授权图库实拍图，已经 curl(200) + CDP 渲染核对；为“室内绿植/藤蔓叶片”贴题画面。
  // 严格的“绿萝（Epipremnum aureum）物种匹配”仍建议人工核对，详见 ASSETS.md。
  hero: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=1200&q=80",      // 垂挂藤蔓盆栽
  intro: "https://images.pexels.com/photos/4505166/pexels-photo-4505166.jpeg?auto=compress&w=1200", // 室内绿植生活场景
  appearance: "https://images.pexels.com/photos/9966322/pexels-photo-9966322.jpeg?auto=compress&w=1000", // 心形绿叶特写
  water: "https://images.pexels.com/photos/4751970/pexels-photo-4751970.jpeg?auto=compress&w=900",     // 换盆/上盆养护
  origin: "https://images.unsplash.com/photo-1545165375-1b744b9ed444?w=1000&q=80",   // 繁茂绿叶丛
};

// 养护卡片
export const CARE = [
  {
    key: "light",
    icon: "sun",
    title: "光照",
    summary: "明亮散射光最佳，耐半阴，忌暴晒。",
    detail:
      "绿萝喜明亮的散射光，放在距离窗边 1–2 米、有柔和光线的位置长势最好。光照充足时叶片更厚、斑纹更明显；长期过暗会导致徒长、叶色发淡。夏季应避免正午阳光直射，否则叶缘易灼伤发黄。",
  },
  {
    key: "water",
    icon: "droplet",
    title: "浇水",
    summary: "见干见湿，宁干勿涝，忌积水烂根。",
    detail:
      "遵循“见干见湿”原则：表层土壤干燥约 2–3 厘米时再一次性浇透，让多余水从盆底排出，切忌盆内长期积水。春夏生长旺季约 3–5 天一次，秋冬减少至 7–10 天一次。水培绿萝则保持根系 2/3 浸水，每 5–7 天换一次水。",
  },
  {
    key: "climate",
    icon: "thermometer",
    title: "温湿度",
    summary: "适温 15–28℃，喜湿润，低于 10℃ 易受冻。",
    detail:
      "最适生长温度为 15–28℃，越冬温度不应低于 10℃，否则叶片易出现冻斑、脱落。绿萝喜较高空气湿度，干燥季节可每日向叶面喷雾或在旁放置水盘增湿，叶片也会更油绿光亮。",
  },
  {
    key: "fertilizer",
    icon: "leaf",
    title: "施肥",
    summary: "薄肥勤施，生长期每月 1–2 次。",
    detail:
      "生长季（春至秋）每月施 1–2 次稀释的氮肥或通用观叶植物营养液，遵循“薄肥勤施”，浓度宜淡不宜浓。冬季植株进入半休眠，应停止施肥。施肥后适量浇水稀释，避免肥害烧根。",
  },
];

// 外观特征
export const FEATURES = [
  { title: "叶片", text: "心形至卵形，互生，革质有光泽；常带黄绿相间的斑纹，光照越足斑纹越明显。" },
  { title: "茎蔓", text: "茎为蔓性，节上易生气生根，可垂吊也可攀附墙面、立柱向上生长。" },
  { title: "株型", text: "幼株叶片较小，成熟攀爬后叶片明显增大，可形成繁茂的绿色帘幕。" },
  { title: "气根", text: "节部长出的气生根能吸附攀附物，并辅助吸收空气中的水分与养分。" },
];

// 产地与习性
export const ORIGIN = {
  title: "产地与习性",
  paras: [
    "绿萝（学名 Epipremnum aureum）原产于南太平洋所罗门群岛一带的热带雨林，属天南星科麒麟叶属的常绿藤本植物。",
    "在原生环境中，绿萝攀附于高大乔木的树干向上生长，习惯温暖、湿润、半阴的林下气候，因此耐阴、好湿、怕冷怕晒。",
    "它生命力顽强、适应性强，水培土培皆宜，是最常见的室内观叶绿植之一，常用于居室、办公室的垂吊与墙面绿化。",
  ],
};

// 常见问题
export const FAQ = [
  {
    q: "叶子发黄是怎么回事？",
    a: "最常见是浇水过多导致烂根，其次为光照不足或长期不施肥。先检查盆土是否积水，调整为见干见湿，并移到明亮散射光处。",
  },
  {
    q: "绿萝有毒吗？可以放卧室吗？",
    a: "绿萝汁液含草酸钙结晶，误食或汁液接触皮肤黏膜可能引起刺激，家中有幼儿和宠物时建议放在够不到的位置。正常摆放观赏、夜间放在卧室是安全的。",
  },
  {
    q: "水培好还是土培好？",
    a: "两者皆可。水培干净易打理、便于观察根系，需定期换水；土培长势更壮、株型更繁茂。可按摆放环境与打理习惯自由选择。",
  },
  {
    q: "如何让绿萝长得更茂盛？",
    a: "保证明亮散射光、薄肥勤施、及时摘心打顶促分枝，并给攀爬品种设置支柱或挂绳引导生长，叶片会更大更密。",
  },
];

// SVG 图标（line 风格），返回可直接 innerHTML 的字符串
export function icon(name) {
  const paths = {
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    droplet: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
    thermometer: '<path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>',
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || ""}</svg>`;
}

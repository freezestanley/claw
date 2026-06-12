// 游戏内容数据（占位设定，待用户确认后替换）
export const GAME = {
  title: "ASHFALL",
  titleCn: "灰落",
  tagline: "雾起之后，没有人记得自己是谁。",
  genre: "第一人称 · 心理恐怖 · 生存",
  releaseLabel: "2026 万圣夜",
  releaseDate: "2026.10.31",
};

export const IMG = {
  hero: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&q=80",
  story: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=1400&q=80",
  shots: [
    { src: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=1100&q=80", cap: "镇外的针叶林，灰雾从地表渗起" },
    { src: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=1100&q=80", cap: "唯一的光，来自你手里将熄的灯" },
    { src: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1100&q=80", cap: "Hollow 旅馆 · 走廊尽头有人在等" },
    { src: "https://images.unsplash.com/photo-1499244571948-7ccddb3583f1?w=1100&q=80", cap: "夜里第三声钟，声音会找到你" },
  ],
};

export const STORY = [
  "1987 年冬，北方矿镇 Mara's Hollow 在一夜之间从地图上消失。没有撤离记录，没有遗体，只有一份语焉不详的封锁令。",
  "三十年后，你收到一封寄自这座镇子的信——笔迹是你母亲的，而她早已不在人世。",
  "回到 Hollow，你发现灰雾从未散去。它记得每一个曾住在这里的人，并且，开始记得你。",
];

export const FEATURES = [
  { k: "01", t: "动态恐惧系统", d: "灰雾会学习你的行为。你越依赖某种应对方式，它就越针对它。没有两次相同的恐惧。" },
  { k: "02", t: "无 HUD 沉浸", d: "没有血条、没有小地图、没有任务标记。你只有一盏灯、一段记忆，和越来越不可信的眼睛。" },
  { k: "03", t: "声音即生存", d: "全向双耳音频。脚步、呼吸、钟声——在 Hollow，听错一个方向就是最后一个错误。" },
];

export const CHARACTERS = [
  {
    name: "归来者",
    role: "你 · 唯一的玩家视角",
    img: IMG.shots[1].src,
    desc: "带着不属于自己的记忆回到镇上。每一段被想起的过去，都会改变此刻雾里站着的东西。",
    tag: "PROTAGONIST",
  },
  {
    name: "守钟人",
    role: "镇子的最后看门人",
    img: "https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=900&q=80",
    desc: "他说自己活着是为了敲钟。第三声钟之后，没有人见过他的脸——也没有人确定他是否还算人。",
    tag: "ENTITY",
  },
  {
    name: "灰落",
    role: "并非天气",
    img: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=900&q=80",
    desc: "它不是雾。它是这座镇子拒绝遗忘的部分，凝结成可以触碰你的形状。它叫着你的名字，用你母亲的声音。",
    tag: "THE FALL",
  },
];

export const PLATFORMS = [
  { name: "PC · Steam", note: "Steam 愿望单已开放", primary: true },
  { name: "PlayStation 5", note: "支持 3D 触觉与自适应扳机", primary: false },
  { name: "Xbox Series X|S", note: "首发即入 Game Pass", primary: false },
];

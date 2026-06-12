const BRAND = "Ribbonè";
const BRAND_CN = "丝带屋";

// 真实氛围图（已 curl 校验 200 image/*；贴题待人工核对，见 ASSETS.md）
const IMG = {
  hero: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=1400&q=80",
  story: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1100&q=80",
  look1: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1000&q=80",
  look2: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=1000&q=80",
  look3: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=1000&q=80",
  look4: "https://images.unsplash.com/photo-1546877625-cb8c71916608?w=1000&q=80"
};

// 程序化蝴蝶结 SVG —— 主视觉，绝对贴题、零破图、可换色
// c1=主色 c2=深色阴影 c3=高光 size=像素
function bowSVG(c1, c2, c3, label) {
  return `
<svg viewBox="0 0 200 150" role="img" aria-label="${label || "蝴蝶结"}" class="w-full h-full">
  <defs>
    <linearGradient id="g_${c1.replace("#", "")}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c3}"/>
      <stop offset="55%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <!-- 飘带 -->
  <path d="M92 78 C70 100 60 128 64 140 L86 132 C84 116 90 96 100 86 Z" fill="${c2}"/>
  <path d="M108 78 C130 100 140 128 136 140 L114 132 C116 116 110 96 100 86 Z" fill="${c2}"/>
  <!-- 左环 -->
  <path d="M100 70 C72 40 18 44 18 72 C18 100 72 100 100 78 Z" fill="url(#g_${c1.replace("#", "")})"/>
  <!-- 右环 -->
  <path d="M100 70 C128 40 182 44 182 72 C182 100 128 100 100 78 Z" fill="url(#g_${c1.replace("#", "")})"/>
  <!-- 环内褶皱高光 -->
  <path d="M92 64 C66 48 30 54 28 70" stroke="${c3}" stroke-width="3" fill="none" opacity="0.55" stroke-linecap="round"/>
  <path d="M108 64 C134 48 170 54 172 70" stroke="${c3}" stroke-width="3" fill="none" opacity="0.55" stroke-linecap="round"/>
  <!-- 中心结 -->
  <rect x="86" y="58" width="28" height="34" rx="9" fill="${c2}"/>
  <rect x="89" y="61" width="22" height="28" rx="7" fill="${c1}"/>
  <rect x="93" y="64" width="6" height="22" rx="3" fill="${c3}" opacity="0.7"/>
</svg>`;
}

// 单品数据：每个用一套配色的 SVG 蝴蝶结表现
const products = [
  { c1: "#e8859b", c2: "#a23b56", c3: "#fceef2", name: "经典缎面结", en: "Classic Satin", desc: "哑光缎带 · 法式百搭基本款", price: "¥39" },
  { c1: "#f4b8c8", c2: "#d96380", c3: "#fff0f5", name: "樱花软糖结", en: "Sakura Candy", desc: "奶甜樱花粉 · 拍照氛围感拉满", price: "¥42" },
  { c1: "#c44569", c2: "#7d1f3a", c3: "#f7d9e3", name: "酒红丝绒结", en: "Velvet Wine", desc: "丝绒厚质 · 复古小姐姐气场", price: "¥49" },
  { c1: "#f7d9e3", c2: "#d96380", c3: "#ffffff", name: "珍珠耳语结", en: "Pearl Whisper", desc: "缀珍珠细闪 · 温柔又有光", price: "¥45" },
  { c1: "#ffd9b3", c2: "#d98a4a", c3: "#fff6ec", name: "焦糖奶油结", en: "Caramel Cream", desc: "暖调焦糖 · 黄黑皮都好看", price: "¥39" },
  { c1: "#b8d8e8", c2: "#4a7d96", c3: "#f0f8ff", name: "薄荷晴空结", en: "Minty Sky", desc: "清爽薄荷蓝 · 夏日小清新", price: "¥42" }
];

// 系列 / 材质
const series = [
  { c1: "#e8859b", c2: "#a23b56", c3: "#fceef2", title: "缎带系列", en: "Satin", desc: "顺滑哑光，光泽不廉价" },
  { c1: "#c44569", c2: "#7d1f3a", c3: "#f7d9e3", title: "丝绒系列", en: "Velvet", desc: "厚质有手感，秋冬必备" },
  { c1: "#f7d9e3", c2: "#d96380", c3: "#ffffff", title: "珍珠系列", en: "Pearl", desc: "细珠点缀，温柔有光" }
];

const app = document.querySelector("#app");

app.innerHTML = `<div id="page"></div>`;
const page = document.querySelector("#page");

// 各分区按顺序通过 edit 追加进 SECTIONS，最后合并渲染
const SECTIONS = [];

// ---------- 公告条 + 导航 ----------
SECTIONS.push(`
<div class="bg-rose text-milk text-xs sm:text-sm py-2.5 overflow-hidden">
  <div class="marquee">
    &nbsp;新系列「初夏缎语」上新　·　满 ¥99 包邮　·　把温柔系在发间　·　@ribbone.official　·&nbsp;
    新系列「初夏缎语」上新　·　满 ¥99 包邮　·　把温柔系在发间　·　@ribbone.official　·
  </div>
</div>

<header class="sticky top-0 z-40 nav-blur border-b border-rose/20">
  <nav class="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
    <button id="menu-btn" class="md:hidden text-wine text-2xl leading-none w-11 h-11 -ml-2" aria-label="菜单">☰</button>
    <a href="#top" class="font-display text-2xl sm:text-[1.7rem] text-wine tracking-tight">
      ${BRAND}<span class="text-rose">.</span>
    </a>
    <div class="hidden md:flex items-center gap-9 text-sm text-wine/80">
      <a href="#story" class="hover:text-rose transition">品牌故事</a>
      <a href="#series" class="hover:text-rose transition">系列</a>
      <a href="#pieces" class="hover:text-rose transition">单品</a>
      <a href="#look" class="hover:text-rose transition">Lookbook</a>
      <a href="#follow" class="hover:text-rose transition">关注我们</a>
    </div>
    <a href="#follow" class="hidden sm:inline-flex btn-rose rounded-full px-5 py-2 text-sm">关注</a>
  </nav>
  <div id="mobile-menu" class="md:hidden hidden border-t border-rose/20 px-5 py-3 space-y-1 text-sm bg-milk">
    <a href="#story" class="block py-2.5 text-wine">品牌故事</a>
    <a href="#series" class="block py-2.5 text-wine">系列</a>
    <a href="#pieces" class="block py-2.5 text-wine">单品</a>
    <a href="#look" class="block py-2.5 text-wine">Lookbook</a>
    <a href="#follow" class="block py-2.5 text-wine">关注我们</a>
  </div>
</header>
`);

// ---------- Hero ----------
SECTIONS.push(`
<main id="top">
<section class="relative overflow-hidden">
  <div class="absolute -top-16 -left-10 w-72 h-72 rounded-full bg-blush/50 blur-3xl"></div>
  <div class="absolute top-40 -right-10 w-72 h-72 rounded-full bg-rose/20 blur-3xl"></div>
  <div class="relative max-w-6xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-8 md:gap-6 items-center py-14 sm:py-20">
    <div class="reveal">
      <p class="inline-flex items-center gap-2 text-rose-deep text-xs sm:text-sm tracking-[0.2em] uppercase mb-4">
        <span class="w-2 h-2 rounded-full bg-rose"></span>Sweet French Hair Bows
      </p>
      <h1 class="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.03] text-wine">
        把<span class="italic text-rose-deep">温柔</span><br/>系在发间
      </h1>
      <p class="mt-6 text-fog leading-relaxed max-w-md">
        ${BRAND} 是给甜系女孩的蝴蝶结发饰小店——
        缎带、丝绒、珍珠蝴蝶结，一只结，系住你的好心情。
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a href="#pieces" class="btn-rose rounded-full px-7 py-3.5">看看单品</a>
        <a href="#story" class="btn-outline rounded-full px-7 py-3.5">品牌故事</a>
      </div>
      <div class="mt-9 flex items-center gap-7 text-wine">
        <div><span class="font-display text-2xl block">120+</span><span class="text-xs text-fog">蝴蝶结款式</span></div>
        <div class="w-px h-8 bg-rose/30"></div>
        <div><span class="font-display text-2xl block">24色</span><span class="text-xs text-fog">甜系色板</span></div>
        <div class="w-px h-8 bg-rose/30"></div>
        <div><span class="font-display text-2xl block">0损</span><span class="text-xs text-fog">加固不滑</span></div>
      </div>
    </div>
    <div class="relative reveal">
      <div class="rounded-[2.5rem] overflow-hidden shadow-soft aspect-[4/5] bg-blush-soft">
        <img src="${IMG.hero}" alt="甜美法式蝴蝶结氛围" loading="eager" class="w-full h-full object-cover" />
      </div>
      <div class="sway absolute inset-0 m-auto w-2/3 max-w-[280px] drop-shadow-[0_18px_30px_rgba(162,59,86,0.45)] pointer-events-none">
        ${bowSVG("#f4b8c8", "#d96380", "#fff0f5", "主视觉蝴蝶结")}
      </div>
      <div class="floaty absolute -bottom-5 -left-3 sm:-left-6 bg-milk rounded-2xl shadow-soft px-4 py-3 flex items-center gap-3">
        <span class="w-9 h-9">${bowSVG("#e8859b", "#a23b56", "#fceef2", "")}</span>
        <div><p class="font-display text-wine leading-none">初夏缎语</p><p class="text-[11px] text-fog mt-0.5">新系列上新</p></div>
      </div>
    </div>
  </div>
</section>
`);

// ---------- 品牌故事 ----------
SECTIONS.push(`
<section id="story" class="bg-blush-soft border-y border-rose/15">
  <div class="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24 grid md:grid-cols-2 gap-10 md:gap-14 items-center">
    <div class="reveal rounded-[2rem] overflow-hidden shadow-soft aspect-[4/3] order-2 md:order-1 bg-blush">
      <img src="${IMG.story}" alt="品牌氛围 · 缎带与礼物" loading="lazy" class="w-full h-full object-cover" />
    </div>
    <div class="reveal order-1 md:order-2">
      <p class="text-rose-deep text-xs tracking-[0.2em] uppercase mb-3">Our Story</p>
      <h2 class="font-display text-4xl sm:text-5xl text-wine leading-tight">一只蝴蝶结，<br/>系住刚刚好的甜</h2>
      <p class="mt-5 text-fog leading-relaxed">
        ${BRAND} 从一条缎带开始。我们相信，最动人的不是繁复，
        而是发间那一点刚刚好的点缀——为每个女孩，把普通的一天，
        系出一点点不一样的温柔。
      </p>
      <ul class="mt-7 space-y-3 text-sm text-wine/90">
        <li class="flex items-center gap-3"><span class="dot"></span>缎面/丝绒多材质，温柔不廉价</li>
        <li class="flex items-center gap-3"><span class="dot"></span>甜系色板，黄黑皮都好驾驭</li>
        <li class="flex items-center gap-3"><span class="dot"></span>加固鸭嘴夹，厚发细发都夹得住</li>
      </ul>
    </div>
  </div>
</section>
`);

// ---------- 系列 / 材质 ----------
SECTIONS.push(`
<section id="series" class="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
  <div class="text-center mb-10 sm:mb-12 reveal">
    <p class="text-rose-deep text-xs tracking-[0.2em] uppercase mb-3">Collections</p>
    <h2 class="font-display text-4xl sm:text-5xl text-wine">三个系列 · 三种温柔</h2>
  </div>
  <div class="grid sm:grid-cols-3 gap-5 sm:gap-6">
    ${series.map((s) => `
    <div class="reveal piece bg-milk rounded-3xl p-7 sm:p-8 text-center shadow-soft border border-rose/10">
      <div class="piece-bow mx-auto w-28 h-24 sm:w-32 sm:h-28">${bowSVG(s.c1, s.c2, s.c3, s.title)}</div>
      <p class="text-[11px] tracking-widest uppercase text-rose-deep mt-4">${s.en}</p>
      <h3 class="font-display text-2xl text-wine mt-1">${s.title}</h3>
      <p class="text-sm text-fog mt-2 leading-relaxed">${s.desc}</p>
    </div>`).join("")}
  </div>
</section>
`);

// ---------- 单品橱窗 ----------
SECTIONS.push(`
<section id="pieces" class="bg-blush-soft border-y border-rose/15 py-16 sm:py-24">
  <div class="max-w-6xl mx-auto px-5 sm:px-8">
    <div class="flex items-end justify-between mb-9 reveal">
      <div>
        <p class="text-rose-deep text-xs tracking-[0.2em] uppercase mb-2">Pieces</p>
        <h2 class="font-display text-4xl sm:text-5xl text-wine">人气蝴蝶结</h2>
      </div>
      <span class="text-fog text-sm hidden sm:block">@ribbone.official</span>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      ${products.map((p) => `
      <article class="piece reveal bg-milk rounded-3xl overflow-hidden shadow-soft border border-rose/10">
        <div class="aspect-square grid place-items-center p-7 sm:p-9" style="background:linear-gradient(160deg, ${p.c3} 0%, ${p.c1}33 100%)">
          <div class="piece-bow w-full max-w-[150px] drop-shadow-[0_12px_22px_rgba(162,59,86,0.3)]">${bowSVG(p.c1, p.c2, p.c3, p.name)}</div>
        </div>
        <div class="p-4 sm:p-5">
          <div class="flex items-center justify-between">
            <p class="text-[11px] tracking-widest uppercase text-rose-deep">${p.en}</p>
            <span class="font-display text-wine text-sm">${p.price}</span>
          </div>
          <h3 class="font-display text-xl text-wine mt-1">${p.name}</h3>
          <p class="text-xs text-fog mt-1.5 leading-relaxed">${p.desc}</p>
          <button class="add-btn mt-3 w-full btn-outline rounded-full py-2.5 text-sm" data-name="${p.name}">加入心愿单</button>
        </div>
      </article>`).join("")}
    </div>
  </div>
</section>
`);

// ---------- Lookbook 图墙 ----------
SECTIONS.push(`
<section id="look" class="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
  <div class="text-center mb-10 reveal">
    <p class="text-rose-deep text-xs tracking-[0.2em] uppercase mb-3">Lookbook</p>
    <h2 class="font-display text-4xl sm:text-5xl text-wine">初夏缎语 · 氛围图鉴</h2>
  </div>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
    <div class="reveal look rounded-2xl overflow-hidden aspect-[3/4] row-span-2 col-span-2 md:col-span-2 bg-blush">
      <img src="${IMG.look1}" alt="lookbook 蝴蝶结氛围" loading="lazy" class="look-img w-full h-full object-cover" />
    </div>
    <div class="reveal look rounded-2xl overflow-hidden aspect-square bg-blush"><img src="${IMG.look2}" alt="缎带" loading="lazy" class="look-img w-full h-full object-cover" /></div>
    <div class="reveal look rounded-2xl overflow-hidden aspect-square bg-blush"><img src="${IMG.look3}" alt="蝴蝶结" loading="lazy" class="look-img w-full h-full object-cover" /></div>
    <div class="reveal look rounded-2xl overflow-hidden aspect-[2/1] col-span-2 bg-blush"><img src="${IMG.look4}" alt="丝带" loading="lazy" class="look-img w-full h-full object-cover" /></div>
  </div>
  <p class="mt-4 text-center text-[11px] text-fog/70">氛围图为商用免授权图库素材，仅作品牌展示</p>
</section>
`);

// ---------- 关注我们 ----------
SECTIONS.push(`
<section id="follow" class="max-w-6xl mx-auto px-5 sm:px-8 pb-16 sm:pb-24">
  <div class="reveal rounded-[2.5rem] bg-wine text-milk px-6 sm:px-14 py-14 sm:py-20 text-center relative overflow-hidden">
    <div class="absolute -top-10 -left-6 w-44 h-44 rounded-full bg-rose/40 blur-2xl"></div>
    <div class="absolute -bottom-12 -right-6 w-56 h-56 rounded-full bg-blush/30 blur-2xl"></div>
    <div class="sway relative mx-auto w-20 h-16 mb-4">${bowSVG("#f7d9e3", "#e8859b", "#ffffff", "")}</div>
    <p class="relative text-blush text-xs tracking-[0.2em] uppercase mb-3">Follow ${BRAND}</p>
    <h2 class="relative font-display text-4xl sm:text-5xl leading-tight">关注我们，<br/>不错过每次上新</h2>
    <p class="relative mt-4 text-milk/80 max-w-md mx-auto">留下邮箱，新系列与穿搭灵感第一时间送到你手边。</p>
    <form id="follow-form" class="relative mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input type="email" name="email" required placeholder="你的邮箱"
        class="flex-1 rounded-full px-5 py-3.5 bg-milk text-ink placeholder:text-fog/70 focus:outline-none focus:ring-2 focus:ring-rose" />
      <button type="submit" class="btn-rose rounded-full px-7 py-3.5 whitespace-nowrap">订阅</button>
    </form>
    <p id="follow-msg" class="relative mt-4 text-sm text-blush h-5" role="status"></p>
    <div class="relative mt-7 flex justify-center gap-5 text-sm text-milk/80">
      <a href="#" class="hover:text-milk">Instagram</a><span class="opacity-40">·</span>
      <a href="#" class="hover:text-milk">小红书</a><span class="opacity-40">·</span>
      <a href="#" class="hover:text-milk">微博</a>
    </div>
  </div>
</section>

<footer class="border-t border-rose/20">
  <div class="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-fog">
    <p class="font-display text-xl text-wine">${BRAND}<span class="text-rose">.</span> <span class="text-fog text-sm font-sans ml-1">${BRAND_CN}</span></p>
    <p>© 2026 ${BRAND} · 蝴蝶结发饰 · 仅作品牌展示</p>
  </div>
</footer>
</main>
`);

// === RENDER ===
function render() {
  page.innerHTML = SECTIONS.join("\n");
}
render();

// ---------- 移动菜单 ----------
const mobileMenu = document.querySelector("#mobile-menu");
const menuBtn = document.querySelector("#menu-btn");
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
  mobileMenu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => mobileMenu.classList.add("hidden"))
  );
}

// ---------- 心愿单计数（展示用） ----------
let wish = 0;
document.querySelectorAll(".add-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    wish += 1;
    btn.textContent = "✓ 已加入";
    setTimeout(() => (btn.textContent = "加入心愿单"), 1600);
  });
});

// ---------- 订阅（前端 mock，无后端） ----------
const followForm = document.querySelector("#follow-form");
const followMsg = document.querySelector("#follow-msg");
if (followForm) {
  followForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!followForm.email.value.trim()) return;
    followMsg.textContent = "✓ 订阅成功！上新与灵感这就安排上～";
    followForm.reset();
    setTimeout(() => (followMsg.textContent = ""), 4000);
  });
}

// ---------- 滚动入场（anime.js + IO，尊重 reduced-motion） ----------
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const reveals = document.querySelectorAll(".reveal");
if (reduce || !window.anime) {
  reveals.forEach((el) => el.classList.add("in"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          const el = en.target;
          io.unobserve(el);
          anime.animate(el, {
            translateY: [26, 0],
            opacity: [0, 1],
            easing: "easeOutCubic",
            duration: 700
          });
          el.classList.add("in");
        }
      });
    },
    { threshold: 0.12 }
  );
  reveals.forEach((el) => io.observe(el));
}

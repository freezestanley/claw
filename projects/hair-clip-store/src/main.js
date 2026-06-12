const BRAND = "MANCLIP";
const BRAND_CN = "小满夹物";

const IMG = {
  hero: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1400&q=80",
  story: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=1100&q=80",
  look1: "https://images.pexels.com/photos/2587370/pexels-photo-2587370.jpeg?auto=compress&w=1000",
  look2: "https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&w=1000",
  p1: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80",
  p2: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=900&q=80",
  p3: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&q=80",
  p4: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=900&q=80",
  p5: "https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?w=900&q=80"
};

const products = [
  { img: IMG.p1, name: "焦糖奶油夹", en: "Caramel Cream", desc: "哑光树脂 · 暖色系万能百搭" },
  { img: IMG.p2, name: "亮橘小太阳", en: "Sunny Tang", desc: "ins 高频出镜 · 一点点甜酷" },
  { img: IMG.p3, name: "珍珠碎碎念", en: "Pearl Whisper", desc: "细闪珍珠 · 温柔又有光" },
  { img: IMG.p4, name: "缎面蝴蝶结", en: "Satin Bow", desc: "韩系软妹 · 拍照氛围感拉满" },
  { img: IMG.p5, name: "复古弹簧夹", en: "Retro Snap", desc: "好夹不滑 · 厚发也稳" }
];

const app = document.querySelector("#app");

app.innerHTML = `
<!-- 公告条 -->
<div class="bg-tang text-milk text-xs sm:text-sm py-2.5 overflow-hidden font-sans tracking-wide">
  <div class="marquee">
    &nbsp;新系列「小满の夏」上新　·　ins 同款发饰　·　为每个小心情夹上一点光　·　@manclip.official　·&nbsp;
    新系列「小满の夏」上新　·　ins 同款发饰　·　为每个小心情夹上一点光　·　@manclip.official　·
  </div>
</div>

<!-- 导航 -->
<header class="sticky top-0 z-40 nav-blur border-b border-caramel-soft/30">
  <nav class="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
    <button id="menu-btn" class="md:hidden text-caramel text-2xl leading-none" aria-label="菜单">☰</button>
    <a href="#top" class="font-display text-2xl sm:text-[1.7rem] text-caramel tracking-tight">
      ${BRAND_CN}<span class="text-tang">.</span>
    </a>
    <div class="hidden md:flex items-center gap-9 text-sm text-caramel/80 font-sans">
      <a href="#story" class="hover:text-tang transition">品牌故事</a>
      <a href="#look" class="hover:text-tang transition">Lookbook</a>
      <a href="#pieces" class="hover:text-tang transition">单品</a>
      <a href="#follow" class="hover:text-tang transition">关注我们</a>
    </div>
    <a href="#follow" class="hidden sm:inline-flex btn-tang rounded-full px-5 py-2 text-sm">关注</a>
  </nav>
  <div id="mobile-menu" class="md:hidden hidden border-t border-caramel-soft/30 px-5 py-3 space-y-1 text-sm bg-milk">
    <a href="#story" class="block py-2 text-caramel">品牌故事</a>
    <a href="#look" class="block py-2 text-caramel">Lookbook</a>
    <a href="#pieces" class="block py-2 text-caramel">单品</a>
    <a href="#follow" class="block py-2 text-caramel">关注我们</a>
  </div>
</header>

<main id="top">
  <!-- Hero -->
  <section class="relative overflow-hidden">
    <div class="max-w-6xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-8 md:gap-6 items-center py-14 sm:py-20">
      <div class="reveal">
        <p class="inline-flex items-center gap-2 text-tang text-xs sm:text-sm tracking-[0.2em] uppercase mb-4">
          <span class="w-2 h-2 rounded-full bg-tang"></span>Sweet &amp; Cool Hair Accessories
        </p>
        <h1 class="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.02] text-caramel">
          为每个<br /><span class="italic text-tang">小心情</span><br />夹上一点光
        </h1>
        <p class="mt-6 text-fog leading-relaxed max-w-md">
          ${BRAND_CN} ${BRAND} 是给学生女孩的甜酷韩系发饰品牌——
          奶油暖调、ins 出镜感，一只夹子，藏住碎发也夹住好心情。
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <a href="#pieces" class="btn-tang rounded-full px-7 py-3.5">看看单品</a>
          <a href="#story" class="btn-outline rounded-full px-7 py-3.5">品牌故事</a>
        </div>
        <div class="mt-9 flex items-center gap-7 text-caramel">
          <div><span class="font-display text-2xl block">200+</span><span class="text-xs text-fog">ins 同款</span></div>
          <div class="w-px h-8 bg-caramel-soft/40"></div>
          <div><span class="font-display text-2xl block">36色</span><span class="text-xs text-fog">奶油色系</span></div>
          <div class="w-px h-8 bg-caramel-soft/40"></div>
          <div><span class="font-display text-2xl block">0滑</span><span class="text-xs text-fog">好夹不掉</span></div>
        </div>
      </div>
      <div class="relative reveal">
        <div class="hero-img rounded-[2rem] overflow-hidden shadow-soft aspect-[4/5]">
          <img src="${IMG.hero}" alt="甜酷韩系发饰氛围" loading="eager" class="w-full h-full object-cover" />
        </div>
        <div class="floaty absolute -bottom-5 -left-3 sm:-left-6 bg-milk rounded-2xl shadow-soft px-4 py-3 flex items-center gap-3">
          <span class="text-2xl">🎀</span>
          <div><p class="font-display text-caramel leading-none">小满の夏</p><p class="text-[11px] text-fog mt-0.5">新系列上新</p></div>
        </div>
        <div class="absolute -top-4 -right-2 w-20 h-20 rounded-full bg-tang-soft/50 blur-md"></div>
      </div>
    </div>
  </section>

  <!-- 品牌故事 -->
  <section id="story" class="bg-milk border-y border-caramel-soft/25">
    <div class="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24 grid md:grid-cols-2 gap-10 md:gap-14 items-center">
      <div class="reveal rounded-[2rem] overflow-hidden shadow-soft aspect-[4/3] order-2 md:order-1">
        <img src="${IMG.story}" alt="品牌氛围" loading="lazy" class="w-full h-full object-cover" />
      </div>
      <div class="reveal order-1 md:order-2">
        <p class="text-tang text-xs tracking-[0.2em] uppercase mb-3">Our Story</p>
        <h2 class="font-display text-4xl sm:text-5xl text-caramel leading-tight">小满，<br/>是刚刚好的甜</h2>
        <p class="mt-5 text-fog leading-relaxed">
          我们相信，最好的状态不是圆满，而是"小满"——
          差一点的留白，留给惊喜。${BRAND_CN}从一只奶油色发夹开始，
          想陪每个女孩，把普通的一天，夹出一点点不一样的光。
        </p>
        <ul class="mt-7 space-y-3 text-sm text-caramel/90">
          <li class="flex items-center gap-3"><span class="dot"></span>哑光树脂手感，温柔不廉价</li>
          <li class="flex items-center gap-3"><span class="dot"></span>暖色系搭配，黄黑皮都好看</li>
          <li class="flex items-center gap-3"><span class="dot"></span>加固弹簧，厚发细发都夹得住</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- Lookbook 图墙 -->
  <section id="look" class="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
    <div class="text-center mb-10 reveal">
      <p class="text-tang text-xs tracking-[0.2em] uppercase mb-3">Lookbook</p>
      <h2 class="font-display text-4xl sm:text-5xl text-caramel">小满の夏 · 造型图鉴</h2>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      <div class="reveal look rounded-2xl overflow-hidden aspect-[3/4] row-span-2 md:row-span-2 col-span-2 md:col-span-2">
        <img src="${IMG.look1}" alt="lookbook" loading="lazy" class="w-full h-full object-cover" />
      </div>
      <div class="reveal look rounded-2xl overflow-hidden aspect-square"><img src="${IMG.p2}" alt="" loading="lazy" class="w-full h-full object-cover" /></div>
      <div class="reveal look rounded-2xl overflow-hidden aspect-square"><img src="${IMG.p4}" alt="" loading="lazy" class="w-full h-full object-cover" /></div>
      <div class="reveal look rounded-2xl overflow-hidden aspect-[2/1] col-span-2"><img src="${IMG.look2}" alt="" loading="lazy" class="w-full h-full object-cover" /></div>
    </div>
  </section>

  <!-- 单品精选 -->
  <section id="pieces" class="bg-milk border-y border-caramel-soft/25 py-16 sm:py-24">
    <div class="max-w-6xl mx-auto px-5 sm:px-8">
      <div class="flex items-end justify-between mb-9 reveal">
        <div>
          <p class="text-tang text-xs tracking-[0.2em] uppercase mb-2">Pieces</p>
          <h2 class="font-display text-4xl sm:text-5xl text-caramel">人气单品</h2>
        </div>
        <span class="text-fog text-sm hidden sm:block">@manclip.official</span>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        ${products
          .map(
            (p) => `
        <article class="piece reveal bg-cream rounded-3xl overflow-hidden shadow-soft">
          <div class="aspect-square overflow-hidden">
            <img src="${p.img}" alt="${p.name}" loading="lazy" class="w-full h-full object-cover piece-img" />
          </div>
          <div class="p-4 sm:p-5">
            <p class="text-[11px] tracking-widest uppercase text-tang">${p.en}</p>
            <h3 class="font-display text-xl text-caramel mt-1">${p.name}</h3>
            <p class="text-xs text-fog mt-1.5 leading-relaxed">${p.desc}</p>
          </div>
        </article>`
          )
          .join("")}
        <article class="reveal rounded-3xl bg-tang text-milk p-6 flex flex-col justify-center items-start shadow-soft">
          <span class="text-3xl mb-2">🌷</span>
          <h3 class="font-display text-2xl leading-tight">还有更多<br/>藏在 ins 里</h3>
          <a href="#follow" class="mt-4 inline-flex items-center gap-1 text-sm font-medium border-b border-milk/60 pb-0.5">去逛逛 →</a>
        </article>
      </div>
    </div>
  </section>

  <!-- 关注我们 -->
  <section id="follow" class="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
    <div class="reveal rounded-[2.5rem] bg-caramel text-milk px-6 sm:px-14 py-14 sm:py-20 text-center relative overflow-hidden">
      <div class="absolute -top-10 -left-6 w-44 h-44 rounded-full bg-tang/40 blur-2xl"></div>
      <div class="absolute -bottom-12 -right-6 w-56 h-56 rounded-full bg-tang-soft/30 blur-2xl"></div>
      <p class="relative text-tang-soft text-xs tracking-[0.2em] uppercase mb-4">Follow MANCLIP</p>
      <h2 class="relative font-display text-4xl sm:text-5xl leading-tight">关注小满，<br/>不错过每次上新</h2>
      <p class="relative mt-4 text-milk/80 max-w-md mx-auto">留下邮箱，新系列与穿搭灵感第一时间送到你手边。</p>
      <form id="follow-form" class="relative mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input type="email" name="email" required placeholder="你的邮箱"
          class="flex-1 rounded-full px-5 py-3.5 bg-milk text-ink placeholder:text-fog/70 focus:outline-none focus:ring-2 focus:ring-tang" />
        <button type="submit" class="btn-tang rounded-full px-7 py-3.5 whitespace-nowrap">订阅</button>
      </form>
      <p id="follow-msg" class="relative mt-4 text-sm text-tang-soft h-5"></p>
      <div class="relative mt-7 flex justify-center gap-5 text-sm text-milk/80">
        <a href="#" class="hover:text-milk">Instagram</a><span class="opacity-40">·</span>
        <a href="#" class="hover:text-milk">小红书</a><span class="opacity-40">·</span>
        <a href="#" class="hover:text-milk">微博</a>
      </div>
    </div>
  </section>

  <!-- 页脚 -->
  <footer class="border-t border-caramel-soft/30">
    <div class="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-fog">
      <p class="font-display text-xl text-caramel">${BRAND_CN}<span class="text-tang">.</span> <span class="text-fog text-sm font-sans ml-1">MANCLIP</span></p>
      <p>© 2026 ${BRAND_CN} · 甜酷韩系发饰 · 仅作品牌展示</p>
    </div>
  </footer>
</main>
`;

// ---------- 移动菜单 ----------
const mobileMenu = document.querySelector("#mobile-menu");
document.querySelector("#menu-btn").addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => mobileMenu.classList.add("hidden")));

// ---------- 订阅（展示用，无后端） ----------
const followForm = document.querySelector("#follow-form");
const followMsg = document.querySelector("#follow-msg");
followForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!followForm.email.value.trim()) return;
  followMsg.textContent = "✓ 订阅成功！上新和灵感这就安排上～";
  followForm.reset();
  setTimeout(() => (followMsg.textContent = ""), 4000);
});

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

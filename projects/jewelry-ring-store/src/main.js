import { ringSvg } from "./rings.js";

const BRAND = "LUMIÈRE";
const BRAND_CN = "璐米";

const products = [
  {
    name: "晨曦单钻戒",
    en: "Aurora Solitaire",
    desc: "经典六爪镶嵌，香槟金衬托主石，日常与盛装皆宜。",
    price: "¥4,880",
    gem: "#f3ead2"
  },
  {
    name: "微光排钻戒",
    en: "Halo Whisper",
    desc: "环绕式碎钻光晕，纤细戒臂，温柔不张扬。",
    price: "¥6,280",
    gem: "#f7e9e9"
  },
  {
    name: "缠绕藤蔓戒",
    en: "Vine Embrace",
    desc: "藤蔓缠绕设计，灵动有机线条，献给自由的灵魂。",
    price: "¥3,680",
    gem: "#e8f0e4"
  },
  {
    name: "月光对戒",
    en: "Moonlit Pair",
    desc: "一对相契的弧线，香槟金与素圈，写给长久的承诺。",
    price: "¥8,800",
    gem: "#eae6f2"
  }
];

const collections = [
  { tag: "婚嫁系列", en: "Bridal" },
  { tag: "日常轻戴", en: "Everyday" },
  { tag: "高级定制", en: "Bespoke" }
];

const app = document.querySelector("#app");

app.innerHTML = `
<!-- ===== 顶部导航 ===== -->
<header class="fixed top-0 inset-x-0 z-50 nav-blur border-b border-champagne/15">
  <nav class="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
    <a href="#top" class="font-display text-2xl tracking-wide text-ink">
      ${BRAND}<span class="text-champagne">.</span>
      <span class="hidden sm:inline font-serif text-sm text-ink-soft ml-1">${BRAND_CN}</span>
    </a>
    <div class="hidden md:flex items-center gap-9 text-sm text-ink-soft">
      <a href="#collection" class="hover:text-champagne-deep transition">系列</a>
      <a href="#story" class="hover:text-champagne-deep transition">品牌故事</a>
      <a href="#craft" class="hover:text-champagne-deep transition">匠心工艺</a>
      <a href="#voices" class="hover:text-champagne-deep transition">客户之声</a>
    </div>
    <a href="#contact" class="btn-gold text-sm rounded-full px-5 py-2.5 font-medium">预约鉴赏</a>
  </nav>
</header>

<main id="top">
  <!-- ===== 首屏 Hero ===== -->
  <section class="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
    <div class="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-cream blur-3xl opacity-70"></div>
    <div class="absolute top-40 -left-32 w-96 h-96 rounded-full bg-champagne/10 blur-3xl"></div>
    <div class="relative max-w-6xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-10 items-center">
      <div class="reveal">
        <p class="text-champagne-deep text-xs sm:text-sm tracking-luxe mb-5 uppercase">Fine Ring Atelier</p>
        <h1 class="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-ink">
          为每一次<br /><span class="text-gold-gradient">心动</span>，定制光芒
        </h1>
        <p class="mt-6 text-ink-soft leading-relaxed max-w-md font-serif">
          ${BRAND} ${BRAND_CN} 以香槟金为底色，糅合清新与轻奢，
          手工打磨每一枚戒指，让温柔的光在指尖流转。
        </p>
        <div class="mt-9 flex flex-wrap gap-4">
          <a href="#collection" class="btn-gold rounded-full px-8 py-3.5 font-medium">探索系列</a>
          <a href="#story" class="btn-outline rounded-full px-8 py-3.5 font-medium">了解品牌</a>
        </div>
        <div class="mt-10 flex items-center gap-8 text-sm text-ink-soft">
          <div><span class="font-display text-2xl text-ink block">18K</span>香槟金</div>
          <div class="w-px h-8 bg-champagne/30"></div>
          <div><span class="font-display text-2xl text-ink block">GIA</span>认证主石</div>
          <div class="w-px h-8 bg-champagne/30"></div>
          <div><span class="font-display text-2xl text-ink block">终身</span>免费养护</div>
        </div>
      </div>
      <div class="relative flex justify-center reveal">
        <div class="absolute inset-0 m-auto w-72 h-72 rounded-full bg-gradient-to-br from-cream to-champagne/20 shimmer"></div>
        <div class="floaty relative">${ringSvg({ size: 320, gem: "#f3ead2", band: 1.1 })}</div>
      </div>
    </div>
  </section>

  <div class="max-w-6xl mx-auto px-5 sm:px-8"><div class="gold-rule"></div></div>

  <!-- ===== 系列标签 ===== -->
  <section id="collection" class="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
    <div class="text-center mb-14 reveal">
      <p class="text-champagne-deep text-xs tracking-luxe uppercase mb-3">Collections</p>
      <h2 class="font-display text-4xl sm:text-5xl text-ink">臻选戒指系列</h2>
      <div class="mt-6 flex justify-center gap-3 flex-wrap">
        ${collections
          .map(
            (c) => `
          <span class="rounded-full border border-champagne/40 px-5 py-2 text-sm text-ink-soft bg-white/40">
            ${c.tag} <span class="text-champagne-deep/70 text-xs">${c.en}</span>
          </span>`
          )
          .join("")}
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      ${products
        .map(
          (p) => `
        <article class="ring-card group bg-white rounded-3xl p-6 border border-champagne/10 shadow-sm">
          <div class="aspect-square rounded-2xl bg-gradient-to-br from-ivory to-cream flex items-center justify-center mb-5 overflow-hidden">
            <div class="group-hover:scale-110 transition-transform duration-500">${ringSvg({ size: 150, gem: p.gem })}</div>
          </div>
          <p class="text-[11px] tracking-widest uppercase text-champagne-deep/70">${p.en}</p>
          <h3 class="font-serif text-lg text-ink mt-1">${p.name}</h3>
          <p class="text-sm text-ink-soft mt-2 leading-relaxed min-h-[3rem]">${p.desc}</p>
          <div class="mt-4 flex items-center justify-between">
            <span class="font-display text-xl text-champagne-deep">${p.price}</span>
            <button class="add-cart text-sm rounded-full px-4 py-2 btn-outline" data-name="${p.name}">加入心愿</button>
          </div>
        </article>`
        )
        .join("")}
    </div>
  </section>

  <!-- ===== 品牌故事 ===== -->
  <section id="story" class="bg-cream/60 py-20 sm:py-28">
    <div class="max-w-6xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-12 items-center">
      <div class="relative flex justify-center order-2 md:order-1 reveal">
        <div class="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-white to-champagne/15 flex items-center justify-center shadow-inner">
          <div class="floaty">${ringSvg({ size: 220, gem: "#eae6f2", band: 1.2 })}</div>
        </div>
      </div>
      <div class="order-1 md:order-2 reveal">
        <p class="text-champagne-deep text-xs tracking-luxe uppercase mb-3">Our Story</p>
        <h2 class="font-display text-4xl sm:text-5xl text-ink leading-tight">
          光，源自<span class="text-gold-gradient">温柔的执着</span>
        </h2>
        <p class="mt-6 text-ink-soft leading-loose font-serif">
          ${BRAND} 诞生于一间小小的工作室。我们相信，戒指不只是饰品，
          而是被珍藏的时刻。香槟金温润不张扬，恰如细水长流的爱意。
        </p>
        <p class="mt-4 text-ink-soft leading-loose font-serif">
          从选石、绘图到手工镶嵌，每一枚戒指都经历 28 道工序，
          只为在你指尖留下恰到好处的光。
        </p>
        <a href="#craft" class="inline-block mt-8 text-champagne-deep border-b border-champagne/50 pb-1 hover:border-champagne transition">
          了解我们的工艺 →
        </a>
      </div>
    </div>
  </section>

  <!-- ===== 匠心工艺 ===== -->
  <section id="craft" class="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
    <div class="text-center mb-14 reveal">
      <p class="text-champagne-deep text-xs tracking-luxe uppercase mb-3">Craftsmanship</p>
      <h2 class="font-display text-4xl sm:text-5xl text-ink">四步成就一枚戒指</h2>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      ${[
        ["01", "甄选", "GIA 认证主石，逐颗甄别净度与火彩。"],
        ["02", "绘图", "设计师手绘草图，量身定制弧度与比例。"],
        ["03", "铸造", "18K 香槟金失蜡铸造，温润色泽。"],
        ["04", "镶嵌", "匠人手工爪镶，反复抛光至镜面光。"]
      ]
        .map(
          ([n, t, d]) => `
        <div class="reveal text-center sm:text-left">
          <span class="font-display text-5xl text-champagne/40">${n}</span>
          <h3 class="font-serif text-xl text-ink mt-2">${t}</h3>
          <p class="text-sm text-ink-soft mt-2 leading-relaxed">${d}</p>
        </div>`
        )
        .join("")}
    </div>
  </section>

  <!-- ===== 客户之声 ===== -->
  <section id="voices" class="bg-cream/60 py-20 sm:py-28">
    <div class="max-w-5xl mx-auto px-5 sm:px-8">
      <div class="text-center mb-14 reveal">
        <p class="text-champagne-deep text-xs tracking-luxe uppercase mb-3">Voices</p>
        <h2 class="font-display text-4xl sm:text-5xl text-ink">她们的心动时刻</h2>
      </div>
      <div class="grid md:grid-cols-3 gap-6">
        ${[
          ["“求婚那天，她看到戒指的瞬间红了眼眶。香槟金真的太温柔了。”", "— 陈先生 · 晨曦单钻戒"],
          ["“日常戴也完全不夸张，光是恰到好处的那种。每天都想看一眼。”", "— Yuki · 微光排钻戒"],
          ["“定制过程被照顾得很细致，戒圈弧度贴合到惊喜。”", "— 林女士 · 高级定制"]
        ]
          .map(
            ([q, a]) => `
          <figure class="reveal bg-white rounded-3xl p-7 border border-champagne/10 shadow-sm">
            <div class="text-champagne text-2xl leading-none mb-3">★★★★★</div>
            <blockquote class="font-serif text-ink leading-relaxed">${q}</blockquote>
            <figcaption class="mt-4 text-sm text-ink-soft">${a}</figcaption>
          </figure>`
          )
          .join("")}
      </div>
    </div>
  </section>

  <!-- ===== 预约 / Newsletter ===== -->
  <section id="contact" class="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
    <div class="reveal rounded-[2rem] bg-gradient-to-br from-ink to-[#3a322a] text-ivory px-7 sm:px-14 py-14 sm:py-20 text-center relative overflow-hidden">
      <div class="absolute -top-16 -right-10 w-64 h-64 rounded-full bg-champagne/20 blur-3xl"></div>
      <p class="text-champagne text-xs tracking-luxe uppercase mb-4 relative">Bespoke Appointment</p>
      <h2 class="font-display text-4xl sm:text-5xl relative">预约一次专属鉴赏</h2>
      <p class="mt-4 text-ivory/70 max-w-lg mx-auto relative font-serif">
        留下你的联系方式，我们的顾问将为你呈现香槟金戒指的每一处细节。
      </p>
      <form id="lead-form" class="mt-9 flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative">
        <input
          type="text" name="contact" required
          placeholder="手机 / 微信"
          class="flex-1 rounded-full px-5 py-3.5 text-ink bg-ivory placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-champagne"
        />
        <button type="submit" class="btn-gold rounded-full px-8 py-3.5 font-medium whitespace-nowrap">立即预约</button>
      </form>
      <p id="lead-msg" class="mt-4 text-sm text-champagne h-5 relative"></p>
    </div>
  </section>

  <!-- ===== 页脚 ===== -->
  <footer class="border-t border-champagne/15 bg-ivory">
    <div class="max-w-6xl mx-auto px-5 sm:px-8 py-12 grid sm:grid-cols-3 gap-8 text-sm">
      <div>
        <p class="font-display text-2xl text-ink">${BRAND}<span class="text-champagne">.</span></p>
        <p class="text-ink-soft mt-3 font-serif leading-relaxed">${BRAND_CN}｜清新轻奢戒指品牌<br/>为每一次心动定制光芒。</p>
      </div>
      <div>
        <p class="text-ink font-medium mb-3">导航</p>
        <ul class="space-y-2 text-ink-soft">
          <li><a href="#collection" class="hover:text-champagne-deep">戒指系列</a></li>
          <li><a href="#story" class="hover:text-champagne-deep">品牌故事</a></li>
          <li><a href="#craft" class="hover:text-champagne-deep">匠心工艺</a></li>
        </ul>
      </div>
      <div>
        <p class="text-ink font-medium mb-3">联系</p>
        <ul class="space-y-2 text-ink-soft">
          <li>客服微信：lumiere_care</li>
          <li>预约热线：400-888-0000</li>
          <li>线下门店：上海 · 静安嘉里中心</li>
        </ul>
      </div>
    </div>
    <div class="border-t border-champagne/10 py-5 text-center text-xs text-ink-soft/70">
      © 2026 ${BRAND} ${BRAND_CN} · 香槟金高级戒指定制 · 沪 ICP 备 0000000 号
    </div>
  </footer>
</main>
`;

// ---------- 交互：心愿 / 预约 / 滚动入场 ----------
let wishCount = 0;
document.querySelectorAll(".add-cart").forEach((btn) => {
  btn.addEventListener("click", () => {
    wishCount += 1;
    btn.textContent = "已收藏 ♥";
    btn.classList.add("bg-champagne/10");
    setTimeout(() => {
      btn.textContent = "加入心愿";
      btn.classList.remove("bg-champagne/10");
    }, 1400);
  });
});

const form = document.querySelector("#lead-form");
const leadMsg = document.querySelector("#lead-msg");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const v = form.contact.value.trim();
  if (!v) return;
  leadMsg.textContent = "✓ 已收到，顾问将尽快与你联系。";
  form.reset();
  setTimeout(() => (leadMsg.textContent = ""), 4000);
});

// 滚动入场动画
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        io.unobserve(en.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

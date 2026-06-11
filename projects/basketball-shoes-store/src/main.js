import { shoeSvg } from "./shoe.js";

const BRAND = "APEX KICKS";
const BRAND_CN = "锋锐";

const colorways = [
  ["#c6f135", "#9bc41f"],
  ["#ff5a1f", "#b53410"],
  ["#3da5ff", "#1f5fb5"],
  ["#f4f6f8", "#9aa3ad"],
  ["#c6f135", "#3da5ff"],
  ["#ff5a1f", "#c6f135"]
];

const products = [
  { name: "ZeroG 零重力 Pro", en: "ZeroG Pro", price: 1299, tag: "新品", spec: "全掌气垫 · 28mm 缓震" },
  { name: "Lockdown 锁防 II", en: "Lockdown II", price: 999, tag: "热卖", spec: "防侧翻 TPU · 高抓地" },
  { name: "Burst 爆发 Low", en: "Burst Low", price: 799, tag: "", spec: "轻量 280g · 急停启动" },
  { name: "Tower 制空 高帮", en: "Tower High", price: 1099, tag: "签名", spec: "高帮护踝 · 弹力中底" },
  { name: "Crossover 变向", en: "Crossover", price: 899, tag: "", spec: "人字纹大底 · 多向抓地" },
  { name: "Flight 飞跃 Elite", en: "Flight Elite", price: 1499, tag: "旗舰", spec: "碳板 · 能量回弹" }
];

const yuan = (n) => "¥" + n.toLocaleString("zh-CN");
const app = document.querySelector("#app");

app.innerHTML = `
<!-- 公告条 -->
<div class="bg-lime text-base text-xs sm:text-sm py-2.5 overflow-hidden font-cond font-semibold">
  <div class="marquee">
    &nbsp;新品 ZeroG Pro 全球首发　·　满 ¥999 顺丰包邮　·　7 天无理由退换　·　球员同款现货　·&nbsp;
    新品 ZeroG Pro 全球首发　·　满 ¥999 顺丰包邮　·　7 天无理由退换　·　球员同款现货　·
  </div>
</div>

<!-- 导航 -->
<header class="sticky top-0 z-40 nav-blur border-b border-line">
  <nav class="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
    <button id="menu-btn" class="md:hidden text-snow text-xl" aria-label="菜单">☰</button>
    <a href="#top" class="font-display text-xl sm:text-2xl tracking-tight">
      ${BRAND}<span class="text-lime">.</span>
      <span class="hidden sm:inline font-cond text-sm text-fog ml-1">${BRAND_CN}</span>
    </a>
    <div class="hidden md:flex items-center gap-8 text-sm text-fog font-cond uppercase tracking-wide">
      <a href="#shop" class="hover:text-lime transition">全部球鞋</a>
      <a href="#featured" class="hover:text-lime transition">明星款</a>
      <a href="#tech" class="hover:text-lime transition">科技</a>
      <a href="#join" class="hover:text-lime transition">会员</a>
    </div>
    <div class="flex items-center gap-4">
      <button aria-label="搜索" class="text-fog hover:text-snow text-lg">⌕</button>
      <button id="bag-btn" class="relative text-fog hover:text-snow text-lg" aria-label="购物袋">
        袋
        <span id="bag-count" class="absolute -top-2 -right-3 bg-lime text-base text-[10px] font-bold w-5 h-5 rounded-full grid place-items-center hidden">0</span>
      </button>
    </div>
  </nav>
  <div id="mobile-menu" class="md:hidden hidden border-t border-line px-5 py-3 space-y-2 text-sm bg-panel font-cond uppercase">
    <a href="#shop" class="block py-1.5 text-fog">全部球鞋</a>
    <a href="#featured" class="block py-1.5 text-fog">明星款</a>
    <a href="#tech" class="block py-1.5 text-fog">科技</a>
    <a href="#join" class="block py-1.5 text-fog">会员</a>
  </div>
</header>

<main id="top">
  <!-- 促销 Banner -->
  <section id="promo" class="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
    <div id="promo-banner" class="reveal promo-banner relative overflow-hidden rounded-2xl sm:rounded-[1.75rem] border border-lime/40 court-grid">
      <div class="absolute -top-16 -left-10 w-64 h-64 rounded-full bg-lime/20 blur-3xl"></div>
      <div class="absolute -bottom-20 -right-10 w-72 h-72 rounded-full bg-flame/20 blur-3xl"></div>
      <div class="promo-shine pointer-events-none absolute inset-0"></div>
      <button id="promo-close" class="absolute top-3 right-3 z-10 text-base/70 hover:text-base text-xl leading-none w-7 h-7 grid place-items-center rounded-full bg-snow/30 hover:bg-snow/50 transition" aria-label="关闭横幅">×</button>
      <div class="relative grid gap-5 md:grid-cols-[1fr_auto] md:items-center px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-9">
        <div>
          <p class="inline-flex items-center gap-2 text-flame font-cond uppercase tracking-luxe text-[11px] sm:text-xs mb-2.5">
            <span class="inline-block w-2 h-2 rounded-full bg-flame animate-pulse"></span>限时开赛 · Game Day Drop
          </p>
          <h2 class="font-display uppercase leading-[0.95] text-3xl sm:text-4xl lg:text-5xl">
            为巅峰而战，<span class="text-lime-gradient">全场战靴 8 折</span>
          </h2>
          <p class="mt-3 text-fog text-sm sm:text-base font-cond max-w-md">
            新赛季限量配色今日开抢 · 满 ¥999 顺丰包邮 · 球员同款现货不等人。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-3 md:justify-end">
          <a href="#shop" class="btn-lime rounded-full px-7 py-3 text-sm sm:text-base whitespace-nowrap">立即抢购 →</a>
          <a href="#featured" class="btn-ghost rounded-full px-6 py-3 text-sm sm:text-base font-medium whitespace-nowrap">看签名款</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Hero -->
  <section class="relative court-grid overflow-hidden">
    <div class="absolute -top-24 -right-24 w-[30rem] h-[30rem] rounded-full bg-lime/10 blur-3xl"></div>
    <div class="absolute bottom-0 -left-24 w-96 h-96 rounded-full bg-flame/10 blur-3xl"></div>
    <div class="relative max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-8 items-center py-16 sm:py-24">
      <div class="reveal">
        <p class="text-lime text-xs sm:text-sm tracking-luxe uppercase mb-5 font-cond">For The Game · 为球场而生</p>
        <h1 class="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] uppercase">
          释放<br /><span class="text-lime-gradient">每一次爆发</span>
        </h1>
        <p class="mt-6 text-fog leading-relaxed max-w-md">
          ${BRAND} ${BRAND_CN} 专业篮球鞋——全掌缓震、极致抓地、轻量护踝，
          把你的每一次起跳与变向，推到极限。
        </p>
        <div class="mt-9 flex flex-wrap gap-4">
          <a href="#shop" class="btn-lime rounded-full px-8 py-3.5">立即抢购</a>
          <a href="#tech" class="btn-ghost rounded-full px-8 py-3.5 font-medium">了解科技</a>
        </div>
        <div class="mt-10 flex items-center gap-8 text-sm text-fog font-cond">
          <div><span class="font-display text-2xl text-snow block">28mm</span>全掌气垫</div>
          <div class="w-px h-8 bg-line"></div>
          <div><span class="font-display text-2xl text-snow block">280g</span>超轻鞋身</div>
          <div class="w-px h-8 bg-line"></div>
          <div><span class="font-display text-2xl text-snow block">±0.1s</span>急停响应</div>
        </div>
      </div>
      <div class="relative flex justify-center reveal">
        <div class="absolute inset-0 m-auto w-80 h-80 rounded-full bg-gradient-to-br from-lime/20 to-flame/10 blur-2xl"></div>
        <div class="floaty relative scale-125 sm:scale-150">${shoeSvg({ w: 360, h: 248 })}</div>
      </div>
    </div>
  </section>

  <!-- 明星款 Banner -->
  <section id="featured" class="max-w-7xl mx-auto px-5 sm:px-8 py-14">
    <div class="reveal rounded-[2rem] bg-panel border border-line overflow-hidden grid md:grid-cols-2">
      <div class="p-8 sm:p-12 flex flex-col justify-center">
        <p class="text-flame font-cond uppercase tracking-luxe text-sm mb-3">Signature · 球员签名款</p>
        <h2 class="font-display text-4xl sm:text-5xl uppercase leading-none">制空 · Tower High</h2>
        <p class="mt-5 text-fog leading-relaxed max-w-sm">为内线而生的高帮护踝设计，弹力中底带来扎实回弹，每一次封盖都稳如泰山。</p>
        <div class="mt-7 flex items-center gap-5">
          <span class="font-display text-3xl text-lime">¥1,099</span>
          <button class="add-bag btn-lime rounded-full px-7 py-3" data-name="Tower 制空 高帮" data-price="1099">加入购物袋</button>
        </div>
      </div>
      <div class="bg-gradient-to-br from-base to-panel flex items-center justify-center p-10 court-grid">
        <div class="scale-125">${shoeSvg({ c1: "#ff5a1f", c2: "#c6f135", w: 320, h: 220 })}</div>
      </div>
    </div>
  </section>

  <!-- 产品网格 -->
  <section id="shop" class="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
    <div class="flex items-end justify-between mb-10 reveal">
      <div>
        <p class="text-lime font-cond uppercase tracking-luxe text-sm mb-2">All Kicks</p>
        <h2 class="font-display text-3xl sm:text-4xl uppercase">全部球鞋</h2>
      </div>
      <span class="text-fog text-sm font-cond">${products.length} 款现货</span>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      ${products
        .map(
          (p, i) => {
            const [c1, c2] = colorways[i % colorways.length];
            return `
        <article class="shoe-card group bg-panel rounded-3xl border border-line overflow-hidden">
          <div class="relative aspect-[4/3] flex items-center justify-center court-grid overflow-hidden">
            <div class="shoe">${shoeSvg({ c1, c2, w: 260, h: 180 })}</div>
            ${p.tag ? `<span class="absolute top-3 left-3 bg-lime text-base text-[11px] font-bold px-2.5 py-1 rounded-full uppercase">${p.tag}</span>` : ""}
            <button class="quick add-bag absolute bottom-3 inset-x-3 btn-lime rounded-full py-2.5 text-sm"
              data-name="${p.name}" data-price="${p.price}">加入购物袋</button>
          </div>
          <div class="p-5">
            <p class="text-[11px] tracking-widest uppercase text-lime/70 font-cond">${p.en}</p>
            <h3 class="font-cond text-lg font-semibold mt-1">${p.name}</h3>
            <p class="text-xs text-fog mt-1">${p.spec}</p>
            <p class="font-display text-xl mt-3">${yuan(p.price)}</p>
          </div>
        </article>`;
          }
        )
        .join("")}
    </div>
  </section>

  <!-- 科技卖点 -->
  <section id="tech" class="bg-panel/60 border-y border-line py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-5 sm:px-8">
      <div class="text-center mb-14 reveal">
        <p class="text-lime font-cond uppercase tracking-luxe text-sm mb-3">Technology</p>
        <h2 class="font-display text-3xl sm:text-4xl uppercase">为什么更快、更稳</h2>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${[
          ["⚡", "全掌气垫", "28mm 气垫贯穿前后掌，落地缓震、起跳回弹。"],
          ["🛡️", "防侧翻 TPU", "外侧 TPU 支撑架，急停变向锁住脚踝。"],
          ["🪶", "轻量鞋身", "工程网布单只仅 280g，久战不累。"],
          ["🔥", "人字纹大底", "高耐磨橡胶人字纹，多向极致抓地。"]
        ]
          .map(
            ([ic, t, d]) => `
          <div class="reveal bg-base rounded-2xl border border-line p-6">
            <div class="text-3xl mb-3">${ic}</div>
            <h3 class="font-cond text-lg font-semibold">${t}</h3>
            <p class="text-sm text-fog mt-2 leading-relaxed">${d}</p>
          </div>`
          )
          .join("")}
      </div>
    </div>
  </section>

  <!-- 评价 -->
  <section class="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
    <div class="text-center mb-12 reveal">
      <p class="text-lime font-cond uppercase tracking-luxe text-sm mb-3">Ballers Say</p>
      <h2 class="font-display text-3xl sm:text-4xl uppercase">球场实测口碑</h2>
    </div>
    <div class="grid md:grid-cols-3 gap-6">
      ${[
        ["“急停跳投脚感太稳了，落地完全不晃。”", "— 阿杰 · 后卫 · ZeroG Pro"],
        ["“高帮护踝是真的顶，崴脚老毛病再没犯过。”", "— 大鹏 · 中锋 · Tower High"],
        ["“280g 真不是吹的，第四节还能起飞。”", "— Kevin · 小前 · Burst Low"]
      ]
        .map(
          ([q, a]) => `
        <figure class="reveal bg-panel rounded-3xl border border-line p-7">
          <div class="text-lime text-xl mb-3">★★★★★</div>
          <blockquote class="leading-relaxed">${q}</blockquote>
          <figcaption class="mt-4 text-sm text-fog font-cond">${a}</figcaption>
        </figure>`
        )
        .join("")}
    </div>
  </section>

  <!-- 会员 CTA -->
  <section id="join" class="max-w-7xl mx-auto px-5 sm:px-8 pb-20">
    <div class="reveal rounded-[2rem] bg-lime text-base px-7 sm:px-14 py-14 sm:py-20 text-center relative overflow-hidden">
      <div class="absolute -bottom-16 -right-10 w-72 h-72 rounded-full bg-flame/30 blur-3xl"></div>
      <p class="font-cond uppercase tracking-luxe text-sm mb-4 relative opacity-70">Apex Club</p>
      <h2 class="font-display text-4xl sm:text-5xl uppercase relative">加入球队，先人一步</h2>
      <p class="mt-4 max-w-lg mx-auto relative font-medium opacity-80">订阅即得新品抢购资格 + 首单 9 折，限量配色第一时间通知。</p>
      <form id="join-form" class="mt-9 flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative">
        <input type="email" name="email" required placeholder="你的邮箱"
          class="flex-1 rounded-full px-5 py-3.5 bg-base text-snow placeholder:text-fog/60 focus:outline-none focus:ring-2 focus:ring-base" />
        <button type="submit" class="bg-base text-lime rounded-full px-8 py-3.5 font-bold whitespace-nowrap hover:brightness-125 transition">立即加入</button>
      </form>
      <p id="join-msg" class="mt-4 text-sm font-semibold h-5 relative"></p>
    </div>
  </section>

  <!-- 页脚 -->
  <footer class="border-t border-line">
    <div class="max-w-7xl mx-auto px-5 sm:px-8 py-12 grid sm:grid-cols-4 gap-8 text-sm">
      <div>
        <p class="font-display text-xl uppercase">${BRAND}<span class="text-lime">.</span></p>
        <p class="text-fog mt-3 leading-relaxed">${BRAND_CN}｜专业篮球鞋旗舰店<br/>为球场而生。</p>
      </div>
      <div>
        <p class="font-cond uppercase mb-3 text-snow">选购</p>
        <ul class="space-y-2 text-fog">
          <li><a href="#shop" class="hover:text-lime">全部球鞋</a></li>
          <li><a href="#featured" class="hover:text-lime">明星款</a></li>
          <li><a href="#tech" class="hover:text-lime">球鞋科技</a></li>
        </ul>
      </div>
      <div>
        <p class="font-cond uppercase mb-3 text-snow">服务</p>
        <ul class="space-y-2 text-fog">
          <li>配送与运费</li>
          <li>退换货政策</li>
          <li>尺码与脚型指南</li>
        </ul>
      </div>
      <div>
        <p class="font-cond uppercase mb-3 text-snow">联系</p>
        <ul class="space-y-2 text-fog">
          <li>客服微信：apexkicks</li>
          <li>服务热线：400-555-0000</li>
          <li>工作日 9:00–22:00</li>
        </ul>
      </div>
    </div>
    <div class="border-t border-line py-5 text-center text-xs text-fog/70">
      © 2026 ${BRAND} ${BRAND_CN} · 篮球鞋旗舰店 · 沪 ICP 备 0000000 号
    </div>
  </footer>
</main>

<!-- 购物袋抽屉 -->
<div id="bag-overlay" class="fixed inset-0 bg-base/60 z-50"></div>
<aside id="bag-drawer" class="fixed top-0 right-0 z-50 h-full w-[88%] max-w-sm bg-panel border-l border-line shadow-2xl flex flex-col">
  <div class="flex items-center justify-between px-5 py-4 border-b border-line">
    <p class="font-display text-lg uppercase">购物袋</p>
    <button id="bag-close" class="text-fog text-2xl leading-none" aria-label="关闭">×</button>
  </div>
  <div id="bag-items" class="flex-1 overflow-auto px-5 py-4 space-y-3 text-sm"></div>
  <div class="border-t border-line px-5 py-4">
    <div class="flex justify-between mb-3"><span class="text-fog">小计</span><span id="bag-total" class="font-display text-lg">¥0</span></div>
    <button class="btn-lime w-full rounded-full py-3.5">去结算</button>
  </div>
</aside>
`;

// ---------- 购物袋 ----------
const bag = [];
const bagCount = document.querySelector("#bag-count");
const bagItems = document.querySelector("#bag-items");
const bagTotal = document.querySelector("#bag-total");
const drawer = document.querySelector("#bag-drawer");
const overlay = document.querySelector("#bag-overlay");

function renderBag() {
  const count = bag.reduce((s, x) => s + x.qty, 0);
  bagCount.textContent = count;
  bagCount.classList.toggle("hidden", count === 0);
  bagCount.classList.remove("pop");
  void bagCount.offsetWidth;
  bagCount.classList.add("pop");
  if (!bag.length) {
    bagItems.innerHTML = `<p class="text-fog text-center py-10">购物袋还是空的，去挑双战靴吧 🏀</p>`;
  } else {
    bagItems.innerHTML = bag
      .map(
        (x) => `
      <div class="flex justify-between items-center gap-3 border-b border-line pb-3">
        <div><p class="font-cond">${x.name}</p><p class="text-fog text-xs">${yuan(x.price)} × ${x.qty}</p></div>
        <p class="font-display">${yuan(x.price * x.qty)}</p>
      </div>`
      )
      .join("");
  }
  bagTotal.textContent = yuan(bag.reduce((s, x) => s + x.price * x.qty, 0));
}
function addToBag(name, price) {
  const f = bag.find((x) => x.name === name);
  if (f) f.qty += 1;
  else bag.push({ name, price, qty: 1 });
  renderBag();
  openBag();
}
function openBag() { drawer.classList.add("open"); overlay.classList.add("open"); }
function closeBag() { drawer.classList.remove("open"); overlay.classList.remove("open"); }

document.querySelectorAll(".add-bag").forEach((btn) =>
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    addToBag(btn.dataset.name, Number(btn.dataset.price));
  })
);
document.querySelector("#bag-btn").addEventListener("click", openBag);
document.querySelector("#bag-close").addEventListener("click", closeBag);
overlay.addEventListener("click", closeBag);
renderBag();

// ---------- 移动菜单 ----------
const mobileMenu = document.querySelector("#mobile-menu");
document.querySelector("#menu-btn").addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => mobileMenu.classList.add("hidden")));

// ---------- 促销 Banner 关闭 ----------
const promoBanner = document.querySelector("#promo-banner");
const promoClose = document.querySelector("#promo-close");
if (promoClose && promoBanner) {
  promoClose.addEventListener("click", () => {
    promoBanner.classList.add("dismiss");
    setTimeout(() => promoBanner.closest("#promo")?.remove(), 360);
  });
}

// ---------- 订阅 ----------
const joinForm = document.querySelector("#join-form");
const joinMsg = document.querySelector("#join-msg");
joinForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!joinForm.email.value.trim()) return;
  joinMsg.textContent = "✓ 加入成功！9 折券与新品抢购资格已发送至邮箱。";
  joinForm.reset();
  setTimeout(() => (joinMsg.textContent = ""), 4000);
});

// ---------- 滚动入场 ----------
const io = new IntersectionObserver(
  (entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }),
  { threshold: 0.1 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

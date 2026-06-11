import { fashionSvg, heartSvg, starSvg, bowSvg } from "./art.js";

const BRAND = "MAISON LÉA";
const BRAND_CN = "蕾雅";

const categories = [
  { name: "连衣裙", en: "Dresses", kind: "dress", emoji: "👗" },
  { name: "外套", en: "Outerwear", kind: "coat", emoji: "🧥" },
  { name: "针织", en: "Knitwear", kind: "knit", emoji: "🧶" },
  { name: "小可爱", en: "Cuties", kind: "accessory", emoji: "🎀" }
];

const products = [
  { name: "初恋小白裙", en: "First Love Dress", price: 299, kind: "dress", tag: "🌸 萌新上架" },
  { name: "草莓泡泡袖上衣", en: "Strawberry Puff Top", price: 169, kind: "top", tag: "✨ 爆款" },
  { name: "奶油针织开衫", en: "Cream Cardigan", price: 239, kind: "knit", tag: "💕 闺蜜同款" },
  { name: "棉花糖蝴蝶裙", en: "Cotton Candy Skirt", price: 199, kind: "dress", tag: "" },
  { name: "蛋黄小香风外套", en: "Lemon Tweed Jacket", price: 359, kind: "coat", tag: "🌸 萌新上架" },
  { name: "薄荷背心背带裙", en: "Mint Pinafore", price: 219, kind: "dress", tag: "" },
  { name: "蝴蝶结小香风外套", en: "Bow Blazer", price: 329, kind: "coat", tag: "💕 闺蜜同款" },
  { name: "星星珠片发夹套装", en: "Starry Hair Clips", price: 59, kind: "accessory", tag: "✨ 爆款" }
];

const app = document.querySelector("#app");

const yuan = (n) => "¥" + n.toLocaleString("zh-CN");

app.innerHTML = `
<!-- 公告条 -->
<div class="bg-clay text-white text-xs sm:text-sm py-2.5 overflow-hidden font-serif font-semibold">
  <div class="marquee">
    &nbsp;新季上新 8 折预售　·　全场满 ¥599 顺丰包邮　·　30 天无忧退换　·　会员专享生日礼遇　·&nbsp;
    新季上新 8 折预售　·　全场满 ¥599 顺丰包邮　·　30 天无忧退换　·　会员专享生日礼遇　·
  </div>
</div>

<!-- 导航 -->
<header class="sticky top-0 z-40 nav-blur border-b border-clay/15">
  <nav class="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
    <button id="menu-btn" class="md:hidden text-charcoal text-xl" aria-label="菜单">☰</button>
    <a href="#top" class="font-display text-2xl tracking-wide">
      ${BRAND}<span class="text-clay">.</span>
      <span class="hidden sm:inline font-serif text-sm text-ink-soft ml-1">${BRAND_CN}</span>
    </a>
    <div class="hidden md:flex items-center gap-8 text-sm text-ink-soft">
      <a href="#categories" class="hover:text-clay-deep transition">分类</a>
      <a href="#new" class="hover:text-clay-deep transition">新品</a>
      <a href="#lookbook" class="hover:text-clay-deep transition">穿搭</a>
      <a href="#join" class="hover:text-clay-deep transition">会员</a>
    </div>
    <div class="flex items-center gap-4">
      <button aria-label="搜索" class="text-ink-soft hover:text-charcoal text-lg">⌕</button>
      <button id="bag-btn" class="relative text-ink-soft hover:text-charcoal text-lg" aria-label="购物袋">
        袋
        <span id="bag-count" class="absolute -top-2 -right-3 bg-clay text-white text-[10px] w-5 h-5 rounded-full grid place-items-center hidden">0</span>
      </button>
    </div>
  </nav>
  <div id="mobile-menu" class="md:hidden hidden border-t border-clay/15 px-5 py-3 space-y-2 text-sm bg-cream">
    <a href="#categories" class="block py-1.5 text-ink-soft">分类</a>
    <a href="#new" class="block py-1.5 text-ink-soft">新品</a>
    <a href="#lookbook" class="block py-1.5 text-ink-soft">穿搭</a>
    <a href="#join" class="block py-1.5 text-ink-soft">会员</a>
  </div>
</header>

<main id="top">
  <!-- Hero -->
  <section class="relative">
    <div class="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-8 items-center py-14 sm:py-20">
      <div class="reveal">
        <p class="text-clay-deep text-xs sm:text-sm tracking-luxe uppercase mb-5">🌸 Sweet New Season · 甜美新季</p>
        <h1 class="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.02]">
          穿出小可爱的<br /><span class="text-clay-deep">好心情</span> 🎀
        </h1>
        <p class="mt-6 text-ink-soft leading-relaxed max-w-md font-serif">
          ${BRAND} ${BRAND_CN}，为爱美的你挑选每一件甜甜单品——
          初恋裙、泡泡袖、奶油针织，轻轻松松穿出少女感～
        </p>
        <div class="mt-8 flex flex-wrap gap-4">
          <a href="#new" class="btn-rose rounded-full px-8 py-3.5 font-bold">去挑可爱 🛍️</a>
          <a href="#lookbook" class="rounded-full px-8 py-3.5 font-semibold border-2 border-clay/40 text-clay-deep hover:bg-clay/10 transition">看穿搭 ✨</a>
        </div>
      </div>
      <div class="reveal grid grid-cols-2 gap-4 relative">
        <div class="absolute -top-5 -left-3 z-10 drop-shadow-sm rotate-[-8deg]">${bowSvg("#ff7fae", 52)}</div>
        <div class="absolute -bottom-4 -right-2 z-10">${heartSvg("#ff9ec2", 34)}</div>
        <div class="rounded-3xl overflow-hidden aspect-[3/4] translate-y-6">${fashionSvg({ kind: "dress" })}</div>
        <div class="rounded-3xl overflow-hidden aspect-[3/4]">${fashionSvg({ kind: "coat" })}</div>
      </div>
    </div>
  </section>

  <!-- 分类 -->
  <section id="categories" class="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
    <div class="flex items-end justify-between mb-8 reveal">
      <h2 class="font-display text-3xl sm:text-4xl flex items-center gap-2">按品类选购 ${bowSvg("#ff9ec2", 30)}</h2>
      <a href="#new" class="text-sm text-clay-deep hover:underline">查看全部 →</a>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      ${categories
        .map(
          (c) => `
        <a href="#new" class="cat-tile reveal group relative rounded-3xl overflow-hidden aspect-[4/5] block">
          ${fashionSvg({ kind: c.kind })}
          <div class="absolute inset-0 bg-gradient-to-t from-clay-deep/50 to-transparent"></div>
          <div class="absolute bottom-4 left-4 text-cream">
            <p class="font-display text-2xl">${c.emoji} ${c.name}</p>
            <p class="text-xs tracking-widest uppercase opacity-80">${c.en}</p>
          </div>
        </a>`
        )
        .join("")}
    </div>
  </section>

  <!-- 新品橱窗 -->
  <section id="new" class="bg-sand/50 py-14 sm:py-20">
    <div class="max-w-7xl mx-auto px-5 sm:px-8">
      <div class="text-center mb-10 reveal">
        <p class="text-clay-deep text-xs tracking-luxe uppercase mb-3">🍓 New Arrivals · 萌新上架</p>
        <h2 class="font-display text-3xl sm:text-4xl">本季新品都超可爱</h2>
        <div class="flex justify-center gap-2 mt-3">${heartSvg("#ff9ec2",22)}${starSvg("#ffe9a8",22)}${bowSvg("#ff7fae",26)}${starSvg("#ffe9a8",22)}${heartSvg("#ff9ec2",22)}</div>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        ${products
          .map(
            (p, i) => `
          <article class="product-card reveal bg-cream rounded-3xl overflow-hidden border border-clay/10 group">
            <div class="relative aspect-[3/4] overflow-hidden">
              <div class="img w-full h-full">${fashionSvg({ kind: p.kind })}</div>
              ${p.tag ? `<span class="absolute top-3 left-3 bg-clay text-white text-[11px] px-2.5 py-1 rounded-full shadow-sm">${p.tag}</span>` : ""}
              <button class="quick add-bag absolute bottom-3 inset-x-3 btn-rose rounded-full py-2.5 text-sm font-bold"
                data-name="${p.name}" data-price="${p.price}" data-idx="${i}">加入购物袋 🛍️</button>
            </div>
            <div class="p-4">
              <p class="text-[11px] tracking-widest uppercase text-clay-deep/70">${p.en}</p>
              <h3 class="font-serif text-base mt-1 leading-snug">${p.name}</h3>
              <p class="font-display text-lg text-charcoal mt-1.5">${yuan(p.price)}</p>
            </div>
          </article>`
          )
          .join("")}
      </div>
    </div>
  </section>

  <!-- Lookbook / 编辑推荐 -->
  <section id="lookbook" class="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
    <div class="grid md:grid-cols-2 gap-8 items-center">
      <div class="reveal rounded-[2rem] overflow-hidden aspect-[4/3]">${fashionSvg({ kind: "knit", w: 700, h: 520 })}</div>
      <div class="reveal">
        <p class="text-clay-deep text-xs tracking-luxe uppercase mb-3">💖 The Lookbook · 穿搭日记</p>
        <h2 class="font-display text-4xl sm:text-5xl leading-tight">一件甜裙，<br/>穿出 N 种小心动 ✨</h2>
        <p class="mt-5 text-ink-soft leading-loose font-serif">
          约会、上课、逛街、和闺蜜下午茶～跟着穿搭日记，
          把可爱穿在身上，每天都是新造型！
        </p>
        <a href="#new" class="inline-block mt-7 text-clay-deep border-b border-clay/50 pb-1 hover:border-clay transition">看更多穿搭灵感 →</a>
      </div>
    </div>
  </section>

  <!-- 价值主张 -->
  <section class="bg-sand/50 py-12">
    <div class="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
      ${[
        ["🚚 包邮到家", "满 ¥199 全国免运费"],
        ["🍓 无忧退换", "30 天随心退换"],
        ["🧸 亲肤面料", "软软糯糯不扎人"],
        ["🎀 会员礼遇", "积分 · 生日礼 · 优先购"]
      ]
        .map(
          ([t, d]) => `
        <div class="reveal">
          <p class="font-serif text-lg">${t}</p>
          <p class="text-sm text-ink-soft mt-1">${d}</p>
        </div>`
        )
        .join("")}
    </div>
  </section>

  <!-- 会员 / Newsletter -->
  <section id="join" class="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
    <div class="reveal rounded-[2rem] bg-charcoal text-cream px-7 sm:px-14 py-14 sm:py-20 text-center relative overflow-hidden">
      <div class="absolute -top-16 -right-10 w-64 h-64 rounded-full bg-clay/30 blur-3xl"></div>
      <p class="text-lemon text-xs tracking-luxe uppercase mb-4 relative">🎀 Sweet Club · 小可爱俱乐部</p>
      <h2 class="font-display text-4xl sm:text-5xl relative">加入会员，先抢新品 💕</h2>
      <p class="mt-4 text-cream/80 max-w-lg mx-auto relative font-serif">订阅就送首单 9 折券，新品、福利、生日礼第一时间通知你～</p>
      <form id="join-form" class="mt-9 flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative">
        <input type="email" name="email" required placeholder="你的邮箱"
          class="flex-1 rounded-full px-5 py-3.5 text-charcoal bg-cream placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-clay" />
        <button type="submit" class="btn-rose rounded-full px-8 py-3.5 font-bold whitespace-nowrap">立即订阅 💌</button>
      </form>
      <p id="join-msg" class="mt-4 text-sm text-clay h-5 relative"></p>
    </div>
  </section>

  <!-- 页脚 -->
  <footer class="border-t border-clay/15">
    <div class="max-w-7xl mx-auto px-5 sm:px-8 py-12 grid sm:grid-cols-4 gap-8 text-sm">
      <div class="sm:col-span-1">
        <p class="font-display text-2xl">${BRAND}<span class="text-clay">.</span></p>
        <p class="text-ink-soft mt-3 font-serif leading-relaxed">${BRAND_CN}｜现代女性的简约衣橱</p>
      </div>
      <div>
        <p class="font-medium mb-3">购物</p>
        <ul class="space-y-2 text-ink-soft">
          <li><a href="#new" class="hover:text-clay-deep">新品</a></li>
          <li><a href="#categories" class="hover:text-clay-deep">全部品类</a></li>
          <li><a href="#lookbook" class="hover:text-clay-deep">穿搭灵感</a></li>
        </ul>
      </div>
      <div>
        <p class="font-medium mb-3">客户服务</p>
        <ul class="space-y-2 text-ink-soft">
          <li>配送与运费</li>
          <li>退换货政策</li>
          <li>尺码指南</li>
        </ul>
      </div>
      <div>
        <p class="font-medium mb-3">联系我们</p>
        <ul class="space-y-2 text-ink-soft">
          <li>客服微信：maisonlea</li>
          <li>服务热线：400-666-0000</li>
          <li>工作日 9:00–21:00</li>
        </ul>
      </div>
    </div>
    <div class="border-t border-clay/10 py-5 text-center text-xs text-ink-soft/70">
      © 2026 ${BRAND} ${BRAND_CN} · 女装精品网店 · 沪 ICP 备 0000000 号
    </div>
  </footer>
</main>

<!-- 购物袋抽屉 -->
<div id="bag-overlay" class="fixed inset-0 bg-charcoal/40 z-50"></div>
<aside id="bag-drawer" class="fixed top-0 right-0 z-50 h-full w-[88%] max-w-sm bg-cream shadow-2xl flex flex-col">
  <div class="flex items-center justify-between px-5 py-4 border-b border-clay/15">
    <p class="font-display text-xl">购物袋</p>
    <button id="bag-close" class="text-ink-soft text-2xl leading-none" aria-label="关闭">×</button>
  </div>
  <div id="bag-items" class="flex-1 overflow-auto px-5 py-4 space-y-3 text-sm"></div>
  <div class="border-t border-clay/15 px-5 py-4">
    <div class="flex justify-between mb-3"><span class="text-ink-soft">小计</span><span id="bag-total" class="font-display text-lg">¥0</span></div>
    <button class="btn-dark w-full rounded-full py-3.5 font-medium">去结算</button>
  </div>
</aside>
`;

// ---------- 购物袋逻辑 ----------
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
    bagItems.innerHTML = `<p class="text-ink-soft text-center py-10">购物袋还是空的～</p>`;
  } else {
    bagItems.innerHTML = bag
      .map(
        (x) => `
      <div class="flex justify-between items-center gap-3 border-b border-clay/10 pb-3">
        <div><p class="font-serif">${x.name}</p><p class="text-ink-soft text-xs">${yuan(x.price)} × ${x.qty}</p></div>
        <p class="font-display">${yuan(x.price * x.qty)}</p>
      </div>`
      )
      .join("");
  }
  const total = bag.reduce((s, x) => s + x.price * x.qty, 0);
  bagTotal.textContent = yuan(total);
}

function addToBag(name, price) {
  const found = bag.find((x) => x.name === name);
  if (found) found.qty += 1;
  else bag.push({ name, price, qty: 1 });
  renderBag();
  openBag();
}

function openBag() {
  drawer.classList.add("open");
  overlay.classList.add("open");
}
function closeBag() {
  drawer.classList.remove("open");
  overlay.classList.remove("open");
}

document.querySelectorAll(".add-bag").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    addToBag(btn.dataset.name, Number(btn.dataset.price));
  });
});
document.querySelector("#bag-btn").addEventListener("click", openBag);
document.querySelector("#bag-close").addEventListener("click", closeBag);
overlay.addEventListener("click", closeBag);
renderBag();

// ---------- 移动端菜单 ----------
const mobileMenu = document.querySelector("#mobile-menu");
document.querySelector("#menu-btn").addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
mobileMenu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => mobileMenu.classList.add("hidden"))
);

// ---------- 订阅表单 ----------
const joinForm = document.querySelector("#join-form");
const joinMsg = document.querySelector("#join-msg");
joinForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!joinForm.email.value.trim()) return;
  joinMsg.textContent = "✓ 订阅成功，9 折优惠码已发送至邮箱。";
  joinForm.reset();
  setTimeout(() => (joinMsg.textContent = ""), 4000);
});

// ---------- 滚动入场 ----------
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        io.unobserve(en.target);
      }
    });
  },
  { threshold: 0.1 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

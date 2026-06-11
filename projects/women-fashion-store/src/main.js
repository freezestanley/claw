import { garmentSvg } from "./garments.js";

const BRAND = "ÉLAN";
const BRAND_CN = "伊岚";

const categories = [
  { name: "连衣裙", en: "Dresses", kind: "dress" },
  { name: "上衣", en: "Tops", kind: "blouse" },
  { name: "外套", en: "Coats", kind: "coat" },
  { name: "裤装", en: "Trousers", kind: "trousers" }
];

const products = [
  { name: "法式碎花连衣裙", en: "Floral Midi Dress", price: 469, kind: "dress", tag: "新品" },
  { name: "真丝缎面衬衫", en: "Silk Satin Blouse", price: 359, kind: "blouse", tag: "" },
  { name: "羊毛廓形大衣", en: "Wool Cocoon Coat", price: 1180, kind: "coat", tag: "热卖" },
  { name: "高腰阔腿西裤", en: "Wide-Leg Trousers", price: 399, kind: "trousers", tag: "" },
  { name: "醋酸百褶半裙", en: "Pleated Midi Skirt", price: 429, kind: "skirt", tag: "新品" },
  { name: "泡泡袖针织上衣", en: "Puff-Sleeve Knit", price: 329, kind: "blouse", tag: "" },
  { name: "系带风衣外套", en: "Belted Trench", price: 899, kind: "coat", tag: "热卖" },
  { name: "吊带缎面连衣裙", en: "Slip Satin Dress", price: 549, kind: "dress", tag: "" }
];

const yuan = (n) => "¥" + n.toLocaleString("zh-CN");
const app = document.querySelector("#app");

app.innerHTML = `
<!-- 公告条 -->
<div class="bg-ink text-ivory text-xs sm:text-sm py-2.5 overflow-hidden">
  <div class="marquee">
    &nbsp;新季上新 · 全场 8 折预售　·　满 ¥399 顺丰包邮　·　30 天无忧退换　·　会员生日礼遇　·&nbsp;
    新季上新 · 全场 8 折预售　·　满 ¥399 顺丰包邮　·　30 天无忧退换　·　会员生日礼遇　·
  </div>
</div>

<!-- 导航 -->
<header class="sticky top-0 z-40 nav-blur border-b border-rose/15">
  <nav class="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
    <button id="menu-btn" class="md:hidden text-ink text-xl" aria-label="菜单">☰</button>
    <a href="#top" class="font-display text-2xl tracking-wide">
      ${BRAND}<span class="text-rose">.</span>
      <span class="hidden sm:inline font-serif text-sm text-ink-soft ml-1">${BRAND_CN}</span>
    </a>
    <div class="hidden md:flex items-center gap-8 text-sm text-ink-soft">
      <a href="#categories" class="hover:text-rose-deep transition">分类</a>
      <a href="#new" class="hover:text-rose-deep transition">新品</a>
      <a href="#story" class="hover:text-rose-deep transition">品牌故事</a>
      <a href="#join" class="hover:text-rose-deep transition">会员</a>
    </div>
    <div class="flex items-center gap-4">
      <button aria-label="搜索" class="text-ink-soft hover:text-ink text-lg">⌕</button>
      <button id="bag-btn" class="relative text-ink-soft hover:text-ink text-lg" aria-label="购物袋">
        袋
        <span id="bag-count" class="absolute -top-2 -right-3 bg-rose text-white text-[10px] w-5 h-5 rounded-full grid place-items-center hidden">0</span>
      </button>
    </div>
  </nav>
  <div id="mobile-menu" class="md:hidden hidden border-t border-rose/15 px-5 py-3 space-y-2 text-sm bg-ivory">
    <a href="#categories" class="block py-1.5 text-ink-soft">分类</a>
    <a href="#new" class="block py-1.5 text-ink-soft">新品</a>
    <a href="#story" class="block py-1.5 text-ink-soft">品牌故事</a>
    <a href="#join" class="block py-1.5 text-ink-soft">会员</a>
  </div>
</header>

<main id="top">
  <!-- Hero -->
  <section class="relative overflow-hidden">
    <div class="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-blush blur-3xl opacity-70"></div>
    <div class="relative max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-8 items-center py-14 sm:py-20">
      <div class="reveal">
        <p class="text-rose-deep text-xs sm:text-sm tracking-luxe uppercase mb-5">Spring / Summer 2026</p>
        <h1 class="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.02]">
          穿出你的<br /><span class="text-rose-gradient italic">从容优雅</span>
        </h1>
        <p class="mt-6 text-ink-soft leading-relaxed max-w-md font-serif">
          ${BRAND} ${BRAND_CN} 为现代女性挑选每日值得的服饰——
          连衣裙、衬衫、外套与裤装，把高级感穿进日常。
        </p>
        <div class="mt-8 flex flex-wrap gap-4">
          <a href="#new" class="btn-rose rounded-full px-8 py-3.5 font-medium">立即选购</a>
          <a href="#story" class="rounded-full px-8 py-3.5 font-medium border border-ink/20 hover:bg-ink/5 transition">了解品牌</a>
        </div>
      </div>
      <div class="reveal grid grid-cols-2 gap-4">
        <div class="rounded-3xl overflow-hidden aspect-[3/4] translate-y-6">${garmentSvg({ kind: "dress" })}</div>
        <div class="rounded-3xl overflow-hidden aspect-[3/4]">${garmentSvg({ kind: "coat" })}</div>
      </div>
    </div>
  </section>

  <!-- 分类导航 -->
  <section id="categories" class="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
    <div class="flex items-end justify-between mb-8 reveal">
      <h2 class="font-display text-3xl sm:text-4xl">按品类选购</h2>
      <a href="#new" class="text-sm text-rose-deep hover:underline">查看全部 →</a>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      ${categories
        .map(
          (c) => `
        <a href="#new" class="cat-tile reveal group relative rounded-3xl overflow-hidden aspect-[4/5] block">
          ${garmentSvg({ kind: c.kind })}
          <div class="absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent"></div>
          <div class="absolute bottom-4 left-4 text-ivory">
            <p class="font-display text-2xl">${c.name}</p>
            <p class="text-xs tracking-widest uppercase opacity-80">${c.en}</p>
          </div>
        </a>`
        )
        .join("")}
    </div>
  </section>

  <!-- 新品网格 -->
  <section id="new" class="bg-blush/40 py-14 sm:py-20">
    <div class="max-w-7xl mx-auto px-5 sm:px-8">
      <div class="text-center mb-10 reveal">
        <p class="text-rose-deep text-xs tracking-luxe uppercase mb-3">New Arrivals</p>
        <h2 class="font-display text-3xl sm:text-4xl">本季新品</h2>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        ${products
          .map(
            (p) => `
          <article class="product-card reveal bg-ivory rounded-3xl overflow-hidden border border-rose/10 group">
            <div class="relative aspect-[3/4] overflow-hidden">
              <div class="img w-full h-full">${garmentSvg({ kind: p.kind })}</div>
              ${p.tag ? `<span class="absolute top-3 left-3 bg-ink text-ivory text-[11px] px-2.5 py-1 rounded-full">${p.tag}</span>` : ""}
              <button class="quick add-bag absolute bottom-3 inset-x-3 btn-dark rounded-full py-2.5 text-sm font-medium"
                data-name="${p.name}" data-price="${p.price}">加入购物袋</button>
            </div>
            <div class="p-4">
              <p class="text-[11px] tracking-widest uppercase text-rose-deep/70">${p.en}</p>
              <h3 class="font-serif text-base mt-1 leading-snug">${p.name}</h3>
              <p class="font-display text-lg text-ink mt-1.5">${yuan(p.price)}</p>
            </div>
          </article>`
          )
          .join("")}
      </div>
    </div>
  </section>

  <!-- 促销 Banner -->
  <section class="max-w-7xl mx-auto px-5 sm:px-8 py-14">
    <div class="reveal rounded-[2rem] overflow-hidden grid md:grid-cols-2 bg-rose/10 border border-rose/15">
      <div class="p-8 sm:p-12 flex flex-col justify-center">
        <p class="text-rose-deep font-serif tracking-luxe text-sm mb-3 uppercase">Limited · 限时</p>
        <h2 class="font-display text-4xl sm:text-5xl leading-tight">连衣裙系列<br/>第二件 5 折</h2>
        <p class="mt-5 text-ink-soft leading-relaxed max-w-sm font-serif">本季精选连衣裙，从通勤到约会一裙搞定。活动仅限本周，叠加会员折上折。</p>
        <a href="#new" class="mt-7 inline-block btn-rose rounded-full px-7 py-3 font-medium w-max">去逛连衣裙</a>
      </div>
      <div class="aspect-[4/3] md:aspect-auto overflow-hidden">${garmentSvg({ kind: "dress", w: 700, h: 520 })}</div>
    </div>
  </section>

  <!-- 品牌故事 -->
  <section id="story" class="bg-blush/40 py-16 sm:py-24">
    <div class="max-w-6xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-12 items-center">
      <div class="reveal rounded-[2rem] overflow-hidden aspect-[4/5] order-2 md:order-1">${garmentSvg({ kind: "blouse" })}</div>
      <div class="reveal order-1 md:order-2">
        <p class="text-rose-deep text-xs tracking-luxe uppercase mb-3">Our Story</p>
        <h2 class="font-display text-4xl sm:text-5xl leading-tight">为每一种<span class="text-rose-gradient">日常</span>而设计</h2>
        <p class="mt-6 text-ink-soft leading-loose font-serif">
          ${BRAND} 始于一个简单的想法：好衣服该被反复穿着。我们专注剪裁与面料，
          用克制的色彩和利落的版型，陪你从清晨的会议走到傍晚的相聚。
        </p>
        <p class="mt-4 text-ink-soft leading-loose font-serif">
          从选料、打版到成衣，每一件都经过多次试穿调整，只为贴合真实的身形与生活。
        </p>
        <a href="#new" class="inline-block mt-7 text-rose-deep border-b border-rose/50 pb-1 hover:border-rose transition">浏览全部单品 →</a>
      </div>
    </div>
  </section>

  <!-- 价值主张 -->
  <section class="max-w-7xl mx-auto px-5 sm:px-8 py-12">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
      ${[
        ["顺丰包邮", "满 ¥399 全国免运费"],
        ["无忧退换", "30 天品质退换保障"],
        ["甄选面料", "真丝 · 羊毛 · 醋酸严选"],
        ["会员礼遇", "积分 · 生日礼 · 优先购"]
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
    <div class="reveal rounded-[2rem] bg-ink text-ivory px-7 sm:px-14 py-14 sm:py-20 text-center relative overflow-hidden">
      <div class="absolute -top-16 -right-10 w-64 h-64 rounded-full bg-rose/30 blur-3xl"></div>
      <p class="text-rose text-xs tracking-luxe uppercase mb-4 relative">Membership</p>
      <h2 class="font-display text-4xl sm:text-5xl relative">加入会员，先享上新</h2>
      <p class="mt-4 text-ivory/70 max-w-lg mx-auto relative font-serif">订阅即享首单 9 折，第一时间收到新季预览与专属优惠。</p>
      <form id="join-form" class="mt-9 flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative">
        <input type="email" name="email" required placeholder="你的邮箱"
          class="flex-1 rounded-full px-5 py-3.5 text-ink bg-ivory placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-rose" />
        <button type="submit" class="btn-rose rounded-full px-8 py-3.5 font-medium whitespace-nowrap">立即订阅</button>
      </form>
      <p id="join-msg" class="mt-4 text-sm text-rose h-5 relative"></p>
    </div>
  </section>

  <!-- 页脚 -->
  <footer class="border-t border-rose/15">
    <div class="max-w-7xl mx-auto px-5 sm:px-8 py-12 grid sm:grid-cols-4 gap-8 text-sm">
      <div>
        <p class="font-display text-2xl">${BRAND}<span class="text-rose">.</span></p>
        <p class="text-ink-soft mt-3 font-serif leading-relaxed">${BRAND_CN}｜清新轻奢女装<br/>穿出你的从容优雅。</p>
      </div>
      <div>
        <p class="font-medium mb-3">购物</p>
        <ul class="space-y-2 text-ink-soft">
          <li><a href="#new" class="hover:text-rose-deep">新品</a></li>
          <li><a href="#categories" class="hover:text-rose-deep">全部品类</a></li>
          <li><a href="#story" class="hover:text-rose-deep">品牌故事</a></li>
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
          <li>客服微信：elan_care</li>
          <li>服务热线：400-777-0000</li>
          <li>工作日 9:00–21:00</li>
        </ul>
      </div>
    </div>
    <div class="border-t border-rose/10 py-5 text-center text-xs text-ink-soft/70">
      © 2026 ${BRAND} ${BRAND_CN} · 女装时尚网店 · 沪 ICP 备 0000000 号
    </div>
  </footer>
</main>

<!-- 购物袋抽屉 -->
<div id="bag-overlay" class="fixed inset-0 bg-ink/40 z-50"></div>
<aside id="bag-drawer" class="fixed top-0 right-0 z-50 h-full w-[88%] max-w-sm bg-ivory shadow-2xl flex flex-col">
  <div class="flex items-center justify-between px-5 py-4 border-b border-rose/15">
    <p class="font-display text-xl">购物袋</p>
    <button id="bag-close" class="text-ink-soft text-2xl leading-none" aria-label="关闭">×</button>
  </div>
  <div id="bag-items" class="flex-1 overflow-auto px-5 py-4 space-y-3 text-sm"></div>
  <div class="border-t border-rose/15 px-5 py-4">
    <div class="flex justify-between mb-3"><span class="text-ink-soft">小计</span><span id="bag-total" class="font-display text-lg">¥0</span></div>
    <button class="btn-dark w-full rounded-full py-3.5 font-medium">去结算</button>
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
    bagItems.innerHTML = `<p class="text-ink-soft text-center py-10">购物袋还是空的～去挑件喜欢的吧</p>`;
  } else {
    bagItems.innerHTML = bag
      .map(
        (x) => `
      <div class="flex justify-between items-center gap-3 border-b border-rose/10 pb-3">
        <div><p class="font-serif">${x.name}</p><p class="text-ink-soft text-xs">${yuan(x.price)} × ${x.qty}</p></div>
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

// ---------- 订阅 ----------
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
  (entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }),
  { threshold: 0.1 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

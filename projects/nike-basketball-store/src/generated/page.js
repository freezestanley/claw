// Nike 风格篮球鞋店铺页（演示）。
// 免责：与 Nike, Inc. 无任何关联，所有品牌名/产品名/图形均为虚构占位，纯前端演示。
// 全部插画为自绘内联 SVG，无外部图片依赖。

const BRAND = "SWIFT";
const RED = "#e11d2a";

/* ---------- 自绘球鞋 SVG（侧视抽象插画，按系列配色变体） ---------- */
function sneakerSVG(baseColor, accentColor, soleColor = "#f5f5f5") {
  return `
  <svg viewBox="0 0 360 200" class="h-full w-full" role="img" aria-label="篮球鞋插画" preserveAspectRatio="xMidYMid meet">
    <defs>
      <linearGradient id="g-${baseColor.replace('#','')}-${accentColor.replace('#','')}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${baseColor}"/>
        <stop offset="1" stop-color="#0a0a0a"/>
      </linearGradient>
    </defs>
    <!-- 鞋底 -->
    <path d="M18 158 Q14 178 44 180 L320 180 Q344 180 342 162 L340 150 L26 150 Z"
          fill="${soleColor}" stroke="#111" stroke-width="2"/>
    <rect x="20" y="150" width="320" height="6" fill="#222" opacity="0.35"/>
    <!-- 中底缓震点 -->
    <circle cx="70" cy="166" r="6" fill="${accentColor}"/>
    <circle cx="300" cy="166" r="6" fill="${accentColor}"/>
    <!-- 鞋身 -->
    <path d="M30 150 Q22 96 78 78 Q126 62 168 70 Q214 80 250 70 Q300 56 326 92 Q344 116 338 150 Z"
          fill="url(#g-${baseColor.replace('#','')}-${accentColor.replace('#','')})" stroke="#0a0a0a" stroke-width="2.5"/>
    <!-- 鞋舌/领口 -->
    <path d="M250 70 Q272 48 300 54 Q316 58 322 80 L318 96 Q296 78 268 84 Z" fill="${baseColor}" stroke="#0a0a0a" stroke-width="2"/>
    <!-- 抽象 swoosh（非官方商标） -->
    <path d="M86 138 Q150 96 286 96 Q200 120 120 142 Q100 146 86 138 Z" fill="${accentColor}"/>
    <!-- 鞋带区 -->
    <path d="M170 84 Q210 78 244 84 L240 116 Q206 110 176 114 Z" fill="#0a0a0a" opacity="0.55"/>
    <g stroke="${soleColor}" stroke-width="3" opacity="0.85">
      <line x1="182" y1="92" x2="232" y2="98"/>
      <line x1="180" y1="102" x2="230" y2="108"/>
    </g>
  </svg>`;
}

/* ---------- 商品数据（虚构命名，规避真实产品） ---------- */
const PRODUCTS = [
  { id: "lb-eclipse",  name: "Eclipse XXII",   series: "LeBron 系列",  price: 1499, colorway: "黑曜 / 烈焰红", base: "#1a1a1a", accent: RED,       sole: "#f5f5f5" },
  { id: "lb-witness",  name: "Witness Flow",   series: "LeBron 系列",  price: 999,  colorway: "纯白 / 赤红",   base: "#3a3a3a", accent: "#ff3b30", sole: "#ffffff" },
  { id: "kd-tempo",    name: "Tempo Lite",     series: "KD 系列",      price: 1199, colorway: "暗夜黑 / 红线", base: "#141414", accent: "#d11a2a", sole: "#e8e8e8" },
  { id: "gt-cutter",   name: "Cutter G3",      series: "GT Cut 系列",  price: 1399, colorway: "竞速白 / 红勾", base: "#2b2b2b", accent: RED,       sole: "#ffffff" },
  { id: "freak-surge", name: "Surge Freak",    series: "Giannis 系列", price: 899,  colorway: "炭黑 / 火山红", base: "#101010", accent: "#e02424", sole: "#f0f0f0" },
  { id: "mamba-strike",name: "Strike Mamba",   series: "Mamba 经典",   price: 1599, colorway: "曜石黑 / 蛇红", base: "#0d0d0d", accent: "#c1121f", sole: "#efefef" }
];

const fmt = (n) => "¥" + n.toLocaleString("zh-CN");

export function mountPage({ container, runtime }) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 购物袋状态：Map<id, qty>
  const cart = new Map();

  container.innerHTML = `
  <div class="min-h-screen bg-[#0a0a0a] font-sans text-white antialiased"
       style="font-family:-apple-system,'Segoe UI','Helvetica Neue',Arial,sans-serif;">

    <!-- 顶部导航 -->
    <header class="sticky top-0 z-30 border-b border-white/10 bg-black/85 backdrop-blur">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#" class="flex items-center gap-2">
          <svg viewBox="0 0 48 22" class="h-5 w-12" aria-hidden="true">
            <path d="M2 18 Q22 2 46 3 Q20 10 8 19 Q4 21 2 18 Z" fill="${RED}"/>
          </svg>
          <span class="text-xl font-black tracking-tighter">${BRAND}</span>
          <span class="ml-1 hidden text-[11px] font-semibold uppercase tracking-[0.3em] text-white/40 sm:inline">Basketball</span>
        </a>
        <nav class="hidden items-center gap-7 text-sm font-medium text-white/70 md:flex">
          <a href="#shop" class="transition hover:text-white">球鞋</a>
          <a href="#shop" class="transition hover:text-white">系列</a>
          <a href="#shop" class="transition hover:text-white">新品</a>
        </nav>
        <button id="open-cart"
          class="relative inline-flex h-11 min-w-[44px] items-center gap-2 rounded-full bg-white px-4 text-sm font-bold text-black transition active:scale-95">
          <i data-lucide="shopping-bag" class="h-5 w-5"></i>
          <span class="hidden sm:inline">购物袋</span>
          <span id="cart-badge"
            class="absolute -right-1 -top-1 hidden h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-xs font-bold text-white"
            style="background:${RED};">0</span>
        </button>
      </div>
    </header>

    <!-- Hero -->
    <section class="relative overflow-hidden border-b border-white/10">
      <div class="pointer-events-none absolute -right-24 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 rounded-full opacity-30 blur-3xl md:block"
           style="background:radial-gradient(circle,${RED},transparent 70%);"></div>
      <div class="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
        <div class="space-y-6">
          <span class="inline-block rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.25em]"
                style="border-color:${RED};color:${RED};">2026 Court Collection</span>
          <h1 class="text-5xl font-black leading-[0.95] tracking-tighter sm:text-6xl lg:text-7xl">
            为<span style="color:${RED};">爆发力</span><br/>而生
          </h1>
          <p class="max-w-md text-base leading-7 text-white/70">
            从突破到终结，每一双都为球场上的关键时刻打造。轻量缓震，极致抓地。
          </p>
          <a href="#shop"
             class="inline-flex h-12 items-center rounded-full px-7 text-sm font-bold text-white transition active:scale-95"
             style="background:${RED};">立即选购</a>
        </div>
        <div id="hero-shoe" class="relative mx-auto w-full max-w-md drop-shadow-2xl">
          ${sneakerSVG("#1a1a1a", RED, "#ffffff")}
        </div>
      </div>
    </section>

    <!-- 商品列表 -->
    <section id="shop" class="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <div class="mb-8 flex items-end justify-between">
        <div>
          <h2 class="text-3xl font-black tracking-tight sm:text-4xl">精选球鞋</h2>
          <p class="mt-1 text-sm text-white/50">经典系列 · 演示款式</p>
        </div>
        <span class="text-sm text-white/40">${PRODUCTS.length} 款</span>
      </div>
      <div id="product-grid" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        ${PRODUCTS.map((p, i) => productCard(p, i)).join("")}
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="border-t border-white/10 bg-black">
      <div class="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 lg:px-8">
        <div class="mb-3 flex items-center justify-center gap-2">
          <svg viewBox="0 0 48 22" class="h-4 w-10" aria-hidden="true"><path d="M2 18 Q22 2 46 3 Q20 10 8 19 Q4 21 2 18 Z" fill="${RED}"/></svg>
          <span class="text-lg font-black tracking-tighter">${BRAND}</span>
        </div>
        <p class="mx-auto max-w-2xl text-xs leading-6 text-white/40">
          演示页面，与 Nike, Inc. 无任何关联。所有品牌名称、产品名称与图形均为虚构占位，仅用于前端交互演示，不构成任何销售要约。
        </p>
      </div>
    </footer>

    <!-- 购物袋抽屉 -->
    <div id="cart-overlay" class="fixed inset-0 z-40 hidden bg-black/60 backdrop-blur-sm"></div>
    <aside id="cart-drawer"
      class="fixed right-0 top-0 z-50 flex h-full w-full max-w-md translate-x-full flex-col bg-[#111111] shadow-2xl transition-transform duration-300 ease-out"
      role="dialog" aria-modal="true" aria-label="购物袋">
      <div class="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <h3 class="text-lg font-black tracking-tight">购物袋</h3>
        <button id="close-cart" class="inline-flex h-11 w-11 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white">
          <i data-lucide="x" class="h-5 w-5"></i>
        </button>
      </div>
      <div id="cart-items" class="flex-1 overflow-y-auto px-5 py-4"></div>
      <div class="border-t border-white/10 px-5 py-4">
        <div class="mb-3 flex items-center justify-between text-sm">
          <span class="text-white/60">小计</span>
          <span id="cart-total" class="text-xl font-black">¥0</span>
        </div>
        <button id="checkout-btn"
          class="h-12 w-full rounded-full text-sm font-bold text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          style="background:${RED};" disabled>结算</button>
        <button id="clear-cart" class="mt-2 h-9 w-full text-xs font-medium text-white/40 transition hover:text-white/70">清空购物袋</button>
      </div>
    </aside>

    <!-- toast -->
    <div id="toast" class="pointer-events-none fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 translate-y-4 rounded-full bg-white px-5 py-3 text-sm font-bold text-black opacity-0 shadow-2xl transition-all duration-300"></div>
  </div>`;

  /* ---------- 元素引用 ---------- */
  const $ = (s) => container.querySelector(s);
  const overlay = $("#cart-overlay");
  const drawer = $("#cart-drawer");
  const badge = $("#cart-badge");
  const itemsBox = $("#cart-items");
  const totalEl = $("#cart-total");
  const checkoutBtn = $("#checkout-btn");
  const toast = $("#toast");

  /* ---------- 工具 ---------- */
  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.style.opacity = "1";
    toast.style.transform = "translate(-50%, 0)";
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translate(-50%, 1rem)";
    }, 1600);
  }

  function totalCount() {
    let n = 0;
    cart.forEach((q) => (n += q));
    return n;
  }
  function totalPrice() {
    let s = 0;
    cart.forEach((q, id) => (s += byId(id).price * q));
    return s;
  }

  function renderBadge() {
    const n = totalCount();
    if (n > 0) {
      badge.textContent = n;
      badge.style.display = "inline-flex";
    } else {
      badge.style.display = "none";
    }
  }

  function renderCart() {
    if (cart.size === 0) {
      itemsBox.innerHTML = `
        <div class="flex h-full flex-col items-center justify-center gap-3 py-16 text-center text-white/40">
          <i data-lucide="shopping-bag" class="h-10 w-10"></i>
          <p class="text-sm">购物袋还是空的</p>
        </div>`;
    } else {
      itemsBox.innerHTML = [...cart.entries()].map(([id, qty]) => {
        const p = byId(id);
        return `
        <div class="mb-3 flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
          <div class="h-16 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-black/40">${sneakerSVG(p.base, p.accent, p.sole)}</div>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-bold">${p.name}</p>
            <p class="text-xs text-white/40">${p.series}</p>
            <p class="mt-1 text-sm font-bold" style="color:${RED};">${fmt(p.price)}</p>
          </div>
          <div class="flex flex-col items-end justify-between">
            <button data-remove="${id}" class="text-white/30 transition hover:text-white" aria-label="移除">
              <i data-lucide="trash-2" class="h-4 w-4"></i>
            </button>
            <div class="flex items-center gap-1 rounded-full border border-white/15">
              <button data-dec="${id}" class="flex h-8 w-8 items-center justify-center text-white/70 transition hover:text-white" aria-label="减少">
                <i data-lucide="minus" class="h-3.5 w-3.5"></i>
              </button>
              <span class="w-5 text-center text-sm font-bold">${qty}</span>
              <button data-inc="${id}" class="flex h-8 w-8 items-center justify-center text-white/70 transition hover:text-white" aria-label="增加">
                <i data-lucide="plus" class="h-3.5 w-3.5"></i>
              </button>
            </div>
          </div>
        </div>`;
      }).join("");
    }
    totalEl.textContent = fmt(totalPrice());
    checkoutBtn.disabled = cart.size === 0;
    runtime.refreshIcons();
  }

  function addToCart(id) {
    cart.set(id, (cart.get(id) || 0) + 1);
    renderBadge();
    renderCart();
    showToast(`已加入 ${byId(id).name}`);
    // 角标反馈动效
    if (!reduceMotion && window.anime?.animate) {
      window.anime.animate(badge, { scale: [1.4, 1], duration: 360, ease: "outBack" });
    }
  }

  function openCart() {
    overlay.classList.remove("hidden");
    requestAnimationFrame(() => drawer.classList.remove("translate-x-full"));
  }
  function closeCart() {
    drawer.classList.add("translate-x-full");
    setTimeout(() => overlay.classList.add("hidden"), 280);
  }

  /* ---------- 事件绑定 ---------- */
  $("#open-cart").addEventListener("click", openCart);
  $("#close-cart").addEventListener("click", closeCart);
  overlay.addEventListener("click", closeCart);

  $("#clear-cart").addEventListener("click", () => {
    cart.clear();
    renderBadge();
    renderCart();
    showToast("已清空购物袋");
  });

  $("#checkout-btn").addEventListener("click", () => {
    showToast(`结算演示：${totalCount()} 件 · ${fmt(totalPrice())}`);
  });

  // 商品卡片加购（事件委托）
  $("#product-grid").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add]");
    if (btn) addToCart(btn.getAttribute("data-add"));
  });

  // 抽屉内增减/移除（事件委托）
  itemsBox.addEventListener("click", (e) => {
    const inc = e.target.closest("[data-inc]");
    const dec = e.target.closest("[data-dec]");
    const rm = e.target.closest("[data-remove]");
    if (inc) { const id = inc.dataset.inc; cart.set(id, cart.get(id) + 1); }
    else if (dec) { const id = dec.dataset.dec; const q = cart.get(id) - 1; q <= 0 ? cart.delete(id) : cart.set(id, q); }
    else if (rm) { cart.delete(rm.dataset.remove); }
    else return;
    renderBadge();
    renderCart();
  });

  // Esc 关闭
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.classList.contains("hidden")) closeCart();
  });

  /* ---------- 初始化 ---------- */
  runtime.refreshIcons();
  renderBadge();
  renderCart();

  // 卡片淡入动效
  if (!reduceMotion && window.anime?.animate) {
    window.anime.animate(container.querySelectorAll(".product-card"), {
      opacity: [0, 1],
      translateY: [24, 0],
      delay: window.anime.stagger ? window.anime.stagger(70) : 0,
      duration: 600,
      ease: "outCubic"
    });
  }
}

/* ---------- 商品卡片模板 ---------- */
function productCard(p, i) {
  return `
  <article class="product-card group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent">
    <div class="relative aspect-[16/10] overflow-hidden bg-[#161616]">
      <div class="absolute inset-0 flex items-center justify-center p-6 transition-transform duration-500 group-hover:scale-105">
        ${sneakerSVG(p.base, p.accent, p.sole)}
      </div>
      <span class="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/80">${p.series}</span>
    </div>
    <div class="flex flex-1 flex-col p-5">
      <h3 class="text-lg font-black tracking-tight">${p.name}</h3>
      <p class="mt-0.5 text-xs text-white/40">${p.colorway}</p>
      <div class="mt-4 flex items-end justify-between">
        <span class="text-xl font-black" style="color:${RED};">${fmt(p.price)}</span>
        <button data-add="${p.id}"
          class="inline-flex h-11 min-w-[44px] items-center gap-1.5 rounded-full bg-white px-4 text-sm font-bold text-black transition active:scale-95 hover:bg-white/90">
          <i data-lucide="plus" class="h-4 w-4"></i>加入
        </button>
      </div>
    </div>
  </article>`;
}

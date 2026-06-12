// page.js — 糖糖屋 Sweetie Hut 单页组装（含购物袋交互）
import { categories, products, features, reviews, plans } from "./data.js";
import { heroScene } from "./svg.js";
import * as cart from "./cart.js";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const yuan = cart.yuan;

// 共用 pill 按钮（CTA 对比度达标）
const btnPrimary = "inline-flex items-center justify-center gap-2 rounded-full bg-candy-pink px-7 py-3 font-extrabold text-white shadow-lg shadow-candy-pink/30 transition active:scale-95 hover:brightness-105 min-h-[48px]";
const btnGhost = "inline-flex items-center justify-center gap-2 rounded-full border-2 border-candy-ink/15 bg-white px-7 py-3 font-bold text-candy-ink transition active:scale-95 hover:border-candy-pink hover:text-candy-pink min-h-[48px]";

const featIcon = {
  leaf: '<path d="M5 21c0-9 7-14 14-14 0 9-5 14-14 14z"/><path d="M5 21c2-5 6-8 10-9"/>',
  gift: '<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18M12 8c-2-4-7-2-4 0M12 8c2-4 7-2 4 0"/>',
  truck: '<rect x="1" y="6" width="13" height="11" rx="1"/><path d="M14 9h4l3 3v5h-7zM5.5 20a2 2 0 100-4 2 2 0 000 4zM17.5 20a2 2 0 100-4 2 2 0 000 4z"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>'
};
const icon = (k, color) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-7 w-7">${featIcon[k] || ""}</svg>`;

function navbar() {
  return `
  <header class="sticky top-0 z-40 border-b border-candy-ink/5 bg-candy-cream/85 backdrop-blur">
    <nav class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <a href="#top" class="flex items-center gap-2 font-extrabold text-lg">
        <span class="grid h-9 w-9 place-items-center rounded-full bg-candy-pink text-white shadow-md shadow-candy-pink/30">糖</span>
        <span>糖糖屋 <span class="text-candy-pink">Sweetie Hut</span></span>
      </a>
      <div class="hidden items-center gap-7 text-sm font-bold text-candy-ink/70 md:flex">
        <a href="#cats" class="hover:text-candy-pink transition">分类</a>
        <a href="#shop" class="hover:text-candy-pink transition">商品</a>
        <a href="#why" class="hover:text-candy-pink transition">卖点</a>
        <a href="#member" class="hover:text-candy-pink transition">会员</a>
      </div>
      <button id="cart-btn" class="relative grid h-11 w-11 place-items-center rounded-full bg-white shadow-md transition active:scale-90 hover:shadow-lg" aria-label="打开购物袋">
        <svg viewBox="0 0 24 24" fill="none" stroke="#3a2b3a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><path d="M6 2l1.5 4M18 2l-1.5 4"/><path d="M3 6h18l-1.5 13a2 2 0 01-2 2H6.5a2 2 0 01-2-2z"/><path d="M9 11a3 3 0 006 0"/></svg>
        <span id="cart-badge" class="absolute -right-1 -top-1 hidden min-w-[20px] rounded-full bg-candy-yellow px-1 text-center text-xs font-extrabold text-candy-ink shadow">0</span>
      </button>
    </nav>
  </header>`;
}

function hero() {
  return `
  <section id="top" class="relative overflow-hidden">
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div class="absolute -left-10 top-10 h-40 w-40 rounded-full bg-candy-yellow/40 blur-2xl"></div>
      <div class="absolute right-0 top-32 h-52 w-52 rounded-full bg-candy-mint/40 blur-2xl"></div>
      <div class="absolute bottom-0 left-1/3 h-44 w-44 rounded-full bg-candy-grape/30 blur-2xl"></div>
    </div>
    <div class="mx-auto grid max-w-7xl items-center gap-8 px-4 pt-10 pb-14 sm:px-6 lg:grid-cols-2 lg:gap-6 lg:px-8 lg:pt-16">
      <div class="order-2 text-center lg:order-1 lg:text-left">
        <span class="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-extrabold text-candy-pink shadow-sm">🍬 多巴胺糖果 · 甜到心里</span>
        <h1 class="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          每一颗，<br class="hidden sm:block"/>都是<span class="text-candy-pink">小确甜</span>
        </h1>
        <p class="mx-auto mt-4 max-w-md text-base font-semibold text-candy-ink/70 lg:mx-0">
          软糖、巧克力、棒棒糖、礼盒装，缤纷糖果一站集齐。无人工色素，送礼自留都甜。
        </p>
        <div class="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          <a href="#shop" class="${btnPrimary}">逛逛糖果 🛍️</a>
          <a href="#member" class="${btnGhost}">加入会员</a>
        </div>
        <div class="mt-7 flex items-center justify-center gap-6 text-sm font-bold text-candy-ink/60 lg:justify-start">
          <span>🍭 200+ 口味</span><span>🚚 顺丰冷链</span><span>⭐ 4.9 好评</span>
        </div>
      </div>
      <div class="order-1 mx-auto w-60 sm:w-72 lg:order-2 lg:w-full lg:max-w-md" id="hero-art">${heroScene()}</div>
    </div>
  </section>`;
}

function cats() {
  return `
  <section id="cats" class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <h2 class="text-center text-3xl font-extrabold sm:text-4xl">挑个口味开逛</h2>
    <p class="mt-2 text-center font-semibold text-candy-ink/60">六大品类，总有一款甜到你</p>
    <div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      ${categories.map((c) => `
        <a href="#shop" class="group rounded-candy bg-white p-4 text-center shadow-sm transition active:scale-95 hover:-translate-y-1 hover:shadow-xl">
          <div class="mx-auto h-20 w-20 transition group-hover:scale-110">${c.icon(c.color)}</div>
          <div class="mt-2 font-extrabold">${c.name}</div>
          <div class="text-xs font-semibold text-candy-ink/50">${c.desc}</div>
        </a>`).join("")}
    </div>
  </section>`;
}

function shop() {
  return `
  <section id="shop" class="bg-white/60 py-12">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center justify-between gap-2 sm:flex-row sm:text-left">
        <div>
          <h2 class="text-3xl font-extrabold sm:text-4xl">人气糖果</h2>
          <p class="mt-1 font-semibold text-candy-ink/60">大家都在抢的甜蜜</p>
        </div>
        <span class="text-sm font-bold text-candy-ink/40">* 演示商品 · 价格为示例</span>
      </div>
      <div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        ${products.map((p) => `
          <article class="flex flex-col rounded-candy bg-candy-cream p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div class="relative aspect-square overflow-hidden rounded-2xl bg-white">
              ${p.tag ? `<span class="absolute left-2 top-2 z-10 rounded-full bg-candy-yellow px-2 py-0.5 text-xs font-extrabold text-candy-ink">${p.tag}</span>` : ""}
              <div class="h-full w-full p-3">${p.icon(p.color)}</div>
            </div>
            <div class="mt-3 flex flex-1 flex-col">
              <span class="text-xs font-bold text-candy-ink/45">${p.cat}</span>
              <h3 class="font-extrabold leading-snug">${p.name}</h3>
              <div class="mt-2 flex items-center justify-between gap-2">
                <span class="text-lg font-extrabold text-candy-pink">${yuan(p.price)}</span>
                <button data-add="${p.id}" class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-candy-pink text-white shadow-md shadow-candy-pink/30 transition active:scale-90 hover:brightness-110" aria-label="加入购物袋 ${p.name}">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" class="h-5 w-5"><path d="M12 5v14M5 12h14"/></svg>
                </button>
              </div>
            </div>
          </article>`).join("")}
      </div>
    </div>
  </section>`;
}

function why() {
  return `
  <section id="why" class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <h2 class="text-center text-3xl font-extrabold sm:text-4xl">为什么选糖糖屋</h2>
    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      ${features.map((f) => `
        <div class="rounded-candy bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
          <div class="grid h-14 w-14 place-items-center rounded-2xl" style="background:${f.color}22">${icon(f.icon, f.color)}</div>
          <h3 class="mt-4 text-lg font-extrabold">${f.title}</h3>
          <p class="mt-1 text-sm font-semibold leading-relaxed text-candy-ink/60">${f.desc}</p>
        </div>`).join("")}
    </div>
  </section>`;
}

function testimonials() {
  return `
  <section class="bg-candy-grape/10 py-12">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 class="text-center text-3xl font-extrabold sm:text-4xl">甜心们怎么说</h2>
      <div class="mt-8 grid gap-4 md:grid-cols-3">
        ${reviews.map((r) => `
          <figure class="rounded-candy bg-white p-6 shadow-sm">
            <div class="flex gap-1 text-candy-yellow">${"★★★★★"}</div>
            <blockquote class="mt-3 font-semibold leading-relaxed text-candy-ink/80">“${r.text}”</blockquote>
            <figcaption class="mt-4 flex items-center gap-3">
              <span class="grid h-10 w-10 place-items-center rounded-full font-extrabold text-white" style="background:${r.avatar}">${r.name.slice(0,1)}</span>
              <span><span class="block font-extrabold">${r.name}</span><span class="block text-xs font-semibold text-candy-ink/50">${r.role}</span></span>
            </figcaption>
          </figure>`).join("")}
      </div>
    </div>
  </section>`;
}

function member() {
  return `
  <section id="member" class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <h2 class="text-center text-3xl font-extrabold sm:text-4xl">加入甜蜜会员</h2>
    <p class="mt-2 text-center font-semibold text-candy-ink/60">每月一盒惊喜糖果，准时送甜上门</p>
    <div class="mt-8 grid gap-4 lg:grid-cols-3">
      ${plans.map((p) => `
        <div class="relative flex flex-col rounded-candy ${p.highlight ? "bg-candy-pink text-white shadow-xl shadow-candy-pink/30 lg:-translate-y-2" : "bg-white text-candy-ink shadow-sm"} p-6">
          ${p.highlight ? `<span class="absolute right-5 top-5 rounded-full bg-candy-yellow px-3 py-0.5 text-xs font-extrabold text-candy-ink">最受欢迎</span>` : ""}
          <h3 class="text-xl font-extrabold">${p.name}</h3>
          <div class="mt-2 flex items-end gap-1"><span class="text-4xl font-extrabold">¥${p.price}</span><span class="pb-1 font-bold ${p.highlight ? "text-white/80" : "text-candy-ink/50"}">${p.period}</span></div>
          <ul class="mt-4 flex-1 space-y-2 text-sm font-semibold">
            ${p.perks.map((k) => `<li class="flex items-start gap-2"><span class="${p.highlight ? "text-candy-yellow" : "text-candy-mint"}">✔</span><span>${k}</span></li>`).join("")}
          </ul>
          <button data-plan="${p.name}" class="mt-6 rounded-full px-6 py-3 font-extrabold min-h-[48px] transition active:scale-95 ${p.highlight ? "bg-white text-candy-pink hover:brightness-95" : "bg-candy-pink text-white hover:brightness-105"}">选这个</button>
        </div>`).join("")}
    </div>

    <div class="mt-10 rounded-candy bg-candy-mint/15 p-6 text-center sm:p-8">
      <h3 class="text-2xl font-extrabold">订阅甜蜜上新</h3>
      <p class="mt-1 font-semibold text-candy-ink/60">留下邮箱，新品和专属折扣第一时间送达</p>
      <form id="sub-form" class="mx-auto mt-5 flex max-w-md flex-col gap-3 sm:flex-row">
        <input type="email" required placeholder="you@example.com" aria-label="邮箱"
          class="w-full rounded-full border-2 border-candy-ink/10 bg-white px-5 py-3 font-semibold outline-none focus:border-candy-pink min-h-[48px]" />
        <button type="submit" class="${btnPrimary} shrink-0">订阅</button>
      </form>
      <p id="sub-msg" class="mt-3 hidden font-bold text-candy-mint">🎉 订阅成功！甜蜜马上就来～（演示）</p>
    </div>
  </section>`;
}

function footer() {
  return `
  <footer class="bg-candy-ink text-candy-cream">
    <div class="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
      <div class="md:col-span-2">
        <div class="flex items-center gap-2 text-lg font-extrabold"><span class="grid h-9 w-9 place-items-center rounded-full bg-candy-pink">糖</span>糖糖屋 Sweetie Hut</div>
        <p class="mt-3 max-w-xs text-sm font-semibold text-candy-cream/60">多巴胺糖果网店（演示站）。每一颗都是小确甜。</p>
      </div>
      <div><h4 class="font-extrabold">逛糖果</h4><ul class="mt-3 space-y-2 text-sm font-semibold text-candy-cream/60"><li><a href="#cats" class="hover:text-candy-pink">分类</a></li><li><a href="#shop" class="hover:text-candy-pink">商品</a></li><li><a href="#member" class="hover:text-candy-pink">会员</a></li></ul></div>
      <div><h4 class="font-extrabold">关于</h4><ul class="mt-3 space-y-2 text-sm font-semibold text-candy-cream/60"><li>无人工色素承诺</li><li>顺丰冷链配送</li><li>7 天无忧退</li></ul></div>
    </div>
    <div class="border-t border-white/10 py-5 text-center text-xs font-semibold text-candy-cream/40">© 2026 糖糖屋 Sweetie Hut · 演示页面，非真实交易</div>
  </footer>`;
}

function drawer() {
  return `
  <div id="cart-overlay" class="fixed inset-0 z-50 hidden">
    <div data-close class="absolute inset-0 bg-candy-ink/40 backdrop-blur-sm opacity-0 transition-opacity duration-300"></div>
    <aside id="cart-panel" class="absolute right-0 top-0 flex h-full w-[88%] max-w-md translate-x-full flex-col bg-candy-cream shadow-2xl transition-transform duration-300 pb-safe">
      <div class="flex items-center justify-between border-b border-candy-ink/10 px-5 py-4">
        <h3 class="text-lg font-extrabold">🛍️ 我的购物袋</h3>
        <button data-close class="grid h-9 w-9 place-items-center rounded-full bg-white shadow active:scale-90" aria-label="关闭">
          <svg viewBox="0 0 24 24" fill="none" stroke="#3a2b3a" stroke-width="2.5" stroke-linecap="round" class="h-5 w-5"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </div>
      <div id="cart-items" class="flex-1 space-y-3 overflow-y-auto px-5 py-4"></div>
      <div class="border-t border-candy-ink/10 px-5 py-4">
        <div class="flex items-center justify-between text-lg font-extrabold"><span>合计</span><span id="cart-total" class="text-candy-pink">¥0.00</span></div>
        <button id="checkout" class="${btnPrimary} mt-3 w-full">去结算（演示）</button>
        <p class="mt-2 text-center text-xs font-semibold text-candy-ink/40">演示站不会真实下单</p>
      </div>
    </aside>
  </div>`;
}

function escapeHtml(s) { return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

function renderCart(snap) {
  const badge = document.getElementById("cart-badge");
  const itemsEl = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (badge) {
    badge.textContent = snap.count;
    badge.classList.toggle("hidden", snap.count === 0);
  }
  if (totalEl) totalEl.textContent = yuan(snap.total);
  if (!itemsEl) return;
  if (snap.items.length === 0) {
    itemsEl.innerHTML = `<div class="grid h-full place-items-center text-center text-candy-ink/45">
      <div><div class="text-5xl">🍬</div><p class="mt-3 font-bold">袋子空空的，去装点甜吧～</p></div></div>`;
    return;
  }
  itemsEl.innerHTML = snap.items.map((i) => `
    <div class="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
      <span class="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-xl" style="background:${i.color}22">🍬</span>
      <div class="min-w-0 flex-1">
        <div class="truncate font-extrabold">${escapeHtml(i.name)}</div>
        <div class="text-sm font-bold text-candy-pink">${yuan(i.price)}</div>
      </div>
      <div class="flex items-center gap-1.5">
        <button data-dec="${i.id}" class="grid h-8 w-8 place-items-center rounded-full bg-candy-cream font-extrabold active:scale-90" aria-label="减少">−</button>
        <span class="w-6 text-center font-extrabold">${i.qty}</span>
        <button data-inc="${i.id}" class="grid h-8 w-8 place-items-center rounded-full bg-candy-cream font-extrabold active:scale-90" aria-label="增加">+</button>
        <button data-del="${i.id}" class="ml-1 grid h-8 w-8 place-items-center rounded-full text-candy-ink/40 hover:text-candy-pink active:scale-90" aria-label="删除">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="h-4 w-4"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>
        </button>
      </div>
    </div>`).join("");
}

function openDrawer() {
  const ov = document.getElementById("cart-overlay");
  const panel = document.getElementById("cart-panel");
  const mask = ov.querySelector("[data-close]");
  ov.classList.remove("hidden");
  requestAnimationFrame(() => { panel.classList.remove("translate-x-full"); mask.classList.remove("opacity-0"); });
}
function closeDrawer() {
  const ov = document.getElementById("cart-overlay");
  const panel = document.getElementById("cart-panel");
  const mask = ov.querySelector("[data-close]");
  panel.classList.add("translate-x-full"); mask.classList.add("opacity-0");
  if (reduceMotion) { ov.classList.add("hidden"); return; }
  setTimeout(() => ov.classList.add("hidden"), 300);
}

// 加购小动画：角标弹一下（尊重 reduced-motion）
function bumpBadge() {
  if (reduceMotion || !window.anime) return;
  anime.animate ? anime.animate("#cart-badge", { scale: [1, 1.5, 1], duration: 420, ease: "outBack" })
                : anime({ targets: "#cart-badge", scale: [1, 1.5, 1], duration: 420 });
}

function bindEvents() {
  // 加购
  document.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const p = products.find((x) => x.id === btn.getAttribute("data-add"));
      if (p) { cart.add(p); bumpBadge(); }
    });
  });
  // 购物袋开关
  document.getElementById("cart-btn").addEventListener("click", openDrawer);
  document.getElementById("cart-overlay").addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-close")) closeDrawer();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawer(); });

  // 购物袋内 +/-/删除（事件委托）
  document.getElementById("cart-items").addEventListener("click", (e) => {
    const inc = e.target.closest("[data-inc]"), dec = e.target.closest("[data-dec]"), del = e.target.closest("[data-del]");
    const snap = cart.snapshot();
    if (inc) { const it = snap.items.find((i) => i.id === inc.getAttribute("data-inc")); cart.setQty(it.id, it.qty + 1); }
    if (dec) { const it = snap.items.find((i) => i.id === dec.getAttribute("data-dec")); cart.setQty(it.id, it.qty - 1); }
    if (del) cart.remove(del.getAttribute("data-del"));
  });

  // 结算（演示）
  document.getElementById("checkout").addEventListener("click", () => {
    const snap = cart.snapshot();
    if (snap.count === 0) return;
    alert(`演示下单成功！共 ${snap.count} 件，合计 ${yuan(snap.total)}。\n（演示站，不会真实扣款）`);
    cart.clear(); closeDrawer();
  });

  // 会员套餐选择 → 打开购物袋提示
  document.querySelectorAll("[data-plan]").forEach((b) => {
    b.addEventListener("click", () => alert(`已选择「${b.getAttribute("data-plan")}」会员（演示）`));
  });

  // 邮箱订阅
  const form = document.getElementById("sub-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("sub-msg").classList.remove("hidden");
    form.reset();
  });
}

// 入场动效（reduced-motion 时跳过）
function introAnim() {
  if (reduceMotion || !window.anime) return;
  const a = anime.animate || anime;
  a("#hero-art", { translateY: [20, 0], opacity: [0, 1], duration: 900, ease: "outQuad" });
  a(".cf", { translateY: [-8, 8], direction: "alternate", loop: true, duration: 2200, delay: anime.stagger ? anime.stagger(180) : 0, ease: "inOutSine" });
}

export function mountPage(app) {
  app.innerHTML = `
    ${navbar()}
    <main>
      ${hero()}
      ${cats()}
      ${shop()}
      ${why()}
      ${testimonials()}
      ${member()}
    </main>
    ${footer()}
    ${drawer()}
  `;
  cart.subscribe(renderCart);
  bindEvents();
  introAnim();
}

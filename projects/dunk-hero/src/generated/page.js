import { dunkHero, logoMark, panelAction, galleryPose } from "./svg-art.js";
import { initMotion } from "./motion.js";
import { initForm } from "./form.js";

const C = {
  paper: "#FDF6E3",
  ink: "#0B0B0B",
  blue: "#1F6FEB",
  flame: "#FF4D2E",
  yellow: "#FFD23F",
  magenta: "#E8336D",
};

// 半调网点背景（CSS radial dots）
const halftone = (color, size = 14) =>
  `background-image: radial-gradient(${color} 22%, transparent 23%); background-size: ${size}px ${size}px;`;

// comic 描边面板基础类
const panelBase =
  "border-[3px] border-[#0B0B0B] shadow-[6px_6px_0_0_#0B0B0B]";

function navBar() {
  const links = [
    ["#powers", "能力值"],
    ["#signature", "招牌动作"],
    ["#stats", "数据战绩"],
    ["#gallery", "画廊"],
  ];
  return `
  <header class="sticky top-0 z-50 border-b-[3px] border-[#0B0B0B] bg-[var(--paper)]/95 backdrop-blur">
    <nav class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
      <a href="#top" class="flex items-center gap-2">
        ${logoMark}
        <span class="font-comic text-2xl sm:text-3xl text-[#0B0B0B]">FLY<span class="text-[var(--flame)]">DUNK</span></span>
      </a>
      <div class="hidden items-center gap-6 md:flex">
        ${links
          .map(
            ([h, t]) =>
              `<a href="${h}" class="font-heavy text-sm uppercase tracking-wide text-[#0B0B0B] hover:text-[var(--flame)]">${t}</a>`
          )
          .join("")}
      </div>
      <a href="#join" class="inline-flex min-h-[44px] items-center font-comic text-lg ${panelBase} bg-[var(--yellow)] px-4 text-[#0B0B0B] transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-none">报名 JOIN</a>
    </nav>
  </header>`;
}

function heroSection() {
  return `
  <section id="top" class="relative overflow-hidden border-b-[3px] border-[#0B0B0B]" style="${halftone(
    "rgba(31,111,235,0.18)",
    16
  )}">
    <div class="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
      <div class="space-y-6">
        <span class="inline-block -rotate-2 font-comic text-lg ${panelBase} bg-[var(--blue)] px-3 py-1 text-[var(--paper)]">腾空即巅峰 · RISE ABOVE</span>
        <h1 class="font-comic text-6xl leading-[0.92] text-[#0B0B0B] sm:text-7xl lg:text-8xl">
          飞身<span class="text-[var(--flame)]">扣碎</span><br/>每一道<span class="text-[var(--blue)]">天际线</span>
        </h1>
        <p class="max-w-md text-base font-medium leading-7 text-[#0B0B0B]/80 sm:text-lg">
          FLYDUNK 不是球队，是一种腾空的态度。粗描边、半调网点、爆裂撞色，把每一次起跳画成英雄登场。
        </p>
        <div class="flex flex-wrap items-center gap-4">
          <a href="#join" data-pop class="inline-flex min-h-[52px] items-center font-comic text-2xl ${panelBase} bg-[var(--flame)] px-6 text-[var(--paper)] transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-none">加入飞跃军团</a>
          <a href="#signature" class="inline-flex min-h-[52px] items-center font-comic text-2xl ${panelBase} bg-[var(--paper)] px-6 text-[#0B0B0B] transition hover:bg-[var(--yellow)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none">看招牌动作</a>
        </div>
      </div>
      <div class="relative mx-auto w-full max-w-md">
        <div class="relative aspect-square ${panelBase} bg-[var(--paper)]" style="${halftone(
    "rgba(255,77,46,0.20)",
    13
  )}">
          ${dunkHero}
          <span data-onomatopoeia class="pointer-events-none absolute -right-3 -top-5 rotate-6 font-comic text-5xl text-[var(--yellow)] ink-stroke sm:text-6xl">SLAM!</span>
          <span data-onomatopoeia class="pointer-events-none absolute -left-4 bottom-6 -rotate-6 font-comic text-3xl text-[var(--magenta)] ink-stroke sm:text-4xl">BOOM</span>
        </div>
      </div>
    </div>
  </section>`;
}

function powersSection() {
  const powers = [
    ["弹跳力", 98, "VERTICAL", C.flame, "zap"],
    ["滞空", 95, "HANG TIME", C.blue, "feather"],
    ["速度", 92, "SPEED", C.magenta, "wind"],
    ["命中", 90, "FINISH", C.yellow, "target"],
  ];
  return `
  <section id="powers" class="border-b-[3px] border-[#0B0B0B] bg-[var(--paper)]">
    <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h2 class="font-comic text-5xl text-[#0B0B0B] sm:text-6xl">英雄<span class="text-[var(--blue)]">能力值</span></h2>
      <p class="mt-2 max-w-md font-medium text-[#0B0B0B]/70">每一项数值都为腾空而生。</p>
      <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        ${powers
          .map(
            ([name, val, en, color, icon]) => `
          <div data-reveal class="${panelBase} bg-[var(--paper)] p-5">
            <div class="flex items-center justify-between">
              <i data-lucide="${icon}" class="h-7 w-7 text-[#0B0B0B]"></i>
              <span class="font-heavy text-xs uppercase tracking-widest text-[#0B0B0B]/50">${en}</span>
            </div>
            <p class="mt-3 font-comic text-3xl text-[#0B0B0B]">${name}</p>
            <p class="mt-1 font-comic text-5xl" style="color:${color}"><span data-count="${val}">0</span></p>
            <div class="mt-3 h-4 w-full border-[3px] border-[#0B0B0B] bg-[var(--paper)]">
              <div class="h-full" style="width:${val}%;background:${color}"></div>
            </div>
          </div>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}

function signatureSection() {
  const panels = [
    ["crossover", C.flame, "01", "雷霆变向", "一记 crossover 晃开防守，启动起飞引擎。"],
    ["spinmove", C.blue, "02", "陀螺转身", "急停转身甩开追防，留下满地 speed lines。"],
    ["fadeaway", C.magenta, "03", "后仰干拔", "滞空到极限的后仰，对手只能仰望。"],
    ["poster", C.yellow, "04", "隔扣海报", "腾空越过最后一道防线，钉下惊天一扣。"],
  ];
  return `
  <section id="signature" class="border-b-[3px] border-[#0B0B0B]" style="${halftone(
    "rgba(11,11,11,0.08)",
    18
  )}">
    <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h2 class="font-comic text-5xl text-[#0B0B0B] sm:text-6xl">招牌动作 · <span class="text-[var(--flame)]">连环画</span></h2>
      <p class="mt-2 max-w-lg font-medium text-[#0B0B0B]/70">四格分镜，讲一次从启动到隔扣的完整起飞。</p>
      <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        ${panels
          .map(
            ([kind, color, no, title, desc], i) => `
          <figure data-reveal class="${panelBase} bg-[var(--paper)] ${
              i % 2 ? "lg:translate-y-4" : ""
            }">
            <div class="relative aspect-[4/3] border-b-[3px] border-[#0B0B0B]" style="${halftone(
              "rgba(31,111,235,0.15)",
              11
            )}">
              ${panelAction(kind, color)}
              <span class="absolute left-2 top-2 font-comic text-2xl text-[#0B0B0B]">${no}</span>
            </div>
            <figcaption class="p-4">
              <p class="font-comic text-2xl" style="color:${color}">${title}</p>
              <p class="mt-1 text-sm font-medium leading-6 text-[#0B0B0B]/75">${desc}</p>
            </figcaption>
          </figure>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}

function statsSection() {
  const stats = [
    [1287, "场", "腾空起跳", C.flame],
    [842, "记", "暴力隔扣", C.blue],
    [56, "cm", "最高弹跳", C.magenta],
    [99, "%", "热血指数", C.yellow],
  ];
  return `
  <section id="stats" class="border-b-[3px] border-[#0B0B0B] bg-[var(--blue)]" style="${halftone(
    "rgba(253,246,227,0.18)",
    16
  )}">
    <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h2 class="font-comic text-5xl text-[var(--paper)] sm:text-6xl ink-stroke">数据战绩</h2>
      <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        ${stats
          .map(
            ([num, unit, label, color]) => `
          <div data-reveal class="${panelBase} bg-[var(--paper)] p-6 text-center">
            <p class="font-comic text-6xl" style="color:${color}"><span data-count="${num}">0</span><span class="text-3xl text-[#0B0B0B]">${unit}</span></p>
            <p class="mt-2 font-heavy text-xs uppercase tracking-widest text-[#0B0B0B]/70">${label}</p>
          </div>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}

function gallerySection() {
  const accents = [C.flame, C.blue, C.magenta, C.yellow, C.blue, C.flame];
  return `
  <section id="gallery" class="border-b-[3px] border-[#0B0B0B] bg-[var(--paper)]">
    <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h2 class="font-comic text-5xl text-[#0B0B0B] sm:text-6xl">飞人<span class="text-[var(--magenta)]">画廊</span></h2>
      <p class="mt-2 max-w-md font-medium text-[#0B0B0B]/70">每一格都是一次定格的腾空瞬间。</p>
      <div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        ${accents
          .map(
            (color, i) => `
          <div data-reveal class="aspect-[5/6] ${panelBase} bg-[var(--paper)]" style="${halftone(
              "rgba(11,11,11,0.10)",
              10
            )}">
            ${galleryPose(i, color)}
          </div>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}

function joinSection() {
  return `
  <section id="join" style="${halftone("rgba(255,210,63,0.30)", 16)}" class="bg-[var(--flame)] border-b-[3px] border-[#0B0B0B]">
    <div class="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div class="${panelBase} bg-[var(--paper)] p-6 sm:p-8">
        <span class="inline-block -rotate-2 font-comic text-lg ${panelBase} bg-[var(--yellow)] px-3 py-1 text-[#0B0B0B]">SWISH! 加入我们</span>
        <h2 class="mt-4 font-comic text-5xl text-[#0B0B0B] sm:text-6xl">报名飞跃军团</h2>
        <p class="mt-2 font-medium text-[#0B0B0B]/75">留下你的信息，第一时间收到训练营与扣篮挑战赛通知。</p>
        <form id="join-form" novalidate class="mt-6 grid gap-4 sm:grid-cols-2">
          <div class="flex flex-col gap-1.5">
            <label for="jf-name" class="font-heavy text-xs uppercase tracking-widest text-[#0B0B0B]">昵称</label>
            <input id="jf-name" name="name" type="text" autocomplete="nickname" class="min-h-[48px] w-full border-[3px] border-[#0B0B0B] bg-[var(--paper)] px-3 text-[#0B0B0B] placeholder:text-[#0B0B0B]/40 focus:outline-none focus:ring-4 focus:ring-[var(--blue)]/40" placeholder="球场代号" />
            <p data-err="name" class="hidden font-medium text-sm text-[var(--flame)]">请填写昵称</p>
          </div>
          <div class="flex flex-col gap-1.5">
            <label for="jf-email" class="font-heavy text-xs uppercase tracking-widest text-[#0B0B0B]">邮箱</label>
            <input id="jf-email" name="email" type="email" autocomplete="email" class="min-h-[48px] w-full border-[3px] border-[#0B0B0B] bg-[var(--paper)] px-3 text-[#0B0B0B] placeholder:text-[#0B0B0B]/40 focus:outline-none focus:ring-4 focus:ring-[var(--blue)]/40" placeholder="you@flydunk.gg" />
            <p data-err="email" class="hidden font-medium text-sm text-[var(--flame)]">请填写有效邮箱</p>
          </div>
          <button type="submit" class="sm:col-span-2 inline-flex min-h-[52px] items-center justify-center font-comic text-2xl ${panelBase} bg-[var(--blue)] px-6 text-[var(--paper)] transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-none">
            <span class="js-label">起飞报名 →</span>
          </button>
          <p id="jf-success" role="status" class="hidden sm:col-span-2 ${panelBase} bg-[var(--yellow)] px-4 py-3 font-comic text-xl text-[#0B0B0B]">BOOM! 报名成功，欢迎加入飞跃军团 🏀</p>
        </form>
      </div>
    </div>
  </section>`;
}

function footer() {
  const socials = ["instagram", "twitter", "youtube", "twitch"];
  return `
  <footer class="bg-[#0B0B0B] text-[var(--paper)]">
    <div class="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div>
        <p class="font-comic text-3xl">FLY<span class="text-[var(--flame)]">DUNK</span></p>
        <p class="mt-1 text-sm text-[var(--paper)]/60">腾空即巅峰 · 漫画风篮球飞人宣传站</p>
      </div>
      <div class="flex items-center gap-3">
        ${socials
          .map(
            (s) =>
              `<a href="#" aria-label="${s}" class="inline-flex h-11 w-11 items-center justify-center border-[3px] border-[var(--paper)] transition hover:bg-[var(--flame)] hover:border-[var(--flame)]"><i data-lucide="${s}" class="h-5 w-5"></i></a>`
          )
          .join("")}
      </div>
    </div>
    <div class="border-t border-[var(--paper)]/15 px-4 py-4 text-center text-xs text-[var(--paper)]/50 sm:px-6">
      © 2026 FLYDUNK（占位品牌）· 插画与素材均为自绘 SVG 占位，非真实球星/品牌。
    </div>
  </footer>`;
}

export function mountPage({ container, runtime }) {
  container.innerHTML = `
    <div class="min-h-screen bg-[var(--paper)] text-[#0B0B0B]">
      ${navBar()}
      <main>
        ${heroSection()}
        ${powersSection()}
        ${signatureSection()}
        ${statsSection()}
        ${gallerySection()}
        ${joinSection()}
      </main>
      ${footer()}
    </div>
  `;

  runtime.refreshIcons();
  initMotion(container);
  initForm(container, runtime);
}

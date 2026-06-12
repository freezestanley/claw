import {
  mascotWave,
  mascotMini,
  chocoBar,
  cocoaBean,
  lollipop,
  mintCandy,
  pouch,
  cocoaLeaf,
} from "./svg.js";

const products = [
  {
    name: "牛奶可可熊",
    tag: "经典口味",
    desc: "顺滑牛奶可可，入口即化，孩子的第一块巧克力。",
    color: "#6B4226",
    accent: "#FF9E45",
  },
  {
    name: "榛子脆脆",
    tag: "酥脆颗粒",
    desc: "真实榛子碎，咔嚓一口，香气满满。",
    color: "#8A5A38",
    accent: "#F0586B",
  },
  {
    name: "莓莓夹心",
    tag: "果味夹心",
    desc: "草莓覆盆子夹心，酸甜平衡，不腻不齁。",
    color: "#F0586B",
    accent: "#FF9E45",
  },
  {
    name: "薄荷清新",
    tag: "清爽系列",
    desc: "一丝薄荷凉意，大孩子也爱的清新味。",
    color: "#7FD4B6",
    accent: "#6B4226",
  },
];

const sellingPoints = [
  {
    icon: cocoaBean,
    title: "真实可可",
    desc: "选用真实可可脂与可可粉，不用代可可脂，味道更纯正。",
  },
  {
    icon: mintCandy,
    title: "低糖配方",
    desc: "比常见儿童巧克力减糖约 30%（示意），给甜味做减法。",
  },
  {
    icon: cocoaLeaf,
    title: "无氢化油",
    desc: "配方中不添加氢化植物油与人工反式脂肪。",
  },
  {
    icon: lollipop,
    title: "天然色香",
    desc: "不使用人工色素与香精，颜色与香气来自原料本身。",
  },
];

const safety = [
  { num: "8项", label: "出厂检测", note: "每批次重金属、微生物等多项检测（示意）。" },
  { num: "全标注", label: "过敏原透明", note: "含奶、坚果等过敏原在包装正面清晰标注。" },
  { num: "可溯源", label: "原料溯源", note: "可可豆产地与供应链信息可查（示意）。" },
];

const reviews = [
  {
    name: "悠悠妈妈",
    role: "5 岁孩子家长",
    text: "包装上过敏原写得很清楚，作为家长很安心，孩子也超爱那只小熊。",
  },
  {
    name: "大壮爸爸",
    role: "7 岁孩子家长",
    text: "比起其他零食，低糖这点让我愿意买，味道孩子认可。",
  },
  {
    name: "小棠老师",
    role: "幼儿园老师",
    text: "做手工奖励发给小朋友，分量小巧、不脏手，挺合适。",
  },
];

const faqs = [
  {
    q: "几岁的孩子可以吃？",
    a: "建议 3 岁以上、能自主咀嚼吞咽的孩子在家长看护下适量食用；具体请以包装说明与医嘱为准。",
  },
  {
    q: "含有哪些过敏原？",
    a: "产品含乳制品，部分系列含坚果（如榛子）。所有过敏原均在包装正面醒目标注，购买前请仔细查看。",
  },
  {
    q: "真的低糖吗？",
    a: "本页低糖等数据为演示示意，真实产品请以包装营养成分表为准。",
  },
  {
    q: "在哪里可以买到？",
    a: "本站为占位演示页，CTA 不进行真实下单。正式上线后将在此提供线上与线下购买渠道。",
  },
];

const navLinks = [
  ["产品系列", "#products"],
  ["原料卖点", "#points"],
  ["安全营养", "#safety"],
  ["品牌故事", "#story"],
  ["购买与FAQ", "#buy"],
];

function deco(svg, cls) {
  return `<span class="floaty pointer-events-none absolute ${cls}" aria-hidden="true">${svg}</span>`;
}

export function mountPage(app) {
  app.innerHTML = `
  <!-- NAV -->
  <header class="sticky top-0 z-40 border-b border-cocoa-100/70 bg-cream-100/85 backdrop-blur">
    <nav class="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
      <a href="#top" class="flex items-center gap-2">
        <span class="h-9 w-9">${mascotMini}</span>
        <span class="text-lg font-extrabold tracking-tight text-cocoa-700">可可熊 <span class="text-candy-orange">CocoBear</span></span>
      </a>
      <ul class="hidden items-center gap-7 text-sm font-semibold text-cocoa-600 lg:flex">
        ${navLinks.map(([t, h]) => `<li><a href="${h}" class="transition hover:text-candy-red">${t}</a></li>`).join("")}
      </ul>
      <a href="#buy" class="inline-flex min-h-[44px] items-center rounded-full bg-cocoa-600 px-5 text-sm font-bold text-cream-50 shadow-lg shadow-cocoa-600/25 transition active:scale-95 hover:bg-cocoa-700">哪里购买</a>
    </nav>
  </header>

  <main id="top">
    <!-- HERO -->
    <section class="relative overflow-hidden bg-gradient-to-b from-cream-100 to-cream-200">
      ${deco(chocoBar, "left-[4%] top-[14%] w-16 opacity-70 sm:w-20")}
      ${deco(lollipop, "right-[6%] top-[10%] w-12 opacity-80")}
      ${deco(cocoaBean, "bottom-[12%] left-[10%] w-10 opacity-70")}
      ${deco(mintCandy, "right-[12%] bottom-[16%] w-12 opacity-70")}
      <div class="mx-auto grid max-w-[1200px] items-center gap-8 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:px-8">
        <div class="reveal text-center lg:text-left">
          <span class="inline-flex items-center gap-2 rounded-full bg-candy-mint/25 px-4 py-1.5 text-sm font-bold text-cocoa-600">
            🐻 为孩子用心 · 让家长放心
          </span>
          <h1 class="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-cocoa-700 sm:text-5xl lg:text-6xl">
            每一口可可熊<br/>都是<span class="text-candy-red">甜甜的安心</span>
          </h1>
          <p class="mx-auto mt-5 max-w-md text-base leading-7 text-cocoa-500 sm:text-lg lg:mx-0">
            真实可可、低糖配方、原料透明。给孩子值得期待的味道，给家长看得明白的放心。
          </p>
          <div class="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <a href="#products" class="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-candy-orange px-7 text-base font-bold text-cocoa-800 shadow-xl shadow-candy-orange/30 transition active:scale-95 hover:brightness-105 sm:w-auto">了解更多</a>
            <a href="#buy" class="inline-flex min-h-[48px] w-full items-center justify-center rounded-full border-2 border-cocoa-300 bg-cream-50 px-7 text-base font-bold text-cocoa-600 transition active:scale-95 hover:border-cocoa-500 sm:w-auto">哪里购买</a>
          </div>
        </div>
        <div class="reveal relative mx-auto w-64 sm:w-80 lg:w-full lg:max-w-md">
          <div class="absolute inset-0 -z-10 scale-90 rounded-full bg-candy-mint/30 blur-2xl"></div>
          <span class="block floaty">${mascotWave}</span>
        </div>
      </div>
    </section>

    <!-- PRODUCTS -->
    <section id="products" class="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div class="reveal max-w-xl">
        <h2 class="text-3xl font-extrabold tracking-tight text-cocoa-700 sm:text-4xl">四只小熊，四种好味道</h2>
        <p class="mt-3 text-cocoa-500">从经典牛奶到清新薄荷，总有一款合孩子的口味。</p>
      </div>
      <div class="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
        ${products
          .map(
            (p) => `
        <article class="reveal group min-w-[78%] snap-center rounded-4xl border border-cocoa-100 bg-cream-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-cocoa-600/10 sm:min-w-[60%] md:min-w-0">
          <div class="mx-auto w-28 transition group-hover:scale-105">${pouch(p.color, p.accent)}</div>
          <span class="mt-4 inline-block rounded-full bg-candy-mint/25 px-3 py-1 text-xs font-bold text-cocoa-600">${p.tag}</span>
          <h3 class="mt-2 text-xl font-extrabold text-cocoa-700">${p.name}</h3>
          <p class="mt-2 text-sm leading-6 text-cocoa-500">${p.desc}</p>
        </article>`,
          )
          .join("")}
      </div>
    </section>

    <!-- SELLING POINTS -->
    <section id="points" class="bg-cocoa-700 text-cream-50">
      <div class="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div class="reveal max-w-xl">
          <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">好吃，是因为用料实在</h2>
          <p class="mt-3 text-cream-200/80">我们在配料表上做加法，在糖和添加剂上做减法。</p>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          ${sellingPoints
            .map(
              (s) => `
          <div class="reveal rounded-4xl bg-cream-50/5 p-6 ring-1 ring-cream-50/10">
            <span class="block h-14 w-14">${s.icon}</span>
            <h3 class="mt-4 text-lg font-extrabold">${s.title}</h3>
            <p class="mt-2 text-sm leading-6 text-cream-200/80">${s.desc}</p>
          </div>`,
            )
            .join("")}
        </div>
        <p class="reveal mt-6 text-xs text-cream-200/50">* 减糖比例等为演示示意，真实数据以产品包装营养成分表为准。</p>
      </div>
    </section>

    <!-- SAFETY (家长安心) -->
    <section id="safety" class="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div class="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div class="reveal">
          <span class="inline-flex items-center gap-2 rounded-full bg-candy-mint/25 px-4 py-1.5 text-sm font-bold text-cocoa-600">家长安心区</span>
          <h2 class="mt-4 text-3xl font-extrabold tracking-tight text-cocoa-700 sm:text-4xl">把放心，写在看得见的地方</h2>
          <p class="mt-3 max-w-md leading-7 text-cocoa-500">孩子吃进嘴里的东西，值得每一道把关。我们把检测、过敏原与原料信息都摆到台面上。</p>
        </div>
        <div class="grid gap-4 sm:grid-cols-3">
          ${safety
            .map(
              (s) => `
          <div class="reveal rounded-4xl border border-cocoa-100 bg-cream-50 p-6 text-center shadow-sm">
            <p class="text-3xl font-extrabold text-candy-red">${s.num}</p>
            <p class="mt-1 font-bold text-cocoa-700">${s.label}</p>
            <p class="mt-2 text-xs leading-5 text-cocoa-500">${s.note}</p>
          </div>`,
            )
            .join("")}
        </div>
      </div>
    </section>

    <!-- STORY -->
    <section id="story" class="relative overflow-hidden bg-cream-200">
      ${deco(cocoaBean, "right-[8%] top-[18%] w-10 opacity-60")}
      ${deco(chocoBar, "left-[6%] bottom-[14%] w-16 opacity-50")}
      <div class="mx-auto grid max-w-[1200px] items-center gap-8 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div class="reveal relative mx-auto w-48 sm:w-56">
          <div class="absolute inset-0 -z-10 scale-95 rounded-full bg-candy-orange/25 blur-2xl"></div>
          <span class="block floaty">${mascotWave}</span>
        </div>
        <div class="reveal">
          <h2 class="text-3xl font-extrabold tracking-tight text-cocoa-700 sm:text-4xl">可可熊的小故事</h2>
          <p class="mt-4 leading-8 text-cocoa-600">
            可可熊住在一片可可树林里，它最大的心愿，是让每个小朋友都能尝到刚刚好的甜。<br/>
            于是它挑最饱满的可可豆，把糖放得少一点、把用心放得多一点——希望孩子开心，也希望陪在身边的爸爸妈妈，能安心地说一句「这个可以吃」。
          </p>
          <p class="mt-4 text-sm text-cocoa-400">（可可熊 CocoBear 为演示占位品牌，故事与形象均为虚构。）</p>
        </div>
      </div>
    </section>

    <!-- BUY + FAQ -->
    <section id="buy" class="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div class="reveal rounded-5xl bg-cocoa-600 px-6 py-12 text-center text-cream-50 sm:px-10">
        <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">想让孩子尝一口可可熊？</h2>
        <p class="mx-auto mt-3 max-w-md text-cream-200/85">本站为演示占位页，按钮暂不进行真实下单。正式上线后这里将提供购买渠道。</p>
        <div class="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button type="button" data-cta="buy" class="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-candy-orange px-7 text-base font-bold text-cocoa-800 shadow-xl shadow-black/15 transition active:scale-95 hover:brightness-105 sm:w-auto">查看购买渠道</button>
          <button type="button" data-cta="more" class="inline-flex min-h-[48px] w-full items-center justify-center rounded-full border-2 border-cream-50/40 px-7 text-base font-bold text-cream-50 transition active:scale-95 hover:bg-cream-50/10 sm:w-auto">了解更多产品</button>
        </div>
        <p data-cta-hint class="mt-4 hidden text-sm text-candy-mint"></p>
      </div>

      <div class="mt-14 grid gap-8 lg:grid-cols-[0.6fr_1fr]">
        <h3 class="reveal text-2xl font-extrabold tracking-tight text-cocoa-700 sm:text-3xl">常见问题</h3>
        <div class="reveal divide-y divide-cocoa-100 rounded-4xl border border-cocoa-100 bg-cream-50">
          ${faqs
            .map(
              (f) => `
          <details class="group px-5">
            <summary class="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-4 font-bold text-cocoa-700">
              <span>${f.q}</span>
              <span class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-candy-mint/30 text-cocoa-600 transition group-open:rotate-45">+</span>
            </summary>
            <p class="pb-5 text-sm leading-6 text-cocoa-500">${f.a}</p>
          </details>`,
            )
            .join("")}
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="bg-cocoa-800 text-cream-200/80">
      <div class="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div class="flex items-center gap-2">
          <span class="h-9 w-9">${mascotMini}</span>
          <span class="text-lg font-extrabold text-cream-50">可可熊 CocoBear</span>
        </div>
        <p class="text-sm leading-6">
          本页为 WebGen 生成的演示占位站，可可熊 CocoBear 为虚构品牌，<br class="hidden sm:block"/>不含任何真实商标，按钮不进行真实交易。
        </p>
        <div class="flex gap-3" aria-label="社交媒体（占位）">
          ${["🐻", "🍫", "🍬"]
            .map(
              (e) =>
                `<span class="grid h-10 w-10 place-items-center rounded-full bg-cream-50/10 text-lg">${e}</span>`,
            )
            .join("")}
        </div>
      </div>
      <p class="border-t border-cream-50/10 py-4 text-center text-xs text-cream-200/50">© 2026 CocoBear Demo · 仅供演示</p>
    </footer>
  </main>`;

  initInteractions();
}

function initInteractions() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const anime = window.anime;
  const animate = anime && (anime.animate || anime);

  // CTA 占位提示
  document.querySelectorAll("[data-cta]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const hint = document.querySelector("[data-cta-hint]");
      if (!hint) return;
      const kind = btn.getAttribute("data-cta");
      hint.textContent =
        kind === "buy"
          ? "🛒 演示页：购买渠道将在正式上线后开放～"
          : "👀 向上滚动即可查看四款可可熊产品系列～";
      hint.classList.remove("hidden");
    });
  });

  const reveals = Array.from(document.querySelectorAll(".reveal"));

  // 动效不可用 / 减动 / 无 IO 时，元素保持默认可见，直接返回
  if (reduce || !animate || !("IntersectionObserver" in window)) {
    return;
  }

  // 确认可做动画，先隐藏再揭示
  reveals.forEach((el) => el.classList.add("reveal-armed"));
  const show = (el) => {
    if (!el.classList.contains("reveal-armed")) return;
    el.classList.remove("reveal-armed");
    animate(el, {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 650,
      easing: "easeOutCubic",
    });
  };
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          show(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );
  reveals.forEach((el) => io.observe(el));
  // 兑底：2.2s 后强制揭示仍隐藏的元素（应对截图/不滚动场景）
  setTimeout(() => {
    document.querySelectorAll(".reveal-armed").forEach((el) => {
      el.classList.remove("reveal-armed");
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  }, 2200);

  // 吉祥物 / 装饰漂浮
  if (animate && !reduce) {
    animate(".floaty", {
      translateY: [
        { value: -8, duration: 1600 },
        { value: 0, duration: 1600 },
      ],
      easing: "easeInOutSine",
      loop: true,
      delay: (el, i) => i * 180,
    });
    // 挥手
    document.querySelectorAll(".mascot-arm").forEach((arm) => {
      animate(arm, {
        rotate: [0, 18, 0],
        duration: 1400,
        easing: "easeInOutSine",
        loop: true,
      });
    });
  }
}

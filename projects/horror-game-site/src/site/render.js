import { GAME, IMG, STORY, FEATURES, CHARACTERS, PLATFORMS } from "./data.js";

const nav = () => `
  <header class="fixed top-0 inset-x-0 z-50 transition-all duration-500" id="site-nav">
    <div class="mx-auto max-w-[1400px] px-5 md:px-8 h-16 md:h-[72px] flex items-center justify-between">
      <a href="#top" class="font-display text-lg md:text-xl tracking-[0.3em] text-ash-100 text-white">
        ASHFALL
      </a>
      <nav class="hidden md:flex items-center gap-9 text-[12px] uppercase tracking-[0.25em] text-ash-400">
        <a href="#story" class="hover:text-white transition-colors">剧情</a>
        <a href="#features" class="hover:text-white transition-colors">恐惧</a>
        <a href="#gallery" class="hover:text-white transition-colors">画面</a>
        <a href="#cast" class="hover:text-white transition-colors">角色</a>
        <a href="#platforms" class="hover:text-white transition-colors">平台</a>
      </nav>
      <a href="#wishlist" class="group inline-flex items-center gap-2 border border-rust/70 bg-rust/10 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white hover:bg-rust transition-colors">
        愿望单
      </a>
    </div>
  </header>`;

const hero = () => `
  <section id="top" class="relative min-h-[100dvh] w-full overflow-hidden flex items-end">
    <div class="absolute inset-0 -z-10">
      <img src="${IMG.hero}" alt="灰雾笼罩的针叶林" class="h-full w-full object-cover object-center scale-105" id="hero-img" />
      <div class="absolute inset-0 bg-gradient-to-b from-ash-950/70 via-ash-950/40 to-ash-950"></div>
      <div class="absolute inset-0 vignette"></div>
    </div>

    <div class="relative mx-auto max-w-[1400px] w-full px-5 md:px-8 pb-16 md:pb-24">
      <p class="reveal mb-5 text-[11px] md:text-xs uppercase tracking-ultra text-fog flicker">${GAME.genre}</p>
      <h1 class="reveal font-display font-700 leading-[0.86] text-white text-shadow-deep
                 text-[20vw] sm:text-[16vw] md:text-[12rem] lg:text-[14rem] tracking-tight">
        ASHFALL
      </h1>
      <p class="reveal mt-2 font-display text-2xl md:text-4xl tracking-[0.3em] text-fog/90">灰 · 落</p>
      <p class="reveal mt-7 max-w-xl text-base md:text-lg leading-relaxed text-ash-400">
        ${GAME.tagline} 重返 Mara's Hollow，在记忆与幻象之间，找出三十年前那一夜真正吞掉这座镇子的东西。
      </p>

      <div class="reveal mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <a href="#trailer" class="inline-flex items-center gap-3 bg-white px-7 py-3.5 text-sm font-500 uppercase tracking-[0.2em] text-ash-950 hover:bg-rust hover:text-white transition-colors active:scale-[0.98]">
          <span class="block h-0 w-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-current"></span>
          观看预告
        </a>
        <a href="#wishlist" class="inline-flex items-center gap-2 border border-ash-600 px-7 py-3.5 text-sm uppercase tracking-[0.2em] text-ash-100 text-white hover:border-rust hover:text-rust-bright transition-colors">
          加入愿望单
        </a>
      </div>

      <div class="reveal mt-10 flex items-center gap-6 text-xs uppercase tracking-[0.22em] text-ash-400">
        <span class="text-rust-bright">${GAME.releaseLabel}</span>
        <span class="h-3 w-px bg-ash-600"></span>
        <span>${GAME.releaseDate}</span>
        <span class="h-3 w-px bg-ash-600"></span>
        <span>PC · PS5 · XBOX</span>
      </div>
    </div>

    <div class="absolute bottom-6 right-6 hidden md:flex flex-col items-center gap-2 text-ash-600">
      <span class="text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">向下 · 进入雾中</span>
      <span class="h-10 w-px bg-gradient-to-b from-ash-600 to-transparent animate-pulse"></span>
    </div>
  </section>`;

const trailer = () => `
  <section id="trailer" class="relative bg-ash-950 py-24 md:py-32">
    <div class="mx-auto max-w-[1100px] px-5 md:px-8">
      <p class="reveal text-center text-[11px] uppercase tracking-ultra text-rust-bright mb-5">官方预告</p>
      <h2 class="reveal text-center font-display text-4xl md:text-6xl text-white tracking-tight mb-12">第三声钟</h2>
      <button id="trailer-frame" class="reveal group relative block w-full aspect-video overflow-hidden border hairline">
        <img src="${IMG.shots[3].src}" alt="预告片画面" class="h-full w-full object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700" />
        <span class="absolute inset-0 vignette"></span>
        <span class="absolute inset-0 grid place-items-center">
          <span class="grid h-20 w-20 place-items-center rounded-full border border-white/40 bg-ash-950/40 backdrop-blur-sm group-hover:bg-rust group-hover:border-rust transition-colors">
            <span class="block h-0 w-0 border-y-[11px] border-y-transparent border-l-[18px] border-l-white ml-1.5"></span>
          </span>
        </span>
        <span class="absolute bottom-5 left-5 text-left">
          <span class="block text-xs uppercase tracking-[0.25em] text-ash-400">官方公告预告片</span>
          <span class="block font-display text-xl text-white">ASHFALL — Reveal Trailer</span>
        </span>
        <span class="absolute bottom-5 right-5 text-xs uppercase tracking-[0.2em] text-ash-400">02:14</span>
      </button>
    </div>
  </section>`;

const story = () => `
  <section id="story" class="relative overflow-hidden bg-ash-900 py-24 md:py-36">
    <div class="absolute inset-y-0 right-0 w-full md:w-1/2 -z-0">
      <img src="${IMG.story}" alt="雾中孤树" class="h-full w-full object-cover opacity-30 md:opacity-50" />
      <div class="absolute inset-0 bg-gradient-to-r from-ash-900 via-ash-900/70 to-transparent"></div>
    </div>
    <div class="relative mx-auto max-w-[1400px] px-5 md:px-8 grid md:grid-cols-12 gap-10">
      <div class="md:col-span-7 lg:col-span-6">
        <p class="reveal text-[11px] uppercase tracking-ultra text-rust-bright mb-6">这座镇子，记得每一个人</p>
        <h2 class="reveal font-display text-4xl md:text-6xl text-white leading-[0.95] tracking-tight mb-10">
          没有人离开过<br/><span class="text-fog">Mara's Hollow</span>
        </h2>
        <div class="reveal space-y-6 max-w-[58ch] text-base md:text-lg leading-relaxed text-ash-400">
          ${STORY.map((p) => `<p>${p}</p>`).join("")}
        </div>
      </div>
    </div>
  </section>`;

const features = () => `
  <section id="features" class="relative bg-ash-950 py-24 md:py-32">
    <div class="mx-auto max-w-[1400px] px-5 md:px-8">
      <div class="reveal max-w-2xl mb-16">
        <h2 class="font-display text-4xl md:text-6xl text-white tracking-tight leading-[0.95]">恐惧不再是脚本</h2>
        <p class="mt-5 text-ash-400 leading-relaxed max-w-[55ch]">在 Hollow，恐惧是一套会观察你、学习你、再回敬你的系统。</p>
      </div>
      <div class="grid gap-px bg-ash-700/40 md:grid-cols-3 border-y hairline">
        ${FEATURES.map(
          (f) => `
          <article class="reveal group bg-ash-950 p-8 md:p-10 hover:bg-ash-900 transition-colors">
            <span class="block font-display text-rust-bright text-sm tracking-[0.3em] mb-8">${f.k}</span>
            <h3 class="font-display text-2xl md:text-3xl text-white mb-4 tracking-tight">${f.t}</h3>
            <p class="text-ash-400 leading-relaxed text-[15px]">${f.d}</p>
          </article>`
        ).join("")}
      </div>
    </div>
  </section>`;

const gallery = () => `
  <section id="gallery" class="relative bg-ash-900 py-24 md:py-32">
    <div class="mx-auto max-w-[1400px] px-5 md:px-8">
      <div class="reveal flex items-end justify-between mb-12 flex-wrap gap-4">
        <h2 class="font-display text-4xl md:text-6xl text-white tracking-tight">来自雾里的画面</h2>
        <span class="text-xs uppercase tracking-[0.25em] text-ash-400">实机截图 · 预览版本</span>
      </div>
      <div class="grid gap-4 md:gap-5 grid-cols-1 md:grid-cols-12 md:grid-rows-2 md:h-[78vh]">
        ${IMG.shots
          .map((s, i) => {
            const span = [
              "md:col-span-7 md:row-span-2",
              "md:col-span-5",
              "md:col-span-5",
              "md:col-span-7",
            ][i];
            return `
            <figure class="reveal group relative overflow-hidden border hairline ${span} min-h-[230px]">
              <img src="${s.src}" alt="${s.cap}" class="h-full w-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              <figcaption class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ash-950 to-transparent p-5 text-sm text-ash-100 text-white translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                ${s.cap}
              </figcaption>
            </figure>`;
          })
          .join("")}
      </div>
    </div>
  </section>`;

const cast = () => `
  <section id="cast" class="relative bg-ash-950 py-24 md:py-32">
    <div class="mx-auto max-w-[1400px] px-5 md:px-8">
      <div class="reveal max-w-2xl mb-16">
        <p class="text-[11px] uppercase tracking-ultra text-rust-bright mb-5">你不会是一个人 · 你也希望如此</p>
        <h2 class="font-display text-4xl md:text-6xl text-white tracking-tight">谁在雾里等你</h2>
      </div>
      <div class="grid gap-6 md:grid-cols-3">
        ${CHARACTERS.map(
          (c) => `
          <article class="reveal group relative overflow-hidden border hairline bg-ash-900">
            <div class="relative aspect-[3/4] overflow-hidden">
              <img src="${c.img}" alt="${c.name}" class="h-full w-full object-cover opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" />
              <div class="absolute inset-0 bg-gradient-to-t from-ash-950 via-ash-950/20 to-transparent"></div>
              <span class="absolute top-4 left-4 text-[10px] uppercase tracking-[0.3em] text-rust-bright">${c.tag}</span>
            </div>
            <div class="p-6">
              <h3 class="font-display text-2xl text-white tracking-tight">${c.name}</h3>
              <p class="mt-1 text-xs uppercase tracking-[0.2em] text-fog mb-4">${c.role}</p>
              <p class="text-[14px] leading-relaxed text-ash-400">${c.desc}</p>
            </div>
          </article>`
        ).join("")}
      </div>
    </div>
  </section>`;

const platforms = () => `
  <section id="platforms" class="relative bg-ash-900 py-24 md:py-32 border-t hairline">
    <div class="mx-auto max-w-[1400px] px-5 md:px-8">
      <div class="grid lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-5 reveal">
          <p class="text-[11px] uppercase tracking-ultra text-rust-bright mb-5">发售信息</p>
          <h2 class="font-display text-5xl md:text-7xl text-white leading-[0.9] tracking-tight">
            ${GAME.releaseLabel}
          </h2>
          <p class="mt-3 font-display text-2xl tracking-[0.25em] text-fog">${GAME.releaseDate}</p>
          <p class="mt-6 max-w-md text-ash-400 leading-relaxed">三大平台同步登场。把灯准备好——其余的，留给雾。</p>
        </div>
        <div class="lg:col-span-7 grid gap-px bg-ash-700/40 border hairline">
          ${PLATFORMS.map(
            (p) => `
            <div class="reveal flex items-center justify-between gap-4 bg-ash-900 px-6 md:px-8 py-7 hover:bg-ash-800 transition-colors">
              <div>
                <h3 class="font-display text-xl md:text-2xl text-white tracking-wide">${p.name}</h3>
                <p class="mt-1 text-sm text-ash-400">${p.note}</p>
              </div>
              ${
                p.primary
                  ? `<span class="shrink-0 bg-rust px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white">主推</span>`
                  : `<span class="shrink-0 text-[11px] uppercase tracking-[0.2em] text-ash-600">登场</span>`
              }
            </div>`
          ).join("")}
        </div>
      </div>
    </div>
  </section>`;

const newsletter = () => `
  <section id="wishlist" class="relative overflow-hidden bg-ash-950 py-28 md:py-40">
    <div class="absolute inset-0 -z-10 opacity-25">
      <img src="${IMG.shots[2].src}" alt="" class="h-full w-full object-cover" />
      <div class="absolute inset-0 bg-ash-950/80 vignette"></div>
    </div>
    <div class="relative mx-auto max-w-2xl px-5 md:px-8 text-center">
      <p class="reveal text-[11px] uppercase tracking-ultra text-rust-bright mb-6">在雾散之前</p>
      <h2 class="reveal font-display text-4xl md:text-6xl text-white tracking-tight leading-[0.95] mb-6">
        雾起的那天<br/>我们会先通知你
      </h2>
      <p class="reveal text-ash-400 leading-relaxed mb-9 max-w-lg mx-auto">
        留下邮箱，第一时间收到发售日、实机演示与封闭测试名额。我们不发垃圾邮件——我们只发坏消息。
      </p>
      <form id="subscribe" class="reveal flex flex-col sm:flex-row gap-3 max-w-md mx-auto" novalidate>
        <div class="flex-1 text-left">
          <label for="email" class="sr-only">邮箱地址</label>
          <input id="email" name="email" type="email" required placeholder="your@email.com"
            class="w-full bg-ash-900 border border-ash-700 px-4 py-3.5 text-white placeholder-ash-600 focus:border-rust focus:outline-none focus:ring-1 focus:ring-rust/50 transition-colors" />
          <p id="email-err" class="mt-2 hidden text-xs text-rust-bright"></p>
        </div>
        <button type="submit" class="shrink-0 bg-rust px-7 py-3.5 text-sm font-500 uppercase tracking-[0.2em] text-white hover:bg-rust-bright transition-colors active:scale-[0.98]">
          通知我
        </button>
      </form>
      <p id="subscribe-ok" class="reveal mt-5 hidden text-sm text-fog">已记下你的名字。雾会找到你。</p>
    </div>
  </section>`;

const footer = () => `
  <footer class="bg-ash-950 border-t hairline">
    <div class="mx-auto max-w-[1400px] px-5 md:px-8 py-12 grid gap-8 md:grid-cols-12 items-center">
      <div class="md:col-span-5">
        <a href="#top" class="font-display text-2xl tracking-[0.3em] text-white">ASHFALL</a>
        <p class="mt-3 text-sm text-ash-400 max-w-sm">${GAME.tagline}</p>
      </div>
      <nav class="md:col-span-4 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.2em] text-ash-400">
        <a href="#story" class="hover:text-white transition-colors">剧情</a>
        <a href="#gallery" class="hover:text-white transition-colors">画面</a>
        <a href="#cast" class="hover:text-white transition-colors">角色</a>
        <a href="#platforms" class="hover:text-white transition-colors">平台</a>
      </nav>
      <div class="md:col-span-3 flex md:justify-end gap-4 text-ash-400">
        <a href="#" aria-label="Steam" class="hover:text-white transition-colors text-xs uppercase tracking-[0.2em]">Steam</a>
        <a href="#" aria-label="YouTube" class="hover:text-white transition-colors text-xs uppercase tracking-[0.2em]">YouTube</a>
        <a href="#" aria-label="Discord" class="hover:text-white transition-colors text-xs uppercase tracking-[0.2em]">Discord</a>
      </div>
    </div>
    <div class="border-t hairline">
      <div class="mx-auto max-w-[1400px] px-5 md:px-8 py-6 flex flex-col sm:flex-row justify-between gap-3 text-[11px] uppercase tracking-[0.18em] text-ash-600">
        <span>© 2026 Hollow Interactive. 保留所有权利。</span>
        <span class="flex items-center gap-4">
          <a href="#/tools" class="hover:text-rust-bright transition-colors">开发者联调</a>
          <span>ESRB MATURE 17+ · 含恐怖与惊吓内容</span>
        </span>
      </div>
    </div>
  </footer>`;

export function renderSite() {
  return [
    nav(),
    `<main>`,
    hero(),
    trailer(),
    story(),
    features(),
    gallery(),
    cast(),
    platforms(),
    newsletter(),
    `</main>`,
    footer(),
  ].join("");
}

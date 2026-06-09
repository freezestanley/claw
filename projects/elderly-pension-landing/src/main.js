const app = document.querySelector("#app");

app.innerHTML = `
<!-- 顶部导航 -->
<header class="sticky top-0 z-30 border-b border-warmgold/30 bg-cream/85 backdrop-blur">
  <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
    <a href="#top" class="flex items-center gap-2">
      <span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/30">
        <i data-lucide="heart-handshake" class="h-5 w-5"></i>
      </span>
      <span class="text-xl font-bold tracking-wide text-warmbrown">安养保</span>
    </a>
    <div class="hidden items-center gap-8 text-base font-medium text-ink/80 md:flex">
      <a href="#highlights" class="hover:text-brand">产品亮点</a>
      <a href="#intro" class="hover:text-brand">保障内容</a>
      <a href="#life" class="hover:text-brand">乐活晚年</a>
      <a href="#faq" class="hover:text-brand">常见问题</a>
    </div>
    <a href="#cta" class="rounded-full bg-brand px-5 py-2.5 text-base font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-warmbrown">
      免费咨询
    </a>
  </nav>
</header>

<main id="top">
  <!-- Hero -->
  <section class="relative overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(244,184,96,0.45),_transparent_55%),linear-gradient(180deg,#FFF8EF_0%,#FBEEDC_100%)]"></div>
    <div class="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
      <div class="space-y-7">
        <span class="inline-flex w-fit items-center gap-2 rounded-full border border-brand/30 bg-white/70 px-4 py-2 text-sm font-medium text-brand">
          <i data-lucide="shield-check" class="h-4 w-4"></i> 养老保险计划
        </span>
        <h1 class="text-4xl font-extrabold leading-tight text-warmbrown sm:text-5xl lg:text-6xl">
          为父母的晚年<br /><span class="text-brand">多一份安心保障</span>
        </h1>
        <p class="max-w-xl text-lg leading-8 text-ink/75">
          安养保养老保险计划，用稳定的月度领取与贴心保障，
          让长辈无后顾之忧，安享有尊严、有活力的退休生活。
        </p>
        <div class="flex flex-wrap gap-4">
          <a href="#cta" class="rounded-full bg-brand px-7 py-3.5 text-lg font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-warmbrown">
            立即了解方案
          </a>
          <a href="#intro" class="rounded-full border border-warmbrown/30 bg-white/70 px-7 py-3.5 text-lg font-semibold text-warmbrown transition hover:border-brand hover:text-brand">
            查看保障内容
          </a>
        </div>
        <div class="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2 text-sm text-ink/60">
          <span class="flex items-center gap-2"><i data-lucide="check-circle-2" class="h-4 w-4 text-brand"></i> 保证领取</span>
          <span class="flex items-center gap-2"><i data-lucide="check-circle-2" class="h-4 w-4 text-brand"></i> 终身保障</span>
          <span class="flex items-center gap-2"><i data-lucide="check-circle-2" class="h-4 w-4 text-brand"></i> 灵活缴费</span>
        </div>
      </div>
      <!-- 视觉块（无图片，用暖色卡片 + 图标插画） -->
      <div class="relative flex items-center justify-center">
        <div class="w-full max-w-sm rounded-[2.5rem] border border-warmgold/40 bg-white/70 p-8 shadow-2xl shadow-warmgold/20 backdrop-blur">
          <div class="flex items-center justify-center rounded-3xl bg-gradient-to-br from-warmgold/40 to-brand/30 py-12">
            <i data-lucide="sunrise" class="h-24 w-24 text-brand"></i>
          </div>
          <div class="mt-6 space-y-4">
            <div class="rounded-2xl bg-creamalt px-5 py-4">
              <p class="text-sm text-ink/60">每月稳定领取</p>
              <p class="text-2xl font-bold text-warmbrown">¥ 3,800 <span class="text-base font-medium text-ink/60">起 / 月</span></p>
            </div>
            <div class="flex gap-3">
              <div class="flex-1 rounded-2xl bg-creamalt px-4 py-3 text-center">
                <p class="text-xl font-bold text-brand">60<span class="text-sm">岁</span></p>
                <p class="text-xs text-ink/60">起领年龄</p>
              </div>
              <div class="flex-1 rounded-2xl bg-creamalt px-4 py-3 text-center">
                <p class="text-xl font-bold text-brand">终身</p>
                <p class="text-xs text-ink/60">领取期限</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 产品亮点 -->
  <section id="highlights" class="mx-auto max-w-6xl px-6 py-20">
    <div class="mb-12 text-center">
      <h2 class="text-3xl font-bold text-warmbrown sm:text-4xl">为什么选择安养保</h2>
      <p class="mt-3 text-lg text-ink/70">四重保障，托起长辈安稳晚年</p>
    </div>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      ${highlightCard("piggy-bank", "稳定现金流", "约定年龄起，每月稳定领取养老金，安排晚年开销更从容。")}
      ${highlightCard("infinity", "终身领取", "保证领取且终身给付，活得越久领得越久，对抗长寿风险。")}
      ${highlightCard("wallet", "灵活缴费", "支持趸交、年交等多种方式，按家庭情况自由规划。")}
      ${highlightCard("hand-heart", "贴心服务", "专属顾问一对一，理赔与变更全程协助，省心省力。")}
    </div>
  </section>

  <!-- 产品介绍文案 -->
  <section id="intro" class="bg-creamalt/60 py-20">
    <div class="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
      <div class="space-y-6">
        <span class="text-sm font-semibold uppercase tracking-[0.3em] text-brand">产品介绍</span>
        <h2 class="text-3xl font-bold text-warmbrown sm:text-4xl">一份计划，照护长辈整段晚年</h2>
        <p class="text-lg leading-8 text-ink/75">
          安养保是一款专为养老规划设计的长期年金保险产品。
          在投保人约定的领取年龄之后，按月稳定给付养老金，
          帮助长辈把退休生活的"不确定"，变成看得见、领得到的"确定"。
        </p>
        <ul class="space-y-4">
          ${introItem("calendar-clock", "约定起领", "可选 55 / 60 / 65 岁起领，匹配不同退休安排。")}
          ${introItem("coins", "保证领取", "设有保证领取期，未领满部分由受益人继续领取。")}
          ${introItem("trending-up", "持续给付", "终身按月给付，搭配账户红利，抵御通胀压力。")}
          ${introItem("users", "适用人群", "适合 30–55 岁为自己或为父母提前规划养老的家庭。")}
        </ul>
      </div>
      <div class="rounded-[2rem] border border-warmgold/40 bg-white/80 p-8 shadow-xl shadow-warmgold/10">
        <h3 class="mb-6 text-xl font-bold text-warmbrown">领取方式一览</h3>
        <div class="space-y-5">
          ${planRow("起领年龄", "55 / 60 / 65 岁可选")}
          ${planRow("给付频率", "每月稳定给付")}
          ${planRow("保证领取期", "20 年保证领取")}
          ${planRow("领取期限", "终身领取")}
          ${planRow("身故保障", "返还剩余保证金额")}
        </div>
        <p class="mt-6 text-xs leading-6 text-ink/50">
          * 以上为产品形态示意，具体保障责任、领取金额与条款以保险合同及监管批准文件为准。
        </p>
      </div>
    </div>
  </section>

  <!-- 乐活晚年（生活方式，无图，图标 + 暖色块） -->
  <section id="life" class="mx-auto max-w-6xl px-6 py-20">
    <div class="mb-12 text-center">
      <h2 class="text-3xl font-bold text-warmbrown sm:text-4xl">老有所养，更要老有所乐</h2>
      <p class="mt-3 text-lg text-ink/70">有了稳定保障，晚年生活可以更有活力</p>
    </div>
    <div class="grid gap-6 md:grid-cols-3">
      ${lifeCard("activity", "晨练太极", "清晨公园里舒展筋骨，规律运动让身体更硬朗。")}
      ${lifeCard("bike", "结伴出行", "和老伙伴骑行、散步、旅行，把日子过得有滋有味。")}
      ${lifeCard("music", "兴趣相伴", "广场舞、合唱、书画，退休后也能尽情拥抱热爱。")}
    </div>
  </section>

  <!-- FAQ -->
  <section id="faq" class="bg-creamalt/60 py-20">
    <div class="mx-auto max-w-4xl px-6">
      <h2 class="mb-10 text-center text-3xl font-bold text-warmbrown sm:text-4xl">常见问题</h2>
      <div class="space-y-4">
        ${faqItem("什么年龄投保比较合适？", "越早规划越从容。30–55 岁人群投保，可以用更长的积累期换取更稳健的养老现金流。")}
        ${faqItem("可以为父母投保吗？", "可以。子女作为投保人为父母规划养老金是常见安排，具体以产品投保年龄规则为准。")}
        ${faqItem("如果中途有资金需求怎么办？", "产品提供保单贷款、减保等灵活选项，可在保障与流动性之间做平衡。")}
        ${faqItem("领取的养老金安全吗？", "养老金按合同约定给付，并设有保证领取期，相关责任以保险合同条款为准。")}
      </div>
    </div>
  </section>

  <!-- 底部 CTA -->
  <section id="cta" class="mx-auto max-w-6xl px-6 py-20">
    <div class="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand to-warmbrown px-8 py-14 text-center shadow-2xl shadow-brand/30 sm:px-16">
      <h2 class="text-3xl font-extrabold text-white sm:text-4xl">给长辈一份安心的承诺</h2>
      <p class="mx-auto mt-4 max-w-2xl text-lg text-white/90">
        留下联系方式，专属养老规划顾问将为您量身定制方案，全程免费、不打扰。
      </p>
      <div class="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
        <input type="tel" placeholder="请输入手机号码"
          class="flex-1 rounded-full border-0 px-5 py-3.5 text-base text-ink shadow-inner outline-none focus:ring-4 focus:ring-white/40" />
        <button type="button"
          class="rounded-full bg-white px-7 py-3.5 text-base font-bold text-brand shadow-lg transition hover:bg-cream">
          预约咨询
        </button>
      </div>
      <p class="mt-4 text-xs text-white/70">提交即表示同意被联系，我们将严格保护您的个人信息。</p>
    </div>
  </section>
</main>

<!-- 页脚 -->
<footer class="border-t border-warmgold/30 bg-cream">
  <div class="mx-auto max-w-6xl px-6 py-10">
    <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
      <div class="flex items-center gap-2">
        <span class="flex h-8 w-8 items-center justify-center rounded-xl bg-brand text-white">
          <i data-lucide="heart-handshake" class="h-4 w-4"></i>
        </span>
        <span class="font-bold text-warmbrown">安养保</span>
      </div>
      <p class="text-sm text-ink/60">乐享养老保险计划 · 让晚年更安心</p>
    </div>
    <p class="mt-6 text-center text-xs leading-6 text-ink/45">
      本页面为产品宣传示意，不构成投保要约或承诺。产品的保障责任、领取规则、费用及免责条款，
      均以保险合同及监管批准文件为准。投保前请仔细阅读条款与产品说明书。
    </p>
  </div>
</footer>
`;

// ---- 组件工厂函数 ----
function highlightCard(icon, title, desc) {
  return `
  <div class="group rounded-3xl border border-warmgold/30 bg-white/80 p-6 shadow-lg shadow-warmgold/10 transition hover:-translate-y-1 hover:shadow-xl">
    <span class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
      <i data-lucide="${icon}" class="h-6 w-6"></i>
    </span>
    <h3 class="text-lg font-bold text-warmbrown">${title}</h3>
    <p class="mt-2 text-sm leading-6 text-ink/70">${desc}</p>
  </div>`;
}

function introItem(icon, title, desc) {
  return `
  <li class="flex gap-4">
    <span class="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-warmgold/30 text-warmbrown">
      <i data-lucide="${icon}" class="h-5 w-5"></i>
    </span>
    <div>
      <p class="font-semibold text-warmbrown">${title}</p>
      <p class="text-sm leading-6 text-ink/70">${desc}</p>
    </div>
  </li>`;
}

function planRow(label, value) {
  return `
  <div class="flex items-center justify-between border-b border-warmgold/20 pb-3">
    <span class="text-ink/70">${label}</span>
    <span class="font-semibold text-warmbrown">${value}</span>
  </div>`;
}

function lifeCard(icon, title, desc) {
  return `
  <div class="rounded-3xl bg-gradient-to-br from-cream to-creamalt p-8 text-center shadow-lg shadow-warmgold/10">
    <span class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand/15 text-brand">
      <i data-lucide="${icon}" class="h-8 w-8"></i>
    </span>
    <h3 class="text-lg font-bold text-warmbrown">${title}</h3>
    <p class="mt-2 text-sm leading-6 text-ink/70">${desc}</p>
  </div>`;
}

function faqItem(q, a) {
  return `
  <details class="group rounded-2xl border border-warmgold/30 bg-white/80 px-6 py-4 shadow-sm">
    <summary class="flex cursor-pointer list-none items-center justify-between text-lg font-semibold text-warmbrown">
      ${q}
      <i data-lucide="chevron-down" class="h-5 w-5 text-brand transition group-open:rotate-180"></i>
    </summary>
    <p class="mt-3 text-base leading-7 text-ink/70">${a}</p>
  </details>`;
}

// 渲染图标
if (window.lucide?.createIcons) {
  window.lucide.createIcons();
}

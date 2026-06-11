// 科技公司官网首页 - 智核科技 Nexus AI（虚构示例）
// 板块: 导航 + Hero + 信任栏 + 产品/服务 + 核心特性 + 数据指标 + 团队 + CTA + 页脚
// 风格: 深色 + 渐变光晕 + 玻璃拟态卡片，indigo/cyan 科技感
// 适配: PC / Pad / H5（导航移动端汉堡菜单，栅格响应式）

// 用户提供的产品展示图（由 Vite 处理为带 hash 的静态资源 URL）
import productShowcase from "../assets/product-showcase.webp";

const COMPANY = { zh: "智核科技", en: "Nexus AI" };

const SHOWCASE_HIGHLIGHTS = [
  { icon: "layout-dashboard", title: "统一控制台", desc: "一处管理推理、检索与编排，全局可观测。" },
  { icon: "mouse-pointer-click", title: "开箱即用", desc: "可视化配置，无需从零搭建底层设施。" },
  { icon: "refresh-cw", title: "实时反馈", desc: "调用、性能与成本数据实时呈现。" }
];

const NAV = [
  { label: "产品", href: "#products" },
  { label: "展示", href: "#showcase" },
  { label: "特性", href: "#features" },
  { label: "数据", href: "#stats" },
  { label: "团队", href: "#team" },
  { label: "联系", href: "#cta" }
];

const TRUST = ["ByteFlow", "CloudArc", "DataNova", "QuantumX", "HyperGrid"];

const PRODUCTS = [
  {
    icon: "cpu",
    title: "模型推理引擎",
    desc: "高吞吐、低延迟的大模型推理服务，自动弹性扩缩容，支持私有化部署。",
    tag: "Inference"
  },
  {
    icon: "database",
    title: "向量数据平台",
    desc: "面向 RAG 与语义检索的向量数据库，毫秒级检索，亿级规模无忧。",
    tag: "Vector DB"
  },
  {
    icon: "workflow",
    title: "智能体编排",
    desc: "可视化编排多智能体工作流，内置工具调用、记忆与人工审批节点。",
    tag: "Agents"
  },
  {
    icon: "shield-check",
    title: "安全合规中台",
    desc: "数据脱敏、权限隔离与全链路审计，满足企业级安全与合规要求。",
    tag: "Security"
  }
];

const FEATURES = [
  { icon: "zap", title: "极致性能", desc: "自研推理加速内核，相同硬件下吞吐提升 3 倍。" },
  { icon: "expand", title: "弹性扩展", desc: "按负载秒级扩缩容，峰值无压力，闲时省成本。" },
  { icon: "lock", title: "安全可信", desc: "端到端加密与私有化选项，数据不出域。" },
  { icon: "plug", title: "开放生态", desc: "OpenAI 兼容 API，主流框架开箱即用。" },
  { icon: "gauge", title: "可观测性", desc: "全链路监控、调用追踪与成本分析一体化。" },
  { icon: "headphones", title: "专家支持", desc: "7×24 企业级 SLA 与方案架构师贴身服务。" }
];

const STATS = [
  { value: "99.99%", label: "服务可用性" },
  { value: "3×", label: "推理吞吐提升" },
  { value: "500+", label: "企业客户" },
  { value: "20ms", label: "平均检索延迟" }
];

const TEAM = [
  { name: "陈墨", role: "创始人 / CEO", bio: "前大厂 AI 平台负责人，十年分布式系统经验。", initial: "陈" },
  { name: "林晚", role: "联合创始人 / CTO", bio: "推理加速与编译优化专家，多篇顶会论文作者。", initial: "林" },
  { name: "苏野", role: "产品负责人", bio: "深耕企业服务，擅长把复杂能力做成简单产品。", initial: "苏" },
  { name: "周屿", role: "首席架构师", bio: "大规模高可用系统设计，主导多个千万级项目。", initial: "周" }
];

function navLinks(extraClass) {
  return NAV.map(
    (n) => `<a href="${n.href}" class="${extraClass}">${n.label}</a>`
  ).join("");
}

function productCard(p) {
  return `
    <div class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-indigo-400/40 hover:bg-white/[0.07]">
      <div class="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl transition group-hover:bg-indigo-500/20"></div>
      <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white">
        <i data-lucide="${p.icon}" class="h-5 w-5"></i>
      </span>
      <p class="mt-4 text-xs font-medium uppercase tracking-wider text-cyan-300">${p.tag}</p>
      <h3 class="mt-1 text-lg font-semibold text-white">${p.title}</h3>
      <p class="mt-2 text-sm leading-6 text-slate-400">${p.desc}</p>
    </div>`;
}

function featureCard(f) {
  return `
    <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
      <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-300">
        <i data-lucide="${f.icon}" class="h-5 w-5"></i>
      </span>
      <h3 class="mt-4 text-base font-semibold text-white">${f.title}</h3>
      <p class="mt-2 text-sm leading-6 text-slate-400">${f.desc}</p>
    </div>`;
}

function statCard(s) {
  return `
    <div class="text-center">
      <p class="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">${s.value}</p>
      <p class="mt-1 text-sm text-slate-400">${s.label}</p>
    </div>`;
}

function teamCard(m) {
  return `
    <div class="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
      <span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-xl font-semibold text-white">${m.initial}</span>
      <h3 class="mt-4 text-base font-semibold text-white">${m.name}</h3>
      <p class="text-sm text-cyan-300">${m.role}</p>
      <p class="mt-2 text-sm leading-6 text-slate-400">${m.bio}</p>
    </div>`;
}

export function mountPage({ container, runtime }) {
  container.innerHTML = `
  <div class="relative overflow-hidden">
    <!-- 背景光晕 -->
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div class="absolute left-1/2 top-0 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]"></div>
      <div class="absolute right-0 top-1/3 h-[360px] w-[360px] rounded-full bg-cyan-500/10 blur-[120px]"></div>
    </div>

    <!-- 导航 -->
    <header class="sticky top-0 z-50 border-b border-white/5 bg-slate-950/70 backdrop-blur">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" class="flex items-center gap-2">
          <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 text-white"><i data-lucide="hexagon" class="h-5 w-5"></i></span>
          <span class="text-lg font-semibold text-white">${COMPANY.zh}<span class="ml-1 text-sm font-normal text-slate-400">${COMPANY.en}</span></span>
        </a>
        <nav class="hidden items-center gap-8 md:flex">
          ${navLinks("text-sm text-slate-300 transition hover:text-white")}
        </nav>
        <div class="hidden items-center gap-3 md:flex">
          <a href="#cta" class="text-sm text-slate-300 hover:text-white">登录</a>
          <a href="#cta" class="rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90">免费试用</a>
        </div>
        <button id="menu-btn" class="rounded-lg p-2 text-slate-300 hover:bg-white/10 md:hidden"><i data-lucide="menu" class="h-5 w-5"></i></button>
      </div>
      <!-- 移动端菜单 -->
      <div id="mobile-menu" class="hidden border-t border-white/5 bg-slate-950/95 px-4 py-4 md:hidden">
        <nav class="flex flex-col gap-1">
          ${navLinks("rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white")}
          <a href="#cta" class="mt-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 px-3 py-2 text-center text-sm font-medium text-white">免费试用</a>
        </nav>
      </div>
    </header>

    <!-- Hero -->
    <section class="mx-auto max-w-7xl px-4 pt-16 pb-20 text-center sm:px-6 sm:pt-24 lg:px-8">
      <span class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-300">
        <i data-lucide="sparkles" class="h-3.5 w-3.5 text-cyan-300"></i>新一代企业级 AI 基础设施
      </span>
      <h1 class="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
        让企业级 AI<br class="hidden sm:block" /> <span class="bg-gradient-to-r from-indigo-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">更快、更稳、更安全</span>
      </h1>
      <p class="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
        ${COMPANY.zh}为企业提供高性能推理、向量检索与智能体编排能力，从原型到规模化生产一站直达。
      </p>
      <div class="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a href="#cta" class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 sm:w-auto">
          免费开始 <i data-lucide="arrow-right" class="h-4 w-4"></i>
        </a>
        <a href="#products" class="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10 sm:w-auto">
          <i data-lucide="play" class="h-4 w-4"></i> 查看产品
        </a>
      </div>
    </section>

    <!-- 信任栏 -->
    <section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <p class="text-center text-xs uppercase tracking-widest text-slate-500">已为众多创新企业提供服务</p>
      <div class="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
        ${TRUST.map((t) => `<span class="text-lg font-semibold tracking-wide text-slate-400">${t}</span>`).join("")}
      </div>
    </section>

    <!-- 产品 / 服务 -->
    <section id="products" class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold text-white sm:text-4xl">一体化 AI 产品矩阵</h2>
        <p class="mt-4 text-slate-400">覆盖推理、检索、编排与安全，构建你的 AI 应用底座。</p>
      </div>
      <div class="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        ${PRODUCTS.map(productCard).join("")}
      </div>
    </section>

    <!-- 产品展示图片区域 -->
    <section id="showcase" class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div class="order-2 lg:order-1">
          <span class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-cyan-300">
            <i data-lucide="image" class="h-3.5 w-3.5"></i>产品一览
          </span>
          <h2 class="mt-5 text-3xl font-bold text-white sm:text-4xl">直观的产品体验</h2>
          <p class="mt-4 text-slate-400">从控制台到调用链路，复杂能力被收敛成清晰、易用的界面。下面是产品界面预览：</p>
          <ul class="mt-6 space-y-4">
            ${SHOWCASE_HIGHLIGHTS.map(
              (h) => `
              <li class="flex items-start gap-3">
                <span class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-300"><i data-lucide="${h.icon}" class="h-4 w-4"></i></span>
                <div>
                  <p class="text-sm font-medium text-white">${h.title}</p>
                  <p class="text-sm text-slate-400">${h.desc}</p>
                </div>
              </li>`
            ).join("")}
          </ul>
          <a href="#cta" class="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 text-sm font-medium text-white transition hover:opacity-90">
            立即体验 <i data-lucide="arrow-right" class="h-4 w-4"></i>
          </a>
        </div>
        <div class="order-1 lg:order-2">
          <div class="group relative">
            <div class="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-r from-indigo-500/30 to-cyan-500/30 opacity-60 blur-2xl transition group-hover:opacity-80"></div>
            <div class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl shadow-indigo-950/40">
              <img
                src="${productShowcase}"
                alt="${COMPANY.zh}产品界面展示"
                width="1200"
                height="800"
                loading="lazy"
                class="w-full rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心特性 -->
    <section id="features" class="border-y border-white/5 bg-white/[0.02]">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-bold text-white sm:text-4xl">为什么选择 ${COMPANY.zh}</h2>
          <p class="mt-4 text-slate-400">把复杂的基础设施收敛成简单、可靠的能力。</p>
        </div>
        <div class="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          ${FEATURES.map(featureCard).join("")}
        </div>
      </div>
    </section>

    <!-- 数据指标 -->
    <section id="stats" class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-cyan-500/5 p-10 lg:grid-cols-4">
        ${STATS.map(statCard).join("")}
      </div>
    </section>

    <!-- 团队 -->
    <section id="team" class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold text-white sm:text-4xl">核心团队</h2>
        <p class="mt-4 text-slate-400">来自顶尖科技公司的工程与产品专家。</p>
      </div>
      <div class="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        ${TEAM.map(teamCard).join("")}
      </div>
    </section>

    <!-- CTA -->
    <section id="cta" class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div class="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-600/20 to-cyan-600/20 px-6 py-16 text-center sm:px-12">
        <div class="pointer-events-none absolute left-1/2 top-0 h-40 w-96 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl"></div>
        <h2 class="text-3xl font-bold text-white sm:text-4xl">准备好开启你的 AI 之旅了吗？</h2>
        <p class="mx-auto mt-4 max-w-xl text-slate-300">注册即可获得免费额度，几分钟即可上线第一个 AI 应用。</p>
        <form id="cta-form" class="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <input type="email" required placeholder="输入你的工作邮箱" class="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none" />
          <button type="submit" class="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 text-sm font-medium text-white transition hover:opacity-90">免费试用</button>
        </form>
        <p id="cta-msg" class="mt-3 hidden text-sm text-cyan-300"></p>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="border-t border-white/5">
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div class="col-span-2 sm:col-span-1">
            <div class="flex items-center gap-2">
              <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 text-white"><i data-lucide="hexagon" class="h-5 w-5"></i></span>
              <span class="font-semibold text-white">${COMPANY.zh}</span>
            </div>
            <p class="mt-3 text-sm text-slate-400">企业级 AI 基础设施提供商。</p>
          </div>
          <div>
            <p class="text-sm font-semibold text-white">产品</p>
            <ul class="mt-3 space-y-2 text-sm text-slate-400">
              <li><a href="#products" class="hover:text-white">推理引擎</a></li>
              <li><a href="#products" class="hover:text-white">向量数据库</a></li>
              <li><a href="#products" class="hover:text-white">智能体编排</a></li>
            </ul>
          </div>
          <div>
            <p class="text-sm font-semibold text-white">公司</p>
            <ul class="mt-3 space-y-2 text-sm text-slate-400">
              <li><a href="#team" class="hover:text-white">关于我们</a></li>
              <li><a href="#cta" class="hover:text-white">联系我们</a></li>
              <li><a href="#" class="hover:text-white">加入我们</a></li>
            </ul>
          </div>
          <div>
            <p class="text-sm font-semibold text-white">关注</p>
            <div class="mt-3 flex gap-3 text-slate-400">
              <a href="#" class="hover:text-white"><i data-lucide="github" class="h-5 w-5"></i></a>
              <a href="#" class="hover:text-white"><i data-lucide="twitter" class="h-5 w-5"></i></a>
              <a href="#" class="hover:text-white"><i data-lucide="linkedin" class="h-5 w-5"></i></a>
            </div>
          </div>
        </div>
        <div class="mt-10 border-t border-white/5 pt-6 text-center text-xs text-slate-500">
          © 2026 ${COMPANY.zh} ${COMPANY.en} · 本页为 WebGen 生成的演示站点（虚构公司）· 适配 PC / Pad / H5
        </div>
      </div>
    </footer>
  </div>`;

  runtime.refreshIcons();

  // 移动端菜单
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  menuBtn.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
  mobileMenu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => mobileMenu.classList.add("hidden"))
  );

  // CTA 表单（演示）
  const form = document.getElementById("cta-form");
  const msg = document.getElementById("cta-msg");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.textContent = "提交成功！我们会尽快与你联系（演示占位，可接入真实接口）。";
    msg.classList.remove("hidden");
    form.reset();
  });
}

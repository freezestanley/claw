import { apiGet } from "./lib/api";

const app = document.querySelector("#app");

app.innerHTML = `
  <main class="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_32%),linear-gradient(180deg,#020617_0%,#0f172a_100%)]">
    <section class="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center gap-10 px-6 py-20">
      <div class="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
        <i data-lucide="sparkles" class="h-4 w-4"></i>
        <span>WebGen 默认单页面模板</span>
      </div>
      <div class="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
        <div class="space-y-6">
          <p class="text-sm uppercase tracking-[0.32em] text-cyan-300">OpenClaw · Vite · Single Page</p>
          <h1 class="max-w-3xl text-5xl font-semibold leading-tight text-white sm:text-6xl">
            使用单页面模板、CDN 资源和远端 API 代理快速启动项目。
          </h1>
          <p class="max-w-2xl text-lg leading-8 text-slate-300">
            这个模板默认集成 Tailwind CSS、Axios、Lucide 和 Web Awesome，并预留 `/api`
            代理能力，便于在实现前先完成素材和接口确认。
          </p>
          <div class="flex flex-wrap gap-4">
            <wa-button variant="brand">开始实现</wa-button>
            <wa-button appearance="outlined">查看 Readiness Gate</wa-button>
          </div>
        </div>
        <aside class="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-900/10 backdrop-blur">
          <div class="mb-4 flex items-center gap-3">
            <div class="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
              <i data-lucide="component" class="h-5 w-5"></i>
            </div>
            <div>
              <p class="font-medium text-white">默认约束</p>
              <p class="text-sm text-slate-400">单页面 · CDN 优先 · 组件复用优先</p>
            </div>
          </div>
          <ul class="space-y-3 text-sm text-slate-300">
            <li>1. 先完成 Discovery、Assets、API、Preview 准备</li>
            <li>2. 简单请求优先使用全局 Axios</li>
            <li>3. UI 组件优先复用 Web Awesome</li>
            <li>4. 开发期接口默认走本地 `/api` 代理</li>
          </ul>
          <div id="health" class="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
            正在检查 `/api/health` 示例请求能力…
          </div>
        </aside>
      </div>
    </section>
  </main>
`;

if (window.lucide?.createIcons) {
  window.lucide.createIcons();
}

const healthNode = document.querySelector("#health");

apiGet("/api/health")
  .then(() => {
    healthNode.textContent = "本地代理示例可用：`/api/health` 已返回成功。";
  })
  .catch(() => {
    healthNode.textContent =
      "尚未配置可用的 `/api/health` 远端目标。这是预期状态，可在 `.env` 中配置代理目标后重试。";
  });

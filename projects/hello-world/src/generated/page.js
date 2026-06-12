export function mountPage({ container, runtime }) {
  container.innerHTML = `
    <section class="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
        <i data-lucide="sparkles" class="h-4 w-4"></i>
        <span>WebGen 测试页</span>
      </div>

      <h1 class="text-5xl font-semibold leading-tight text-white sm:text-6xl md:text-7xl">
        你好世界
      </h1>

      <p class="max-w-md text-base leading-7 text-slate-300 sm:text-lg">
        Hello World · 这是一个用于验证预览链路的最小测试页面。
      </p>
    </section>
  `;

  runtime.refreshIcons();
}

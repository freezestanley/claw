// Agent 后管系统 — 登录页（演示态，无真实后端）
// 设计档位：DESIGN_VARIANCE 4 / MOTION_INTENSITY 3 / VISUAL_DENSITY 4
// 风格：Linear-clean 克制，中性深色基底 + 单一 Electric Blue 强调色。

const DEMO_ACCOUNT = "admin";
const DEMO_PASSWORD = "admin123";

function template() {
  return `
  <main class="relative min-h-[100dvh] w-full overflow-hidden bg-ink-950">
    <!-- 背景：网格 + 蓝调光斑（非紫） -->
    <div class="pointer-events-none absolute inset-0 bg-grid"></div>
    <div class="pointer-events-none absolute inset-0 glow"></div>

    <div class="relative z-10 grid min-h-[100dvh] grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">

      <!-- 左：品牌 / 叙事区（PC 显示；Pad/H5 收敛为顶部精简） -->
      <section class="relative hidden flex-col justify-between p-10 lg:flex xl:p-14">
        <div class="flex items-center gap-3">
          ${brandMark()}
          <div>
            <p class="text-sm font-semibold tracking-tight text-white">Agent 后管系统</p>
            <p class="text-xs text-slate-400">Agent Admin Console</p>
          </div>
        </div>

        <div class="max-w-md space-y-6" data-anim="hero">
          <h1 class="text-3xl font-semibold leading-tight tracking-tight text-white xl:text-4xl">
            统一管理你的 Agent、任务与运行时
          </h1>
          <p class="text-[15px] leading-7 text-slate-400">
            为技术与运维管理者打造的后台控制台。集中编排会话、监控任务执行、审计运行状态，一处登录，全局掌控。
          </p>
          <ul class="space-y-3 text-sm text-slate-300">
            ${featureRow("activity", "实时任务与运行时状态监控")}
            ${featureRow("shield-check", "细粒度权限与操作审计")}
            ${featureRow("workflow", "可视化编排 Agent 工作流")}
          </ul>
        </div>

        <div class="flex items-center gap-2 text-xs text-slate-500">
          <span class="inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
          所有系统运行正常
        </div>
      </section>

      <!-- 右：登录卡 -->
      <section class="flex items-center justify-center px-4 py-10 sm:px-8">
        <div class="w-full max-w-[420px]" data-anim="card">
          <!-- 顶部精简品牌（仅 Pad/H5 显示） -->
          <div class="mb-8 flex items-center gap-3 lg:hidden">
            ${brandMark()}
            <div>
              <p class="text-sm font-semibold tracking-tight text-white">Agent 后管系统</p>
              <p class="text-xs text-slate-400">Agent Admin Console</p>
            </div>
          </div>

          <div class="rounded-xl border border-white/10 bg-ink-900/70 p-6 shadow-2xl shadow-black/40 backdrop-blur sm:p-8">
            <header class="mb-6 space-y-1.5">
              <h2 class="text-xl font-semibold tracking-tight text-white">登录到控制台</h2>
              <p class="text-sm text-slate-400">输入账号密码以继续</p>
            </header>

            <!-- 全局提示条 -->
            <div id="alert" class="mb-4 hidden items-start gap-2 rounded-lg border px-3.5 py-2.5 text-sm" role="alert" aria-live="polite">
              <i data-lucide="info" class="mt-0.5 h-4 w-4 shrink-0"></i>
              <span id="alert-text"></span>
            </div>

            <form id="login-form" novalidate class="space-y-4">
              <!-- 账号 -->
              <div class="space-y-1.5">
                <label for="account" class="block text-sm font-medium text-slate-300">账号</label>
                <div class="relative">
                  <i data-lucide="user" class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"></i>
                  <input
                    id="account" name="account" type="text" autocomplete="username"
                    placeholder="用户名或邮箱"
                    class="h-11 w-full rounded-[10px] border border-white/10 bg-ink-800/80 pl-10 pr-3 text-[15px] text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
                    aria-describedby="account-err"
                  />
                </div>
                <p id="account-err" class="hidden text-xs text-rose-400"></p>
              </div>

              <!-- 密码 -->
              <div class="space-y-1.5">
                <div class="flex items-center justify-between">
                  <label for="password" class="block text-sm font-medium text-slate-300">密码</label>
                  <a href="#" id="forgot" class="text-xs font-medium text-brand-400 transition hover:text-brand-300">忘记密码？</a>
                </div>
                <div class="relative">
                  <i data-lucide="lock" class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"></i>
                  <input
                    id="password" name="password" type="password" autocomplete="current-password"
                    placeholder="请输入密码"
                    class="h-11 w-full rounded-[10px] border border-white/10 bg-ink-800/80 pl-10 pr-11 text-[15px] text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
                    aria-describedby="password-err"
                  />
                  <button type="button" id="toggle-pwd" aria-label="显示密码"
                    class="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md text-slate-500 transition hover:bg-white/5 hover:text-slate-300">
                    <i data-lucide="eye" class="h-4 w-4"></i>
                  </button>
                </div>
                <p id="password-err" class="hidden text-xs text-rose-400"></p>
              </div>

              <!-- 记住我 -->
              <div class="flex items-center justify-between pt-0.5">
                <label class="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-300">
                  <input id="remember" type="checkbox" class="h-4 w-4 rounded border-white/20 bg-ink-800 text-brand-500 focus:ring-2 focus:ring-brand-500/40" />
                  记住我
                </label>
                <span class="text-xs text-slate-500">演示账号 admin / admin123</span>
              </div>

              <!-- 主按钮 -->
              <button type="submit" id="submit-btn"
                class="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-brand-600 text-[15px] font-medium text-white shadow-lg shadow-brand-900/40 transition hover:bg-brand-500 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-brand-500/50 disabled:cursor-not-allowed disabled:opacity-70">
                <span id="submit-label">登录</span>
                <i data-lucide="arrow-right" id="submit-arrow" class="h-4 w-4 transition group-hover:translate-x-0.5"></i>
                <span id="submit-spin" class="hidden h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"></span>
              </button>
            </form>

            <!-- 分隔 + SSO 占位 -->
            <div class="my-5 flex items-center gap-3 text-xs text-slate-500">
              <span class="h-px flex-1 bg-white/10"></span>
              <span>或</span>
              <span class="h-px flex-1 bg-white/10"></span>
            </div>

            <button type="button" id="sso-btn"
              class="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] border border-white/10 bg-white/5 text-sm font-medium text-slate-200 transition hover:bg-white/10 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-white/20">
              <i data-lucide="building-2" class="h-4 w-4 text-slate-400"></i>
              企业 SSO 登录
            </button>
          </div>

          <footer class="mt-6 flex flex-col items-center gap-1 text-center text-xs text-slate-500">
            <p>© 2026 Agent 后管系统 · 内部系统</p>
            <p class="text-slate-600">v1.0.0 · 演示环境</p>
          </footer>
        </div>
      </section>
    </div>
  </main>
  `;
}

function brandMark() {
  return `
    <span class="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-900/40">
      <i data-lucide="hexagon" class="h-5 w-5 text-white"></i>
    </span>`;
}

function featureRow(icon, text) {
  return `
    <li class="flex items-center gap-3">
      <span class="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-brand-400">
        <i data-lucide="${icon}" class="h-4 w-4"></i>
      </span>
      <span>${text}</span>
    </li>`;
}

function refreshIcons() {
  if (window.lucide?.createIcons) window.lucide.createIcons();
}

export function mountLoginPage({ container }) {
  container.innerHTML = template();
  refreshIcons();

  const form = container.querySelector("#login-form");
  const accountEl = container.querySelector("#account");
  const passwordEl = container.querySelector("#password");
  const accountErr = container.querySelector("#account-err");
  const passwordErr = container.querySelector("#password-err");
  const submitBtn = container.querySelector("#submit-btn");
  const submitLabel = container.querySelector("#submit-label");
  const submitArrow = container.querySelector("#submit-arrow");
  const submitSpin = container.querySelector("#submit-spin");
  const togglePwd = container.querySelector("#toggle-pwd");
  const alertBox = container.querySelector("#alert");
  const alertText = container.querySelector("#alert-text");

  let loading = false;

  // 密码显示/隐藏
  togglePwd.addEventListener("click", () => {
    const show = passwordEl.type === "password";
    passwordEl.type = show ? "text" : "password";
    togglePwd.setAttribute("aria-label", show ? "隐藏密码" : "显示密码");
    togglePwd.innerHTML = `<i data-lucide="${show ? "eye-off" : "eye"}" class="h-4 w-4"></i>`;
    refreshIcons();
    passwordEl.focus();
  });

  function setFieldError(el, errEl, msg) {
    if (msg) {
      errEl.textContent = msg;
      errEl.classList.remove("hidden");
      el.classList.add("border-rose-500/70", "focus:border-rose-500", "focus:ring-rose-500/30");
      el.classList.remove("border-white/10");
    } else {
      errEl.textContent = "";
      errEl.classList.add("hidden");
      el.classList.remove("border-rose-500/70", "focus:border-rose-500", "focus:ring-rose-500/30");
      el.classList.add("border-white/10");
    }
  }

  function showAlert(msg, tone) {
    alertText.textContent = msg;
    alertBox.className =
      "mb-4 flex items-start gap-2 rounded-lg border px-3.5 py-2.5 text-sm " +
      (tone === "success"
        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
        : tone === "info"
        ? "border-brand-500/30 bg-brand-500/10 text-brand-300"
        : "border-rose-500/30 bg-rose-500/10 text-rose-300");
    const iconName = tone === "success" ? "check-circle-2" : tone === "info" ? "info" : "alert-circle";
    alertBox.querySelector("i")?.setAttribute("data-lucide", iconName);
    refreshIcons();
  }

  function hideAlert() {
    alertBox.className = "mb-4 hidden items-start gap-2 rounded-lg border px-3.5 py-2.5 text-sm";
  }

  function validate() {
    let ok = true;
    const account = accountEl.value.trim();
    const password = passwordEl.value;

    if (!account) {
      setFieldError(accountEl, accountErr, "请输入账号");
      ok = false;
    } else if (account.length < 3) {
      setFieldError(accountEl, accountErr, "账号至少 3 个字符");
      ok = false;
    } else {
      setFieldError(accountEl, accountErr, "");
    }

    if (!password) {
      setFieldError(passwordEl, passwordErr, "请输入密码");
      ok = false;
    } else if (password.length < 6) {
      setFieldError(passwordEl, passwordErr, "密码至少 6 位");
      ok = false;
    } else {
      setFieldError(passwordEl, passwordErr, "");
    }
    return ok;
  }

  // 失焦校验
  accountEl.addEventListener("blur", () => {
    if (accountEl.value.trim()) validate();
  });
  passwordEl.addEventListener("blur", () => {
    if (passwordEl.value) validate();
  });
  [accountEl, passwordEl].forEach((el) =>
    el.addEventListener("input", () => {
      if (el === accountEl) setFieldError(accountEl, accountErr, "");
      else setFieldError(passwordEl, passwordErr, "");
      hideAlert();
    })
  );

  function setLoading(state) {
    loading = state;
    submitBtn.disabled = state;
    submitLabel.textContent = state ? "登录中…" : "登录";
    submitArrow.classList.toggle("hidden", state);
    submitSpin.classList.toggle("hidden", !state);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (loading) return;
    hideAlert();
    if (!validate()) return;

    setLoading(true);
    // 模拟网络请求
    setTimeout(() => {
      const account = accountEl.value.trim();
      const password = passwordEl.value;
      const success = account === DEMO_ACCOUNT && password === DEMO_PASSWORD;
      setLoading(false);

      if (success) {
        showAlert("登录成功，正在进入控制台…（演示）", "success");
        submitBtn.disabled = true;
        submitLabel.textContent = "已登录";
      } else {
        showAlert("账号或密码错误，请重试。", "error");
        setFieldError(passwordEl, passwordErr, "");
        passwordEl.focus();
        passwordEl.select?.();
      }
    }, 1200);
  });

  // 忘记密码（演示）
  container.querySelector("#forgot").addEventListener("click", (e) => {
    e.preventDefault();
    showAlert("演示环境：密码重置链接将发送至账号绑定邮箱。", "info");
  });

  // SSO 占位
  container.querySelector("#sso-btn").addEventListener("click", () => {
    showAlert("企业 SSO 暂未接入（演示占位）。", "info");
  });

  // 轻量入场动效（尊重 reduced-motion）
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && window.anime) {
    const animate = window.anime.animate || window.anime;
    const card = container.querySelector('[data-anim="card"]');
    const hero = container.querySelector('[data-anim="hero"]');
    if (card) animate(card, { opacity: [0, 1], translateY: [16, 0], duration: 600, easing: "easeOutCubic" });
    if (hero) animate(hero, { opacity: [0, 1], translateY: [12, 0], duration: 700, delay: 80, easing: "easeOutCubic" });
  }
}

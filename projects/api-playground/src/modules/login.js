import { request, LS, escapeHtml } from "../lib/http.js";
import { renderResult, showPending } from "../ui/respPanel.js";

export function initLogin(store) {
  const userEl = document.getElementById("loginUser");
  const passEl = document.getElementById("loginPass");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const respEl = document.getElementById("loginResp");
  const tokenInfo = document.getElementById("tokenInfo");

  renderTokenInfo();

  loginBtn.addEventListener("click", doLogin);
  passEl.addEventListener("keydown", (e) => { if (e.key === "Enter") doLogin(); });
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem(LS.token);
    localStorage.removeItem(LS.expireAt);
    localStorage.removeItem(LS.user);
    renderTokenInfo();
    store.refreshGlobal();
  });

  async function doLogin() {
    const username = userEl.value.trim();
    const password = passEl.value;
    loginBtn.disabled = true;
    showPending(respEl);
    // application/json + Authorization 头会触发 OPTIONS 预检；未登录时带 placeholder。
    const result = await request("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      authPlaceholder: true,
    });
    loginBtn.disabled = false;

    let extra = "";
    if (result.ok && result.data && result.data.success && result.data.token) {
      localStorage.setItem(LS.token, result.data.token);
      if (result.data.expireAt) localStorage.setItem(LS.expireAt, result.data.expireAt);
      if (result.data.user) localStorage.setItem(LS.user, JSON.stringify(result.data.user));
      extra = `<span class="rounded bg-emerald-900/50 px-2 py-0.5 text-emerald-300">登录成功，token 已存 localStorage</span>`;
    } else if (!result.networkError) {
      const msg = (result.data && (result.data.message || result.data.error)) || "登录失败";
      extra = `<span class="rounded bg-amber-900/40 px-2 py-0.5 text-amber-300">${escapeHtml(msg)}</span>`;
    }
    renderResult(respEl, result, { extraHeader: extra });
    renderTokenInfo();
    store.refreshGlobal();
  }

  function renderTokenInfo() {
    const token = localStorage.getItem(LS.token);
    if (!token) {
      tokenInfo.classList.add("hidden");
      tokenInfo.innerHTML = "";
      return;
    }
    const expireAt = localStorage.getItem(LS.expireAt);
    let user = null;
    try { user = JSON.parse(localStorage.getItem(LS.user) || "null"); } catch {}
    const exp = expireAt ? new Date(expireAt) : null;
    const expValid = exp && !isNaN(exp.getTime());
    const expired = expValid && exp.getTime() < Date.now();
    const shortTok = token.length > 40 ? token.slice(0, 24) + "…" + token.slice(-8) : token;

    tokenInfo.innerHTML = `
      <div class="mb-1 flex items-center gap-2">
        <span class="rounded bg-emerald-900/50 px-2 py-0.5 text-emerald-300">已登录</span>
        ${expired ? '<span class="rounded bg-rose-900/50 px-2 py-0.5 text-rose-300">token 已过期</span>' : ""}
      </div>
      ${user ? `<div class="grid grid-cols-2 gap-x-3 gap-y-1 text-slate-300">
        <div><span class="text-slate-500">id</span> ${escapeHtml(user.id)}</div>
        <div><span class="text-slate-500">role</span> ${escapeHtml(user.role)}</div>
        <div><span class="text-slate-500">name</span> ${escapeHtml(user.name)}</div>
        <div><span class="text-slate-500">dept</span> ${escapeHtml(user.department)}</div>
        <div class="col-span-2"><span class="text-slate-500">email</span> ${escapeHtml(user.email)}</div>
      </div>` : ""}
      <div class="mt-1.5 break-all text-[11px] text-slate-500">token: <span class="text-amber-200">${escapeHtml(shortTok)}</span></div>
      ${expValid ? `<div class="text-[11px] text-slate-500">过期时间: <span class="${expired ? "text-rose-300" : "text-sky-300"}">${escapeHtml(exp.toLocaleString())}</span></div>` : ""}
    `;
    tokenInfo.classList.remove("hidden");
  }
}

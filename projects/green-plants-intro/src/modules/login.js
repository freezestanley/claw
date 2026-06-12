// 登录模块：POST /auth/login
import { request, LS, clearAuth, getUser, getExpireAt, escapeHtml } from "../lib/http.js";
import { store } from "../lib/store.js";

export function initLogin() {
  const userEl = document.getElementById("loginUser");
  const passEl = document.getElementById("loginPass");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const msgEl = document.getElementById("loginMsg");
  const formWrap = document.getElementById("loginFormWrap");
  const stateWrap = document.getElementById("loginStateWrap");
  const stateInfo = document.getElementById("loginStateInfo");

  loginBtn.addEventListener("click", doLogin);
  passEl.addEventListener("keydown", (e) => { if (e.key === "Enter") doLogin(); });
  userEl.addEventListener("keydown", (e) => { if (e.key === "Enter") passEl.focus(); });
  logoutBtn.addEventListener("click", () => {
    clearAuth();
    setMsg("", "");
    store.refreshGlobal();
    render();
  });

  function setMsg(text, type) {
    if (!text) {
      msgEl.className = "login-msg hidden";
      msgEl.textContent = "";
      return;
    }
    msgEl.textContent = text;
    msgEl.className = "login-msg login-msg--" + type;
  }

  async function doLogin() {
    const username = userEl.value.trim();
    const password = passEl.value;
    if (!username || !password) {
      setMsg("用户名和密码均为必填项。", "warn");
      return;
    }
    loginBtn.disabled = true;
    loginBtn.dataset.loading = "1";
    setMsg("登录中…", "info");

    const result = await request("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    loginBtn.disabled = false;
    delete loginBtn.dataset.loading;

    if (result.networkError) {
      setMsg(result.message || "网络异常，请稍后重试。", "error");
      return;
    }
    if (result.ok && result.data && result.data.success && result.data.token) {
      localStorage.setItem(LS.token, result.data.token);
      if (result.data.expireAt) localStorage.setItem(LS.expireAt, result.data.expireAt);
      if (result.data.user) localStorage.setItem(LS.user, JSON.stringify(result.data.user));
      passEl.value = "";
      setMsg("", "");
      store.refreshGlobal();
      render();
      return;
    }
    // 失败：401 / 400 / 其它
    let message = "登录失败，请重试。";
    if (result.data) {
      message = result.data.message || result.data.error || message;
    }
    if (result.status === 400) {
      message = "请求参数有误：" + message;
    } else if (result.status === 401) {
      message = message || "用户名或密码错误";
    }
    setMsg(message, "error");
  }

  function render() {
    const s = store.snapshot();
    if (s.loggedIn) {
      const u = getUser() || {};
      const exp = getExpireAt();
      const expDate = exp ? new Date(exp) : null;
      const expText = expDate && !isNaN(expDate.getTime()) ? expDate.toLocaleString() : "—";
      stateInfo.innerHTML = `
        <div class="state-name">你好，<strong>${escapeHtml(u.name || "用户")}</strong></div>
        <div class="state-meta">
          <span class="chip chip--role">${escapeHtml(u.role || "")}</span>
          <span class="chip">${escapeHtml(u.department || "")}</span>
        </div>
        <div class="state-line"><span>邮箱</span>${escapeHtml(u.email || "—")}</div>
        <div class="state-line"><span>登录有效期至</span>${escapeHtml(expText)}</div>
      `;
      formWrap.classList.add("hidden");
      stateWrap.classList.remove("hidden");
    } else {
      formWrap.classList.remove("hidden");
      stateWrap.classList.add("hidden");
    }
  }

  render();
}

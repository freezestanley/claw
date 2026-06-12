// 统一请求封装：可配置 Base URL 常量 + token 持久化 + 计时 + 错误兜底

// ===== 可配置 Base URL 常量 =====
// 默认后端地址；如需切换，改这里即可（也允许运行时通过设置面板覆盖到 localStorage）。
export const DEFAULT_BASE_URL = "http://localhost:3000";

export const LS = {
  baseUrl: "greenPothos.baseUrl",
  token: "greenPothos.token",
  expireAt: "greenPothos.expireAt",
  user: "greenPothos.user",
};

export function getBaseUrl() {
  return (localStorage.getItem(LS.baseUrl) || DEFAULT_BASE_URL).replace(/\/+$/, "");
}
export function setBaseUrl(url) {
  if (!url) {
    localStorage.removeItem(LS.baseUrl);
    return;
  }
  localStorage.setItem(LS.baseUrl, url.replace(/\/+$/, ""));
}

export function getToken() {
  return localStorage.getItem(LS.token) || "";
}
export function getExpireAt() {
  return localStorage.getItem(LS.expireAt) || "";
}
export function getUser() {
  try {
    return JSON.parse(localStorage.getItem(LS.user) || "null");
  } catch {
    return null;
  }
}
export function isLoggedIn() {
  const t = getToken();
  if (!t) return false;
  const exp = getExpireAt();
  if (exp) {
    const d = new Date(exp);
    if (!isNaN(d.getTime()) && d.getTime() < Date.now()) return false; // 已过期
  }
  return true;
}
export function clearAuth() {
  localStorage.removeItem(LS.token);
  localStorage.removeItem(LS.expireAt);
  localStorage.removeItem(LS.user);
}

// 统一请求：返回 { ok, status, ms, data, raw, headers, networkError, message }
export async function request(path, { method = "GET", headers = {}, body, withAuth = false } = {}) {
  const url = getBaseUrl() + path;
  const finalHeaders = { ...headers };

  const token = getToken();
  if (withAuth && token) {
    finalHeaders["Authorization"] = "Bearer " + token;
  }

  const t0 = performance.now();
  let res;
  try {
    res = await fetch(url, { method, headers: finalHeaders, body });
  } catch (err) {
    const ms = Math.round(performance.now() - t0);
    return {
      ok: false,
      networkError: true,
      status: 0,
      ms,
      data: null,
      raw: "",
      headers: null,
      message: networkHint(err, url),
    };
  }

  const ms = Math.round(performance.now() - t0);
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }
  return { ok: res.ok, networkError: false, status: res.status, ms, data, raw: text, headers: res.headers };
}

function networkHint(err, url) {
  return (
    "网络/连接失败：无法访问 " + url +
    "。请确认后端服务已在该地址启动（默认 " + DEFAULT_BASE_URL + "），且未被 CORS / 防火墙拦截。原始错误：" +
    (err && err.message ? err.message : String(err))
  );
}

export function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

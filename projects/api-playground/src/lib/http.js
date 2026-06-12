// 统一的请求封装：计时 + 错误兜底 + 结构化返回

export const LS = {
  baseUrl: "apiPlayground.baseUrl",
  token: "apiPlayground.token",
  expireAt: "apiPlayground.expireAt",
  user: "apiPlayground.user",
};

export const DEFAULT_BASE_URL = "http://localhost:3000";

export function getBaseUrl() {
  return (localStorage.getItem(LS.baseUrl) || DEFAULT_BASE_URL).replace(/\/+$/, "");
}
export function setBaseUrl(url) {
  localStorage.setItem(LS.baseUrl, url.replace(/\/+$/, ""));
}

export function getToken() {
  return localStorage.getItem(LS.token) || "";
}

// 统一请求：返回 { ok, status, ms, data, raw, headers, networkError }
export async function request(path, { method = "GET", headers = {}, body, withAuth = false, authPlaceholder = false } = {}) {
  const url = getBaseUrl() + path;
  const finalHeaders = { ...headers };

  // 触发预检：带 Authorization 头。已登录用真 token，否则按需带 placeholder。
  const token = getToken();
  if (withAuth && token) {
    finalHeaders["Authorization"] = "Bearer " + token;
  } else if (authPlaceholder) {
    finalHeaders["Authorization"] = "Bearer placeholder";
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
  return {
    ok: res.ok,
    networkError: false,
    status: res.status,
    ms,
    data,
    raw: text,
    headers: res.headers,
  };
}

function networkHint(err, url) {
  return (
    "网络/连接失败：无法访问 " +
    url +
    "。请确认后端服务已在该地址启动（默认 http://localhost:3000），" +
    "且未被 CORS / 防火墙拦截。原始错误：" +
    (err && err.message ? err.message : String(err))
  );
}

export function fmtSize(bytes) {
  if (bytes == null) return "-";
  const u = ["B", "KB", "MB", "GB"];
  let i = 0;
  let n = Number(bytes);
  while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; }
  return (i === 0 ? n : n.toFixed(2)) + " " + u[i];
}

export function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

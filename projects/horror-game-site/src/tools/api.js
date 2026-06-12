// API client for ASHFALL dev tools (联调区)
// 三个后端接口的真实 fetch 封装 + Base URL 配置 + token 管理 + 连接失败兜底

const LS_BASE = "ashfall.apiBaseUrl";
const LS_TOKEN = "ashfall.authToken";
const LS_EXPIRE = "ashfall.authExpireAt";
const LS_USER = "ashfall.authUser";
const DEFAULT_BASE = "http://localhost:3000";

export function getBaseUrl() {
  return (localStorage.getItem(LS_BASE) || DEFAULT_BASE).replace(/\/+$/, "");
}
export function setBaseUrl(v) {
  const clean = (v || DEFAULT_BASE).trim().replace(/\/+$/, "");
  localStorage.setItem(LS_BASE, clean);
  return clean;
}

export function getToken() {
  return localStorage.getItem(LS_TOKEN) || "";
}
export function getAuthState() {
  const token = getToken();
  if (!token) return null;
  let user = null;
  try { user = JSON.parse(localStorage.getItem(LS_USER) || "null"); } catch { user = null; }
  return { token, expireAt: localStorage.getItem(LS_EXPIRE) || "", user };
}
export function saveAuth({ token, expireAt, user }) {
  localStorage.setItem(LS_TOKEN, token || "");
  localStorage.setItem(LS_EXPIRE, expireAt || "");
  localStorage.setItem(LS_USER, JSON.stringify(user || null));
}
export function clearAuth() {
  localStorage.removeItem(LS_TOKEN);
  localStorage.removeItem(LS_EXPIRE);
  localStorage.removeItem(LS_USER);
}

// 统一错误类型：把网络/连接失败与 HTTP 错误区分开
export class ApiError extends Error {
  constructor(message, { kind = "http", status = 0, body = null } = {}) {
    super(message);
    this.kind = kind; // "network" | "http" | "parse"
    this.status = status;
    this.body = body;
  }
}

async function parseBody(res) {
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    try { return await res.json(); } catch { return null; }
  }
  try { return await res.text(); } catch { return null; }
}

function networkError(err) {
  // fetch 在连接失败 / CORS 阻断 / DNS 失败时抛 TypeError
  return new ApiError(
    "无法连接后端服务，请确认 Base URL 正确且服务已启动（localhost:3000）。",
    { kind: "network", status: 0, body: String(err && err.message || err) }
  );
}

// 1) POST /upload — multipart/form-data，不手动设 Content-Type
export async function uploadFiles(files) {
  const fd = new FormData();
  Array.from(files).forEach((f, i) => fd.append(`file${i}`, f, f.name));
  let res;
  try {
    res = await fetch(`${getBaseUrl()}/upload`, { method: "POST", body: fd });
  } catch (err) {
    throw networkError(err);
  }
  const body = await parseBody(res);
  if (!res.ok) {
    const msg = (body && body.message) || `上传失败（HTTP ${res.status}）`;
    throw new ApiError(msg, { kind: "http", status: res.status, body });
  }
  return body; // {success,message,files:[...]}
}

// 2) GET /users/search — 中文参数 encodeURIComponent
export async function searchUsers({ q, role, department, page = 1, pageSize = 10 } = {}) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (role) params.set("role", role);
  if (department) params.set("department", department);
  params.set("page", String(page));
  params.set("pageSize", String(pageSize));
  let res;
  try {
    res = await fetch(`${getBaseUrl()}/users/search?${params.toString()}`, { method: "GET" });
  } catch (err) {
    throw networkError(err);
  }
  const body = await parseBody(res);
  if (!res.ok) {
    const msg = (body && body.message) || `搜索失败（HTTP ${res.status}）`;
    throw new ApiError(msg, { kind: "http", status: res.status, body });
  }
  const totalHeader = res.headers.get("X-Total-Count");
  const total = totalHeader != null ? Number(totalHeader) : (body?.pagination?.total ?? 0);
  return { ...body, _totalCount: total };
}

// 3) POST /auth/login — application/json + Bearer 头触发预检
export async function login({ username, password }) {
  let res;
  try {
    res = await fetch(`${getBaseUrl()}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 故意带 Authorization 触发浏览器 OPTIONS 预检（即使登录前 token 为空也带个占位）
        "Authorization": `Bearer ${getToken() || "preflight"}`,
      },
      body: JSON.stringify({ username, password }),
    });
  } catch (err) {
    throw networkError(err);
  }
  const body = await parseBody(res);
  if (!res.ok) {
    // 401 {success:false,message} | 400 {statusCode,error,message}
    const msg = (body && (body.message || body.error)) || `登录失败（HTTP ${res.status}）`;
    throw new ApiError(msg, { kind: "http", status: res.status, body });
  }
  return body; // {success,token,user,expireAt}
}

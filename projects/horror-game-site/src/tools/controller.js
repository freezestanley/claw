import {
  getBaseUrl, setBaseUrl, getAuthState, saveAuth, clearAuth,
  uploadFiles, searchUsers, login, ApiError,
} from "./api.js";

const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmtSize = (n) => {
  if (n == null) return "-";
  if (n < 1024) return n + " B";
  if (n < 1048576) return (n / 1024).toFixed(1) + " KB";
  return (n / 1048576).toFixed(2) + " MB";
};
const MAX_FILES = 5, MAX_BYTES = 10 * 1024 * 1024;

function setStatus(id, msg, kind = "info") {
  const el = document.getElementById(id);
  if (!el) return;
  const color = kind === "error" ? "text-rust-bright" : kind === "ok" ? "text-emerald-400" : kind === "pending" ? "text-fog" : "text-ash-400";
  el.className = `mt-3 text-sm ${color}`;
  el.textContent = msg;
  el.classList.remove("hidden");
}
function errToStatus(id, err) {
  if (err instanceof ApiError) {
    const tag = err.kind === "network" ? "[连接失败] " : err.status ? `[HTTP ${err.status}] ` : "";
    setStatus(id, tag + err.message, "error");
  } else {
    setStatus(id, "发生未预期错误：" + (err && err.message || err), "error");
  }
}

/* ---------- Base URL ---------- */
function bindBase() {
  const input = $("#base-url"), hint = $("#base-hint");
  $("#base-save")?.addEventListener("click", () => {
    const v = setBaseUrl(input.value);
    input.value = v;
    hint.textContent = `已保存：${v}（写入 localStorage）`;
  });
  $("#base-reset")?.addEventListener("click", () => {
    const v = setBaseUrl("http://localhost:3000");
    input.value = v;
    hint.textContent = `已重置为默认：${v}`;
  });
}

/* ---------- Upload ---------- */
let picked = [];
function bindUpload() {
  const input = $("#file-input"), list = $("#file-list"), btn = $("#upload-btn");
  const renderList = () => {
    btn.disabled = picked.length === 0;
    if (!picked.length) { list.innerHTML = `<li class="text-ash-600">未选择文件</li>`; return; }
    list.innerHTML = picked.map((f) => {
      const over = f.size > MAX_BYTES;
      return `<li class="flex justify-between gap-3 border-b hairline py-1.5">
        <span class="truncate">${esc(f.name)}</span>
        <span class="${over ? "text-rust-bright" : "text-ash-400"} shrink-0">${fmtSize(f.size)}${over ? " · 超 10MB" : ""}</span>
      </li>`;
    }).join("");
  };
  renderList();
  input?.addEventListener("change", () => {
    picked = Array.from(input.files).slice(0, MAX_FILES);
    if (input.files.length > MAX_FILES) setStatus("upload-status", `最多 5 个文件，已截取前 5 个。`, "info");
    renderList();
  });
  $("#upload-clear")?.addEventListener("click", () => {
    picked = []; input.value = ""; renderList();
    $("#upload-result").classList.add("hidden");
    $("#upload-status").classList.add("hidden");
  });
  btn?.addEventListener("click", async () => {
    if (!picked.length) { setStatus("upload-status", "请先选择文件。", "error"); return; }
    if (picked.some((f) => f.size > MAX_BYTES)) { setStatus("upload-status", "存在超过 10MB 的文件，请移除后再试。", "error"); return; }
    btn.disabled = true;
    setStatus("upload-status", "上传中…", "pending");
    try {
      const r = await uploadFiles(picked);
      setStatus("upload-status", r.message || "上传成功", "ok");
      renderUploadResult(r.files || []);
    } catch (err) {
      errToStatus("upload-status", err);
      $("#upload-result").classList.add("hidden");
    } finally {
      btn.disabled = picked.length === 0;
    }
  });
}
function renderUploadResult(files) {
  const box = $("#upload-result");
  const base = getBaseUrl();
  if (!files.length) { box.classList.add("hidden"); return; }
  box.innerHTML = `
    <div class="border hairline overflow-x-auto">
      <table class="w-full text-sm text-left">
        <thead class="bg-ash-800 text-[11px] uppercase tracking-[0.15em] text-ash-400">
          <tr><th class="px-3 py-2">originalName</th><th class="px-3 py-2">savedName</th><th class="px-3 py-2">mimetype</th><th class="px-3 py-2">size</th><th class="px-3 py-2">path</th></tr>
        </thead>
        <tbody class="text-fog">
          ${files.map((f) => {
            const url = /^https?:/.test(f.path) ? f.path : base + (f.path?.startsWith("/") ? "" : "/") + (f.path || "");
            return `<tr class="border-t hairline">
              <td class="px-3 py-2">${esc(f.originalName)}</td>
              <td class="px-3 py-2 font-mono text-xs">${esc(f.savedName)}</td>
              <td class="px-3 py-2 text-xs">${esc(f.mimetype)}</td>
              <td class="px-3 py-2">${fmtSize(f.size)}</td>
              <td class="px-3 py-2"><a href="${esc(url)}" target="_blank" rel="noopener" class="text-rust-bright hover:underline break-all">${esc(f.path)}</a></td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>`;
  box.classList.remove("hidden");
}

/* ---------- Search ---------- */
let lastQuery = { page: 1, pageSize: 10 };
function bindSearch() {
  const form = $("#search-form");
  form?.addEventListener("submit", (e) => { e.preventDefault(); lastQuery.page = 1; doSearch(); });
}
function readSearchForm() {
  const f = $("#search-form");
  const page = Math.max(1, Number(f.page.value) || 1);
  let pageSize = Number(f.pageSize.value) || 10;
  pageSize = Math.min(50, Math.max(1, pageSize));
  return { q: f.q.value.trim(), role: f.role.value, department: f.department.value.trim(), page, pageSize };
}
async function doSearch() {
  const q = readSearchForm();
  q.page = lastQuery.page || q.page;
  lastQuery = q;
  setStatus("search-status", "查询中…", "pending");
  try {
    const r = await searchUsers(q);
    const total = r._totalCount ?? r.pagination?.total ?? 0;
    setStatus("search-status", `共 ${total} 条结果（X-Total-Count）`, "ok");
    renderSearchResult(r.data || [], r.pagination || { page: q.page, pageSize: q.pageSize, total, totalPages: Math.max(1, Math.ceil(total / q.pageSize)) });
  } catch (err) {
    errToStatus("search-status", err);
    $("#search-result").classList.add("hidden");
    $("#search-pager").classList.add("hidden");
  }
}
function renderSearchResult(rows, pg) {
  const box = $("#search-result"), pager = $("#search-pager");
  if (!rows.length) {
    box.innerHTML = `<p class="text-ash-600 text-sm py-6 text-center border hairline">无匹配结果</p>`;
    box.classList.remove("hidden"); pager.classList.add("hidden"); return;
  }
  box.innerHTML = `
    <table class="w-full text-sm text-left border hairline">
      <thead class="bg-ash-800 text-[11px] uppercase tracking-[0.15em] text-ash-400">
        <tr><th class="px-3 py-2">id</th><th class="px-3 py-2">name</th><th class="px-3 py-2">email</th><th class="px-3 py-2">role</th><th class="px-3 py-2">department</th></tr>
      </thead>
      <tbody class="text-fog">
        ${rows.map((u) => `<tr class="border-t hairline">
          <td class="px-3 py-2 font-mono text-xs">${esc(u.id)}</td>
          <td class="px-3 py-2">${esc(u.name)}</td>
          <td class="px-3 py-2 text-xs">${esc(u.email)}</td>
          <td class="px-3 py-2">${esc(u.role)}</td>
          <td class="px-3 py-2">${esc(u.department)}</td>
        </tr>`).join("")}
      </tbody>
    </table>`;
  box.classList.remove("hidden");
  const totalPages = pg.totalPages || 1;
  pager.innerHTML = `
    <span class="text-ash-400">第 ${pg.page} / ${totalPages} 页 · 共 ${pg.total} 条</span>
    <span class="flex gap-2">
      <button id="pg-prev" class="border border-ash-700 hover:border-ash-500 px-4 py-2 text-xs uppercase tracking-[0.15em] ${pg.page <= 1 ? "opacity-40 cursor-not-allowed" : "text-white"}" ${pg.page <= 1 ? "disabled" : ""}>上一页</button>
      <button id="pg-next" class="border border-ash-700 hover:border-ash-500 px-4 py-2 text-xs uppercase tracking-[0.15em] ${pg.page >= totalPages ? "opacity-40 cursor-not-allowed" : "text-white"}" ${pg.page >= totalPages ? "disabled" : ""}>下一页</button>
    </span>`;
  pager.classList.remove("hidden");
  pager.classList.add("flex");
  $("#pg-prev")?.addEventListener("click", () => { if (lastQuery.page > 1) { lastQuery.page--; doSearch(); } });
  $("#pg-next")?.addEventListener("click", () => { if (lastQuery.page < totalPages) { lastQuery.page++; doSearch(); } });
}

/* ---------- Login ---------- */
function bindLogin() {
  const form = $("#login-form");
  renderAuthState();
  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = form.username.value.trim(), password = form.password.value;
    if (!username || !password) { setStatus("login-status", "username 与 password 均为必填。", "error"); return; }
    setStatus("login-status", "登录中…（带 Authorization 头会先触发 OPTIONS 预检）", "pending");
    try {
      const r = await login({ username, password });
      saveAuth({ token: r.token, expireAt: r.expireAt, user: r.user });
      setStatus("login-status", "登录成功，token 已存入 localStorage。", "ok");
      renderAuthState();
    } catch (err) {
      errToStatus("login-status", err);
    }
  });
  $("#logout-btn")?.addEventListener("click", () => {
    clearAuth();
    setStatus("login-status", "已清除本地 token。", "info");
    renderAuthState();
  });
}
function renderAuthState() {
  const box = $("#login-state");
  const auth = getAuthState();
  if (!auth) { box.classList.add("hidden"); box.innerHTML = ""; return; }
  const u = auth.user || {};
  const exp = auth.expireAt ? new Date(auth.expireAt) : null;
  const expStr = exp && !isNaN(exp) ? exp.toLocaleString("zh-CN") : auth.expireAt || "-";
  box.innerHTML = `
    <div class="border hairline bg-ash-950 p-5 grid gap-3 text-sm">
      <div class="flex items-center gap-2">
        <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
        <span class="text-emerald-400 text-xs uppercase tracking-[0.18em]">已登录</span>
      </div>
      <dl class="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-fog">
        <div><dt class="text-ash-600 text-xs uppercase tracking-[0.15em]">name</dt><dd>${esc(u.name)}</dd></div>
        <div><dt class="text-ash-600 text-xs uppercase tracking-[0.15em]">email</dt><dd class="text-xs">${esc(u.email)}</dd></div>
        <div><dt class="text-ash-600 text-xs uppercase tracking-[0.15em]">role</dt><dd>${esc(u.role)}</dd></div>
        <div><dt class="text-ash-600 text-xs uppercase tracking-[0.15em]">department</dt><dd>${esc(u.department)}</dd></div>
        <div class="sm:col-span-2"><dt class="text-ash-600 text-xs uppercase tracking-[0.15em]">expireAt</dt><dd>${esc(expStr)}</dd></div>
      </dl>
      <div><dt class="text-ash-600 text-xs uppercase tracking-[0.15em] mb-1">token (Bearer)</dt>
        <dd class="font-mono text-xs text-ash-400 break-all bg-ash-900 p-2 border hairline">${esc(auth.token)}</dd></div>
    </div>`;
  box.classList.remove("hidden");
}

export function initTools() {
  bindBase();
  bindUpload();
  bindSearch();
  bindLogin();
}

import { getBaseUrl, getAuthState } from "./api.js";

const ROLES = ["", "admin", "user", "editor"];

const topbar = () => `
  <header class="sticky top-0 z-50 border-b hairline bg-ash-950/90 backdrop-blur-md">
    <div class="mx-auto max-w-[1200px] px-5 md:px-8 h-16 flex items-center justify-between gap-4">
      <a href="#/" class="flex items-center gap-3 group">
        <span class="font-display text-lg tracking-[0.3em] text-white">ASHFALL</span>
        <span class="text-[10px] uppercase tracking-[0.25em] text-rust-bright border border-rust/40 px-2 py-0.5">DEV TOOLS</span>
      </a>
      <a href="#/" class="text-[11px] uppercase tracking-[0.2em] text-ash-400 hover:text-white transition-colors">← 返回官网</a>
    </div>
  </header>`;

const baseBar = () => `
  <section class="border-b hairline bg-ash-900">
    <div class="mx-auto max-w-[1200px] px-5 md:px-8 py-4 flex flex-col sm:flex-row sm:items-end gap-3">
      <div class="flex-1">
        <label for="base-url" class="block text-[11px] uppercase tracking-[0.2em] text-ash-400 mb-1.5">API Base URL</label>
        <input id="base-url" type="text" value="${getBaseUrl()}"
          class="w-full bg-ash-950 border border-ash-700 px-3 py-2.5 text-sm font-mono text-fog focus:border-rust focus:outline-none transition-colors" />
      </div>
      <div class="flex gap-2">
        <button id="base-save" class="bg-ash-700 hover:bg-ash-600 px-4 py-2.5 text-xs uppercase tracking-[0.18em] text-white transition-colors">保存</button>
        <button id="base-reset" class="border border-ash-700 hover:border-ash-500 px-4 py-2.5 text-xs uppercase tracking-[0.18em] text-ash-400 hover:text-white transition-colors">重置</button>
      </div>
    </div>
    <p id="base-hint" class="mx-auto max-w-[1200px] px-5 md:px-8 pb-3 -mt-1 text-xs text-ash-600"></p>
  </section>`;

const panelHead = (n, title, desc) => `
  <div class="mb-6">
    <div class="flex items-center gap-3 mb-2">
      <span class="font-display text-rust-bright text-sm tracking-[0.3em]">${n}</span>
      <h2 class="font-display text-2xl md:text-3xl text-white tracking-tight">${title}</h2>
    </div>
    <p class="text-sm text-ash-400 max-w-[60ch]">${desc}</p>
  </div>`;

const statusLine = (id) => `<p id="${id}" class="mt-3 text-sm hidden"></p>`;

const uploadPanel = () => `
  <article class="border hairline bg-ash-900 p-6 md:p-8">
    ${panelHead("01", "文件上传", "POST /upload · multipart/form-data，最多 5 个文件、每个 ≤10MB，FormData 自动带 boundary，不手动设 Content-Type。")}
    <div class="grid gap-4">
      <label class="block border border-dashed border-ash-600 hover:border-rust bg-ash-950 px-4 py-8 text-center cursor-pointer transition-colors">
        <input id="file-input" type="file" multiple class="hidden" />
        <span class="block text-sm text-ash-400">点击选择文件（最多 5 个，单个 ≤10MB）</span>
        <span class="block mt-1 text-xs text-ash-600">任意类型</span>
      </label>
      <ul id="file-list" class="space-y-1 text-sm text-fog"></ul>
      <div class="flex gap-3">
        <button id="upload-btn" class="bg-rust hover:bg-rust-bright px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-white transition-colors active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed">上传</button>
        <button id="upload-clear" class="border border-ash-700 hover:border-ash-500 px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-ash-400 hover:text-white transition-colors">清空</button>
      </div>
      ${statusLine("upload-status")}
      <div id="upload-result" class="hidden mt-2"></div>
    </div>
  </article>`;

const searchPanel = () => `
  <article class="border hairline bg-ash-900 p-6 md:p-8">
    ${panelHead("02", "用户搜索", "GET /users/search · q 模糊匹配名/邮箱，role/department 精确，多参数 AND 交集，中文参数自动 URL 编码。")}
    <form id="search-form" class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" novalidate>
      <div>
        <label class="block text-[11px] uppercase tracking-[0.18em] text-ash-400 mb-1.5">关键词 q</label>
        <input name="q" type="text" placeholder="名字或邮箱" class="w-full bg-ash-950 border border-ash-700 px-3 py-2.5 text-sm text-fog placeholder-ash-600 focus:border-rust focus:outline-none" />
      </div>
      <div>
        <label class="block text-[11px] uppercase tracking-[0.18em] text-ash-400 mb-1.5">角色 role</label>
        <select name="role" class="w-full bg-ash-950 border border-ash-700 px-3 py-2.5 text-sm text-fog focus:border-rust focus:outline-none">
          ${ROLES.map((r) => `<option value="${r}">${r || "（全部）"}</option>`).join("")}
        </select>
      </div>
      <div>
        <label class="block text-[11px] uppercase tracking-[0.18em] text-ash-400 mb-1.5">部门 department</label>
        <input name="department" type="text" placeholder="如 技术部" class="w-full bg-ash-950 border border-ash-700 px-3 py-2.5 text-sm text-fog placeholder-ash-600 focus:border-rust focus:outline-none" />
      </div>
      <div>
        <label class="block text-[11px] uppercase tracking-[0.18em] text-ash-400 mb-1.5">page</label>
        <input name="page" type="number" min="1" value="1" class="w-full bg-ash-950 border border-ash-700 px-3 py-2.5 text-sm text-fog focus:border-rust focus:outline-none" />
      </div>
      <div>
        <label class="block text-[11px] uppercase tracking-[0.18em] text-ash-400 mb-1.5">pageSize (1–50)</label>
        <input name="pageSize" type="number" min="1" max="50" value="10" class="w-full bg-ash-950 border border-ash-700 px-3 py-2.5 text-sm text-fog focus:border-rust focus:outline-none" />
      </div>
      <div class="flex items-end">
        <button type="submit" class="w-full bg-rust hover:bg-rust-bright px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-white transition-colors active:scale-[0.98]">搜索</button>
      </div>
    </form>
    ${statusLine("search-status")}
    <div id="search-result" class="hidden mt-5 overflow-x-auto"></div>
    <div id="search-pager" class="hidden mt-4 items-center justify-between gap-3 flex-wrap text-sm"></div>
  </article>`;

const loginPanel = () => {
  const auth = getAuthState();
  return `
  <article class="border hairline bg-ash-900 p-6 md:p-8">
    ${panelHead("03", "登录鉴权", "POST /auth/login · application/json + Authorization 头触发 CORS 预检（OPTIONS 204）。成功存 token/expireAt 到 localStorage。测试账号 admin / admin123。")}
    <form id="login-form" class="grid gap-3 sm:grid-cols-2" novalidate>
      <div>
        <label class="block text-[11px] uppercase tracking-[0.18em] text-ash-400 mb-1.5">username</label>
        <input name="username" type="text" value="admin" class="w-full bg-ash-950 border border-ash-700 px-3 py-2.5 text-sm text-fog focus:border-rust focus:outline-none" />
      </div>
      <div>
        <label class="block text-[11px] uppercase tracking-[0.18em] text-ash-400 mb-1.5">password</label>
        <input name="password" type="password" value="admin123" class="w-full bg-ash-950 border border-ash-700 px-3 py-2.5 text-sm text-fog focus:border-rust focus:outline-none" />
      </div>
      <div class="flex gap-3 sm:col-span-2">
        <button type="submit" class="bg-rust hover:bg-rust-bright px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-white transition-colors active:scale-[0.98]">登录</button>
        <button type="button" id="logout-btn" class="border border-ash-700 hover:border-ash-500 px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-ash-400 hover:text-white transition-colors">清除 token</button>
      </div>
    </form>
    ${statusLine("login-status")}
    <div id="login-state" class="${auth ? "" : "hidden"} mt-4"></div>
  </article>`;
};

export function renderTools() {
  return [
    topbar(),
    baseBar(),
    `<main class="mx-auto max-w-[1200px] px-5 md:px-8 py-8 md:py-12 grid gap-8">`,
    uploadPanel(),
    searchPanel(),
    loginPanel(),
    `</main>`,
    `<footer class="border-t hairline"><div class="mx-auto max-w-[1200px] px-5 md:px-8 py-6 text-[11px] uppercase tracking-[0.18em] text-ash-600">ASHFALL DEV TOOLS · 后端联调演示 · base ${getBaseUrl()}</div></footer>`,
  ].join("");
}

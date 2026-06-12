// 页面整体布局（dev-tool 风格，PC/Pad/H5 响应式）

export function renderLayout() {
  return `
  <div class="min-h-screen">
    <!-- 顶部 Base URL 配置条 -->
    <header class="sticky top-0 z-20 border-b border-slate-800 bg-[#0b0f15]/90 backdrop-blur">
      <div class="mx-auto max-w-6xl px-4 py-3">
        <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div class="flex items-center gap-2">
            <span class="grid h-8 w-8 place-items-center rounded bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-700">&#9889;</span>
            <div>
              <h1 class="text-sm font-bold tracking-wide text-slate-100">API 联调演示台</h1>
              <p class="text-[11px] text-slate-500">Dev Console · upload / users.search / auth.login</p>
            </div>
          </div>
          <div class="flex w-full items-stretch gap-2 md:w-auto">
            <div class="flex w-full items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/60 px-2.5 py-1.5 md:w-[420px]">
              <label class="shrink-0 text-[11px] font-semibold text-slate-400">Base URL</label>
              <input id="baseUrl" type="text" spellcheck="false"
                class="w-full bg-transparent text-xs text-emerald-300 outline-none placeholder:text-slate-600"
                placeholder="http://localhost:3000" />
            </div>
            <button id="baseUrlSave"
              class="shrink-0 rounded-lg bg-emerald-600 px-3 text-xs font-semibold text-white transition hover:bg-emerald-500 active:scale-95 min-h-[44px] md:min-h-0">
              保存
            </button>
          </div>
        </div>
        <div id="globalStatus" class="mt-2 text-[11px] text-slate-500"></div>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-6">
      <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
        ${loginCard()}
        ${searchCard()}
      </div>
      <div class="mt-5">
        ${uploadCard()}
      </div>
      <footer class="mt-8 border-t border-slate-800 pt-4 text-center text-[11px] text-slate-600">
        前端直连 Base URL，CORS 由后端 OPTIONS 预检处理 · token 为 Base64 mock 仅作演示
      </footer>
    </main>
  </div>`;
}

function cardShell(id, title, tag, inner) {
  return `
  <section data-section style="opacity:0" class="rounded-xl border border-slate-800 bg-slate-900/40 shadow-lg shadow-black/20">
    <div class="flex items-center justify-between border-b border-slate-800 px-4 py-2.5">
      <h2 class="flex items-center gap-2 text-sm font-bold text-slate-100">${title}</h2>
      <span class="rounded bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-400">${tag}</span>
    </div>
    <div class="p-4">${inner}</div>
  </section>`;
}

const inputCls =
  "w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-emerald-600 focus:ring-1 focus:ring-emerald-700 placeholder:text-slate-600 min-h-[44px]";
const labelCls = "mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500";
const btnPrimary =
  "rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500 active:scale-95 disabled:opacity-50 min-h-[44px]";
const btnGhost =
  "rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-700 active:scale-95 min-h-[44px]";

function loginCard() {
  return cardShell(
    "login",
    "登录",
    "POST /auth/login",
    `
    <div class="space-y-3">
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label class="${labelCls}">username</label>
          <input id="loginUser" class="${inputCls}" value="admin" placeholder="admin" autocomplete="username" />
        </div>
        <div>
          <label class="${labelCls}">password</label>
          <input id="loginPass" type="password" class="${inputCls}" value="admin123" placeholder="admin123" autocomplete="current-password" />
        </div>
      </div>
      <div class="flex flex-wrap gap-2">
        <button id="loginBtn" class="${btnPrimary}">登录</button>
        <button id="logoutBtn" class="${btnGhost}">清除 token</button>
      </div>
      <div id="tokenInfo" class="hidden rounded-lg border border-slate-800 bg-slate-950/50 p-3 text-xs"></div>
      <div id="loginResp" class="hidden rounded-lg border border-slate-800 bg-slate-950/50 p-3"></div>
    </div>`
  );
}

function searchCard() {
  return cardShell(
    "search",
    "用户搜索",
    "GET /users/search",
    `
    <div class="space-y-3">
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label class="${labelCls}">q（名/邮箱模糊）</label>
          <input id="sQ" class="${inputCls}" placeholder="如 li / @example.com" />
        </div>
        <div>
          <label class="${labelCls}">role</label>
          <select id="sRole" class="${inputCls}">
            <option value="">（全部）</option>
            <option value="admin">admin</option>
            <option value="user">user</option>
            <option value="editor">editor</option>
          </select>
        </div>
        <div>
          <label class="${labelCls}">department</label>
          <input id="sDept" class="${inputCls}" placeholder="如 技术部" />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="${labelCls}">page</label>
            <input id="sPage" type="number" min="1" value="1" class="${inputCls}" />
          </div>
          <div>
            <label class="${labelCls}">pageSize (1-50)</label>
            <input id="sPageSize" type="number" min="1" max="50" value="10" class="${inputCls}" />
          </div>
        </div>
      </div>
      <div class="flex gap-2">
        <button id="searchBtn" class="${btnPrimary}">搜索</button>
        <button id="searchReset" class="${btnGhost}">重置</button>
      </div>
      <div id="searchResp" class="hidden rounded-lg border border-slate-800 bg-slate-950/50 p-3"></div>
      <div id="searchTableWrap" class="hidden">
        <div class="overflow-x-auto nice-scroll rounded-lg border border-slate-800">
          <table class="w-full min-w-[480px] text-left text-xs">
            <thead class="bg-slate-900/70 text-slate-400">
              <tr>
                <th class="px-3 py-2">id</th>
                <th class="px-3 py-2">name</th>
                <th class="px-3 py-2">email</th>
                <th class="px-3 py-2">role</th>
                <th class="px-3 py-2">department</th>
              </tr>
            </thead>
            <tbody id="searchTbody" class="divide-y divide-slate-800"></tbody>
          </table>
        </div>
        <div class="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <span id="searchPageInfo"></span>
          <div class="flex gap-2">
            <button id="prevPage" class="${btnGhost} px-3 py-1.5 min-h-0">上一页</button>
            <button id="nextPage" class="${btnGhost} px-3 py-1.5 min-h-0">下一页</button>
          </div>
        </div>
      </div>
    </div>`
  );
}

function uploadCard() {
  return cardShell(
    "upload",
    "文件上传",
    "POST /upload",
    `
    <div class="space-y-3">
      <label for="fileInput"
        class="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/40 px-4 py-6 text-center transition hover:border-emerald-600 hover:bg-slate-900/40">
        <span class="text-2xl">&#128206;</span>
        <span class="text-sm text-slate-300">点击选择文件（最多 5 个，每个 ≤10MB，任意类型）</span>
        <span class="text-[11px] text-slate-500">使用 FormData 提交，不手动设置 Content-Type</span>
        <input id="fileInput" type="file" multiple class="hidden" />
      </label>
      <div id="fileList" class="space-y-1.5"></div>
      <div class="flex gap-2">
        <button id="uploadBtn" class="${btnPrimary}" disabled>上传</button>
        <button id="uploadClear" class="${btnGhost}">清空</button>
      </div>
      <div id="uploadResp" class="hidden rounded-lg border border-slate-800 bg-slate-950/50 p-3"></div>
      <div id="uploadFiles" class="hidden space-y-2"></div>
    </div>`
  );
}

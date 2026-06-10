// 后台管理页面 - 用户列表 + 分页
// 布局: 左侧边栏 + 顶部栏 + 工具条(搜索/状态筛选) + 数据表格 + 分页
// 数据: 默认 mock；预留 /api 代理(GET /api/users)，可平滑切真实接口
// 适配: PC(侧栏常驻) / Pad / H5(侧栏抽屉 + 表格横向滚动)

// ---------------- Mock 数据 ----------------
const ROLES = ["管理员", "运营", "财务", "客服", "访客"];
const STATUSES = [
  { key: "active", label: "正常", cls: "text-emerald-700 bg-emerald-50 ring-emerald-600/20" },
  { key: "pending", label: "待审核", cls: "text-amber-700 bg-amber-50 ring-amber-600/20" },
  { key: "disabled", label: "已禁用", cls: "text-rose-700 bg-rose-50 ring-rose-600/20" }
];
const SURNAMES = ["李", "王", "张", "刘", "陈", "杨", "黄", "赵", "周", "吴", "徐", "孙"];
const GIVEN = ["伟", "芳", "娜", "敏", "静", "磊", "强", "军", "洋", "勇", "艳", "杰", "娟", "涛", "明"];

function genUsers(n) {
  const list = [];
  for (let i = 1; i <= n; i++) {
    const name = SURNAMES[i % SURNAMES.length] + GIVEN[(i * 3) % GIVEN.length];
    const status = STATUSES[i % 3];
    const role = ROLES[i % ROLES.length];
    const d = new Date(2026, 0, 1 + ((i * 7) % 160));
    const created = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
    list.push({
      id: 10000 + i,
      name,
      email: `user${i}@example.com`,
      role,
      status: status.key,
      created
    });
  }
  return list;
}

const MOCK_USERS = genUsers(87);

const USE_MOCK = true;
async function loadUsers(runtime) {
  if (USE_MOCK) return MOCK_USERS;
  try {
    const res = await runtime.api.get("/api/users");
    return res.data?.list || res.data || res;
  } catch (e) {
    console.warn("[admin] 接口不可用，回退 mock：", e?.message || e);
    return MOCK_USERS;
  }
}

// ---------------- 视图状态 ----------------
const state = {
  all: [],
  filtered: [],
  page: 1,
  pageSize: 10,
  keyword: "",
  status: "all",
  sortKey: "id",
  sortDir: "asc"
};

function statusMeta(key) {
  return STATUSES.find((s) => s.key === key) || STATUSES[0];
}

function applyFilter() {
  const kw = state.keyword.trim().toLowerCase();
  let rows = state.all.filter((u) => {
    const matchKw =
      !kw ||
      u.name.toLowerCase().includes(kw) ||
      u.email.toLowerCase().includes(kw) ||
      String(u.id).includes(kw);
    const matchStatus = state.status === "all" || u.status === state.status;
    return matchKw && matchStatus;
  });
  const dir = state.sortDir === "asc" ? 1 : -1;
  rows = rows.sort((a, b) => {
    const va = a[state.sortKey];
    const vb = b[state.sortKey];
    if (va < vb) return -1 * dir;
    if (va > vb) return 1 * dir;
    return 0;
  });
  state.filtered = rows;
  const maxPage = Math.max(1, Math.ceil(rows.length / state.pageSize));
  if (state.page > maxPage) state.page = maxPage;
}

function pageRows() {
  const start = (state.page - 1) * state.pageSize;
  return state.filtered.slice(start, start + state.pageSize);
}

// ---------------- 渲染片段 ----------------
function rowsHtml() {
  const rows = pageRows();
  if (rows.length === 0) {
    return `<tr><td colspan="6" class="py-12 text-center text-slate-400">
      <i data-lucide="inbox" class="mx-auto mb-2 h-8 w-8"></i>
      <p>没有匹配的数据</p></td></tr>`;
  }
  return rows
    .map((u) => {
      const sm = statusMeta(u.status);
      const initial = u.name.charAt(0);
      return `
      <tr class="border-b border-slate-100 last:border-0 hover:bg-slate-50/80">
        <td class="whitespace-nowrap px-4 py-3 text-sm tabular-nums text-slate-500">${u.id}</td>
        <td class="px-4 py-3">
          <div class="flex items-center gap-3">
            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-medium text-indigo-700">${initial}</span>
            <div class="min-w-0">
              <p class="truncate text-sm font-medium text-slate-800">${u.name}</p>
              <p class="truncate text-xs text-slate-400">${u.email}</p>
            </div>
          </div>
        </td>
        <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-600">${u.role}</td>
        <td class="whitespace-nowrap px-4 py-3">
          <span class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${sm.cls}">
            <i data-lucide="circle" class="h-2 w-2 fill-current"></i>${sm.label}
          </span>
        </td>
        <td class="whitespace-nowrap px-4 py-3 text-sm tabular-nums text-slate-500">${u.created}</td>
        <td class="whitespace-nowrap px-4 py-3 text-right">
          <button data-act="edit" data-id="${u.id}" class="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-indigo-600 hover:bg-indigo-50" title="编辑">
            <i data-lucide="pencil" class="h-3.5 w-3.5"></i>编辑
          </button>
          <button data-act="del" data-id="${u.id}" class="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-rose-600 hover:bg-rose-50" title="删除">
            <i data-lucide="trash-2" class="h-3.5 w-3.5"></i>删除
          </button>
        </td>
      </tr>`;
    })
    .join("");
}

function sortIcon(key) {
  if (state.sortKey !== key) return `<i data-lucide="chevrons-up-down" class="h-3.5 w-3.5 text-slate-300"></i>`;
  return state.sortDir === "asc"
    ? `<i data-lucide="chevron-up" class="h-3.5 w-3.5 text-indigo-500"></i>`
    : `<i data-lucide="chevron-down" class="h-3.5 w-3.5 text-indigo-500"></i>`;
}

function paginationHtml() {
  const total = state.filtered.length;
  const maxPage = Math.max(1, Math.ceil(total / state.pageSize));
  const start = total === 0 ? 0 : (state.page - 1) * state.pageSize + 1;
  const end = Math.min(state.page * state.pageSize, total);

  // 页码窗口
  const pages = [];
  const win = 1;
  for (let p = 1; p <= maxPage; p++) {
    if (p === 1 || p === maxPage || (p >= state.page - win && p <= state.page + win)) {
      pages.push(p);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }
  const pageBtns = pages
    .map((p) => {
      if (p === "...") return `<span class="px-2 text-slate-400">…</span>`;
      const active = p === state.page;
      return `<button data-page="${p}" class="min-w-[34px] rounded-lg border px-2 py-1 text-sm ${
        active
          ? "border-indigo-600 bg-indigo-600 text-white"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      }">${p}</button>`;
    })
    .join("");

  return `
    <div class="flex flex-col items-center gap-3 border-t border-slate-100 px-4 py-3 sm:flex-row sm:justify-between">
      <div class="flex items-center gap-3 text-sm text-slate-500">
        <span>共 <b class="text-slate-700">${total}</b> 条，第 ${start}-${end} 条</span>
        <label class="flex items-center gap-1">
          每页
          <select id="page-size" class="rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm focus:border-indigo-400 focus:outline-none">
            ${[10, 20, 50].map((n) => `<option value="${n}" ${n === state.pageSize ? "selected" : ""}>${n}</option>`).join("")}
          </select>
          条
        </label>
      </div>
      <div class="flex items-center gap-1">
        <button data-page="prev" ${state.page === 1 ? "disabled" : ""} class="inline-flex h-8 min-w-[34px] items-center justify-center rounded-lg border border-slate-200 bg-white px-2 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">
          <i data-lucide="chevron-left" class="h-4 w-4"></i>
        </button>
        ${pageBtns}
        <button data-page="next" ${state.page === maxPage ? "disabled" : ""} class="inline-flex h-8 min-w-[34px] items-center justify-center rounded-lg border border-slate-200 bg-white px-2 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">
          <i data-lucide="chevron-right" class="h-4 w-4"></i>
        </button>
      </div>
    </div>`;
}

function tableSectionHtml() {
  return `
    <div class="overflow-x-auto">
      <table class="w-full min-w-[720px] border-collapse">
        <thead>
          <tr class="border-b border-slate-200 bg-slate-50/60 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
            <th class="px-4 py-3"><button data-sort="id" class="inline-flex items-center gap-1 hover:text-slate-700">ID ${sortIcon("id")}</button></th>
            <th class="px-4 py-3"><button data-sort="name" class="inline-flex items-center gap-1 hover:text-slate-700">用户 ${sortIcon("name")}</button></th>
            <th class="px-4 py-3">角色</th>
            <th class="px-4 py-3">状态</th>
            <th class="px-4 py-3"><button data-sort="created" class="inline-flex items-center gap-1 hover:text-slate-700">注册时间 ${sortIcon("created")}</button></th>
            <th class="px-4 py-3 text-right">操作</th>
          </tr>
        </thead>
        <tbody id="table-body">${rowsHtml()}</tbody>
      </table>
    </div>
    <div id="pagination">${paginationHtml()}</div>`;
}

function navItem(icon, label, active) {
  return `<a href="#" class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
    active ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-600 hover:bg-slate-100"
  }">
    <i data-lucide="${icon}" class="h-4.5 w-4.5"></i><span>${label}</span></a>`;
}

// ---------------- 主渲染 ----------------
function renderShell(container) {
  container.innerHTML = `
    <div class="flex min-h-screen bg-slate-100">
      <!-- 侧边栏 -->
      <aside id="sidebar" class="fixed inset-y-0 left-0 z-40 w-60 -translate-x-full border-r border-slate-200 bg-white transition-transform lg:static lg:translate-x-0">
        <div class="flex h-16 items-center gap-2 border-b border-slate-200 px-5">
          <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white"><i data-lucide="shield" class="h-5 w-5"></i></span>
          <span class="text-base font-semibold text-slate-800">管理后台</span>
        </div>
        <nav class="space-y-1 p-3">
          ${navItem("layout-dashboard", "概览", false)}
          ${navItem("users", "用户管理", true)}
          ${navItem("shopping-cart", "订单管理", false)}
          ${navItem("bar-chart-3", "数据统计", false)}
          ${navItem("settings", "系统设置", false)}
        </nav>
      </aside>
      <div id="overlay" class="fixed inset-0 z-30 hidden bg-slate-900/30 lg:hidden"></div>

      <!-- 主区域 -->
      <div class="flex min-w-0 flex-1 flex-col">
        <!-- 顶部栏 -->
        <header class="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6">
          <div class="flex items-center gap-3">
            <button id="menu-btn" class="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"><i data-lucide="menu" class="h-5 w-5"></i></button>
            <div>
              <h1 class="text-base font-semibold text-slate-800 sm:text-lg">用户管理</h1>
              <p class="hidden text-xs text-slate-400 sm:block">管理系统用户与权限</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-600 sm:inline-flex">
              <i data-lucide="circle" class="h-2 w-2 fill-emerald-500"></i>Mock 数据
            </span>
            <span class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-medium text-slate-600">孟</span>
          </div>
        </header>

        <!-- 内容 -->
        <main class="flex-1 p-4 sm:p-6">
          <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <!-- 工具条 -->
            <div class="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div class="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
                <div class="relative sm:w-72">
                  <i data-lucide="search" class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"></i>
                  <input id="search" type="text" placeholder="搜索 ID / 姓名 / 邮箱" class="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm focus:border-indigo-400 focus:bg-white focus:outline-none" />
                </div>
                <select id="status-filter" class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none">
                  <option value="all">全部状态</option>
                  <option value="active">正常</option>
                  <option value="pending">待审核</option>
                  <option value="disabled">已禁用</option>
                </select>
              </div>
              <button id="add-btn" class="inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                <i data-lucide="plus" class="h-4 w-4"></i>新增用户
              </button>
            </div>
            <!-- 表格 + 分页 -->
            <div id="table-wrap">${tableSectionHtml()}</div>
          </div>
          <p class="mt-4 text-center text-xs text-slate-400">
            WebGen · 后台管理单页面 · 适配 PC / Pad / H5 · 数据可经 <code class="rounded bg-slate-200/60 px-1">/api/users</code> 接入真实接口
          </p>
        </main>
      </div>
    </div>`;
}

function rerenderTable(runtime) {
  applyFilter();
  const wrap = document.getElementById("table-wrap");
  wrap.innerHTML = tableSectionHtml();
  bindTableEvents(runtime);
  runtime.refreshIcons();
}

function bindTableEvents(runtime) {
  const wrap = document.getElementById("table-wrap");
  wrap.querySelectorAll("[data-sort]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-sort");
      if (state.sortKey === key) {
        state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
      } else {
        state.sortKey = key;
        state.sortDir = "asc";
      }
      rerenderTable(runtime);
    });
  });
  wrap.querySelectorAll("[data-page]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const v = btn.getAttribute("data-page");
      const maxPage = Math.max(1, Math.ceil(state.filtered.length / state.pageSize));
      if (v === "prev") state.page = Math.max(1, state.page - 1);
      else if (v === "next") state.page = Math.min(maxPage, state.page + 1);
      else state.page = Number(v);
      rerenderTable(runtime);
    });
  });
  const sizeSel = document.getElementById("page-size");
  if (sizeSel) {
    sizeSel.addEventListener("change", () => {
      state.pageSize = Number(sizeSel.value);
      state.page = 1;
      rerenderTable(runtime);
    });
  }
  wrap.querySelectorAll("[data-act]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const act = btn.getAttribute("data-act");
      const id = btn.getAttribute("data-id");
      if (act === "del") {
        // 演示：仅前端移除
        state.all = state.all.filter((u) => String(u.id) !== id);
        rerenderTable(runtime);
      } else {
        alert(`编辑用户 #${id}（演示占位，可接入真实编辑表单/接口）`);
      }
    });
  });
}

function bindGlobalEvents(runtime) {
  const search = document.getElementById("search");
  let t;
  search.addEventListener("input", () => {
    clearTimeout(t);
    t = setTimeout(() => {
      state.keyword = search.value;
      state.page = 1;
      rerenderTable(runtime);
    }, 200);
  });
  document.getElementById("status-filter").addEventListener("change", (e) => {
    state.status = e.target.value;
    state.page = 1;
    rerenderTable(runtime);
  });
  document.getElementById("add-btn").addEventListener("click", () => {
    alert("新增用户（演示占位，可接入真实表单/接口）");
  });

  // 侧栏抽屉（移动端）
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const open = () => {
    sidebar.classList.remove("-translate-x-full");
    overlay.classList.remove("hidden");
  };
  const close = () => {
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
  };
  document.getElementById("menu-btn").addEventListener("click", open);
  overlay.addEventListener("click", close);
}

export async function mountPage({ container, runtime }) {
  state.all = await loadUsers(runtime);
  applyFilter();
  renderShell(container);
  runtime.refreshIcons();
  bindGlobalEvents(runtime);
  bindTableEvents(runtime);
}

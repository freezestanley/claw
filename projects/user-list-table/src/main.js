import { mockSearch } from './mock.js';

// ---------- 配置 ----------
const DEFAULT_BASE = 'http://localhost:3000';
const LS_BASE = 'ult_base_url';
const ROLE_OPTIONS = [
  { value: '', label: '全部角色' },
  { value: 'admin', label: '管理员 (admin)' },
  { value: 'user', label: '普通用户 (user)' },
  { value: 'editor', label: '编辑 (editor)' },
];
const ROLE_LABEL = { admin: '管理员', user: '普通用户', editor: '编辑' };
const ROLE_BADGE = {
  admin: 'bg-rose-50 text-rose-600 ring-rose-200',
  user: 'bg-sky-50 text-sky-600 ring-sky-200',
  editor: 'bg-amber-50 text-amber-600 ring-amber-200',
};
const PAGE_SIZES = [10, 20, 50];

// ---------- 状态 ----------
const state = {
  baseUrl: localStorage.getItem(LS_BASE) || DEFAULT_BASE,
  q: '',
  role: '',
  department: '',
  page: 1,
  pageSize: 10,
  rows: [],
  total: 0,
  totalPages: 1,
  loading: false,
  error: '',
  usingMock: false,
  sortKey: '',
  sortDir: 1, // 1 升序 -1 降序
};

// ---------- API ----------
async function fetchUsers() {
  const params = {
    q: state.q || '',
    role: state.role || '',
    department: state.department || '',
    page: state.page,
    pageSize: state.pageSize,
  };
  // 去掉空字符串参数（保持 query 干净 + 正确编码由 axios 处理）
  const clean = {};
  Object.entries(params).forEach(([k, v]) => {
    if (v !== '' && v !== null && v !== undefined) clean[k] = v;
  });

  const url = `${state.baseUrl.replace(/\/$/, '')}/users/search`;
  const res = await axios.get(url, { params: clean, timeout: 6000 });
  const body = res.data || {};
  const total =
    Number(res.headers?.['x-total-count']) ||
    body?.pagination?.total ||
    (Array.isArray(body.data) ? body.data.length : 0);
  return {
    rows: Array.isArray(body.data) ? body.data : [],
    total,
    page: body?.pagination?.page || state.page,
    pageSize: body?.pagination?.pageSize || state.pageSize,
    totalPages: body?.pagination?.totalPages || Math.max(Math.ceil(total / state.pageSize), 1),
  };
}

async function load() {
  state.loading = true;
  state.error = '';
  render();
  try {
    const r = await fetchUsers();
    state.rows = r.rows;
    state.total = r.total;
    state.page = r.page;
    state.pageSize = r.pageSize;
    state.totalPages = r.totalPages;
    state.usingMock = false;
  } catch (err) {
    // 降级 mock
    const m = mockSearch({
      q: state.q,
      role: state.role,
      department: state.department,
      page: state.page,
      pageSize: state.pageSize,
    });
    state.rows = m.data;
    state.total = m.pagination.total;
    state.page = m.pagination.page;
    state.totalPages = m.pagination.totalPages;
    state.usingMock = true;
    state.error = `无法连接接口（${state.baseUrl}）：${err?.message || '网络错误'}，已切换为本地 mock 数据演示。`;
  } finally {
    state.loading = false;
    applySort();
    render();
  }
}

// ---------- 前端排序（当前页） ----------
function applySort() {
  if (!state.sortKey) return;
  const k = state.sortKey;
  state.rows = [...state.rows].sort((a, b) => {
    let av = a[k], bv = b[k];
    if (k === 'id') { av = +av; bv = +bv; return (av - bv) * state.sortDir; }
    return String(av).localeCompare(String(bv), 'zh') * state.sortDir;
  });
}

// ---------- 渲染 ----------
const app = document.getElementById('app');

function render() {
  app.innerHTML = `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      ${headerHtml()}
      ${toolbarHtml()}
      ${state.error ? errorBarHtml() : ''}
      <div class="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 overflow-hidden mt-4">
        ${tableHtml()}
      </div>
      ${footerHtml()}
    </div>
    <div id="modal-root"></div>
  `;
  bindEvents();
  if (window.lucide) window.lucide.createIcons();
}

function headerHtml() {
  return `
    <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
      <div>
        <h1 class="text-xl sm:text-2xl font-semibold text-slate-900 flex items-center gap-2">
          <i data-lucide="users" class="w-6 h-6 text-sky-500"></i> 用户列表
        </h1>
        <p class="text-sm text-slate-500 mt-1">通用用户管理 demo · 搜索 / 筛选 / 分页 / 详情查看</p>
      </div>
      <div class="flex items-center gap-2">
        <label class="text-xs text-slate-400 whitespace-nowrap">接口 Base URL</label>
        <input id="base-input" value="${escapeAttr(state.baseUrl)}"
          class="w-44 sm:w-56 text-sm px-2.5 py-1.5 rounded-lg ring-1 ring-slate-200 focus:ring-sky-400 outline-none bg-white"
          placeholder="${DEFAULT_BASE}" />
        <button id="base-save" class="text-sm px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">应用</button>
      </div>
    </div>`;
}

function toolbarHtml() {
  return `
    <div class="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-3 sm:p-4 mt-5">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div class="relative">
          <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
          <input id="q-input" value="${escapeAttr(state.q)}" placeholder="搜索姓名 / 邮箱"
            class="w-full pl-9 pr-3 py-2 text-sm rounded-lg ring-1 ring-slate-200 focus:ring-sky-400 outline-none" />
        </div>
        <select id="role-select" class="w-full px-3 py-2 text-sm rounded-lg ring-1 ring-slate-200 focus:ring-sky-400 outline-none bg-white">
          ${ROLE_OPTIONS.map((o) => `<option value="${o.value}" ${o.value === state.role ? 'selected' : ''}>${o.label}</option>`).join('')}
        </select>
        <input id="dept-input" value="${escapeAttr(state.department)}" placeholder="部门（精确，如 技术部）"
          class="w-full px-3 py-2 text-sm rounded-lg ring-1 ring-slate-200 focus:ring-sky-400 outline-none" />
        <div class="flex gap-2">
          <button id="search-btn" class="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-sky-500 hover:bg-sky-600 text-white">
            <i data-lucide="filter" class="w-4 h-4"></i> 查询
          </button>
          <button id="reset-btn" class="px-3 py-2 text-sm rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600">重置</button>
        </div>
      </div>
    </div>`;
}

function errorBarHtml() {
  return `
    <div class="mt-4 flex items-start gap-2 text-sm text-amber-700 bg-amber-50 ring-1 ring-amber-200 rounded-xl px-3.5 py-2.5">
      <i data-lucide="alert-triangle" class="w-4 h-4 mt-0.5 shrink-0"></i>
      <span>${escapeHtml(state.error)}</span>
    </div>`;
}

function sortIcon(key) {
  if (state.sortKey !== key) return '<i data-lucide="chevrons-up-down" class="w-3.5 h-3.5 text-slate-300"></i>';
  return state.sortDir === 1
    ? '<i data-lucide="chevron-up" class="w-3.5 h-3.5 text-sky-500"></i>'
    : '<i data-lucide="chevron-down" class="w-3.5 h-3.5 text-sky-500"></i>';
}

const COLS = [
  { key: 'id', label: 'ID', w: 'w-16' },
  { key: 'name', label: '姓名' },
  { key: 'email', label: '邮箱' },
  { key: 'role', label: '角色' },
  { key: 'department', label: '部门' },
];

function tableHtml() {
  if (state.loading) return skeletonHtml();
  if (!state.rows.length) return emptyHtml();

  const head = COLS.map(
    (c) => `<th class="px-4 py-3 text-left font-medium text-slate-500 select-none ${c.w || ''}">
      <button data-sort="${c.key}" class="inline-flex items-center gap-1 hover:text-slate-700">${c.label} ${sortIcon(c.key)}</button>
    </th>`
  ).join('');

  // PC/Pad 表格视图
  const rowsDesktop = state.rows.map((u, i) => `
    <tr class="border-t border-slate-100 hover:bg-slate-50/70 fade-in" style="animation-delay:${i * 12}ms">
      <td class="px-4 py-3 text-slate-400 tabular-nums">${u.id}</td>
      <td class="px-4 py-3 font-medium text-slate-800">${escapeHtml(u.name)}</td>
      <td class="px-4 py-3 text-slate-600">${escapeHtml(u.email)}</td>
      <td class="px-4 py-3">${roleBadge(u.role)}</td>
      <td class="px-4 py-3 text-slate-600">${escapeHtml(u.department)}</td>
      <td class="px-4 py-3 text-right">
        <button data-view="${u.id}" class="inline-flex items-center gap-1 text-sky-600 hover:text-sky-700 text-sm font-medium">
          <i data-lucide="eye" class="w-4 h-4"></i> 查看
        </button>
      </td>
    </tr>`).join('');

  const desktop = `
    <div class="hidden md:block overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-slate-50/80 text-xs uppercase tracking-wide">
          <tr>${head}<th class="px-4 py-3"></th></tr>
        </thead>
        <tbody>${rowsDesktop}</tbody>
      </table>
    </div>`;

  // H5 卡片视图
  const cards = `
    <div class="md:hidden divide-y divide-slate-100">
      ${state.rows.map((u, i) => `
        <div class="p-4 fade-in" style="animation-delay:${i * 12}ms">
          <div class="flex items-center justify-between">
            <div class="font-medium text-slate-800">${escapeHtml(u.name)}
              <span class="text-xs text-slate-400 ml-1">#${u.id}</span>
            </div>
            ${roleBadge(u.role)}
          </div>
          <div class="mt-1.5 text-sm text-slate-500 break-all">${escapeHtml(u.email)}</div>
          <div class="mt-1 flex items-center justify-between">
            <span class="text-sm text-slate-600">${escapeHtml(u.department)}</span>
            <button data-view="${u.id}" class="inline-flex items-center gap-1 text-sky-600 text-sm font-medium">
              <i data-lucide="eye" class="w-4 h-4"></i> 查看
            </button>
          </div>
        </div>`).join('')}
    </div>`;

  return desktop + cards;
}

function roleBadge(role) {
  const cls = ROLE_BADGE[role] || 'bg-slate-50 text-slate-600 ring-slate-200';
  return `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs ring-1 ${cls}">${ROLE_LABEL[role] || role}</span>`;
}

function skeletonHtml() {
  return `
    <div class="p-4 space-y-3">
      ${Array.from({ length: 6 }).map(() => `
        <div class="flex gap-3 animate-pulse">
          <div class="h-4 w-10 bg-slate-100 rounded"></div>
          <div class="h-4 w-24 bg-slate-100 rounded"></div>
          <div class="h-4 flex-1 bg-slate-100 rounded"></div>
          <div class="h-4 w-16 bg-slate-100 rounded"></div>
        </div>`).join('')}
    </div>`;
}

function emptyHtml() {
  return `
    <div class="py-16 flex flex-col items-center text-center text-slate-400">
      <i data-lucide="inbox" class="w-10 h-10 mb-3"></i>
      <p class="text-sm">没有匹配的用户</p>
      <p class="text-xs mt-1">试试调整搜索关键字或筛选条件</p>
    </div>`;
}

function footerHtml() {
  const from = state.total === 0 ? 0 : (state.page - 1) * state.pageSize + 1;
  const to = Math.min(state.page * state.pageSize, state.total);
  return `
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 text-sm text-slate-600">
      <div class="flex items-center gap-3">
        <span>共 <b class="text-slate-800">${state.total}</b> 条</span>
        <span class="text-slate-300">|</span>
        <label class="flex items-center gap-1.5">每页
          <select id="ps-select" class="px-2 py-1 rounded-lg ring-1 ring-slate-200 outline-none bg-white">
            ${PAGE_SIZES.map((n) => `<option value="${n}" ${n === state.pageSize ? 'selected' : ''}>${n}</option>`).join('')}
          </select>条
        </label>
        ${state.total ? `<span class="text-slate-400">显示 ${from}-${to}</span>` : ''}
      </div>
      ${pagerHtml()}
    </div>`;
}

function pagerHtml() {
  const pages = pageNumbers(state.page, state.totalPages);
  const btn = (label, page, disabled, active) => `
    <button data-page="${page}" ${disabled ? 'disabled' : ''}
      class="min-w-[34px] h-[34px] px-2 rounded-lg text-sm border ${active
        ? 'bg-sky-500 text-white border-sky-500'
        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'} ${disabled ? 'opacity-40 cursor-not-allowed' : ''}">
      ${label}</button>`;
  return `
    <div class="flex items-center gap-1.5 flex-wrap">
      ${btn('上一页', state.page - 1, state.page <= 1, false)}
      ${pages.map((p) => (p === '...'
        ? `<span class="px-1 text-slate-400">…</span>`
        : btn(p, p, false, p === state.page))).join('')}
      ${btn('下一页', state.page + 1, state.page >= state.totalPages, false)}
    </div>`;
}

function pageNumbers(cur, totalPages) {
  const out = [];
  const range = (a, b) => { for (let i = a; i <= b; i++) out.push(i); };
  if (totalPages <= 7) { range(1, totalPages); return out; }
  out.push(1);
  if (cur > 4) out.push('...');
  range(Math.max(2, cur - 1), Math.min(totalPages - 1, cur + 1));
  if (cur < totalPages - 3) out.push('...');
  out.push(totalPages);
  return out;
}

// ---------- 详情弹层 ----------
function openDetail(id) {
  const u = state.rows.find((r) => String(r.id) === String(id));
  if (!u) return;
  const root = document.getElementById('modal-root');
  root.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div data-close class="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]"></div>
      <div class="relative bg-white rounded-2xl shadow-xl ring-1 ring-slate-200 w-full max-w-md p-6 fade-in">
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-semibold text-lg">
              ${escapeHtml(u.name.slice(0, 1))}
            </div>
            <div>
              <div class="font-semibold text-slate-900">${escapeHtml(u.name)}</div>
              <div class="text-xs text-slate-400">用户 ID #${u.id}</div>
            </div>
          </div>
          <button data-close class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>
        <dl class="mt-5 space-y-3 text-sm">
          ${detailRow('邮箱', u.email)}
          ${detailRow('角色', `${ROLE_LABEL[u.role] || u.role}（${u.role}）`)}
          ${detailRow('部门', u.department)}
        </dl>
        <div class="mt-6 text-right">
          <button data-close class="px-4 py-2 text-sm rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">关闭</button>
        </div>
      </div>
    </div>`;
  if (window.lucide) window.lucide.createIcons();
  root.querySelectorAll('[data-close]').forEach((el) =>
    el.addEventListener('click', () => (root.innerHTML = '')));
}

function detailRow(label, value) {
  return `<div class="flex justify-between gap-4 border-b border-slate-50 pb-2">
    <dt class="text-slate-400">${label}</dt>
    <dd class="text-slate-800 text-right break-all">${escapeHtml(String(value))}</dd>
  </div>`;
}

// ---------- 事件绑定 ----------
function bindEvents() {
  const $ = (id) => document.getElementById(id);

  $('base-save')?.addEventListener('click', () => {
    const v = $('base-input').value.trim() || DEFAULT_BASE;
    state.baseUrl = v;
    localStorage.setItem(LS_BASE, v);
    state.page = 1;
    load();
  });

  const doSearch = () => {
    state.q = $('q-input').value.trim();
    state.role = $('role-select').value;
    state.department = $('dept-input').value.trim();
    state.page = 1; // 搜索/筛选回第 1 页
    load();
  };
  $('search-btn')?.addEventListener('click', doSearch);
  $('q-input')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') doSearch(); });
  $('dept-input')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') doSearch(); });
  $('role-select')?.addEventListener('change', doSearch);

  $('reset-btn')?.addEventListener('click', () => {
    state.q = ''; state.role = ''; state.department = '';
    state.sortKey = ''; state.page = 1;
    load();
  });

  $('ps-select')?.addEventListener('change', (e) => {
    state.pageSize = parseInt(e.target.value, 10) || 10;
    state.page = 1;
    load();
  });

  document.querySelectorAll('[data-page]').forEach((b) =>
    b.addEventListener('click', () => {
      const p = parseInt(b.dataset.page, 10);
      if (p >= 1 && p <= state.totalPages && p !== state.page) { state.page = p; load(); }
    }));

  document.querySelectorAll('[data-sort]').forEach((b) =>
    b.addEventListener('click', () => {
      const k = b.dataset.sort;
      if (state.sortKey === k) state.sortDir *= -1;
      else { state.sortKey = k; state.sortDir = 1; }
      applySort();
      render();
    }));

  document.querySelectorAll('[data-view]').forEach((b) =>
    b.addEventListener('click', () => openDetail(b.dataset.view)));
}

// ---------- 工具 ----------
function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function escapeAttr(s) { return escapeHtml(s); }

// ---------- 启动 ----------
load();

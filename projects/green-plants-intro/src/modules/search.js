// 查询模块：GET /users/search（建议登录后可用）
import { request, escapeHtml } from "../lib/http.js";
import { store } from "../lib/store.js";

export function initSearch() {
  const qEl = document.getElementById("sQ");
  const roleEl = document.getElementById("sRole");
  const deptEl = document.getElementById("sDept");
  const pageEl = document.getElementById("sPage");
  const pageSizeEl = document.getElementById("sPageSize");
  const searchBtn = document.getElementById("searchBtn");
  const resetBtn = document.getElementById("searchReset");
  const msgEl = document.getElementById("searchMsg");
  const tableWrap = document.getElementById("searchTableWrap");
  const tbody = document.getElementById("searchTbody");
  const pageInfo = document.getElementById("searchPageInfo");
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");
  const gateEl = document.getElementById("searchGate");
  const panelEl = document.getElementById("searchPanel");

  let lastTotalPages = 1;

  searchBtn.addEventListener("click", () => { pageEl.value = "1"; doSearch(); });
  [qEl, deptEl, pageSizeEl].forEach((el) =>
    el.addEventListener("keydown", (e) => { if (e.key === "Enter") { pageEl.value = "1"; doSearch(); } })
  );
  resetBtn.addEventListener("click", () => {
    qEl.value = ""; roleEl.value = ""; deptEl.value = "";
    pageEl.value = "1"; pageSizeEl.value = "10";
    tableWrap.classList.add("hidden");
    setMsg("", "");
  });
  prevBtn.addEventListener("click", () => {
    const p = Math.max(1, (parseInt(pageEl.value, 10) || 1) - 1);
    pageEl.value = String(p);
    doSearch();
  });
  nextBtn.addEventListener("click", () => {
    const p = (parseInt(pageEl.value, 10) || 1) + 1;
    if (p > lastTotalPages) return;
    pageEl.value = String(p);
    doSearch();
  });

  // 登录态门控
  store.onChange(applyGate);
  applyGate(store.snapshot());

  function applyGate(s) {
    if (s.loggedIn) {
      gateEl.classList.add("hidden");
      panelEl.classList.remove("is-locked");
    } else {
      gateEl.classList.remove("hidden");
      panelEl.classList.add("is-locked");
    }
  }

  function setMsg(text, type) {
    if (!text) {
      msgEl.className = "search-msg hidden";
      msgEl.textContent = "";
      return;
    }
    msgEl.textContent = text;
    msgEl.className = "search-msg search-msg--" + type;
  }

  function buildQuery() {
    const params = new URLSearchParams();
    const q = qEl.value.trim();
    const role = roleEl.value;
    const dept = deptEl.value.trim();
    let page = parseInt(pageEl.value, 10);
    let pageSize = parseInt(pageSizeEl.value, 10);
    if (!Number.isFinite(page) || page < 1) page = 1;
    if (!Number.isFinite(pageSize) || pageSize < 1) pageSize = 10;
    if (pageSize > 50) pageSize = 50;
    pageEl.value = String(page);
    pageSizeEl.value = String(pageSize);

    if (q) params.set("q", q);
    if (role) params.set("role", role);
    if (dept) params.set("department", dept); // URLSearchParams 自动对中文编码
    params.set("page", String(page));
    params.set("pageSize", String(pageSize));
    return params.toString();
  }

  async function doSearch() {
    if (!store.snapshot().loggedIn) {
      setMsg("请先登录后再进行查询。", "warn");
      return;
    }
    searchBtn.disabled = true;
    searchBtn.dataset.loading = "1";
    setMsg("查询中…", "info");
    const qs = buildQuery();
    const result = await request("/users/search?" + qs, { method: "GET", withAuth: true });
    searchBtn.disabled = false;
    delete searchBtn.dataset.loading;

    if (result.networkError) {
      tableWrap.classList.add("hidden");
      setMsg(result.message || "网络异常，请稍后重试。", "error");
      return;
    }
    if (result.status === 401) {
      tableWrap.classList.add("hidden");
      setMsg("登录已失效，请重新登录后再查询。", "error");
      return;
    }
    if (!result.ok || !result.data || !Array.isArray(result.data.data)) {
      tableWrap.classList.add("hidden");
      const m = (result.data && (result.data.message || result.data.error)) || ("查询失败（HTTP " + result.status + "）");
      setMsg(m, "error");
      return;
    }

    // X-Total-Count（跨域需后端 expose），读不到回退 pagination.total
    let totalFromHeader = null;
    if (result.headers) {
      const h = result.headers.get("X-Total-Count");
      if (h != null && h !== "") totalFromHeader = Number(h);
    }

    const rows = result.data.data;
    const pg = result.data.pagination || {};
    const total = totalFromHeader != null && Number.isFinite(totalFromHeader)
      ? totalFromHeader
      : (pg.total != null ? pg.total : rows.length);
    const page = pg.page || parseInt(pageEl.value, 10) || 1;
    const pageSize = pg.pageSize || parseInt(pageSizeEl.value, 10) || 10;
    lastTotalPages = pg.totalPages || Math.max(1, Math.ceil(total / pageSize));

    renderRows(rows);
    if (!rows.length) {
      setMsg("没有匹配的用户。", "info");
    } else {
      setMsg("", "");
    }
    pageInfo.textContent = `第 ${page}/${lastTotalPages} 页 · 共 ${total} 条 · 本页 ${rows.length} 条`;
    prevBtn.disabled = page <= 1;
    nextBtn.disabled = page >= lastTotalPages;
    prevBtn.classList.toggle("is-disabled", prevBtn.disabled);
    nextBtn.classList.toggle("is-disabled", nextBtn.disabled);
    tableWrap.classList.remove("hidden");
  }

  function renderRows(rows) {
    if (!rows.length) {
      tbody.innerHTML = `<tr><td colspan="5" class="td-empty">无匹配结果</td></tr>`;
      return;
    }
    tbody.innerHTML = rows
      .map(
        (u) => `<tr>
          <td class="td-id">${escapeHtml(u.id)}</td>
          <td class="td-name">${escapeHtml(u.name)}</td>
          <td class="td-email">${escapeHtml(u.email)}</td>
          <td><span class="chip chip--role">${escapeHtml(u.role)}</span></td>
          <td>${escapeHtml(u.department)}</td>
        </tr>`
      )
      .join("");
  }
}

import { request, escapeHtml } from "../lib/http.js";
import { renderResult, showPending } from "../ui/respPanel.js";

export function initSearch(store) {
  const qEl = document.getElementById("sQ");
  const roleEl = document.getElementById("sRole");
  const deptEl = document.getElementById("sDept");
  const pageEl = document.getElementById("sPage");
  const pageSizeEl = document.getElementById("sPageSize");
  const searchBtn = document.getElementById("searchBtn");
  const resetBtn = document.getElementById("searchReset");
  const respEl = document.getElementById("searchResp");
  const tableWrap = document.getElementById("searchTableWrap");
  const tbody = document.getElementById("searchTbody");
  const pageInfo = document.getElementById("searchPageInfo");
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");

  let lastTotalPages = 1;

  searchBtn.addEventListener("click", () => doSearch());
  [qEl, deptEl, pageSizeEl].forEach((el) =>
    el.addEventListener("keydown", (e) => { if (e.key === "Enter") doSearch(); })
  );
  resetBtn.addEventListener("click", () => {
    qEl.value = ""; roleEl.value = ""; deptEl.value = "";
    pageEl.value = "1"; pageSizeEl.value = "10";
    tableWrap.classList.add("hidden");
    respEl.classList.add("hidden");
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

    if (q) params.set("q", q);            // URLSearchParams 自动编码
    if (role) params.set("role", role);
    if (dept) params.set("department", dept); // 中文自动 encodeURIComponent
    params.set("page", String(page));
    params.set("pageSize", String(pageSize));
    return params.toString();
  }

  async function doSearch() {
    searchBtn.disabled = true;
    showPending(respEl);
    const qs = buildQuery();
    const result = await request("/users/search?" + qs, { method: "GET", withAuth: true });
    searchBtn.disabled = false;

    // 读 X-Total-Count（跨域需后端 expose），读不到回退 pagination.total
    let totalFromHeader = null;
    if (result.headers) {
      const h = result.headers.get("X-Total-Count");
      if (h != null && h !== "") totalFromHeader = Number(h);
    }
    let extra = "";
    if (totalFromHeader != null && Number.isFinite(totalFromHeader)) {
      extra = `<span class="rounded bg-sky-900/40 px-2 py-0.5 text-sky-300">X-Total-Count: ${totalFromHeader}</span>`;
    }
    renderResult(respEl, result, { extraHeader: extra });

    if (result.ok && result.data && Array.isArray(result.data.data)) {
      const rows = result.data.data;
      const pg = result.data.pagination || {};
      const total = totalFromHeader != null && Number.isFinite(totalFromHeader)
        ? totalFromHeader
        : (pg.total != null ? pg.total : rows.length);
      const page = pg.page || parseInt(pageEl.value, 10) || 1;
      const pageSize = pg.pageSize || parseInt(pageSizeEl.value, 10) || 10;
      lastTotalPages = pg.totalPages || Math.max(1, Math.ceil(total / pageSize));

      renderRows(rows);
      pageInfo.textContent = `第 ${page}/${lastTotalPages} 页 · 共 ${total} 条 · 本页 ${rows.length} 条`;
      prevBtn.disabled = page <= 1;
      nextBtn.disabled = page >= lastTotalPages;
      prevBtn.classList.toggle("opacity-40", prevBtn.disabled);
      nextBtn.classList.toggle("opacity-40", nextBtn.disabled);
      tableWrap.classList.remove("hidden");
    } else {
      tableWrap.classList.add("hidden");
    }
  }

  function renderRows(rows) {
    if (!rows.length) {
      tbody.innerHTML = `<tr><td colspan="5" class="px-3 py-4 text-center text-slate-500">无匹配结果</td></tr>`;
      return;
    }
    tbody.innerHTML = rows
      .map(
        (u) => `<tr class="text-slate-300">
          <td class="px-3 py-2 text-slate-500">${escapeHtml(u.id)}</td>
          <td class="px-3 py-2 text-slate-100">${escapeHtml(u.name)}</td>
          <td class="px-3 py-2 text-amber-200">${escapeHtml(u.email)}</td>
          <td class="px-3 py-2"><span class="rounded bg-slate-800 px-1.5 py-0.5 text-[11px]">${escapeHtml(u.role)}</span></td>
          <td class="px-3 py-2">${escapeHtml(u.department)}</td>
        </tr>`
      )
      .join("");
  }
}

// 响应可视化：状态码徽章 + 耗时 + 原始 JSON 高亮

import { escapeHtml } from "../lib/http.js";

export function statusBadge(status) {
  let cls = "bg-slate-700 text-slate-200";
  if (status === 0) cls = "bg-rose-900/60 text-rose-300 ring-1 ring-rose-700";
  else if (status >= 200 && status < 300) cls = "bg-emerald-900/50 text-emerald-300 ring-1 ring-emerald-700";
  else if (status >= 300 && status < 400) cls = "bg-sky-900/50 text-sky-300 ring-1 ring-sky-700";
  else if (status >= 400 && status < 500) cls = "bg-amber-900/50 text-amber-300 ring-1 ring-amber-700";
  else if (status >= 500) cls = "bg-rose-900/50 text-rose-300 ring-1 ring-rose-700";
  const label = status === 0 ? "ERR" : status;
  return `<span class="inline-flex items-center rounded px-2 py-0.5 text-xs font-bold ${cls}">${label}</span>`;
}

function highlightJson(value) {
  let json;
  try {
    json = typeof value === "string" ? value : JSON.stringify(value, null, 2);
  } catch {
    json = String(value);
  }
  json = escapeHtml(json);
  // 简易语法高亮
  json = json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g,
    (m) => {
      let cls = "text-emerald-300"; // number
      if (/^"/.test(m)) {
        cls = /:$/.test(m) ? "text-sky-300" : "text-amber-200"; // key vs string
      } else if (/true|false/.test(m)) cls = "text-violet-300";
      else if (/null/.test(m)) cls = "text-rose-300";
      return `<span class="${cls}">${m}</span>`;
    }
  );
  return json;
}

// 把 result（来自 http.request）渲染进 panel 容器
export function renderResult(panelEl, result, { extraHeader = "" } = {}) {
  if (!panelEl) return;
  const meta = `
    <div class="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-2">
      ${statusBadge(result.status)}
      <span class="rounded bg-slate-800 px-2 py-0.5">${result.ms} ms</span>
      ${result.networkError ? '<span class="rounded bg-rose-900/40 px-2 py-0.5 text-rose-300">网络错误</span>' : ""}
      ${extraHeader}
    </div>`;

  let bodyHtml;
  if (result.networkError) {
    bodyHtml = `<pre class="whitespace-pre-wrap break-words text-rose-300 text-xs leading-relaxed">${escapeHtml(result.message)}</pre>`;
  } else {
    const content = result.data != null ? result.data : (result.raw || "(空响应)");
    bodyHtml = `<pre class="whitespace-pre-wrap break-words text-xs leading-relaxed nice-scroll overflow-auto max-h-72">${highlightJson(content)}</pre>`;
  }

  panelEl.innerHTML = meta + bodyHtml;
  panelEl.classList.remove("hidden");
}

export function showPending(panelEl, label = "请求中…") {
  if (!panelEl) return;
  panelEl.innerHTML = `<div class="flex items-center gap-2 text-xs text-slate-400"><span class="h-2 w-2 animate-pulse rounded-full bg-emerald-400"></span>${escapeHtml(label)}</div>`;
  panelEl.classList.remove("hidden");
}

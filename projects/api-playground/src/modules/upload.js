import { request, getBaseUrl, fmtSize, escapeHtml } from "../lib/http.js";
import { renderResult, showPending } from "../ui/respPanel.js";

const MAX_FILES = 5;
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export function initUpload(store) {
  const fileInput = document.getElementById("fileInput");
  const fileList = document.getElementById("fileList");
  const uploadBtn = document.getElementById("uploadBtn");
  const clearBtn = document.getElementById("uploadClear");
  const respEl = document.getElementById("uploadResp");
  const filesEl = document.getElementById("uploadFiles");

  let selected = [];

  fileInput.addEventListener("change", () => {
    selected = Array.from(fileInput.files || []);
    if (selected.length > MAX_FILES) {
      selected = selected.slice(0, MAX_FILES);
      flashHint(`最多 5 个文件，已只保留前 ${MAX_FILES} 个`);
    }
    renderFileList();
  });

  clearBtn.addEventListener("click", () => {
    selected = [];
    fileInput.value = "";
    renderFileList();
    respEl.classList.add("hidden");
    filesEl.classList.add("hidden");
  });

  uploadBtn.addEventListener("click", doUpload);

  function renderFileList() {
    if (!selected.length) {
      fileList.innerHTML = "";
      uploadBtn.disabled = true;
      return;
    }
    const anyTooBig = selected.some((f) => f.size > MAX_SIZE);
    fileList.innerHTML = selected
      .map((f) => {
        const tooBig = f.size > MAX_SIZE;
        return `<div class="flex items-center justify-between rounded-lg border ${tooBig ? "border-rose-700 bg-rose-950/30" : "border-slate-800 bg-slate-950/50"} px-3 py-2 text-xs">
          <span class="truncate text-slate-200" title="${escapeHtml(f.name)}">${escapeHtml(f.name)}</span>
          <span class="ml-3 shrink-0 ${tooBig ? "text-rose-300" : "text-slate-400"}">${fmtSize(f.size)}${tooBig ? " · 超过10MB" : ""}</span>
        </div>`;
      })
      .join("");
    uploadBtn.disabled = anyTooBig;
  }

  async function doUpload() {
    if (!selected.length) {
      // 模拟无文件 400 场景由后端返回；这里直接发空 FormData 也可触发
    }
    const oversize = selected.filter((f) => f.size > MAX_SIZE);
    if (oversize.length) {
      flashHint("存在超过 10MB 的文件，请移除后重试");
      return;
    }
    uploadBtn.disabled = true;
    showPending(respEl, "上传中…");

    // FormData：不手动设 Content-Type，浏览器自动加 boundary
    const fd = new FormData();
    selected.forEach((f, i) => fd.append("file" + i, f, f.name));

    const result = await request("/upload", { method: "POST", body: fd, withAuth: true });
    uploadBtn.disabled = selected.some((f) => f.size > MAX_SIZE) || false;

    let extra = "";
    if (result.status === 400 && result.data && result.data.success === false) {
      extra = `<span class="rounded bg-amber-900/40 px-2 py-0.5 text-amber-300">${escapeHtml(result.data.message || "无文件")}</span>`;
    }
    renderResult(respEl, result, { extraHeader: extra });

    if (result.ok && result.data && Array.isArray(result.data.files)) {
      renderUploaded(result.data.files);
    } else {
      filesEl.classList.add("hidden");
    }
  }

  function renderUploaded(files) {
    const base = getBaseUrl();
    if (!files.length) {
      filesEl.innerHTML = `<div class="text-xs text-slate-500">返回 files 为空</div>`;
      filesEl.classList.remove("hidden");
      return;
    }
    filesEl.innerHTML =
      `<div class="text-[11px] font-semibold uppercase tracking-wide text-slate-500">已上传文件</div>` +
      files
        .map((f) => {
          const href = f.path ? joinUrl(base, f.path) : null;
          return `<div class="rounded-lg border border-emerald-900/40 bg-emerald-950/10 p-3 text-xs">
            <div class="mb-1 flex flex-wrap items-center gap-2">
              <span class="font-semibold text-slate-100">${escapeHtml(f.originalName)}</span>
              <span class="rounded bg-slate-800 px-1.5 py-0.5 text-slate-400">${escapeHtml(f.mimetype)}</span>
              <span class="text-slate-400">${fmtSize(f.size)}</span>
            </div>
            <div class="grid grid-cols-1 gap-0.5 text-[11px] text-slate-400 sm:grid-cols-2">
              <div><span class="text-slate-600">savedName</span> ${escapeHtml(f.savedName)}</div>
              <div class="break-all"><span class="text-slate-600">path</span> ${escapeHtml(f.path)}</div>
            </div>
            ${href ? `<a href="${escapeHtml(href)}" target="_blank" rel="noopener"
                class="mt-1 inline-block break-all text-emerald-400 underline decoration-emerald-700 hover:text-emerald-300">${escapeHtml(href)}</a>` : ""}
          </div>`;
        })
        .join("");
    filesEl.classList.remove("hidden");
  }

  function joinUrl(base, path) {
    if (/^https?:\/\//i.test(path)) return path;
    return base.replace(/\/+$/, "") + "/" + String(path).replace(/^\/+/, "");
  }

  function flashHint(msg) {
    showPending(respEl, msg);
    respEl.classList.remove("hidden");
    respEl.innerHTML = `<div class="text-xs text-amber-300">${escapeHtml(msg)}</div>`;
  }
}

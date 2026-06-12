// Base URL 设置（可配置）：默认常量来自 http.js，可运行时覆盖到 localStorage
import { DEFAULT_BASE_URL, getBaseUrl, setBaseUrl } from "../lib/http.js";

export function initSettings() {
  const input = document.getElementById("baseUrlInput");
  const saveBtn = document.getElementById("baseUrlSave");
  const resetBtn = document.getElementById("baseUrlReset");
  const hint = document.getElementById("baseUrlHint");
  if (!input) return;

  input.value = getBaseUrl();
  input.placeholder = DEFAULT_BASE_URL;
  syncEcho();

  function syncEcho() {
    const echo = document.getElementById("baseUrlEcho");
    if (echo) echo.textContent = getBaseUrl();
  }

  function flash(text) {
    hint.textContent = text;
    hint.classList.add("show");
    setTimeout(() => hint.classList.remove("show"), 1800);
  }

  saveBtn.addEventListener("click", () => {
    const v = input.value.trim();
    setBaseUrl(v);
    input.value = getBaseUrl();
    syncEcho();
    flash("已保存：" + getBaseUrl());
  });
  resetBtn.addEventListener("click", () => {
    setBaseUrl("");
    input.value = getBaseUrl();
    syncEcho();
    flash("已恢复默认：" + DEFAULT_BASE_URL);
  });
}

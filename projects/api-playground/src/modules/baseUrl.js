import { getBaseUrl, setBaseUrl, getToken, LS } from "../lib/http.js";

export function initBaseUrl() {
  const input = document.getElementById("baseUrl");
  const saveBtn = document.getElementById("baseUrlSave");
  const status = document.getElementById("globalStatus");

  input.value = getBaseUrl();
  refresh();

  saveBtn.addEventListener("click", () => {
    const v = input.value.trim();
    if (!v) {
      status.innerHTML = `<span class="text-amber-400">Base URL 不能为空</span>`;
      return;
    }
    setBaseUrl(v);
    input.value = getBaseUrl();
    flash(saveBtn, "已保存");
    refresh();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") saveBtn.click();
  });

  function refresh() {
    const tok = getToken();
    const tokenTxt = tok
      ? `<span class="text-emerald-400">已登录（token 已存）</span>`
      : `<span class="text-slate-500">未登录</span>`;
    status.innerHTML = `当前 Base URL：<span class="text-emerald-300">${getBaseUrl()}</span> · ${tokenTxt}`;
  }

  function flash(btn, txt) {
    const old = btn.textContent;
    btn.textContent = txt;
    setTimeout(() => (btn.textContent = old), 1000);
  }

  // 返回共享 store，供其它模块刷新全局状态
  return {
    refreshGlobal: refresh,
    keys: LS,
  };
}

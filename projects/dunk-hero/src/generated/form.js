// 报名表单：开发期走前端 mock（无真实后端），含本地校验与成功态。
export function initForm(root, runtime) {
  const form = root.querySelector("#join-form");
  if (!form) return;

  const nameInput = form.querySelector("#jf-name");
  const emailInput = form.querySelector("#jf-email");
  const success = form.querySelector("#jf-success");
  const label = form.querySelector(".js-label");

  const showErr = (field, show) => {
    const node = form.querySelector(`[data-err="${field}"]`);
    if (node) node.classList.toggle("hidden", !show);
  };

  const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    const nameOk = name.length > 0;
    const emailOk = validEmail(email);
    showErr("name", !nameOk);
    showErr("email", !emailOk);
    if (!nameOk || !emailOk) {
      (nameOk ? emailInput : nameInput).focus();
      return;
    }

    label.textContent = "起飞中…";

    // mock 提交：若后续接入真实接口，改为 runtime.api.post("/api/signup", {...})
    try {
      // 预留真实接口位（当前 mock，不真正请求）
      await new Promise((r) => setTimeout(r, 600));
      void runtime; // runtime.api 可用，当前走 mock
      success.classList.remove("hidden");
      form.querySelectorAll("input").forEach((i) => (i.value = ""));
      label.textContent = "已报名 ✓";
    } catch (err) {
      label.textContent = "重试报名 →";
    }
  });
}

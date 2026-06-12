export function mountPage({ container, runtime }) {
  container.innerHTML = `
    <section class="hiagent-stage">
      <h1 class="hiagent-text">hiagent</h1>
    </section>
  `;

  // 保留模版运行时能力（图标刷新等）
  if (runtime && typeof runtime.refreshIcons === "function") {
    runtime.refreshIcons();
  }
}

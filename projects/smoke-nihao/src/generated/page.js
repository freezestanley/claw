export function mountPage({ container, runtime }) {
  container.innerHTML = `
    <section
      class="flex min-h-[70vh] w-full items-center justify-center px-4 py-10"
      aria-label="冒烟测试页面"
    >
      <h1
        class="select-none text-center font-semibold leading-none text-white"
        style="font-size: clamp(4rem, 22vw, 16rem);"
      >
        你好
      </h1>
    </section>
  `;

  runtime.refreshIcons();
}

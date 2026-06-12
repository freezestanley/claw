export function mountPage({ container }) {
  container.innerHTML = `
    <section class="flex min-h-[60vh] items-center justify-center">
      <h1 class="text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl">
        hi world
      </h1>
    </section>
  `;
}

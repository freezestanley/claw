// 轻量入场动效：IntersectionObserver 触发 reveal；尊重 prefers-reduced-motion
export function initMotion() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const els = document.querySelectorAll(".reveal");

  if (reduce || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  els.forEach((el, i) => {
    el.style.setProperty("--reveal-delay", (i % 6) * 60 + "ms");
    io.observe(el);
  });
}

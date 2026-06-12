const { animate } = window.anime || {};
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function revealOnScroll() {
  const els = Array.from(document.querySelectorAll(".reveal"));
  if (reduce || !animate) {
    els.forEach((el) => {
      el.style.opacity = 1;
      el.style.transform = "none";
    });
    return;
  }
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const siblings = Array.from(
          entry.target.parentElement?.querySelectorAll(":scope > .reveal") || [entry.target]
        ).filter((n) => n === entry.target || n.dataset.io === "1");
        animate(entry.target, {
          opacity: [0, 1],
          translateY: [28, 0],
          duration: 900,
          easing: "easeOutQuart",
        });
        entry.target.dataset.io = "1";
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );
  els.forEach((el) => io.observe(el));
}

function heroIntro() {
  if (reduce || !animate) return;
  const items = document.querySelectorAll("#top .reveal");
  animate(items, {
    opacity: [0, 1],
    translateY: [34, 0],
    delay: animate.stagger ? animate.stagger(120, { start: 200 }) : 200,
    duration: 1100,
    easing: "easeOutQuart",
  });
  // slow hero parallax-ish drift
  const img = document.querySelector("#hero-img");
  if (img) {
    animate(img, { scale: [1.12, 1.04], duration: 9000, easing: "easeOutSine" });
  }
}

function navScroll() {
  const navEl = document.getElementById("site-nav");
  if (!navEl) return;
  const onScroll = () => {
    if (window.scrollY > 40) {
      navEl.classList.add("bg-ash-950/85", "backdrop-blur-md", "border-b", "hairline");
    } else {
      navEl.classList.remove("bg-ash-950/85", "backdrop-blur-md", "border-b", "hairline");
    }
  };
  // passive listener purely toggles a class, no per-frame layout work
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function trailerPlaceholder() {
  const frame = document.getElementById("trailer-frame");
  if (!frame) return;
  frame.addEventListener("click", () => {
    const cap = frame.querySelector("span.font-display");
    if (cap) cap.textContent = "预告片即将上线 · 敬请关注";
    frame.classList.add("animate-pulse");
    setTimeout(() => frame.classList.remove("animate-pulse"), 900);
  });
}

function subscribeForm() {
  const form = document.getElementById("subscribe");
  if (!form) return;
  const email = document.getElementById("email");
  const err = document.getElementById("email-err");
  const ok = document.getElementById("subscribe-ok");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    err.classList.add("hidden");
    ok.classList.add("hidden");
    const v = (email.value || "").trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    if (!valid) {
      err.textContent = "请输入有效的邮箱地址。";
      err.classList.remove("hidden");
      email.focus();
      return;
    }
    ok.classList.remove("hidden");
    form.reset();
  });
}

export function initMotion() {
  revealOnScroll();
  heroIntro();
  navScroll();
  trailerPlaceholder();
  subscribeForm();
}

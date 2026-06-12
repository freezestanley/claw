// 轻量入场动效（尊重 prefers-reduced-motion）

export function fadeInSections() {
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cards = document.querySelectorAll("[data-section]");
  if (reduce || !window.anime) {
    cards.forEach((c) => (c.style.opacity = "1"));
    return;
  }
  const animate = window.anime.animate || window.anime;
  cards.forEach((c) => (c.style.opacity = "0"));
  try {
    animate(cards, {
      opacity: [0, 1],
      translateY: [12, 0],
      delay: window.anime.stagger ? window.anime.stagger(80) : 0,
      duration: 480,
      easing: "easeOutQuad",
    });
  } catch {
    cards.forEach((c) => (c.style.opacity = "1"));
  }
}

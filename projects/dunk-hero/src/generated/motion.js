// 页面轻动效：尊重 prefers-reduced-motion，降级为静态终态。
const prefersReduced = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const animate =
  (window.anime && (window.anime.animate || window.anime)) || null;

export function initMotion(root) {
  const reduce = prefersReduced();

  // 数字滚动
  const counters = root.querySelectorAll("[data-count]");
  const runCount = (el) => {
    const target = Number(el.getAttribute("data-count")) || 0;
    if (reduce || !animate) {
      el.textContent = String(target);
      return;
    }
    const obj = { v: 0 };
    animate(obj, {
      v: target,
      duration: 1400,
      easing: "easeOutExpo",
      round: 1,
      update: () => {
        el.textContent = String(Math.round(obj.v));
      },
    });
  };

  // reveal 入场
  const reveals = root.querySelectorAll("[data-reveal]");
  reveals.forEach((el) => {
    if (reduce) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
  });

  // 拟声词弹入
  const onos = root.querySelectorAll("[data-onomatopoeia]");
  onos.forEach((el) => {
    if (reduce) return;
    el.style.opacity = "0";
    el.style.transform = "scale(0.4) rotate(-8deg)";
  });

  if (reduce || !("IntersectionObserver" in window)) {
    // 直接置终态
    reveals.forEach((el) => {
      el.style.opacity = "";
      el.style.transform = "";
    });
    counters.forEach(runCount);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        io.unobserve(el);

        if (el.hasAttribute("data-reveal") && animate) {
          animate(el, {
            opacity: [0, 1],
            translateY: [28, 0],
            duration: 700,
            easing: "easeOutCubic",
          });
        }
        // section 内的计数器
        el.querySelectorAll &&
          el.querySelectorAll("[data-count]").forEach(runCount);
      });
    },
    { threshold: 0.2 }
  );

  reveals.forEach((el) => io.observe(el));

  // 没有被 reveal 容器包住的计数器（如能力值卡内已含），单独兜底观察其容器
  // hero 拟声词：进入即弹
  const heroIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        heroIO.unobserve(entry.target);
        if (animate) {
          animate(entry.target, {
            opacity: [0, 1],
            scale: [0.4, 1],
            rotate: ["-8deg", entry.target.classList.contains("rotate-6") ? "6deg" : "-6deg"],
            duration: 600,
            easing: "easeOutBack",
          });
        } else {
          entry.target.style.opacity = "";
          entry.target.style.transform = "";
        }
      });
    },
    { threshold: 0.4 }
  );
  onos.forEach((el) => heroIO.observe(el));

  // 兜底：能力值/数据区计数器若不在 reveal 节点上也能触发
  counters.forEach((el) => {
    if (el.closest("[data-reveal]")) return;
    const once = new IntersectionObserver(
      (en) => {
        en.forEach((e) => {
          if (e.isIntersecting) {
            once.unobserve(e.target);
            runCount(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    once.observe(el);
  });
}

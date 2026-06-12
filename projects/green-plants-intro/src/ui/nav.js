// 导航：移动端菜单开合 + 平滑滚动 + 滚动高亮
export function initNav() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  const header = document.getElementById("siteHeader");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // 点击锚点：平滑滚动并关闭移动端菜单
  document.querySelectorAll('a[data-scroll]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || !id.startsWith("#")) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (menu && menu.classList.contains("is-open")) {
        menu.classList.remove("is-open");
        toggle && toggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // “前往登录”：滚到登录卡片并聚焦用户名
  const gateLink = document.getElementById("gateToLogin");
  if (gateLink) {
    gateLink.addEventListener("click", (e) => {
      e.preventDefault();
      const panel = document.getElementById("loginPanel");
      if (panel) panel.scrollIntoView({ behavior: "smooth", block: "center" });
      const u = document.getElementById("loginUser");
      if (u) setTimeout(() => u.focus(), 400);
    });
  }

  // 顶栏滚动加阴影
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 12) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
}

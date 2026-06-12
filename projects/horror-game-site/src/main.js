import { renderSite } from "./site/render.js";
import { initMotion } from "./site/motion.js";
import { renderTools } from "./tools/render.js";
import { initTools } from "./tools/controller.js";

const app = document.querySelector("#app");

function route() {
  const hash = window.location.hash.replace(/^#/, "");
  if (hash === "/tools" || hash === "/api-demo") {
    document.body.classList.add("is-tools");
    app.innerHTML = renderTools();
    window.scrollTo(0, 0);
    initTools();
  } else {
    document.body.classList.remove("is-tools");
    app.innerHTML = renderSite();
    requestAnimationFrame(() => initMotion());
  }
}

window.addEventListener("hashchange", route);
route();

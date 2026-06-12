import "./styles/main.css";
import { store } from "./lib/store.js";
import { initContent } from "./modules/content.js";
import { initSettings } from "./modules/settings.js";
import { initLogin } from "./modules/login.js";
import { initSearch } from "./modules/search.js";
import { initMotion } from "./ui/motion.js";
import { initNav } from "./ui/nav.js";

function boot() {
  initContent();
  initSettings();
  initLogin();
  initSearch();
  initNav();
  initMotion();
  // 首帧广播一次登录态，让各模块对齐
  store.refreshGlobal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

import { mountPage } from "./generated/page.js";

// 糖糖屋单页：直接全屏挂载到 #app
const app = document.querySelector("#app");
mountPage(app);

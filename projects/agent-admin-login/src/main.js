import { mountLoginPage } from "./generated/page.js";

// 登录页为全屏接管页面：直接挂载到 #app，不使用通用预览壳。
const app = document.querySelector("#app");

mountLoginPage({ container: app });

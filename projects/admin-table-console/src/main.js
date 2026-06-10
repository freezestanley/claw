import { mountPage } from "./generated/page.js";
import { createPreviewRuntime } from "./runtime/create-preview-runtime.js";

// 后台管理页面作为单页面主体，直接挂载到 #app（不渲染调试外壳）。
const app = document.querySelector("#app");
const runtime = createPreviewRuntime();

mountPage({
  container: app,
  runtime
});

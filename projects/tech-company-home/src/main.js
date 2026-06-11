import { mountPage } from "./generated/page.js";
import { createPreviewRuntime } from "./runtime/create-preview-runtime.js";

// 科技公司官网首页作为单页面主体，直接挂载到 #app。
const app = document.querySelector("#app");
const runtime = createPreviewRuntime();

mountPage({
  container: app,
  runtime
});

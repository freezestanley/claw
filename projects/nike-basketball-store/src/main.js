import { mountPage } from "./generated/page.js";
import { createPreviewRuntime } from "./runtime/create-preview-runtime.js";

// 店铺页作为最终产物，直接全屏挂载到 #app，不套预览壳 chrome。
const app = document.querySelector("#app");
const runtime = createPreviewRuntime();

mountPage({
  container: app,
  runtime
});

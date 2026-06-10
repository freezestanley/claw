import { mountPage } from "./generated/page.js";
import { createPreviewRuntime } from "./runtime/create-preview-runtime.js";

// 数据 dashboard 作为单页面主体，直接挂载到 #app。
// 预览壳运行时仍保留（提供 /api 代理与图标刷新能力），但不再渲染深色调试外壳，
// 以便交付一个干净的、面向业务的 dashboard 页面。
const app = document.querySelector("#app");
const runtime = createPreviewRuntime();

mountPage({
  container: app,
  runtime
});

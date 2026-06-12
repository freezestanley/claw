import { mountPage } from "./generated/page.js";
import { createPreviewRuntime } from "./runtime/create-preview-runtime.js";

// 漫画风宣传页：生成页直接全屏接管 #app（不套预览壳卡片），
// runtime 仍保留 /api 能力供报名/订阅 mock 与可选健康检查使用。
const app = document.querySelector("#app");
const runtime = createPreviewRuntime();

mountPage({
  container: app,
  runtime
});

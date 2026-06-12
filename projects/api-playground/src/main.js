// API 联调演示台 — vanilla JS
// 三接口: POST /upload, GET /users/search, POST /auth/login
// 前端直连用户填写的 Base URL，CORS 由后端 OPTIONS 处理。

import { renderLayout } from "./ui/layout.js";
import { initBaseUrl } from "./modules/baseUrl.js";
import { initLogin } from "./modules/login.js";
import { initSearch } from "./modules/search.js";
import { initUpload } from "./modules/upload.js";
import { fadeInSections } from "./ui/motion.js";

const app = document.querySelector("#app");
app.innerHTML = renderLayout();

const store = initBaseUrl();
initLogin(store);
initSearch(store);
initUpload(store);

fadeInSections();

import http from "node:http";
import WebSocket from "ws";
import fs from "node:fs";

const TARGET = "http://127.0.0.1:4521/#/tools";
const get = (path) => new Promise((res, rej) => {
  http.get("http://127.0.0.1:9333" + path, (r) => {
    let d = ""; r.on("data", c => d += c); r.on("end", () => res(JSON.parse(d)));
  }).on("error", rej);
});

const ver = await get("/json/version");
const ws = new WebSocket(ver.webSocketDebuggerUrl, { perMessageDeflate: false });
let id = 0; const pending = new Map();
const send = (method, params = {}, sessionId) => new Promise((res) => {
  const mid = ++id; pending.set(mid, res);
  ws.send(JSON.stringify({ id: mid, method, params, sessionId }));
});
const errors = [];
await new Promise(r => ws.on("open", r));
ws.on("message", (raw) => {
  const m = JSON.parse(raw);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); }
  if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error")
    errors.push(m.params.args.map(a => a.value || a.description).join(" "));
  if (m.method === "Runtime.exceptionThrown")
    errors.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
});

const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
await send("Page.enable", {}, sessionId);
await send("Runtime.enable", {}, sessionId);
await send("Page.navigate", { url: TARGET }, sessionId);
await new Promise(r => setTimeout(r, 2500));

const evalJs = async (expr) => {
  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true }, sessionId);
  if (r?.exceptionDetails) return { __throw: r.exceptionDetails.exception?.description || r.exceptionDetails.text };
  return r?.result?.value;
};

const dom = await evalJs(`(() => {
  const q = s => !!document.querySelector(s);
  return {
    baseInput: !!document.querySelector('#base-url'),
    baseVal: document.querySelector('#base-url')?.value,
    uploadBtn: q('#upload-btn'),
    fileInput: q('#file-input'),
    searchForm: q('#search-form'),
    roleOptions: Array.from(document.querySelectorAll('#search-form select[name=role] option')).map(o=>o.value),
    loginForm: q('#login-form'),
    logoutBtn: q('#logout-btn'),
    panels: document.querySelectorAll('main > article').length,
  };
})()`);

// 兜底测试：后端没起时点“搜索”，应得到友好连接失败提示，无未捕获异常
const searchFallback = await evalJs(`(async () => {
  document.querySelector('#search-form').requestSubmit();
  await new Promise(r=>setTimeout(r,1500));
  const s = document.querySelector('#search-status');
  return { visible: !s.classList.contains('hidden'), text: s.textContent };
})()`);

// 兜底测试：登录（后端没起）
const loginFallback = await evalJs(`(async () => {
  document.querySelector('#login-form').requestSubmit();
  await new Promise(r=>setTimeout(r,1500));
  const s = document.querySelector('#login-status');
  return { visible: !s.classList.contains('hidden'), text: s.textContent };
})()`);

// 移动端溢出
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }, sessionId);
await new Promise(r => setTimeout(r, 500));
const mobile = await evalJs(`({ docW: document.documentElement.scrollWidth, winW: window.innerWidth, overflow: document.documentElement.scrollWidth > window.innerWidth + 1 })`);
await send("Emulation.clearDeviceMetricsOverride", {}, sessionId);
await new Promise(r => setTimeout(r, 300));

const shot = await send("Page.captureScreenshot", { format: "png", clip: { x:0,y:0,width:1440,height:1600,scale:1 }, captureBeyondViewport: true }, sessionId);
if (shot?.data) fs.writeFileSync(".webgen/tools-shot.png", Buffer.from(shot.data, "base64"));

console.log(JSON.stringify({ dom, searchFallback, loginFallback, mobile, errors }, null, 2));
await send("Target.closeTarget", { targetId });
ws.close();

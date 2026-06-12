import http from "node:http";
import WebSocket from "ws";
import fs from "node:fs";

const TARGET = "http://127.0.0.1:4521/";
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
await new Promise(r => setTimeout(r, 9000));

const evalJs = async (expr) => {
  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true }, sessionId);
  return r?.result?.value;
};

const report = await evalJs(`(() => {
  const q = s => document.querySelector(s);
  const imgs = Array.from(document.images);
  return {
    title: document.title,
    h1: q('h1')?.textContent?.trim(),
    sections: Array.from(document.querySelectorAll('main > section')).map(s => s.id),
    imgTotal: imgs.length,
    imgLoaded: imgs.filter(i => i.naturalWidth > 0).length,
    brokenImgs: imgs.filter(i => i.naturalWidth === 0).map(i => i.currentSrc || i.src),
    bodyH: document.body.scrollHeight,
  };
})()`);

// emulate mobile width and re-measure for overflow check
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }, sessionId);
await new Promise(r => setTimeout(r, 600));
const mobile = await evalJs(`({ docW: document.documentElement.scrollWidth, winW: window.innerWidth, overflow: document.documentElement.scrollWidth > window.innerWidth + 1 })`);
await send("Emulation.clearDeviceMetricsOverride", {}, sessionId);
await new Promise(r => setTimeout(r, 300));

const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x:0,y:0,width:1440,height:900,scale:1 } }, sessionId);
if (shot?.data) fs.writeFileSync(".webgen/preview-shot.png", Buffer.from(shot.data, "base64"));

console.log(JSON.stringify({ report, mobile, errors }, null, 2));
await send("Target.closeTarget", { targetId });
ws.close();

// Minimal CDP driver: open page, verify DOM + images, screenshot at PC/Pad/H5
import fs from "node:fs";

const BASE = "http://127.0.0.1:9222";
const URL = process.env.TARGET_URL || "http://127.0.0.1:4276/";
const SHOTS = process.env.SHOTS_DIR || "./.webgen/shots";
fs.mkdirSync(SHOTS, { recursive: true });

async function j(path, opts) {
  const r = await fetch(BASE + path, opts);
  return r.json();
}

// create a fresh target (tab)
const created = await j("/json/new?" + encodeURIComponent(URL), { method: "PUT" }).catch(() => null)
  || await j("/json/new?" + encodeURIComponent(URL));
const wsUrl = created.webSocketDebuggerUrl;
if (!wsUrl) { console.error("NO_WS", created); process.exit(1); }

const WebSocket = (await import("ws")).default;
const ws = new WebSocket(wsUrl);
let id = 0;
const pending = new Map();
function send(method, params = {}) {
  return new Promise((res) => {
    const mid = ++id;
    pending.set(mid, res);
    ws.send(JSON.stringify({ id: mid, method, params }));
  });
}
const ready = new Promise((r) => ws.on("open", r));
ws.on("message", (d) => {
  const m = JSON.parse(d.toString());
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
});
await ready;

await send("Page.enable");
await send("Runtime.enable");
await send("Page.navigate", { url: URL });
await new Promise((r) => setTimeout(r, 3500));

async function evalJS(expr) {
  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true });
  return r.result && r.result.result ? r.result.result.value : undefined;
}

const sizes = [
  { name: "pc", w: 1440, h: 900 },
  { name: "pad", w: 834, h: 1112 },
  { name: "h5", w: 390, h: 844 }
];

let report = {};
for (const s of sizes) {
  await send("Emulation.setDeviceMetricsOverride", {
    width: s.w, height: s.h, deviceScaleFactor: 1, mobile: s.name === "h5"
  });
  await new Promise((r) => setTimeout(r, 1200));
  const info = await evalJS(`(function(){
    const imgs=[...document.images];
    const broken=imgs.filter(i=>!i.complete || i.naturalWidth===0).map(i=>i.currentSrc||i.src);
    return JSON.stringify({
      title: document.title,
      h1: (document.querySelector('h1')||{}).innerText||'',
      products: document.querySelectorAll('#pieces article').length,
      svgBows: document.querySelectorAll('svg[aria-label]').length,
      imgTotal: imgs.length,
      imgBroken: broken,
      hasFollow: !!document.querySelector('#follow-form')
    });
  })()`);
  report[s.name] = JSON.parse(info);
  const shot = await send("Page.captureScreenshot", { format: "png" });
  if (shot.result && shot.result.data) {
    fs.writeFileSync(`${SHOTS}/${s.name}.png`, Buffer.from(shot.result.data, "base64"));
  }
}

console.log(JSON.stringify(report, null, 2));
// close tab
await fetch(`${BASE}/json/close/${created.id}`).catch(() => {});
ws.close();
process.exit(0);

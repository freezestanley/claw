// Minimal CDP driver: navigate, eval checks, cart interaction, multi-viewport screenshots.
import http from "node:http";
import { WebSocket } from "ws";
import fs from "node:fs";

const HOST = "[::1]", PORT = 9222;
const URL = "http://127.0.0.1:4288/";
const OUT = "/Users/za-stanlexu/.openclaw/webgen-workspace/tmp";

function getJSON(path) {
  return new Promise((res, rej) => {
    http.get({ host: "::1", port: PORT, path }, (r) => {
      let d = ""; r.on("data", c => d += c); r.on("end", () => res(JSON.parse(d)));
    }).on("error", rej);
  });
}

const list = await getJSON("/json/list");
const page = list.find(t => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl, { perMessageDeflate: false });
let id = 0; const pending = new Map();
function send(method, params = {}) {
  return new Promise((res, rej) => {
    const mid = ++id;
    pending.set(mid, { res, rej });
    ws.send(JSON.stringify({ id: mid, method, params }));
  });
}
ws.on("message", (raw) => {
  const m = JSON.parse(raw);
  if (m.id && pending.has(m.id)) { pending.get(m.id).res(m.result); pending.delete(m.id); }
});
await new Promise(r => ws.on("open", r));

await send("Page.enable");
await send("Runtime.enable");

async function evalExpr(expr) {
  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
  return r.result.value;
}

async function navAndWait() {
  await send("Page.navigate", { url: URL });
  await new Promise(r => setTimeout(r, 4000));
}

async function shot(name, w, h) {
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile: w < 768 });
  await new Promise(r => setTimeout(r, 700));
  const { data } = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(`${OUT}/shot-${name}.png`, Buffer.from(data, "base64"));
  console.log(`screenshot ${name} ${w}x${h} saved`);
}

await navAndWait();

// 1) basic DOM checks
const checks = await evalExpr(`(() => {
  const cards = document.querySelectorAll('.product-card').length;
  const title = document.title;
  const heroSvg = !!document.querySelector('#hero-shoe svg');
  const addBtns = document.querySelectorAll('[data-add]').length;
  const footer = document.body.innerText.includes('Nike, Inc');
  return { cards, title, heroSvg, addBtns, footer };
})()`);
console.log("DOM:", JSON.stringify(checks));

// 2) cart interaction: add two items, open drawer, read total + badge
const cartState = await evalExpr(`(() => {
  const btns = document.querySelectorAll('[data-add]');
  btns[0].click(); btns[0].click(); btns[2].click();
  document.querySelector('#open-cart').click();
  const badge = document.querySelector('#cart-badge').textContent;
  const total = document.querySelector('#cart-total').textContent;
  const rows = document.querySelectorAll('#cart-items [data-inc]').length;
  const drawerOpen = !document.querySelector('#cart-drawer').classList.contains('translate-x-full');
  return { badge, total, rows, drawerOpen };
})()`);
console.log("CART:", JSON.stringify(cartState));

// PC screenshot with drawer open
await shot("pc-cart", 1440, 900);

// close drawer, full PC
await evalExpr(`document.querySelector('#close-cart').click()`);
await new Promise(r => setTimeout(r, 400));
await shot("pc", 1440, 900);

await navAndWait();
await shot("pad", 820, 1180);

await navAndWait();
await shot("h5", 390, 844);

ws.close();
console.log("DONE");
process.exit(0);

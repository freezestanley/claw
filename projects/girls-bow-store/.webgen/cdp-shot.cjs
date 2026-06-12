// Raw CDP screenshot + DOM audit. Usage: node cdp-shot.js <url> <outDir>
const WebSocket = require('ws');
const fs = require('fs');
const http = require('http');

const URL = process.argv[2] || 'http://127.0.0.1:4276/';
const OUT = process.argv[3] || '/tmp/bow-shots';
fs.mkdirSync(OUT, { recursive: true });

const widths = [
  { name: 'pc', w: 1440, h: 900 },
  { name: 'pad', w: 834, h: 1112 },
  { name: 'h5', w: 390, h: 844 },
];

function getJSON(path) {
  return new Promise((res, rej) => {
    http.get('http://localhost:9222' + path, r => {
      let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d)));
    }).on('error', rej);
  });
}

(async () => {
  // open a fresh target
  const t = await new Promise((res, rej) => {
    const req = http.request('http://localhost:9222/json/new?' + encodeURIComponent(URL), { method: 'PUT' }, r => {
      let d=''; r.on('data',c=>d+=c); r.on('end',()=>res(JSON.parse(d)));
    });
    req.on('error', rej); req.end();
  });
  const ws = new WebSocket(t.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const pending = new Map();
  const send = (method, params={}) => new Promise((res) => { const i=++id; pending.set(i,res); ws.send(JSON.stringify({id:i,method,params})); });
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => { const o=JSON.parse(m); if(o.id&&pending.has(o.id)){pending.get(o.id)(o.result);pending.delete(o.id);} });

  await send('Page.enable');
  await send('Runtime.enable');

  for (const v of widths) {
    await send('Emulation.setDeviceMetricsOverride', { width: v.w, height: v.h, deviceScaleFactor: 1, mobile: v.name==='h5' });
    await send('Page.navigate', { url: URL });
    await new Promise(r => setTimeout(r, 2500));
    // full page metrics
    const { result } = await send('Runtime.evaluate', { expression: 'document.body.scrollHeight', returnByValue: true });
    const fullH = Math.min(result.value || v.h, 12000);
    await send('Emulation.setDeviceMetricsOverride', { width: v.w, height: fullH, deviceScaleFactor: 1, mobile: v.name==='h5' });
    await new Promise(r => setTimeout(r, 600));
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
    fs.writeFileSync(`${OUT}/${v.name}.png`, Buffer.from(shot.data, 'base64'));
    console.log(`saved ${v.name}.png (${v.w}x${fullH})`);
  }

  // DOM audit at PC
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: URL });
  await new Promise(r => setTimeout(r, 2500));
  const audit = await send('Runtime.evaluate', { returnByValue: true, expression: `(() => {
    const imgs = [...document.querySelectorAll('img')].map(i => ({src:i.currentSrc||i.src, nw:i.naturalWidth, nh:i.naturalHeight, broken: !(i.complete && i.naturalWidth>0)}));
    const headings = [...document.querySelectorAll('h1,h2,h3')].map(h => h.tagName+': '+h.textContent.trim().slice(0,60));
    const sections = [...document.querySelectorAll('section,[id]')].map(s => s.id||s.tagName).filter(Boolean).slice(0,30);
    return { title: document.title, imgCount: imgs.length, broken: imgs.filter(i=>i.broken), headings, sectionIds: [...new Set(sections)] };
  })()` });
  fs.writeFileSync(`${OUT}/audit.json`, JSON.stringify(audit.result.value, null, 2));
  console.log('AUDIT:', JSON.stringify(audit.result.value, null, 2));
  ws.close();
  process.exit(0);
})();

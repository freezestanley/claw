import http from "node:http"; import WebSocket from "ws";
const get=p=>new Promise((res,rej)=>{http.get("http://127.0.0.1:9333"+p,r=>{let d="";r.on("data",c=>d+=c);r.on("end",()=>res(JSON.parse(d)))}).on("error",rej)});
const ver=await get("/json/version");const ws=new WebSocket(ver.webSocketDebuggerUrl,{perMessageDeflate:false});
let id=0;const pe=new Map();const send=(m,pa={},s)=>new Promise(r=>{const i=++id;pe.set(i,r);ws.send(JSON.stringify({id:i,method:m,params:pa,sessionId:s}))});
const errs=[];await new Promise(r=>ws.on("open",r));
ws.on("message",raw=>{const m=JSON.parse(raw);if(m.id&&pe.has(m.id)){pe.get(m.id)(m.result);pe.delete(m.id)}if(m.method==="Runtime.exceptionThrown")errs.push(m.params.exceptionDetails.text)});
const {targetId}=await send("Target.createTarget",{url:"about:blank"});const {sessionId}=await send("Target.attachToTarget",{targetId,flatten:true});
await send("Page.enable",{},sessionId);await send("Runtime.enable",{},sessionId);
await send("Page.navigate",{url:"http://127.0.0.1:4521/"},sessionId);
await new Promise(r=>setTimeout(r,3000));
const ev=async e=>{const r=await send("Runtime.evaluate",{expression:e,returnByValue:true},sessionId);return r?.result?.value};
const home=await ev(`({h1:document.querySelector('h1')?.textContent?.trim(), sections:document.querySelectorAll('main>section').length, toolsLink:!!Array.from(document.querySelectorAll('a')).find(a=>a.getAttribute('href')==='#/tools')})`);
// 切到 tools 再切回，验证路由往返
await send("Page.navigate",{url:"http://127.0.0.1:4521/#/tools"},sessionId);await new Promise(r=>setTimeout(r,1200));
const atTools=await ev(`document.querySelectorAll('main > article').length`);
await ev(`window.location.hash='#/'`);await new Promise(r=>setTimeout(r,1200));
const backHome=await ev(`({h1:document.querySelector('h1')?.textContent?.trim(), sections:document.querySelectorAll('main>section').length})`);
console.log(JSON.stringify({home,atTools,backHome,errors:errs}));
await send("Target.closeTarget",{targetId});ws.close();

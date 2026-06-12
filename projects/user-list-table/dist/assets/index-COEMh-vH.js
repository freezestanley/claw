(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function l(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(t){if(t.ep)return;t.ep=!0;const n=l(t);fetch(t.href,n)}})();const w=["张","李","王","刘","陈","杨","赵","黄","周","吴","徐","孙","马","朱","胡"],$=["伟","芳","娜","敏","静","丽","强","磊","军","洋","勇","艳","杰","娟","涛","明","超","霞","平","刚"],k=["admin","user","editor"],S=["技术部","产品部","设计部","市场部","运营部","人事部","财务部"];function I(s,a){return`user${a}`}const M=Array.from({length:137},(s,a)=>{const l=a+1,i=w[a%w.length]+$[a*7%$.length],t=k[a%k.length],n=S[a*3%S.length],o=`${I(i,l)}@example.com`;return{id:l,name:i,email:o,role:t,department:n}});function j({q:s="",role:a="",department:l="",page:i=1,pageSize:t=10}){const n=String(s).trim().toLowerCase();let o=M.filter(x=>!(n&&!(`${x.name}`.toLowerCase().includes(n)||x.email.toLowerCase().includes(n))||a&&x.role!==a||l&&x.department!==l));const u=o.length,p=Math.min(Math.max(parseInt(t,10)||10,1),50),r=Math.max(Math.ceil(u/p),1),d=Math.min(Math.max(parseInt(i,10)||1,1),r),f=(d-1)*p;return{success:!0,data:o.slice(f,f+p),pagination:{page:d,pageSize:p,total:u,totalPages:r}}}const y="http://localhost:3000",L="ult_base_url",q=[{value:"",label:"全部角色"},{value:"admin",label:"管理员 (admin)"},{value:"user",label:"普通用户 (user)"},{value:"editor",label:"编辑 (editor)"}],A={admin:"管理员",user:"普通用户",editor:"编辑"},O={admin:"bg-rose-50 text-rose-600 ring-rose-200",user:"bg-sky-50 text-sky-600 ring-sky-200",editor:"bg-amber-50 text-amber-600 ring-amber-200"},P=[10,20,50],e={baseUrl:localStorage.getItem(L)||y,q:"",role:"",department:"",page:1,pageSize:10,rows:[],total:0,totalPages:1,loading:!1,error:"",usingMock:!1,sortKey:"",sortDir:1};async function D(){var o,u,p,r,d;const s={q:e.q||"",role:e.role||"",department:e.department||"",page:e.page,pageSize:e.pageSize},a={};Object.entries(s).forEach(([f,m])=>{m!==""&&m!==null&&m!==void 0&&(a[f]=m)});const l=`${e.baseUrl.replace(/\/$/,"")}/users/search`,i=await axios.get(l,{params:a,timeout:6e3}),t=i.data||{},n=Number((o=i.headers)==null?void 0:o["x-total-count"])||((u=t==null?void 0:t.pagination)==null?void 0:u.total)||(Array.isArray(t.data)?t.data.length:0);return{rows:Array.isArray(t.data)?t.data:[],total:n,page:((p=t==null?void 0:t.pagination)==null?void 0:p.page)||e.page,pageSize:((r=t==null?void 0:t.pagination)==null?void 0:r.pageSize)||e.pageSize,totalPages:((d=t==null?void 0:t.pagination)==null?void 0:d.totalPages)||Math.max(Math.ceil(n/e.pageSize),1)}}async function g(){e.loading=!0,e.error="",b();try{const s=await D();e.rows=s.rows,e.total=s.total,e.page=s.page,e.pageSize=s.pageSize,e.totalPages=s.totalPages,e.usingMock=!1}catch(s){const a=j({q:e.q,role:e.role,department:e.department,page:e.page,pageSize:e.pageSize});e.rows=a.data,e.total=a.pagination.total,e.page=a.pagination.page,e.totalPages=a.pagination.totalPages,e.usingMock=!0,e.error=`无法连接接口（${e.baseUrl}）：${(s==null?void 0:s.message)||"网络错误"}，已切换为本地 mock 数据演示。`}finally{e.loading=!1,z(),b()}}function z(){if(!e.sortKey)return;const s=e.sortKey;e.rows=[...e.rows].sort((a,l)=>{let i=a[s],t=l[s];return s==="id"?(i=+i,t=+t,(i-t)*e.sortDir):String(i).localeCompare(String(t),"zh")*e.sortDir})}const H=document.getElementById("app");function b(){H.innerHTML=`
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      ${B()}
      ${U()}
      ${e.error?_():""}
      <div class="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 overflow-hidden mt-4">
        ${T()}
      </div>
      ${F()}
    </div>
    <div id="modal-root"></div>
  `,Q(),window.lucide&&window.lucide.createIcons()}function B(){return`
    <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
      <div>
        <h1 class="text-xl sm:text-2xl font-semibold text-slate-900 flex items-center gap-2">
          <i data-lucide="users" class="w-6 h-6 text-sky-500"></i> 用户列表
        </h1>
        <p class="text-sm text-slate-500 mt-1">通用用户管理 demo · 搜索 / 筛选 / 分页 / 详情查看</p>
      </div>
      <div class="flex items-center gap-2">
        <label class="text-xs text-slate-400 whitespace-nowrap">接口 Base URL</label>
        <input id="base-input" value="${h(e.baseUrl)}"
          class="w-44 sm:w-56 text-sm px-2.5 py-1.5 rounded-lg ring-1 ring-slate-200 focus:ring-sky-400 outline-none bg-white"
          placeholder="${y}" />
        <button id="base-save" class="text-sm px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">应用</button>
      </div>
    </div>`}function U(){return`
    <div class="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-3 sm:p-4 mt-5">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div class="relative">
          <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
          <input id="q-input" value="${h(e.q)}" placeholder="搜索姓名 / 邮箱"
            class="w-full pl-9 pr-3 py-2 text-sm rounded-lg ring-1 ring-slate-200 focus:ring-sky-400 outline-none" />
        </div>
        <select id="role-select" class="w-full px-3 py-2 text-sm rounded-lg ring-1 ring-slate-200 focus:ring-sky-400 outline-none bg-white">
          ${q.map(s=>`<option value="${s.value}" ${s.value===e.role?"selected":""}>${s.label}</option>`).join("")}
        </select>
        <input id="dept-input" value="${h(e.department)}" placeholder="部门（精确，如 技术部）"
          class="w-full px-3 py-2 text-sm rounded-lg ring-1 ring-slate-200 focus:ring-sky-400 outline-none" />
        <div class="flex gap-2">
          <button id="search-btn" class="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-sky-500 hover:bg-sky-600 text-white">
            <i data-lucide="filter" class="w-4 h-4"></i> 查询
          </button>
          <button id="reset-btn" class="px-3 py-2 text-sm rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600">重置</button>
        </div>
      </div>
    </div>`}function _(){return`
    <div class="mt-4 flex items-start gap-2 text-sm text-amber-700 bg-amber-50 ring-1 ring-amber-200 rounded-xl px-3.5 py-2.5">
      <i data-lucide="alert-triangle" class="w-4 h-4 mt-0.5 shrink-0"></i>
      <span>${c(e.error)}</span>
    </div>`}function K(s){return e.sortKey!==s?'<i data-lucide="chevrons-up-down" class="w-3.5 h-3.5 text-slate-300"></i>':e.sortDir===1?'<i data-lucide="chevron-up" class="w-3.5 h-3.5 text-sky-500"></i>':'<i data-lucide="chevron-down" class="w-3.5 h-3.5 text-sky-500"></i>'}const R=[{key:"id",label:"ID",w:"w-16"},{key:"name",label:"姓名"},{key:"email",label:"邮箱"},{key:"role",label:"角色"},{key:"department",label:"部门"}];function T(){if(e.loading)return N();if(!e.rows.length)return C();const s=R.map(t=>`<th class="px-4 py-3 text-left font-medium text-slate-500 select-none ${t.w||""}">
      <button data-sort="${t.key}" class="inline-flex items-center gap-1 hover:text-slate-700">${t.label} ${K(t.key)}</button>
    </th>`).join(""),a=e.rows.map((t,n)=>`
    <tr class="border-t border-slate-100 hover:bg-slate-50/70 fade-in" style="animation-delay:${n*12}ms">
      <td class="px-4 py-3 text-slate-400 tabular-nums">${t.id}</td>
      <td class="px-4 py-3 font-medium text-slate-800">${c(t.name)}</td>
      <td class="px-4 py-3 text-slate-600">${c(t.email)}</td>
      <td class="px-4 py-3">${E(t.role)}</td>
      <td class="px-4 py-3 text-slate-600">${c(t.department)}</td>
      <td class="px-4 py-3 text-right">
        <button data-view="${t.id}" class="inline-flex items-center gap-1 text-sky-600 hover:text-sky-700 text-sm font-medium">
          <i data-lucide="eye" class="w-4 h-4"></i> 查看
        </button>
      </td>
    </tr>`).join(""),l=`
    <div class="hidden md:block overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-slate-50/80 text-xs uppercase tracking-wide">
          <tr>${s}<th class="px-4 py-3"></th></tr>
        </thead>
        <tbody>${a}</tbody>
      </table>
    </div>`,i=`
    <div class="md:hidden divide-y divide-slate-100">
      ${e.rows.map((t,n)=>`
        <div class="p-4 fade-in" style="animation-delay:${n*12}ms">
          <div class="flex items-center justify-between">
            <div class="font-medium text-slate-800">${c(t.name)}
              <span class="text-xs text-slate-400 ml-1">#${t.id}</span>
            </div>
            ${E(t.role)}
          </div>
          <div class="mt-1.5 text-sm text-slate-500 break-all">${c(t.email)}</div>
          <div class="mt-1 flex items-center justify-between">
            <span class="text-sm text-slate-600">${c(t.department)}</span>
            <button data-view="${t.id}" class="inline-flex items-center gap-1 text-sky-600 text-sm font-medium">
              <i data-lucide="eye" class="w-4 h-4"></i> 查看
            </button>
          </div>
        </div>`).join("")}
    </div>`;return l+i}function E(s){return`<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs ring-1 ${O[s]||"bg-slate-50 text-slate-600 ring-slate-200"}">${A[s]||s}</span>`}function N(){return`
    <div class="p-4 space-y-3">
      ${Array.from({length:6}).map(()=>`
        <div class="flex gap-3 animate-pulse">
          <div class="h-4 w-10 bg-slate-100 rounded"></div>
          <div class="h-4 w-24 bg-slate-100 rounded"></div>
          <div class="h-4 flex-1 bg-slate-100 rounded"></div>
          <div class="h-4 w-16 bg-slate-100 rounded"></div>
        </div>`).join("")}
    </div>`}function C(){return`
    <div class="py-16 flex flex-col items-center text-center text-slate-400">
      <i data-lucide="inbox" class="w-10 h-10 mb-3"></i>
      <p class="text-sm">没有匹配的用户</p>
      <p class="text-xs mt-1">试试调整搜索关键字或筛选条件</p>
    </div>`}function F(){const s=e.total===0?0:(e.page-1)*e.pageSize+1,a=Math.min(e.page*e.pageSize,e.total);return`
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 text-sm text-slate-600">
      <div class="flex items-center gap-3">
        <span>共 <b class="text-slate-800">${e.total}</b> 条</span>
        <span class="text-slate-300">|</span>
        <label class="flex items-center gap-1.5">每页
          <select id="ps-select" class="px-2 py-1 rounded-lg ring-1 ring-slate-200 outline-none bg-white">
            ${P.map(l=>`<option value="${l}" ${l===e.pageSize?"selected":""}>${l}</option>`).join("")}
          </select>条
        </label>
        ${e.total?`<span class="text-slate-400">显示 ${s}-${a}</span>`:""}
      </div>
      ${G()}
    </div>`}function G(){const s=Z(e.page,e.totalPages),a=(l,i,t,n)=>`
    <button data-page="${i}" ${t?"disabled":""}
      class="min-w-[34px] h-[34px] px-2 rounded-lg text-sm border ${n?"bg-sky-500 text-white border-sky-500":"bg-white border-slate-200 text-slate-600 hover:bg-slate-50"} ${t?"opacity-40 cursor-not-allowed":""}">
      ${l}</button>`;return`
    <div class="flex items-center gap-1.5 flex-wrap">
      ${a("上一页",e.page-1,e.page<=1,!1)}
      ${s.map(l=>l==="..."?'<span class="px-1 text-slate-400">…</span>':a(l,l,!1,l===e.page)).join("")}
      ${a("下一页",e.page+1,e.page>=e.totalPages,!1)}
    </div>`}function Z(s,a){const l=[],i=(t,n)=>{for(let o=t;o<=n;o++)l.push(o)};return a<=7?(i(1,a),l):(l.push(1),s>4&&l.push("..."),i(Math.max(2,s-1),Math.min(a-1,s+1)),s<a-3&&l.push("..."),l.push(a),l)}function J(s){const a=e.rows.find(i=>String(i.id)===String(s));if(!a)return;const l=document.getElementById("modal-root");l.innerHTML=`
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div data-close class="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]"></div>
      <div class="relative bg-white rounded-2xl shadow-xl ring-1 ring-slate-200 w-full max-w-md p-6 fade-in">
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-semibold text-lg">
              ${c(a.name.slice(0,1))}
            </div>
            <div>
              <div class="font-semibold text-slate-900">${c(a.name)}</div>
              <div class="text-xs text-slate-400">用户 ID #${a.id}</div>
            </div>
          </div>
          <button data-close class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>
        <dl class="mt-5 space-y-3 text-sm">
          ${v("邮箱",a.email)}
          ${v("角色",`${A[a.role]||a.role}（${a.role}）`)}
          ${v("部门",a.department)}
        </dl>
        <div class="mt-6 text-right">
          <button data-close class="px-4 py-2 text-sm rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">关闭</button>
        </div>
      </div>
    </div>`,window.lucide&&window.lucide.createIcons(),l.querySelectorAll("[data-close]").forEach(i=>i.addEventListener("click",()=>l.innerHTML=""))}function v(s,a){return`<div class="flex justify-between gap-4 border-b border-slate-50 pb-2">
    <dt class="text-slate-400">${s}</dt>
    <dd class="text-slate-800 text-right break-all">${c(String(a))}</dd>
  </div>`}function Q(){var l,i,t,n,o,u,p;const s=r=>document.getElementById(r);(l=s("base-save"))==null||l.addEventListener("click",()=>{const r=s("base-input").value.trim()||y;e.baseUrl=r,localStorage.setItem(L,r),e.page=1,g()});const a=()=>{e.q=s("q-input").value.trim(),e.role=s("role-select").value,e.department=s("dept-input").value.trim(),e.page=1,g()};(i=s("search-btn"))==null||i.addEventListener("click",a),(t=s("q-input"))==null||t.addEventListener("keydown",r=>{r.key==="Enter"&&a()}),(n=s("dept-input"))==null||n.addEventListener("keydown",r=>{r.key==="Enter"&&a()}),(o=s("role-select"))==null||o.addEventListener("change",a),(u=s("reset-btn"))==null||u.addEventListener("click",()=>{e.q="",e.role="",e.department="",e.sortKey="",e.page=1,g()}),(p=s("ps-select"))==null||p.addEventListener("change",r=>{e.pageSize=parseInt(r.target.value,10)||10,e.page=1,g()}),document.querySelectorAll("[data-page]").forEach(r=>r.addEventListener("click",()=>{const d=parseInt(r.dataset.page,10);d>=1&&d<=e.totalPages&&d!==e.page&&(e.page=d,g())})),document.querySelectorAll("[data-sort]").forEach(r=>r.addEventListener("click",()=>{const d=r.dataset.sort;e.sortKey===d?e.sortDir*=-1:(e.sortKey=d,e.sortDir=1),z(),b()})),document.querySelectorAll("[data-view]").forEach(r=>r.addEventListener("click",()=>J(r.dataset.view)))}function c(s){return String(s??"").replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a])}function h(s){return c(s)}g();

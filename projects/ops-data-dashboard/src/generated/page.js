// 运营数据 Dashboard - 生成页主体
// 结构: 顶部栏 + 4 KPI 卡片 + 访问趋势折线 + 渠道占比环形 + 地区分布柱状 + 明细表格
// 数据: 默认走 mock；预留 /api 代理，可平滑切真实接口（见 loadDashboardData）
// 适配: PC / Pad / H5，Tailwind 断点 + ECharts resize

const MOCK_DATA = {
  updatedAt: "2026-06-10 17:20",
  kpis: [
    { key: "pv", label: "访问量 (PV)", value: 128430, delta: 12.4, icon: "eye", unit: "" },
    { key: "users", label: "活跃用户", value: 38215, delta: 8.1, icon: "users", unit: "" },
    { key: "conversion", label: "转化率", value: 4.62, delta: -0.7, icon: "target", unit: "%" },
    { key: "revenue", label: "营收", value: 286540, delta: 15.9, icon: "trending-up", unit: "¥" }
  ],
  trend: {
    days: ["06-04", "06-05", "06-06", "06-07", "06-08", "06-09", "06-10"],
    pv: [9800, 11200, 10400, 13600, 12800, 15200, 16100],
    users: [3200, 3600, 3400, 4100, 3900, 4500, 4800]
  },
  channels: [
    { name: "自然搜索", value: 4231 },
    { name: "社交媒体", value: 3120 },
    { name: "直接访问", value: 2480 },
    { name: "付费广告", value: 1890 },
    { name: "外部引荐", value: 980 }
  ],
  regions: {
    names: ["广东", "浙江", "江苏", "北京", "上海", "四川", "山东"],
    values: [8240, 6120, 5780, 5210, 4980, 3420, 3010]
  },
  table: [
    { page: "/", title: "首页", pv: 42310, uv: 18230, bounce: 32.1, avg: "02:14" },
    { page: "/pricing", title: "定价页", pv: 18420, uv: 9120, bounce: 41.5, avg: "01:38" },
    { page: "/features", title: "功能介绍", pv: 15630, uv: 7840, bounce: 38.2, avg: "01:52" },
    { page: "/blog", title: "博客列表", pv: 12100, uv: 6010, bounce: 52.8, avg: "01:05" },
    { page: "/contact", title: "联系我们", pv: 6240, uv: 3120, bounce: 44.6, avg: "00:58" },
    { page: "/login", title: "登录页", pv: 5890, uv: 4210, bounce: 28.4, avg: "00:42" }
  ]
};

function formatNumber(n) {
  return n.toLocaleString("zh-CN");
}

function deltaBadge(delta) {
  const up = delta >= 0;
  const color = up ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50";
  const icon = up ? "arrow-up-right" : "arrow-down-right";
  const sign = up ? "+" : "";
  return `<span class="inline-flex items-center gap-1 rounded-full ${color} px-2 py-0.5 text-xs font-medium">
    <i data-lucide="${icon}" class="h-3 w-3"></i>${sign}${delta}%</span>`;
}

function kpiCard(item) {
  const display =
    item.unit === "%"
      ? `${item.value}%`
      : item.unit === "¥"
        ? `¥${formatNumber(item.value)}`
        : formatNumber(item.value);
  return `
    <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm text-slate-500">${item.label}</p>
          <p class="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">${display}</p>
        </div>
        <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <i data-lucide="${item.icon}" class="h-5 w-5"></i>
        </span>
      </div>
      <div class="mt-3 flex items-center gap-2 text-xs text-slate-400">
        ${deltaBadge(item.delta)}
        <span>较上周</span>
      </div>
    </div>`;
}

function chartCard(id, title, subtitle, extraClass = "") {
  return `
    <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${extraClass}">
      <div class="mb-3 flex items-center justify-between">
        <div>
          <h3 class="text-base font-semibold text-slate-900">${title}</h3>
          <p class="text-xs text-slate-400">${subtitle}</p>
        </div>
      </div>
      <div id="${id}" class="h-64 w-full sm:h-72"></div>
    </div>`;
}

function tableRows(rows) {
  return rows
    .map((r) => {
      const bounceColor =
        r.bounce > 50 ? "text-rose-600" : r.bounce > 40 ? "text-amber-600" : "text-emerald-600";
      return `
      <tr class="border-b border-slate-100 last:border-0 hover:bg-slate-50">
        <td class="py-3 pr-4">
          <p class="font-medium text-slate-800">${r.title}</p>
          <p class="text-xs text-slate-400">${r.page}</p>
        </td>
        <td class="py-3 pr-4 text-right tabular-nums text-slate-700">${formatNumber(r.pv)}</td>
        <td class="py-3 pr-4 text-right tabular-nums text-slate-700">${formatNumber(r.uv)}</td>
        <td class="py-3 pr-4 text-right tabular-nums font-medium ${bounceColor}">${r.bounce}%</td>
        <td class="py-3 text-right tabular-nums text-slate-700">${r.avg}</td>
      </tr>`;
    })
    .join("");
}

// 数据加载：默认 mock；如需真实接口，将 USE_MOCK 改为 false，
// 后端通过 /api 代理返回与 MOCK_DATA 同构的 JSON 即可平滑切换。
const USE_MOCK = true;

async function loadDashboardData(runtime) {
  if (USE_MOCK) return MOCK_DATA;
  try {
    const res = await runtime.api.get("/api/dashboard/overview");
    return res.data || res;
  } catch (e) {
    console.warn("[dashboard] 接口不可用，回退到 mock 数据：", e?.message || e);
    return MOCK_DATA;
  }
}

const palette = ["#6366f1", "#06b6d4", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6", "#ec4899"];

function renderCharts(data) {
  const charts = [];
  const baseGrid = { left: 8, right: 16, top: 24, bottom: 8, containLabel: true };
  const axisStyle = {
    axisLine: { lineStyle: { color: "#e2e8f0" } },
    axisLabel: { color: "#64748b", fontSize: 11 },
    splitLine: { lineStyle: { color: "#f1f5f9" } }
  };

  // 1) 访问趋势折线
  const elTrend = document.getElementById("chart-trend");
  if (elTrend) {
    const c = echarts.init(elTrend);
    c.setOption({
      tooltip: { trigger: "axis" },
      legend: { data: ["访问量", "用户数"], right: 0, top: 0, textStyle: { color: "#64748b" } },
      grid: { ...baseGrid, top: 36 },
      xAxis: { type: "category", boundaryGap: false, data: data.trend.days, ...axisStyle },
      yAxis: { type: "value", ...axisStyle },
      series: [
        {
          name: "访问量",
          type: "line",
          smooth: true,
          symbol: "circle",
          data: data.trend.pv,
          itemStyle: { color: palette[0] },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(99,102,241,0.25)" },
              { offset: 1, color: "rgba(99,102,241,0.02)" }
            ])
          }
        },
        {
          name: "用户数",
          type: "line",
          smooth: true,
          symbol: "circle",
          data: data.trend.users,
          itemStyle: { color: palette[1] }
        }
      ]
    });
    charts.push(c);
  }

  // 2) 渠道占比环形
  const elChannel = document.getElementById("chart-channel");
  if (elChannel) {
    const c = echarts.init(elChannel);
    c.setOption({
      tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
      legend: { bottom: 0, left: "center", textStyle: { color: "#64748b" }, itemWidth: 10, itemHeight: 10 },
      color: palette,
      series: [
        {
          name: "渠道占比",
          type: "pie",
          radius: ["45%", "70%"],
          center: ["50%", "45%"],
          avoidLabelOverlap: true,
          itemStyle: { borderColor: "#fff", borderWidth: 2, borderRadius: 6 },
          label: { show: false },
          data: data.channels.map((c) => ({ name: c.name, value: c.value }))
        }
      ]
    });
    charts.push(c);
  }

  // 3) 地区分布柱状
  const elRegion = document.getElementById("chart-region");
  if (elRegion) {
    const c = echarts.init(elRegion);
    c.setOption({
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
      grid: baseGrid,
      xAxis: { type: "category", data: data.regions.names, ...axisStyle },
      yAxis: { type: "value", ...axisStyle },
      series: [
        {
          name: "访问量",
          type: "bar",
          barWidth: "55%",
          data: data.regions.values,
          itemStyle: {
            borderRadius: [6, 6, 0, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#818cf8" },
              { offset: 1, color: "#6366f1" }
            ])
          }
        }
      ]
    });
    charts.push(c);
  }

  // 响应式：窗口变化时统一 resize
  const onResize = () => charts.forEach((c) => c.resize());
  window.addEventListener("resize", onResize);
}

export async function mountPage({ container, runtime }) {
  const data = await loadDashboardData(runtime);

  container.innerHTML = `
    <div class="min-h-screen bg-slate-50">
      <div class="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <!-- 顶部栏 -->
        <header class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center gap-3">
            <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
              <i data-lucide="layout-dashboard" class="h-6 w-6"></i>
            </span>
            <div>
              <h1 class="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">运营数据 Dashboard</h1>
              <p class="text-xs text-slate-400 sm:text-sm">网站运营核心指标总览 · 数据更新于 ${data.updatedAt}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500">
              <i data-lucide="calendar" class="h-3.5 w-3.5"></i>近 7 天
            </span>
            <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-600">
              <i data-lucide="circle" class="h-2.5 w-2.5 fill-emerald-500"></i>Mock 数据
            </span>
          </div>
        </header>

        <!-- KPI 卡片 -->
        <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          ${data.kpis.map(kpiCard).join("")}
        </section>

        <!-- 图表区 -->
        <section class="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          ${chartCard("chart-trend", "访问趋势", "PV / 活跃用户 · 近 7 天", "lg:col-span-2")}
          ${chartCard("chart-channel", "渠道占比", "流量来源构成")}
        </section>

        <section class="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          ${chartCard("chart-region", "地区分布", "Top 7 省份访问量", "lg:col-span-2")}
          <!-- 明细表格 -->
          <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="mb-3 flex items-center justify-between">
              <div>
                <h3 class="text-base font-semibold text-slate-900">热门页面</h3>
                <p class="text-xs text-slate-400">按 PV 排序 Top 6</p>
              </div>
            </div>
            <div class="-mx-2 overflow-x-auto px-2">
              <table class="w-full min-w-[460px] text-sm lg:min-w-0">
                <thead>
                  <tr class="text-left text-xs uppercase tracking-wide text-slate-400">
                    <th class="pb-2 pr-4 font-medium">页面</th>
                    <th class="pb-2 pr-4 text-right font-medium">PV</th>
                    <th class="pb-2 pr-4 text-right font-medium">UV</th>
                    <th class="pb-2 pr-4 text-right font-medium">跳出率</th>
                    <th class="pb-2 text-right font-medium">停留</th>
                  </tr>
                </thead>
                <tbody>${tableRows(data.table)}</tbody>
              </table>
            </div>
          </div>
        </section>

        <footer class="mt-8 pb-4 text-center text-xs text-slate-400">
          WebGen · 单页面 Dashboard · 适配 PC / Pad / H5 · 数据可经 <code class="rounded bg-slate-100 px-1">/api</code> 代理接入真实接口
        </footer>
      </div>
    </div>
  `;

  runtime.refreshIcons();

  // 图表需等容器布局完成后再初始化
  requestAnimationFrame(() => renderCharts(data));
}

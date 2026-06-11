// H5 产品分享页 - 无界蓝牙降噪耳机 Pro（虚构示例）
// 场景: 好友分享的移动端商品落地页，移动优先；PC/Pad 居中以手机卡片承载
// 板块: 分享来源条 + 主视觉 + 价格/促销 + 卖点 + 横向图集 + 规格 + 评价 + 底部固定行动栏 + 分享浮层
// 适配: H5 主(<=767)；Pad/PC 居中 max-w + 圆角卡片化

const PRODUCT = {
  name: "无界蓝牙降噪耳机 Pro",
  subtitle: "旗舰级主动降噪 · 40 小时续航",
  price: 799,
  originalPrice: 1299,
  sold: 12863,
  rating: 4.9,
  reviewsCount: 3241,
  sharer: { name: "小林", avatar: "林" },
  tags: ["旗舰降噪", "40h 续航", "Hi-Res 认证", "双设备连接"],
  gallery: ["headphones", "battery-charging", "bluetooth", "music-4"],
  highlights: [
    { icon: "ear-off", title: "-48dB 主动降噪", desc: "三麦克风阵列，地铁/飞机/办公室一键静音。" },
    { icon: "battery-full", title: "40 小时长续航", desc: "充电 10 分钟，畅听 5 小时，告别电量焦虑。" },
    { icon: "waves", title: "Hi-Res 高解析音质", desc: "40mm 动圈单元 + LDAC，还原现场细节。" },
    { icon: "link", title: "双设备无缝切换", desc: "手机 + 电脑同时连接，来电秒切。" }
  ],
  specs: [
    ["蓝牙版本", "5.4"],
    ["降噪深度", "-48dB"],
    ["续航", "40 小时（关降噪）"],
    ["充电接口", "USB-C 快充"],
    ["单元", "40mm 动圈"],
    ["重量", "248g"]
  ],
  reviews: [
    { name: "陈**", initial: "陈", stars: 5, text: "降噪是真的强，戴上世界安静了，音质也通透。", date: "2026-06-08" },
    { name: "王**", initial: "王", stars: 5, text: "续航太顶了，一周充一次，出差神器。", date: "2026-06-05" },
    { name: "刘**", initial: "刘", stars: 4, text: "颜值在线，戴久了耳朵稍微有点压，整体满意。", date: "2026-06-02" }
  ]
};

function stars(n) {
  return Array.from({ length: 5 })
    .map(
      (_, i) =>
        `<i data-lucide="star" class="h-3.5 w-3.5 ${i < n ? "fill-amber-400 text-amber-400" : "text-slate-300"}"></i>`
    )
    .join("");
}

function galleryItem(icon, i) {
  const grad = [
    "from-indigo-500 to-violet-500",
    "from-cyan-500 to-blue-500",
    "from-rose-500 to-orange-400",
    "from-emerald-500 to-teal-500"
  ][i % 4];
  return `
    <div class="relative flex h-44 w-64 shrink-0 snap-center items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${grad}">
      <i data-lucide="${icon}" class="h-16 w-16 text-white/90"></i>
      <span class="absolute bottom-2 right-3 text-xs text-white/70">${i + 1}/${PRODUCT.gallery.length}</span>
    </div>`;
}

export function mountPage({ container, runtime }) {
  const p = PRODUCT;
  const off = Math.round((1 - p.price / p.originalPrice) * 100);

  container.innerHTML = `
  <div class="min-h-screen bg-slate-200/60 py-0 sm:py-8">
    <!-- 居中手机卡片：H5 全宽；Pad/PC 居中 max-w -->
    <div class="relative mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-slate-50 shadow-xl sm:min-h-[auto] sm:rounded-[2rem] sm:ring-1 sm:ring-black/5">

      <!-- 分享来源条 -->
      <div class="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-white sm:rounded-t-[2rem]">
        <span class="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs font-medium">${p.sharer.avatar}</span>
        <p class="text-sm"><b>${p.sharer.name}</b> 把这个好物分享给你 · 专享价</p>
        <i data-lucide="gift" class="ml-auto h-4 w-4"></i>
      </div>

      <!-- 主视觉 -->
      <div class="relative flex h-64 items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800">
        <i data-lucide="headphones" class="h-32 w-32 text-white/90 drop-shadow-2xl"></i>
        <span class="absolute left-4 top-4 rounded-full bg-rose-500 px-2.5 py-1 text-xs font-semibold text-white">限时 ${off}% OFF</span>
      </div>

      <!-- 价格区 -->
      <div class="bg-white px-4 pb-4 pt-4">
        <div class="flex items-end gap-2">
          <span class="text-sm text-rose-500">¥</span>
          <span class="text-3xl font-bold text-rose-500">${p.price}</span>
          <span class="mb-1 text-sm text-slate-400 line-through">¥${p.originalPrice}</span>
          <span class="mb-1 rounded bg-rose-50 px-1.5 py-0.5 text-xs font-medium text-rose-500">省 ¥${p.originalPrice - p.price}</span>
        </div>
        <h1 class="mt-2 text-lg font-semibold leading-snug text-slate-900">${p.name}</h1>
        <p class="mt-1 text-sm text-slate-500">${p.subtitle}</p>
        <div class="mt-3 flex flex-wrap items-center gap-2">
          ${p.tags.map((t) => `<span class="rounded-full bg-indigo-50 px-2.5 py-1 text-xs text-indigo-600">${t}</span>`).join("")}
        </div>
        <div class="mt-3 flex items-center gap-3 text-xs text-slate-400">
          <span class="flex items-center gap-1">${stars(5)} <b class="ml-1 text-amber-500">${p.rating}</b></span>
          <span>·</span><span>${p.reviewsCount} 条评价</span>
          <span>·</span><span>已售 ${p.sold.toLocaleString("zh-CN")}</span>
        </div>
      </div>

      <!-- 卖点 -->
      <div class="mt-2 bg-white px-4 py-4">
        <h2 class="mb-3 text-base font-semibold text-slate-900">核心卖点</h2>
        <div class="grid grid-cols-2 gap-3">
          ${p.highlights
            .map(
              (h) => `
            <div class="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
              <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600"><i data-lucide="${h.icon}" class="h-5 w-5"></i></span>
              <p class="mt-2 text-sm font-medium text-slate-800">${h.title}</p>
              <p class="mt-1 text-xs leading-5 text-slate-500">${h.desc}</p>
            </div>`
            )
            .join("")}
        </div>
      </div>

      <!-- 横向图集 -->
      <div class="mt-2 bg-white px-4 py-4">
        <h2 class="mb-3 text-base font-semibold text-slate-900">产品图集</h2>
        <div class="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1">
          ${p.gallery.map(galleryItem).join("")}
        </div>
      </div>

      <!-- 规格 -->
      <div class="mt-2 bg-white px-4 py-4">
        <h2 class="mb-3 text-base font-semibold text-slate-900">规格参数</h2>
        <dl class="divide-y divide-slate-100">
          ${p.specs
            .map(
              ([k, v]) => `
            <div class="flex items-center justify-between py-2.5 text-sm">
              <dt class="text-slate-400">${k}</dt><dd class="font-medium text-slate-700">${v}</dd>
            </div>`
            )
            .join("")}
        </dl>
      </div>

      <!-- 评价 -->
      <div class="mt-2 bg-white px-4 py-4">
        <div class="mb-3 flex items-center justify-between">
          <h2 class="text-base font-semibold text-slate-900">用户评价</h2>
          <a href="#" class="text-xs text-indigo-600">查看全部 ›</a>
        </div>
        <div class="space-y-4">
          ${p.reviews
            .map(
              (r) => `
            <div class="flex gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-medium text-slate-600">${r.initial}</span>
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <span class="text-sm font-medium text-slate-700">${r.name}</span>
                  <span class="flex">${stars(r.stars)}</span>
                </div>
                <p class="mt-1 text-sm leading-6 text-slate-600">${r.text}</p>
                <p class="mt-0.5 text-xs text-slate-300">${r.date}</p>
              </div>
            </div>`
            )
            .join("")}
        </div>
      </div>

      <!-- 间隔，避免被底部栏遮挡 -->
      <div class="h-24"></div>

      <!-- 底部固定行动栏 -->
      <div class="sticky bottom-0 z-30 mt-auto border-t border-slate-200 bg-white/95 px-3 py-2.5 backdrop-blur sm:rounded-b-[2rem]" style="padding-bottom: max(0.625rem, env(safe-area-inset-bottom));">
        <div class="flex items-center gap-2">
          <button id="btn-fav" class="flex flex-col items-center px-2 text-slate-500">
            <i data-lucide="heart" class="h-5 w-5"></i><span class="mt-0.5 text-[10px]">收藏</span>
          </button>
          <button id="btn-share2" class="flex flex-col items-center px-2 text-slate-500">
            <i data-lucide="share-2" class="h-5 w-5"></i><span class="mt-0.5 text-[10px]">分享</span>
          </button>
          <button id="btn-cart" class="ml-1 flex-1 rounded-full bg-amber-400 py-3 text-sm font-semibold text-amber-950 active:scale-[0.98]">加入购物车</button>
          <button id="btn-buy" class="flex-1 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 py-3 text-sm font-semibold text-white active:scale-[0.98]">立即购买</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 分享浮层 -->
  <div id="share-mask" class="fixed inset-0 z-50 hidden bg-black/50">
    <div id="share-sheet" class="absolute bottom-0 left-1/2 w-full max-w-[480px] -translate-x-1/2 translate-y-full rounded-t-2xl bg-white p-5 transition-transform duration-300" style="padding-bottom: max(1.25rem, env(safe-area-inset-bottom));">
      <div class="mx-auto mb-4 h-1 w-10 rounded-full bg-slate-200"></div>
      <p class="mb-4 text-center text-sm font-medium text-slate-700">分享给好友</p>
      <div class="grid grid-cols-4 gap-4 text-center">
        ${[
          ["message-circle", "微信", "text-emerald-600 bg-emerald-50"],
          ["users", "朋友圈", "text-emerald-600 bg-emerald-50"],
          ["send", "QQ", "text-sky-600 bg-sky-50"],
          ["link", "复制链接", "text-indigo-600 bg-indigo-50"]
        ]
          .map(
            ([icon, label, cls]) => `
          <button data-share="${label}" class="flex flex-col items-center gap-2">
            <span class="flex h-12 w-12 items-center justify-center rounded-full ${cls}"><i data-lucide="${icon}" class="h-6 w-6"></i></span>
            <span class="text-xs text-slate-600">${label}</span>
          </button>`
          )
          .join("")}
      </div>
      <button id="share-close" class="mt-5 w-full rounded-xl bg-slate-100 py-3 text-sm text-slate-600">取消</button>
      <p id="share-toast" class="mt-3 hidden text-center text-sm text-emerald-600"></p>
    </div>
  </div>`;

  runtime.refreshIcons();

  // ---- 交互 ----
  const mask = document.getElementById("share-mask");
  const sheet = document.getElementById("share-sheet");
  const toast = document.getElementById("share-toast");

  const openShare = () => {
    mask.classList.remove("hidden");
    requestAnimationFrame(() => sheet.classList.remove("translate-y-full"));
  };
  const closeShare = () => {
    sheet.classList.add("translate-y-full");
    setTimeout(() => mask.classList.add("hidden"), 300);
  };

  document.getElementById("btn-share2").addEventListener("click", openShare);
  document.getElementById("share-close").addEventListener("click", closeShare);
  mask.addEventListener("click", (e) => {
    if (e.target === mask) closeShare();
  });

  sheet.querySelectorAll("[data-share]").forEach((b) =>
    b.addEventListener("click", () => {
      const label = b.getAttribute("data-share");
      // 优先用原生分享(支持的浏览器/H5环境)
      if (label === "复制链接" || !navigator.share) {
        if (navigator.clipboard) navigator.clipboard.writeText(location.href).catch(() => {});
        toast.textContent = label === "复制链接" ? "链接已复制" : `已唤起「${label}」分享（演示）`;
      } else {
        navigator.share({ title: PRODUCT.name, url: location.href }).catch(() => {});
        toast.textContent = `已唤起系统分享（${label}）`;
      }
      toast.classList.remove("hidden");
      setTimeout(closeShare, 900);
    })
  );

  // 收藏 / 购物车 / 购买（演示占位）
  const fav = document.getElementById("btn-fav");
  fav.addEventListener("click", () => {
    const icon = fav.querySelector("i");
    const on = icon.classList.toggle("fill-rose-500");
    icon.classList.toggle("text-rose-500", on);
  });
  document.getElementById("btn-cart").addEventListener("click", () => alert("已加入购物车（演示占位）"));
  document.getElementById("btn-buy").addEventListener("click", () => alert("进入下单流程（演示占位，可接真实接口）"));
  runtime.refreshIcons();
}

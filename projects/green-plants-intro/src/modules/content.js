// 科普内容渲染：外观特征 / 养护卡片 / 产地习性 / 常见问题
import { CARE, FEATURES, ORIGIN, FAQ, icon, IMG, escapeHtml } from "./_content-deps.js";

export function initContent() {
  bindImages();
  renderFeatures();
  renderCare();
  renderOrigin();
  renderFaq();
}

function bindImages() {
  const map = {
    heroImg: IMG.hero,
    introImg: IMG.intro,
    appearanceImg: IMG.appearance,
    originImg: IMG.origin,
  };
  Object.entries(map).forEach(([id, url]) => {
    const el = document.getElementById(id);
    if (el && url) el.src = url;
  });
}

function renderFeatures() {
  const el = document.getElementById("featureGrid");
  if (!el) return;
  el.innerHTML = FEATURES.map(
    (f) => `<div class="feature-item reveal">
      <h4>${escapeHtml(f.title)}</h4>
      <p>${escapeHtml(f.text)}</p>
    </div>`
  ).join("");
}

function renderCare() {
  const el = document.getElementById("careGrid");
  if (!el) return;
  el.innerHTML = CARE.map(
    (c) => `<article class="care-card reveal" tabindex="0">
      <div class="care-icon">${icon(c.icon)}</div>
      <h4>${escapeHtml(c.title)}</h4>
      <p class="care-summary">${escapeHtml(c.summary)}</p>
      <p class="care-detail">${escapeHtml(c.detail)}</p>
    </article>`
  ).join("");
}

function renderOrigin() {
  const el = document.getElementById("originText");
  if (!el) return;
  el.innerHTML = ORIGIN.paras.map((p) => `<p>${escapeHtml(p)}</p>`).join("");
}

function renderFaq() {
  const el = document.getElementById("faqList");
  if (!el) return;
  el.innerHTML = FAQ.map(
    (item, i) => `<details class="faq-item reveal"${i === 0 ? " open" : ""}>
      <summary>${escapeHtml(item.q)}</summary>
      <div class="faq-answer"><p>${escapeHtml(item.a)}</p></div>
    </details>`
  ).join("");
}

// 轻量音效 —— 用 Web Audio 合成，无需任何音频文件
// 移动端需在首次用户交互后才能解锁 AudioContext

let ctx = null;
let enabled = true;

function ensureCtx() {
  if (ctx) return ctx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  return ctx;
}

// 在首次用户手势里调用，解锁移动端音频
export function unlockAudio() {
  const c = ensureCtx();
  if (c && c.state === "suspended") c.resume();
}

export function setSoundEnabled(v) {
  enabled = !!v;
}

export function isSoundEnabled() {
  return enabled;
}

function blip({ freq = 440, type = "sine", dur = 0.12, gain = 0.18, slideTo = null }) {
  if (!enabled) return;
  const c = ensureCtx();
  if (!c) return;
  if (c.state === "suspended") c.resume();
  const t = c.currentTime;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(c.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

// 吃到食物：清脆上扬
export function playEat() {
  blip({ freq: 660, type: "square", dur: 0.1, gain: 0.14, slideTo: 990 });
}

// 游戏结束：下行三连音
export function playGameOver() {
  if (!enabled) return;
  const seq = [440, 330, 220];
  seq.forEach((f, i) => {
    setTimeout(
      () => blip({ freq: f, type: "sawtooth", dur: 0.18, gain: 0.16 }),
      i * 130
    );
  });
}

// 开始 / 重开：短促确认音
export function playStart() {
  blip({ freq: 523, type: "triangle", dur: 0.12, gain: 0.14, slideTo: 784 });
}

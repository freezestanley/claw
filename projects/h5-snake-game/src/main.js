import { createSnakeGame } from "./snake.js";
import {
  unlockAudio,
  setSoundEnabled,
  playEat,
  playGameOver,
  playStart
} from "./audio.js";

const app = document.querySelector("#app");

app.innerHTML = `
  <div class="game-shell">
    <header class="hud">
      <div class="hud-card score">
        <span class="label">得分</span>
        <span class="value" id="score">0</span>
      </div>
      <div class="hud-card best">
        <span class="label">最高分</span>
        <span class="value" id="best">0</span>
      </div>
    </header>

    <div class="board-wrap">
      <canvas id="board"></canvas>
      <div class="overlay" id="overlay">
        <h1 id="ov-title">贪吃蛇</h1>
        <p class="sub" id="ov-sub">
          滑动屏幕、点方向键，或用键盘方向键 / WASD 控制。<br />吃到金色食物得分，撞墙或咬到自己结束。
        </p>
        <p class="final-score" id="ov-score" hidden></p>
        <button class="btn" id="ov-btn">开始游戏</button>
      </div>
    </div>

    <div class="side">
      <div class="controls">
        <div class="dpad">
          <button class="up" data-dir="up" aria-label="上">▲</button>
          <button class="left" data-dir="left" aria-label="左">◀</button>
          <span class="center"></span>
          <button class="right" data-dir="right" aria-label="右">▶</button>
          <button class="down" data-dir="down" aria-label="下">▼</button>
        </div>
        <div class="action-row">
          <button class="btn ghost" id="pause-btn">暂停</button>
          <button class="btn ghost" id="restart-btn">重开</button>
        </div>
        <div class="toggle-row">
          <button class="toggle on" id="sound-btn" aria-pressed="true">🔊 音效</button>
          <button class="toggle on" id="vibe-btn" aria-pressed="true">📳 震动</button>
          <button class="toggle" id="wrap-btn" aria-pressed="false">🔁 穿墙</button>
        </div>
      </div>
      <p class="hint">键盘：方向键 / WASD 移动 · 空格暂停 · 手机可直接在棋盘上滑动</p>
    </div>
  </div>
`;

const canvas = document.querySelector("#board");
const scoreEl = document.querySelector("#score");
const bestEl = document.querySelector("#best");
const overlay = document.querySelector("#overlay");
const ovTitle = document.querySelector("#ov-title");
const ovSub = document.querySelector("#ov-sub");
const ovScore = document.querySelector("#ov-score");
const ovBtn = document.querySelector("#ov-btn");
const pauseBtn = document.querySelector("#pause-btn");
const restartBtn = document.querySelector("#restart-btn");

const game = createSnakeGame({
  canvas,
  hooks: {
    score({ score, best }) {
      scoreEl.textContent = score;
      bestEl.textContent = best;
    },
    eat() {
      playEat();
    },
    state(s) {
      updateOverlay(s);
      pauseBtn.textContent = s === "paused" ? "继续" : "暂停";
    },
    gameover({ score, best }) {
      playGameOver();
      ovTitle.textContent = "游戏结束";
      ovSub.textContent =
        score >= best && score > 0 ? "新纪录！再来一局挑战自己。" : "再接再厉，挑战更高分。";
      ovScore.hidden = false;
      ovScore.textContent = `本局得分 ${score} · 最高 ${best}`;
      ovBtn.textContent = "再来一局";
    }
  }
});

bestEl.textContent = game.best;

function updateOverlay(state) {
  if (state === "running") {
    overlay.hidden = true;
  } else if (state === "paused") {
    overlay.hidden = false;
    ovTitle.textContent = "已暂停";
    ovSub.textContent = "点击继续或按空格恢复。";
    ovScore.hidden = true;
    ovBtn.textContent = "继续游戏";
  } else if (state === "idle") {
    overlay.hidden = false;
  }
}

// ---------- 开始 / 重开 / 暂停 ----------
function startGame() {
  unlockAudio(); // 首次手势解锁移动端音频
  playStart();
  game.start();
}

ovBtn.addEventListener("click", () => {
  if (game.state === "paused") game.resume();
  else startGame();
});

restartBtn.addEventListener("click", () => startGame());

pauseBtn.addEventListener("click", () => {
  if (game.state === "running" || game.state === "paused") game.togglePause();
});

// ---------- 设置开关：音效 / 震动 / 穿墙 ----------
const soundBtn = document.querySelector("#sound-btn");
const vibeBtn = document.querySelector("#vibe-btn");
const wrapBtn = document.querySelector("#wrap-btn");

function setToggleUI(btn, on) {
  btn.classList.toggle("on", on);
  btn.setAttribute("aria-pressed", String(on));
}

let soundOn = true;
let vibeOn = true;

soundBtn.addEventListener("click", () => {
  soundOn = !soundOn;
  setSoundEnabled(soundOn);
  setToggleUI(soundBtn, soundOn);
  if (soundOn) {
    unlockAudio();
    playStart();
  }
});

vibeBtn.addEventListener("click", () => {
  vibeOn = !vibeOn;
  game.setVibration(vibeOn);
  setToggleUI(vibeBtn, vibeOn);
  if (vibeOn && navigator.vibrate) navigator.vibrate(30);
});

wrapBtn.addEventListener("click", () => {
  const next = !game.wrap;
  game.setWrap(next);
  setToggleUI(wrapBtn, next);
  ovSub.dataset.wrap = next ? "1" : "0";
});

// ---------- D-pad ----------
document.querySelectorAll(".dpad button[data-dir]").forEach((btn) => {
  const dir = btn.dataset.dir;
  const handler = (e) => {
    e.preventDefault();
    if (game.state === "idle" || game.state === "over") return;
    ({ up: game.setUp, down: game.setDown, left: game.setLeft, right: game.setRight }[dir])();
  };
  btn.addEventListener("touchstart", handler, { passive: false });
  btn.addEventListener("click", handler);
});

// ---------- 键盘 ----------
window.addEventListener("keydown", (e) => {
  const k = e.key.toLowerCase();
  const map = {
    arrowup: game.setUp,
    w: game.setUp,
    arrowdown: game.setDown,
    s: game.setDown,
    arrowleft: game.setLeft,
    a: game.setLeft,
    arrowright: game.setRight,
    d: game.setRight
  };
  if (map[k]) {
    e.preventDefault();
    if (game.state === "idle" || game.state === "over") startGame();
    else map[k]();
  } else if (k === " " || k === "spacebar") {
    e.preventDefault();
    if (game.state === "idle" || game.state === "over") startGame();
    else game.togglePause();
  }
});

// ---------- 触摸滑动（在棋盘上） ----------
let touchStart = null;
canvas.addEventListener(
  "touchstart",
  (e) => {
    const t = e.touches[0];
    touchStart = { x: t.clientX, y: t.clientY };
  },
  { passive: true }
);

canvas.addEventListener(
  "touchend",
  (e) => {
    if (!touchStart) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.x;
    const dy = t.clientY - touchStart.y;
    touchStart = null;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    if (Math.max(absX, absY) < 20) return; // 轻点忽略
    if (game.state === "idle" || game.state === "over") {
      startGame();
      return;
    }
    if (absX > absY) {
      dx > 0 ? game.setRight() : game.setLeft();
    } else {
      dy > 0 ? game.setDown() : game.setUp();
    }
  },
  { passive: true }
);

// ---------- 尺寸自适应 ----------
const ro = new ResizeObserver(() => game.resize());
ro.observe(canvas);
window.addEventListener("orientationchange", () =>
  setTimeout(() => game.resize(), 200)
);
game.resize();
updateOverlay("idle");

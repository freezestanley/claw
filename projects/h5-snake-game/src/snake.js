// 贪吃蛇核心引擎 —— 纯 JavaScript，无外部依赖
// 负责：网格状态、移动、吃食、碰撞、绘制、计分

const GRID = 20; // 20 x 20 网格
const BEST_KEY = "h5-snake-best";

export function createSnakeGame({ canvas, hooks = {} }) {
  const ctx = canvas.getContext("2d");

  let cell = 0; // 单格像素，随 canvas 尺寸动态计算
  let snake = [];
  let dir = { x: 1, y: 0 };
  let nextDir = { x: 1, y: 0 };
  let food = { x: 0, y: 0 };
  let score = 0;
  let best = Number(localStorage.getItem(BEST_KEY) || 0);
  let speed = 160; // ms / step，随分数加快
  let timer = null;
  let state = "idle"; // idle | running | paused | over
  let wrap = false; // 穿墙模式：撞墙从对侧穿出
  let vibrationEnabled = true;

  // ---------- 尺寸自适应（高 DPI 清晰） ----------
  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const size = Math.floor(Math.min(rect.width, rect.height));
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cell = size / GRID;
    draw();
  }

  // ---------- 工具 ----------
  function randEmptyCell() {
    while (true) {
      const p = {
        x: Math.floor(Math.random() * GRID),
        y: Math.floor(Math.random() * GRID)
      };
      if (!snake.some((s) => s.x === p.x && s.y === p.y)) return p;
    }
  }

  function emit(name, payload) {
    if (typeof hooks[name] === "function") hooks[name](payload);
  }

  // 震动反馈（仅支持的设备生效）
  function vibrate(pattern) {
    if (vibrationEnabled && navigator.vibrate) navigator.vibrate(pattern);
  }

  // ---------- 生命周期 ----------
  function reset() {
    const mid = Math.floor(GRID / 2);
    snake = [
      { x: mid - 1, y: mid },
      { x: mid - 2, y: mid },
      { x: mid - 3, y: mid }
    ];
    dir = { x: 1, y: 0 };
    nextDir = { x: 1, y: 0 };
    score = 0;
    speed = 160;
    food = randEmptyCell();
    emit("score", { score, best });
  }

  function start() {
    reset();
    state = "running";
    loop();
    emit("state", state);
  }

  function loop() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (state === "running") {
        step();
        loop();
      }
    }, speed);
  }

  function pause() {
    if (state !== "running") return;
    state = "paused";
    clearTimeout(timer);
    emit("state", state);
  }

  function resume() {
    if (state !== "paused") return;
    state = "running";
    loop();
    emit("state", state);
  }

  function togglePause() {
    if (state === "running") pause();
    else if (state === "paused") resume();
  }

  function gameOver() {
    state = "over";
    clearTimeout(timer);
    if (score > best) {
      best = score;
      localStorage.setItem(BEST_KEY, String(best));
    }
    vibrate([90, 50, 120]);
    emit("score", { score, best });
    emit("state", state);
    emit("gameover", { score, best });
  }

  // ---------- 单步推进 ----------
  function step() {
    dir = nextDir;
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

    if (wrap) {
      // 穿墙：从对侧穿出
      head.x = (head.x + GRID) % GRID;
      head.y = (head.y + GRID) % GRID;
    } else if (head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID) {
      // 撞墙
      return gameOver();
    }
    // 撞自己
    if (snake.some((s) => s.x === head.x && s.y === head.y)) {
      return gameOver();
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score += 1;
      // 每 5 分加速一点，最快 70ms
      speed = Math.max(70, 160 - Math.floor(score / 5) * 12);
      food = randEmptyCell();
      vibrate(30);
      emit("score", { score, best });
      emit("eat", { score });
    } else {
      snake.pop();
    }

    draw();
  }

  // ---------- 方向控制（禁止 180° 反向） ----------
  function setDir(x, y) {
    if (state === "idle" || state === "over") return;
    if (state === "paused") resume();
    // 反向无效
    if (dir.x + x === 0 && dir.y + y === 0) return;
    nextDir = { x, y };
  }

  const setUp = () => setDir(0, -1);
  const setDown = () => setDir(0, 1);
  const setLeft = () => setDir(-1, 0);
  const setRight = () => setDir(1, 0);

  // ---------- 绘制 ----------
  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function draw() {
    const size = GRID * cell;
    ctx.clearRect(0, 0, size, size);

    // 背景网格
    ctx.fillStyle = "#0b1426";
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = "rgba(148,163,184,0.06)";
    ctx.lineWidth = 1;
    for (let i = 1; i < GRID; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cell, 0);
      ctx.lineTo(i * cell, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cell);
      ctx.lineTo(size, i * cell);
      ctx.stroke();
    }

    // 食物（发光圆点）
    const fx = food.x * cell + cell / 2;
    const fy = food.y * cell + cell / 2;
    ctx.save();
    ctx.shadowColor = "#fbbf24";
    ctx.shadowBlur = 12;
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.arc(fx, fy, cell * 0.32, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 蛇身
    const pad = Math.max(1, cell * 0.08);
    snake.forEach((s, i) => {
      const t = i / snake.length;
      if (i === 0) {
        ctx.fillStyle = "#22d3ee";
      } else {
        // 头部到尾部渐变
        const g = 211 - Math.floor(t * 90);
        ctx.fillStyle = `rgb(52, ${g}, 153)`;
      }
      roundRect(
        s.x * cell + pad,
        s.y * cell + pad,
        cell - pad * 2,
        cell - pad * 2,
        Math.max(2, cell * 0.22)
      );
      ctx.fill();
    });

    // 蛇眼
    if (snake.length) {
      const h = snake[0];
      const cx = h.x * cell;
      const cy = h.y * cell;
      ctx.fillStyle = "#06121f";
      const eye = Math.max(1.5, cell * 0.12);
      const offX = dir.x !== 0 ? dir.x * cell * 0.18 : 0;
      const offY = dir.y !== 0 ? dir.y * cell * 0.18 : 0;
      const baseX = cx + cell / 2 + offX;
      const baseY = cy + cell / 2 + offY;
      const perpX = dir.x !== 0 ? 0 : cell * 0.2;
      const perpY = dir.y !== 0 ? 0 : cell * 0.2;
      ctx.beginPath();
      ctx.arc(baseX - perpX, baseY - perpY, eye, 0, Math.PI * 2);
      ctx.arc(baseX + perpX, baseY + perpY, eye, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 初始绘制一帧
  reset();

  return {
    get state() {
      return state;
    },
    get score() {
      return score;
    },
    get best() {
      return best;
    },
    get wrap() {
      return wrap;
    },
    setWrap(v) {
      wrap = !!v;
    },
    setVibration(v) {
      vibrationEnabled = !!v;
    },
    start,
    pause,
    resume,
    togglePause,
    resize,
    setUp,
    setDown,
    setLeft,
    setRight
  };
}

// cart.js — 轻量前端购物袋（内存状态 + 角标 + 抽屉），非真实结账
const listeners = new Set();
const state = { items: [] }; // {id,name,price,color,qty}

function emit() { listeners.forEach((fn) => fn(snapshot())); }
export function subscribe(fn) { listeners.add(fn); fn(snapshot()); return () => listeners.delete(fn); }
export function snapshot() {
  const items = state.items.map((i) => ({ ...i }));
  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);
  return { items, count, total };
}
export function add(p) {
  const found = state.items.find((i) => i.id === p.id);
  if (found) found.qty += 1;
  else state.items.push({ id: p.id, name: p.name, price: p.price, color: p.color, qty: 1 });
  emit();
}
export function setQty(id, qty) {
  const it = state.items.find((i) => i.id === id);
  if (!it) return;
  it.qty = Math.max(0, qty);
  if (it.qty === 0) state.items = state.items.filter((i) => i.id !== id);
  emit();
}
export function remove(id) { state.items = state.items.filter((i) => i.id !== id); emit(); }
export function clear() { state.items = []; emit(); }

export const yuan = (n) => "¥" + n.toFixed(2);

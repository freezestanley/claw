// 简单的全局状态协调：登录态变化时通知订阅者（如查询模块的可用性、Hero CTA 等）
import { isLoggedIn, getUser } from "./http.js";

const listeners = new Set();

export const store = {
  onChange(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  refreshGlobal() {
    const state = { loggedIn: isLoggedIn(), user: getUser() };
    listeners.forEach((fn) => {
      try {
        fn(state);
      } catch (e) {
        console.error("[store] listener error", e);
      }
    });
  },
  snapshot() {
    return { loggedIn: isLoggedIn(), user: getUser() };
  },
};

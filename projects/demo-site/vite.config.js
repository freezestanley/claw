import { defineConfig } from "vite";

const apiProxyTarget =
  process.env.VITE_API_PROXY_TARGET || "http://127.0.0.1:8787";
const port = Number(process.env.PORT || "4173");

export default defineConfig({
  server: {
    host: "127.0.0.1",
    port,
    proxy: {
      "/api": {
        target: apiProxyTarget,
        changeOrigin: true,
        secure: false
      }
    }
  },
  preview: {
    host: "127.0.0.1",
    port
  }
});

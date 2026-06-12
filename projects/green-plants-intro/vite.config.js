import { defineConfig } from "vite";
import zipPack from "vite-plugin-zip-pack";

// 绿萝介绍页：前端直连后端 Base URL（默认 http://localhost:3000）。
// 后端通过 OPTIONS 预检处理 CORS，开发期默认不强制走 Vite /api 代理；
// 但仍保留 /api 代理通道，便于需要时统一转发。
const apiProxyTarget = process.env.VITE_API_PROXY_TARGET || "http://localhost:3000";
const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || "4173");

export default defineConfig({
  server: {
    host,
    port,
    strictPort: true,
    proxy: {
      "/api": {
        target: apiProxyTarget,
        changeOrigin: true,
        secure: false,
        rewrite: (p) => p.replace(/^\/api/, "")
      }
    }
  },
  plugins: [
    zipPack({
      inDir: "dist",
      outDir: ".",
      outFileName: "dist.zip",
      overwrite: true
    })
  ],
  preview: {
    host,
    port,
    strictPort: true
  }
});

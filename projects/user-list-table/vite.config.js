import { defineConfig } from 'vite';

// 开发期 /api 代理 → 真实后端 Base URL（可改）。
// 页面默认直接请求 Base URL；当 Base URL 设为 /api 时走此代理避免 CORS。
export default defineConfig({
  server: {
    port: 4380,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ''),
      },
    },
  },
});

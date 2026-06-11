import { defineConfig } from "vite";

const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || "4325");

export default defineConfig({
  server: { host, port, strictPort: true },
  preview: { host, port, strictPort: true }
});

{
  "runtime": "vite",
  "port": 4173,
  "healthcheck": "http://127.0.0.1:4173",
  "proxy": {
    "/api": {
      "target": "https://api.example.com",
      "changeOrigin": true,
      "secure": true
    }
  },
  "blocking": true
}

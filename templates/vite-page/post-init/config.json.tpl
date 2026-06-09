{
  "project": {
    "slug": "{{PROJECT_SLUG}}",
    "name": "{{PROJECT_NAME}}",
    "template": "vite-page",
    "stack": "vite-vanilla",
    "language": "javascript",
    "pageMode": "single-page",
    "status": "active"
  },
  "deps": {
    "packageManager": "pnpm",
    "node": "20.x",
    "python": "3.11",
    "pythonEnv": ".venv",
    "commands": {
      "install": "pnpm install",
      "dev": "pnpm dev",
      "build": "pnpm build",
      "preview": "pnpm preview"
    }
  },
  "preview": {
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
  },
  "apis": {
    "baseUrl": "https://api.example.com",
    "proxyPrefix": "/api",
    "auth": {
      "type": "bearer",
      "source": "env"
    },
    "endpoints": [],
    "mockAllowed": false,
    "blocking": true
  },
  "assets": {
    "logoProvided": false,
    "imagesRequired": [],
    "allowPlaceholder": false,
    "allowStock": false,
    "allowAiImage": false,
    "blocking": true
  },
  "adaptation": {
    "targets": ["pc", "pad", "h5"],
    "breakpoints": {
      "h5Max": 767,
      "padMin": 768,
      "padMax": 1023,
      "pcMin": 1024
    },
    "orientations": {
      "padLandscapeRequired": true,
      "h5LandscapeRequired": false
    },
    "interaction": {
      "touchTargetMin": 44,
      "hoverDependentAllowed": false
    },
    "blocking": true
  },
  "envStatus": {
    "nodeInstalled": false,
    "pythonInstalled": false,
    "lastCheckedAt": null,
    "lastPreviewAt": null,
    "lastBuildAt": null
  }
}

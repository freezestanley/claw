# HANDOFF — 养老保险落地页

## 如何预览

```bash
cd projects/elderly-pension-landing
pnpm install   # 或 npm install
pnpm dev       # http://127.0.0.1:4173
```

## 产出

- 单页静态落地页，暖色调，养老保险产品宣传。
- 主视觉与生活方式区使用「老人运动」公共占位图，加载失败回退暖色块。
- 无后端依赖，可直接 `pnpm build` 产出静态文件到 `dist/`。

## 待办 / 可迭代

- 替换为真实品牌 Logo、配色与产品文案。
- 替换占位图为正式版权图片。
- 如需留资，可接入表单提交接口（当前为占位 CTA）。

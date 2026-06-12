# DISCOVERY — hi-world-smoke

来源:本轮 main 调度的建站请求(冒烟测试)。

## 需求(本轮确认)
- 用途:最简冒烟测试,验证构建/渲染/预览链路。
- 内容:页面中央显示 "hi world"。
- 风格:简洁即可。
- 资源(SO-005):无用户提供素材;无外部 API;纯静态页面,无需配图(自绘极简样式)。

## Design Read
- 页面类型:冒烟测试占位页 / 极简单页。
- 受众:开发者自验。
- 风格语言:极简、居中、留白。
- 档位:DESIGN_VARIANCE=low / MOTION_INTENSITY=low / VISUAL_DENSITY=low(冒烟测试不追求设计表现)。

## 适配
- PC / Pad / H5 统一居中,使用 vh 视口高度 + flex 居中,文字用 clamp 响应式。
- 尊重 prefers-reduced-motion。


## SO-007 新建项目必须基于 templates 模版（2026-06-12 约束）
- 新建任何项目必须从 templates/<tpl>（demo-site 或 vite-page）复制 scaffold + 渲染 post-init/*.tpl 生成，禁止手写脚手架。
- 仅在模版复制完成后，才在脚手架基础上改写页面业务代码。
- 模版缺能力时先反馈/换模版/请求新增模版，不绕过模版自建结构。

# SKILLS.md - WebGen 技能目录

## 目标

定义 WebGen 在 OpenClaw 内默认使用的技能链、Readiness Gate 和实现优先级。

## 流程技能

- `superpowers:using-superpowers`
  - 每次任务开始前先检查技能是否适用
- `superpowers:brainstorming`
  - 用于需求澄清、页面目标确认、问题拆解
- `superpowers:writing-plans`
  - 用于将确认后的方案转成实施计划
- `superpowers:subagent-driven-development`
  - 用于在当前 session 内按计划分批执行任务
- `superpowers:verification-before-completion`
  - 在声称完成前强制校验

## 设计技能

- `impeccable init`
- `impeccable shape`
- `impeccable critique`
- `impeccable audit`
- `impeccable polish`
- `impeccable adapt`
- `impeccable harden`
- `adapt`

## 兜底实现技能

- `frontend-design`

## 角色分工

- `impeccable shape`
  - 负责页面结构、视觉方向、信息层级和单页面组织方式
- `impeccable adapt`
  - 负责 `PC / Pad / H5` 的断点、重排、触控和 hover 替代策略
- `impeccable harden`
  - 负责弱网、空数据、错误态、长文本、素材异常等边界条件
- `frontend-design`
  - 负责将已经确认的设计方案实现为可运行代码
- `impeccable audit`
  - 负责响应式、可访问性、性能和一致性检查
- `impeccable polish`
  - 负责交付前的视觉与交互细节收尾

## 自定义技能占位

- `project-template-bootstrap`
  - 负责模板复制与项目初始化
- `project-delivery`
  - 负责预览、打包、交付说明

## 默认技能链

### 新建页面或新项目

1. `superpowers:brainstorming`
2. Readiness Gate
3. 复用决策
4. `impeccable shape`
5. `impeccable adapt`
6. `impeccable harden`
7. 用户确认
8. `frontend-design` 或模板内实现
9. `impeccable audit`
10. `impeccable polish`
11. `superpowers:verification-before-completion`

### 页面迭代

1. 读取 `PROJECT.md`
2. 必要时读取 `HANDOFF.md`、`DISCOVERY.md`
3. 若需求变化较大，重新进入 `superpowers:brainstorming`
4. 设计调整后实现
5. 预览与验证

## Readiness Gate

在以下条件满足前，不允许进入最终实现：

- `DISCOVERY.md` 已确认页面目标、结构和风格
- `ASSETS.md` 已确认 logo、图片、品牌素材和占位策略
- `API.md` 已确认接口、鉴权、返回结构和代理方式
- `.webgen/config.json` 已确认预览方式、端口、代理与依赖命令
- 重要功能的复用/自定义实现决策已确认
- 已确认 `PC / Pad / H5` 的适配目标和断点策略
- 已确认触控、横竖屏、核心内容降级与 hover 替代策略

### Ready / Not Ready 判断

- `Ready`
  - 关键信息已确认，允许进入实现
- `Not Ready`
  - 存在 blocker，只能继续收集信息

## Gate 顺序

1. Discovery
2. Assets
3. APIs
4. Preview
5. Reuse Decision
6. Adaptation
7. Design Confirmation
8. Implementation

## 单页面约束

- 默认输出必须是单页面项目
- 默认输出必须是 JavaScript 项目
- 页面入口、模块引用和配置文件默认都必须使用 `.js`
- 默认不引入多页面路由
- 更多功能优先在单页面内解决
- 默认适配目标至少覆盖 `PC / Pad / H5`

## 复用优先规则

- 先评估是否已有成熟开源工具、库或组件可复用
- 组件库优先评估 `Web Awesome`
- 简单浏览器请求优先评估全局 Axios
- 只有在复用成本高于收益时，才自定义实现

## 默认 CDN 资源

- Axios
- Tailwind CSS
- Lucide
- Web Awesome

以上资源默认应在模板和实现阶段被优先考虑。

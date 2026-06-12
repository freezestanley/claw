# API — user-list-table

## GET /users/search
- Base URL: `http://localhost:3000`（页面可配置）
- 开发期优先走 Vite `/api` 代理 → 目标 Base URL
- Query String，无 body

### 参数
| 名 | 类型 | 必填 | 说明 |
|---|---|---|---|
| q | string | 否 | 默认""，模糊匹配 name/email |
| role | string | 否 | 精确：admin/user/editor |
| department | string | 否 | 精确部门名（如 技术部） |
| page | int | 否 | 默认1，最小1 |
| pageSize | int | 否 | 默认10，范围1–50 |

多参数 AND 交集；query 需正确 URL 编码（中文）。

### 成功响应 200
响应头含 `X-Total-Count`（= pagination.total）。
```json
{
  "success": true,
  "data": [
    { "id":1, "name":"张三", "email":"zhangsan@example.com", "role":"admin", "department":"技术部" }
  ],
  "pagination": { "page":1, "pageSize":10, "total":1, "totalPages":1 }
}
```

### 兜底
网络/接口不可用 → 空态 + 错误提示 + 内置 mock 占位数据（保证无后端可预览）。

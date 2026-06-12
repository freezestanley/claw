// 内置 mock 数据 + 本地查询逻辑，用于无后端时降级演示。
// 与 GET /users/search 的 schema 完全一致（参数 AND 交集、分页、X-Total-Count）。

const FIRST = ['张', '李', '王', '刘', '陈', '杨', '赵', '黄', '周', '吴', '徐', '孙', '马', '朱', '胡'];
const LAST = ['伟', '芳', '娜', '敏', '静', '丽', '强', '磊', '军', '洋', '勇', '艳', '杰', '娟', '涛', '明', '超', '霞', '平', '刚'];
const ROLES = ['admin', 'user', 'editor'];
const DEPTS = ['技术部', '产品部', '设计部', '市场部', '运营部', '人事部', '财务部'];

function pinyinish(name, i) {
  // 简单生成稳定邮箱前缀
  return `user${i}`;
}

const USERS = Array.from({ length: 137 }, (_, idx) => {
  const i = idx + 1;
  const name = FIRST[idx % FIRST.length] + LAST[(idx * 7) % LAST.length];
  const role = ROLES[idx % ROLES.length];
  const department = DEPTS[(idx * 3) % DEPTS.length];
  const email = `${pinyinish(name, i)}@example.com`;
  return { id: i, name, email, role, department };
});

// 本地实现 /users/search
export function mockSearch({ q = '', role = '', department = '', page = 1, pageSize = 10 }) {
  const kw = String(q).trim().toLowerCase();
  let list = USERS.filter((u) => {
    if (kw && !(`${u.name}`.toLowerCase().includes(kw) || u.email.toLowerCase().includes(kw))) return false;
    if (role && u.role !== role) return false;
    if (department && u.department !== department) return false;
    return true;
  });

  const total = list.length;
  const ps = Math.min(Math.max(parseInt(pageSize, 10) || 10, 1), 50);
  const totalPages = Math.max(Math.ceil(total / ps), 1);
  const p = Math.min(Math.max(parseInt(page, 10) || 1, 1), totalPages);
  const start = (p - 1) * ps;
  const data = list.slice(start, start + ps);

  return {
    success: true,
    data,
    pagination: { page: p, pageSize: ps, total, totalPages },
  };
}

export const MOCK_DEPTS = DEPTS;

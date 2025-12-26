# 群公告 API 文档

## 概述

群公告功能允许群管理员或群创建者发布群公告，群成员可以查看所有公告。所有公告的创建、更新、删除操作都会实时推送到相关用户的客户端。

## 权限说明

- **创建/更新/删除公告**: 仅限系统管理员或群创建者（群主）
- **查看公告**: 所有群成员

## 实时推送

当群公告发生变化时，系统会通过 WebSocket 实时推送事件到客户端：

- **创建公告**: 推送 `group_announcement_created` 事件
- **更新公告**: 推送 `group_announcement_updated` 事件
- **删除公告**: 推送 `group_announcement_deleted` 事件

推送目标：
- 公开群：所有在线用户
- 私有群：群成员

## API 端点

### 1. 创建群公告

创建一条新的群公告。

**端点**: `POST /api/group/:gid/announcement`

**权限**: 系统管理员或群创建者

**路径参数**:
- `gid` (integer): 群组 ID

**请求体**:
```json
{
  "content": "公告内容"
}
```

**请求字段说明**:
- `content` (string, 必填): 公告内容

**响应**: `200 OK`
```json
{
  "id": 1,
  "gid": 123,
  "content": "公告内容",
  "created_by": 456,
  "created_at": "2025-12-26T10:00:00Z"
}
```

**响应字段说明**:
- `id` (integer): 公告 ID
- `gid` (integer): 群组 ID
- `content` (string): 公告内容
- `created_by` (integer): 创建者用户 ID
- `created_at` (string): 创建时间 (ISO 8601 格式)

**错误响应**:
- `403 Forbidden`: 无权限创建公告（非管理员或群主）
- `404 Not Found`: 群组不存在

**示例**:
```bash
curl -X POST "https://your-server.com/api/group/123/announcement" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"content": "欢迎加入本群！"}'
```

---

### 2. 获取群公告列表

获取指定群组的所有公告，按创建时间倒序排列。

**端点**: `GET /api/group/:gid/announcement`

**权限**: 群成员、系统管理员

**路径参数**:
- `gid` (integer): 群组 ID

**响应**: `200 OK`
```json
[
  {
    "id": 2,
    "gid": 123,
    "content": "最新公告内容",
    "created_by": 456,
    "created_at": "2025-12-26T12:00:00Z"
  },
  {
    "id": 1,
    "gid": 123,
    "content": "较早的公告内容",
    "created_by": 456,
    "created_at": "2025-12-26T10:00:00Z"
  }
]
```

**响应字段说明**:
- 返回公告数组，每个公告包含以下字段：
  - `id` (integer): 公告 ID
  - `gid` (integer): 群组 ID
  - `content` (string): 公告内容
  - `created_by` (integer): 创建者用户 ID
  - `created_at` (string): 创建时间 (ISO 8601 格式)

**错误响应**:
- `403 Forbidden`: 无权限查看公告（非群成员且非管理员）
- `404 Not Found`: 群组不存在

**示例**:
```bash
curl -X GET "https://your-server.com/api/group/123/announcement" \
  -H "X-API-Key: your-api-key"
```

---

### 3. 更新群公告

更新指定的群公告内容。

**端点**: `PUT /api/group/:gid/announcement/:id`

**权限**: 系统管理员或群创建者

**路径参数**:
- `gid` (integer): 群组 ID
- `id` (integer): 公告 ID

**请求体**:
```json
{
  "content": "更新后的公告内容"
}
```

**请求字段说明**:
- `content` (string, 必填): 更新后的公告内容

**响应**: `200 OK`
```json
{
  "id": 1,
  "gid": 123,
  "content": "更新后的公告内容",
  "created_by": 456,
  "created_at": "2025-12-26T10:00:00Z"
}
```

**响应字段说明**:
- `id` (integer): 公告 ID
- `gid` (integer): 群组 ID
- `content` (string): 更新后的公告内容
- `created_by` (integer): 创建者用户 ID
- `created_at` (string): 创建时间 (ISO 8601 格式)

**错误响应**:
- `403 Forbidden`: 无权限更新公告（非管理员或群主）
- `404 Not Found`: 群组或公告不存在

**示例**:
```bash
curl -X PUT "https://your-server.com/api/group/123/announcement/1" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"content": "更新后的欢迎信息！"}'
```

---

### 4. 删除群公告

删除指定的群公告。

**端点**: `DELETE /api/group/:gid/announcement/:id`

**权限**: 系统管理员或群创建者

**路径参数**:
- `gid` (integer): 群组 ID
- `id` (integer): 公告 ID

**响应**: `200 OK`

无响应体，成功删除返回空响应。

**错误响应**:
- `403 Forbidden`: 无权限删除公告（非管理员或群主）
- `404 Not Found`: 群组或公告不存在

**示例**:
```bash
curl -X DELETE "https://your-server.com/api/group/123/announcement/1" \
  -H "X-API-Key: your-api-key"
```

---

## 使用场景

### 场景 1: 群主发布欢迎公告
```bash
# 群主创建公告
curl -X POST "https://your-server.com/api/group/123/announcement" \
  -H "X-API-Key: owner-api-key" \
  -H "Content-Type: application/json" \
  -d '{"content": "欢迎大家加入本群，请遵守群规！"}'
```

### 场景 2: 管理员发布重要通知
```bash
# 系统管理员创建公告
curl -X POST "https://your-server.com/api/group/123/announcement" \
  -H "X-API-Key: admin-api-key" \
  -H "Content-Type: application/json" \
  -d '{"content": "系统将于今晚 22:00 进行维护，预计 1 小时。"}'
```

### 场景 3: 群成员查看公告
```bash
# 群成员获取所有公告
curl -X GET "https://your-server.com/api/group/123/announcement" \
  -H "X-API-Key: member-api-key"
```

### 场景 4: 群主更新公告内容
```bash
# 群主修改已发布的公告
curl -X PUT "https://your-server.com/api/group/123/announcement/1" \
  -H "X-API-Key: owner-api-key" \
  -H "Content-Type: application/json" \
  -d '{"content": "更新：维护时间改为今晚 23:00。"}'
```

### 场景 5: 管理员删除过期公告
```bash
# 系统管理员删除不再需要的公告
curl -X DELETE "https://your-server.com/api/group/123/announcement/1" \
  -H "X-API-Key: admin-api-key"
```

---

## WebSocket 推送消息格式

客户端通过 WebSocket 连接会收到以下格式的推送消息：

### 创建公告推送
```json
{
  "type": "group_announcement_created",
  "gid": 123,
  "announcement": {
    "id": 1,
    "gid": 123,
    "content": "公告内容",
    "created_by": 456,
    "created_at": "2025-12-26T10:00:00Z"
  }
}
```

### 更新公告推送
```json
{
  "type": "group_announcement_updated",
  "gid": 123,
  "announcement": {
    "id": 1,
    "gid": 123,
    "content": "更新后的内容",
    "created_by": 456,
    "created_at": "2025-12-26T10:00:00Z"
  }
}
```

### 删除公告推送
```json
{
  "type": "group_announcement_deleted",
  "gid": 123,
  "id": 1
}
```

---

## 数据库结构

公告数据存储在 `group_announcement` 表中：

```sql
create table group_announcement
(
    id          integer primary key autoincrement not null,
    gid         integer not null,
    content     text not null,
    created_by  integer not null,
    created_at  timestamp not null default current_timestamp,
    foreign key (gid) references `group` (gid) on delete cascade,
    foreign key (created_by) references user (uid) on delete cascade
);

create index idx_group_announcement_gid on group_announcement(gid);
```

---

## 注意事项

1. **权限控制**: 
   - 只有系统管理员或群创建者可以创建、更新、删除公告
   - 私有群的公告只有群成员可以查看
   - 公开群的公告所有用户都可以查看

2. **数据完整性**:
   - 当群组被删除时，相关公告会自动删除（级联删除）
   - 当创建者用户被删除时，相关公告会自动删除（级联删除）

3. **排序规则**:
   - 公告列表按创建时间倒序排列，最新的公告在最前面

4. **内容限制**:
   - 公告内容为文本格式
   - 建议控制公告内容长度，避免过长影响显示

5. **操作限制**:
   - 更新和删除操作需要指定正确的群组 ID 和公告 ID
   - 只能操作属于指定群组的公告

---

## API 端点总览

| 方法 | 端点 | 权限 | 说明 |
|------|------|------|------|
| POST | `/api/group/:gid/announcement` | 管理员/群主 | 创建群公告 |
| GET | `/api/group/:gid/announcement` | 群成员/管理员 | 获取群公告列表 |
| PUT | `/api/group/:gid/announcement/:id` | 管理员/群主 | 更新群公告 |
| DELETE | `/api/group/:gid/announcement/:id` | 管理员/群主 | 删除群公告 |

---

## 版本历史

- **v1.0** (2025-12-26): 初始版本，支持群公告的完整 CRUD 操作（创建、读取、更新、删除）


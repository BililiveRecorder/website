---
title: GraphQL API
description: 录播姬的 GraphQL API 说明
---

录播姬提供了 GraphQL API，路径为 `/graphql`。为了方便开发和测试，录播姬还提供了 GraphiQL 之类的可视化工具，可以查看录播姬提供的 query 和 mutation。

更多关于 GraphQL 本身的教程和文档请参考 [GraphQL 官方文档](https://graphql.org/learn/)或它的[中文翻译](https://graphql.cn/learn/)。

GraphQL Schema 可以通过 introspection 获取，请使用 GraphQL Playground 等工具获取。

请求示例：

```
POST /graphql HTTP/1.1
Accept: application/json
Content-Type: application/json

{"query":"query ($id: Int) { room(roomId: $id) { name shortId roomConfig { roomId } }}","variables":{"id":3}}
```

响应示例：

```json
{
  "data": {
    "room": {
      "name": "3号直播间",
      "shortId": 3,
      "roomConfig": {
        "roomId": 23058
      }
    }
  }
}
```

# API

录播姬命令行版提供了 HTTP API，启用 HTTP 服务的方法请参考 [命令行版 - 安装使用](./install/cli.md) 和 [Docker 镜像 - 安装使用](./install/docker.md) 页面。

录播姬目前提供了两种 API

- REST
- GraphQL

录播姬桌面版没有 HTTP API 功能。

## 兼容性

录播姬使用 [SemVer](https://semver.org/lang/zh-CN/){target="_blank" rel="noopener noreferrer"} 版本号规则：

- 大版本号变动 是有 API 不兼容的更改
- 次版本号变动 是有 API 兼容的新功能
- 补丁号变动 是有 API 兼容的问题修复

## CORS

录播姬允许来自任意域名的跨域请求。

## 文档

API 文档在录播姬里，浏览器访问录播姬就能看到。

REST API 提供了 OpenAPI 定义和 Swagger UI。

GraphQL 提供了四个 UI：

- GraphQL Playground
- GraphiQL
- Altair
- GraphQL Voyager

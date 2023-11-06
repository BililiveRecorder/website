---
title: "@bililive/rec-sdk"
---

@bililive/rec-sdk 是对录播姬 API、二进制程序的封装，并实现了一个 Webhook 和一些实用工具，你可以使用它来：

- 编写一个程序读取录播姬运行状态和操作录播姬
- 启动一个命令行版本的录播姬实例
- 启动一个 Webhook 供录播姬上报数据，并在一个 Eventemitter 里处理录播姬的事件
- 使用一个高度封装的 `BililiveRecService`，其内部启动了一个录播姬，生成了对接它的 SDK 实例和 Webhook 实例

## 安装和配置：

```shell
yarn add @bililive/rec-sdk@v2-alpha
npm i @bililive/rec-sdk@v2-alpha

# 如果你使用 SDK 功能，需要添加：
yarn add axios

# 如果使用 Webhook 功能，需要添加:
yarn add eventemitter3 express portfinder

# 如果你使用实例启动器或者，需要添加:
yarn add axios eventemitter3 express portfinder
```

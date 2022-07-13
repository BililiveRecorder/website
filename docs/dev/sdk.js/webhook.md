# Webhook 服务

SDK 内置的 Webhook 服务，它可以启动一个 web 服务器用于收集录播姬实例的数据，并把接收到的事件转发给订阅者

## 安装

```shell
yarn add @bililive/rec-sdk@v2-alpha eventemitter3 express portfinder
npm i @bililive/rec-sdk@v2-alpha eventemitter3 express portfinder

# for typescript user
yarn add -D @types/express
```

## 技术说明

本 webhook 工具在设计上是面向多个服务的，所以有 instanceId 的概念

假设 webhook 的工作在 `http://localhost:9000/webhook` 上

你可以定义一个录播姬实例的 id 是 `tks1453`，这个实例的 webhook 应当向 `http://localhost:9000/webhook/tks1453` 发送事件

你在这个 webhook 收到事件时也会同时接收到 instanceId 字段，值为 tks1453

如果你的录播姬是单实例的，你可以用 `default` 作为实例 Id，同时在处理的时候忽略 instanceId 字段

webhook 实例提供了一个 getUrl 方法来获取当前的 webhook 的访问 url，这个方法接受一个可选的 instanceId 作为参数

## 使用

有三个环境变量可以代替构造 webhook 的参数：

`WEBHOOK_HOST`, `WEBHOOK_PORT`, `WEBHOOK_PATH_PREFIX`

```ts
import { Webhook } from "@bililive/rec-sdk/dist/webhook"

// 不传参时默认使用上述的环境变量值，环境变量也没有的，默认使用 localhost 和从 9000 开始的第一个可用端口
const webhook = await Webhook.create()
const webhook = await Webhook.create({ host: "localhost", port: 9000 })

webhook.getUrl()
// => http://localhost:9000/webhook/default
webhook.getUrl("second-server")
// => http://localhost:9000/webhook/second-server

webhook.on("SessionStarted", (event, instanceId) => {
  console.log(instanceId);
  // => "second-server"
  console.log(event);
  // => {
  //   "EventType": "SessionStarted",
  //   "EventTimestamp": "2021-05-14T17:52:44.4960899+08:00",
  //   "EventId": "e3e1c9ec-f386-4bc3-9e5a-661bf3ed2fb2",
  //   "EventData": {
  //     ...
  //   }
  // }
})
```

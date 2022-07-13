# 录播姬实例启动器

SDK 内置的录播姬实例管理工具，它启动一个 webhook 后启动一个录播姬，再生成一个 SDK，并调用 SDK 设置录播姬的 webhook 为前面的 webhook 服务，最后把这些实例都提供给你

## 安装

```shell
yarn add @bililive/rec-sdk@v2-alpha axios eventemitter3 express portfinder
npm i @bililive/rec-sdk@v2-alpha axios eventemitter3 express portfinder

# for typescript user
yarn add -D @types/express
```

## 使用

有四个环境变量可以代替构造 webhook 的参数，其中 `BL_REC_PATH` 是录播姬的二进制文件路径：

`BL_REC_API_HOST`, `BL_REC_API_PORT`, `BL_REC_PATH`, `BL_REC_WORKDIR`


```ts
import { BililiveRecService } from "@bililive/rec-sdk/dist/service";

const service = await BililiveRecService.create({ workdir: "somewhere" });

// SDK 实例
service.bililiveRec.addRoom({ roomId: 14846654; autoRecord: true })

// Webhook
service.webhook.on("SessionStarted", (event) => {
  console.log(`好耶！小司开播了，内容是：${event.EventData.Title}`)
})

service.process
// 录播姬进程

await service.stop();
```

接口定义:

```ts
export interface ServiceOptions {
  host?: string;
  port?: number;
  binPath?: string;
  workdir?: string;
  webhook?: true | WebhookOptions;
  extArgs?: string[];
  portable?: boolean
}

export class BililiveRecService {
  host: string;
  port: number;
  execPath: string;
  workdir: string;
  bililiveRec: BililiveRec;
  webhook: Webhook | null;
  process: ChildProcessWithoutNullStreams;
  private constructor();
  static create(options?: ServiceOptions): Promise<BililiveRecService>;
  stop(): Promise<void>;
}
```

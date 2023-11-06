---
title: 面向对象的 SDK
---

## 安装

```shell
yarn add @bililive/rec-sdk@v2-alpha axios
npm i @bililive/rec-sdk@v2-alpha axios
```

## 使用

```ts
import { BililiveRec } from "@bililive/rec-sdk"

// BililiveRec 是对“录播姬实例”的抽象，你可以创建复数个 BililiveRec 来管理不同的录播姬实例
const bRecInstance = new BililiveRec({ httpUrl: "http://localhost:1453" });
const bRecInstance2 = new BililiveRec({ httpUrl: "http://localhost:1454" });

// 你可以调用 setConfig 来操作实例设置
await bRecInstance.setConfig({ ... })

// Room 是对“直播间”的抽象
const rooms = await bRecInstance.listRooms();
const room = await bRecInstance.getRoomByRoomId(8760033);

await room.start()
await room.split()
await room.stop()

// 本 SDK 实现了一个特殊的方法，使得你可以把一个实例上的直播间迁移到另一个实例，并在迁移成功后修改 room 实例的关联关系
await room.transferTo(bRecInstance2);

// 如果你在运行大规模录制的集群，在需要迁移/升级的时候，可以找出所有没开播的直播间，用上面的方法把他们迁移到别的录播姬实例上，持续轮询，直到所有直播间都转移成功，这样可以避免丢失录播内容

```

如果你需要获取存粹的 API，可以用下面的方法获取 API 实例

```ts
const api = bRecInstance.ctx.api;
await api.removeRoomByRoomId(10101);
```

如果只使用 API，不需要上层的抽象，也可以绕过 BililiveRec 直接构造 API 实例

具体参考[纯 API 封装](../api/)

## 说明

### BililiveRec

| Method           | 说明                       |
| ---------------- | -------------------------- |
| defaultConfig    | 获取软件默认设置           |
| getConfig        | 获取全局设置               |
| setConfig        | 设置全局设置               |
| listRooms        | 列出所有直播间             |
| refreshRooms     | 刷新直播间缓存             |
| addRoom          | 添加直播间                 |
| fetchRoom        | 获取指定ID的房间           |
| version          | 读取软件版本信息           |
| generateFilename | 根据传入参数生成录播文件名 |
| getFile          | 获取录播目录文件信息       |

注意：所有接口返回的 “room” 都是下方的 Room 类

### Room

| Method                | 说明                       |
| --------------------- | -------------------------- |
| remove                | 删除直播间                 |
| refresh               | 刷新本直播间所有信息       |
| refreshRecordingStats | 刷新直播间录制统计信息     |
| refreshIoStats        | 刷新直播间 IO 统计信息     |
| getConfig             | 读取直播间设置             |
| setConfig             | 修改直播间设置             |
| start                 | 开始录制                   |
| stop                  | 停止录制                   |
| split                 | 手动分段                   |
| transferTo            | 将本直播间转移到另一个实例 |

**Room.transferTo**

```ts
async transferTo(target: BililiveRec, newConfig?: Partial<SetRoomConfig>): Promise<void>

// 将本直播间转移到另一个实例，这个过程会保留原来的配置，你也可以提供部分配置来覆盖原配置中的对应字段
```

:::caution[关于缓存机制]
BililiveRec 在获取列表和添加直播间的时候会缓存直播间信息，在 fetchRoom 时优先读缓存

即你从 listRooms 里获取到的某个直播间的 Room 实例，跟 fetchRoom + ID 获取到的会是同一个实例

```ts
const r1 = await brec.listRooms().filter(i => i.roomId === 14846654);
const r2 = await brec.fetchRoom(14846654);
const r3 = await brec.fetchRoom(14846654);
// r1 === r2 === r3
```

当你调用 `brec.listRooms` 时，新获取到的房间数据会更新到缓存的房间实例里， 所以 r1, r2, r3 上都能获取到最新的数据

refreshRooms 内部实质直接调用了 listRooms，但没有返回值。它的作用是使代码更可读
:::

---
title: 纯 API 封装
---

如果你需要一个工具来操作录播姬，[面向对象的SDK](../sdk/)可能会更易用一些

## 安装

```shell
yarn add @bililive/rec-sdk@v2-alpha axios
npm i @bililive/rec-sdk@v2-alpha axios
```

## 使用

```ts
import axios from "axios"
import { Api } from "@bililive/rec-sdk"

const api = new ApiInstance(axios.create({ ... }));
```

### API 对应关系

具体参数可以追踪 ts 类型定义

| API Name | API Path | 说明 |
| -------- | -------- | ---- |
| `getDefaultConfig` | `/api/config/default` | 获取软件默认设置 |
| `getGlobalConfig` | `/api/config/global` | 获取全局设置 |
| `setGlobalConfig` | `/api/config/global` | 设置全局设置 |
| `getFile` | `/api/file` | 获取录播目录文件信息 |
| `generateFilename` | `/api/misc/generatefilename` | 根据传入参数生成录播文件名 |
| `listRooms` | `/api/room` | 列出所有直播间 |
| `addRoom` | `/api/room` | 添加直播间 |
| `removeRoomByRoomId` | `/api/room/{roomId}` | 删除直播间 |
| `getRoomByRoomId` | `/api/room/{roomId}` | 读取一个直播间 |
| `removeRoomByObjectId` | `/api/room/{objectId}` | 删除直播间 |
| `getRoomByObjectId` | `/api/room/{objectId}` | 读取一个直播间 |
| `getRoomRecordingStatsByRoomId` | `/api/room/{roomId}/stats` | 读取直播间录制统计信息 |
| `getRoomRecordingStatsByObjectId` | `/api/room/{objectId}/stats` | 读取直播间录制统计信息 |
| `getRoomIoStatsByRoomId` | `/api/room/{roomId}/iostats` | 读取直播间 IO 统计信息 |
| `getRoomIoStatsByObjectId` | `/api/room/{objectId}/iostats` | 读取直播间 IO 统计信息 |
| `getRoomConfigByRoomId` | `/api/room/{roomId}/config` | 读取直播间设置 |
| `setRoomConfigByRoomId` | `/api/room/{roomId}/config` | 修改直播间设置 |
| `getRoomConfigByObjectId` | `/api/room/{objectId}/config` | 读取直播间设置 |
| `setRoomConfigByObjectId` | `/api/room/{objectId}/config` | 修改直播间设置 |
| `startRecordByRoomId` | `/api/room/{roomId}/start` | 开始录制 |
| `startRecordByObjectId` | `/api/room/{objectId}/start` | 开始录制 |
| `stopRecordByRoomId` | `/api/room/{roomId}/stop` | 停止录制 |
| `stopRecordByObjectId` | `/api/room/{objectId}/stop` | 停止录制 |
| `splitRecordByRoomId` | `/api/room/{roomId}/split` | 手动分段 |
| `splitRecordByObjectId` | `/api/room/{objectId}/split` | 手动分段 |
| `refreshRoomByRoomId` | `/api/room/{roomId}/refresh` | 刷新直播间信息 |
| `refreshRoomByObjectId` | `/api/room/{objectId}/refresh` | 刷新直播间信息 |
| `getVersion` | `/api/version` | 读取软件版本信息 |

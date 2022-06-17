# Webhook

录播姬提供了 Webhook，方便有能人士基于录播姬实现其他功能。

设置项里可以换行，每行一个 URL，录播姬会向所有 URL 同时发送请求。

测试 webhook 可以使用 [这个 nodejs 脚本](https://github.com/BililiveRecorder/website/blob/main/scripts/httpdump.js){target=_blank} 或者 [https://webhook.site](https://webhook.site){target="_blank" rel="noopener noreferrer"}。

## Webhook v2

Webhook v2 的请求内容如下：

```text
POST /path/to/url
Host: your.host.example.com
Content-Type: application/json
User-Agent: BililiveRecorder/1.3.1

{
  "EventType": "事件类型",
  "EventTimestamp": "事件时间戳",
  "EventId": "事件随机ID",
  "EventData": { }
}
```

Webhook v2 支持以下几种事件类型：

- 录制开始 `SessionStarted`
- 文件打开 `FileOpening`
- 文件关闭 `FileClosed`
- 录制结束 `SessionEnded`
- 直播开始 `StreamStarted` (录播姬 2.0.0 新增)
- 直播结束 `StreamEnded` (录播姬 2.0.0 新增)

!!! tip "提醒"
    之后可能会继续添加其他事件类型，请在代码中做好相应的判断。

!!! tip "提醒"
    请注意因为录播姬内部异步事件执行的顺序、网络延迟、错误重试等原因，录播姬不保证各个事件的发送、接收到的顺序。

    不保证发送顺序举例：  
    `SessionEnded` 的 `EventTimestamp` 是 `2021-05-14T20:00:00.4960899+08:00`  
    而 `FileClosed` 的 `EventTimestamp` 是 `2021-05-14T20:00:00.5071815+08:00`

    不保证接收顺序举例：  
    `SessionEnded` 可能会在 `FileClosed` 之前收到。  
    下一个文件的 `FileOpening` 有可能在上一个文件的 `FileClosed` 之前收到。

接收 webhook 后请尽快返回 HTTP 2XX 状态码，比如 `200 OK` 或 `204 No Content` 等。

如果返回的 HTTP 状态码不为 2xx 或请求时出现其他错误，最多会尝试三次，重试时发送的所有数据均不变，可以使用 `EventId` 来判断是否已经处理过当前事件。

所有事件的 `EventData` 里都有以下几个字段：

| 名字 | 含义 |
| ---- | ---- |
| `RoomId` | 房间号 |
| `ShortId` | 短号，如果没有则为 0 |
| `Name` | 主播名字 |
| `Title` | 直播间标题 |
| `AreaNameParent` | 直播间父分区 |
| `AreaNameChild` | 直播间子分区 |
| `Recording` | 当前是否正在录制 |
| `Streaming` | 当前直播间状态是否为直播中 |
| `DanmakuConnected` | 当前是否连接了弹幕服务器 |

### 录制开始

开始录制的原因可能是手动点击了开始录制按钮，或者设置了开播自动开始录制。

```json
{
  "EventType": "SessionStarted",
  "EventTimestamp": "2021-05-14T17:52:44.4960899+08:00",
  "EventId": "e3e1c9ec-f386-4bc3-9e5a-661bf3ed2fb2",
  "EventData": {
    "SessionId": "7c7f3672-70ce-405a-aa12-886702ced6e5",
    "RoomId": 23058,
    "ShortId": 3,
    "Name": "3号直播间",
    "Title": "哔哩哔哩音悦台",
    "AreaNameParent": "生活",
    "AreaNameChild": "影音馆",
    "Recording":true, // 录播姬 2.0.0 新增
    "Streaming":true, // 录播姬 2.0.0 新增
    "DanmakuConnected":true // 录播姬 2.0.0 新增
  }
}
```

### 文件打开

一次录制可能会输出多个文件。

```json
{
  "EventType": "FileOpening",
  "EventTimestamp": "2021-05-14T17:52:50.5256394+08:00",
  "EventId": "6e7b33e5-4695-4d25-87ee-b09f66e20ba0",
  "EventData": {
    "RelativePath": "23058-3号直播间/录制-23058-20210514-175250-哔哩哔哩音悦台.flv",
    "FileOpenTime": "2021-05-14T17:52:50.5246401+08:00",
    "SessionId": "7c7f3672-70ce-405a-aa12-886702ced6e5",
    "RoomId": 23058,
    "ShortId": 3,
    "Name": "3号直播间",
    "Title": "哔哩哔哩音悦台",
    "AreaNameParent": "生活",
    "AreaNameChild": "影音馆",
    "Recording":true, // 录播姬 2.0.0 新增
    "Streaming":true, // 录播姬 2.0.0 新增
    "DanmakuConnected":true // 录播姬 2.0.0 新增
  }
}
```

### 文件关闭

```json
{
  "EventType": "FileClosed",
  "EventTimestamp": "2021-05-14T17:52:54.9461101+08:00",
  "EventId": "98f85267-e08c-4f15-ad9a-1fc463d42b0b",
  "EventData": {
    "RelativePath": "23058-3号直播间/录制-23058-20210514-175250-哔哩哔哩音悦台.flv",
    "FileSize": 816412,
    "Duration": 4.992,
    "FileOpenTime": "2021-05-14T17:52:50.5246401+08:00",
    "FileCloseTime": "2021-05-14T17:52:54.9461101+08:00",
    "SessionId": "7c7f3672-70ce-405a-aa12-886702ced6e5",
    "RoomId": 23058,
    "ShortId": 3,
    "Name": "3号直播间",
    "Title": "哔哩哔哩音悦台",
    "AreaNameParent": "生活",
    "AreaNameChild": "影音馆",
    "Recording":true, // 录播姬 2.0.0 新增
    "Streaming":true, // 录播姬 2.0.0 新增
    "DanmakuConnected":true // 录播姬 2.0.0 新增
  }
}
```

### 录制结束

```json
{
  "EventType": "SessionEnded",
  "EventTimestamp": "2021-05-14T17:52:54.9481095+08:00",
  "EventId": "e1f4a36e-e34c-4ada-80bb-f6cfc90e99e9",
  "EventData": {
    "SessionId": "7c7f3672-70ce-405a-aa12-886702ced6e5",
    "RoomId": 23058,
    "ShortId": 3,
    "Name": "3号直播间",
    "Title": "哔哩哔哩音悦台",
    "AreaNameParent": "生活",
    "AreaNameChild": "影音馆",
    "Recording":true, // 录播姬 2.0.0 新增
    "Streaming":true, // 录播姬 2.0.0 新增
    "DanmakuConnected":true // 录播姬 2.0.0 新增
  }
}
```

### 直播开始

这个事件是在录播姬 2.0.0 添加的。

```json
{
  "EventType": "StreamStarted",
  "EventTimestamp": "2022-05-17T18:17:29.1604718+08:00",
  "EventId": "2aafd4be-4a6d-44f6-9178-5b04d1929140",
  "EventData": {
    "RoomId": 23058,
    "ShortId": 3,
    "Name": "3号直播间",
    "Title": "哔哩哔哩音悦台",
    "AreaNameParent": "电台",
    "AreaNameChild": "唱见电台",
    "Recording": false,
    "Streaming": true,
    "DanmakuConnected": false
  }
}
```

### 直播结束

这个事件是在录播姬 2.0.0 添加的。

```json
{
  "EventType": "StreamEnded",
  "EventTimestamp": "2022-05-17T18:18:21.3751494+08:00",
  "EventId": "b49b0ed1-2d8f-43a6-b5c6-dece91e5402d",
  "EventData": {
    "RoomId": 23058,
    "ShortId": 3,
    "Name": "3号直播间",
    "Title": "哔哩哔哩音悦台",
    "AreaNameParent": "电台",
    "AreaNameChild": "唱见电台",
    "Recording": false,
    "Streaming": false,
    "DanmakuConnected": false
  }
}
```

## Webhook v1

!!! warning "不建议使用"
    推荐优先使用 Webhook v2，之后的版本可能会移除 Webhook v1

Webhook V1 在每个文件结束时触发，发送 HTTP `POST` 请求。

如果返回的 HTTP 状态码不为 2xx 或请求时出现其他错误，最多会尝试三次，重试时发送的所有数据均不变。

```text
POST /path/to/url
Host: your.host.example.com
Content-Type: application/json
User-Agent: BililiveRecorder/1.3.1
```

```json
{
  "EventRandomId": "bc2d0a41-2711-4f9b-8619-e54104fe90d8",
  "RoomId": 14846654,
  "Name": "小司无常",
  "Title": "【跨界冥神】打mua将！",
  "RelativePath": "14846654/record/20210107/150616.flv",
  "FileSize": 3749098123,
  "StartRecordTime": "2021-01-07T15:06:16.1387156+08:00",
  "EndRecordTime": "2021-01-07T16:06:16.1693244+08:00"
}
```

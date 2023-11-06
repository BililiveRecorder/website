---
title: REST API
description: 录播姬的 REST API 说明
---

录播姬在 `/api` 下提供了 REST 风格的 API。

为了方便开发和测试，录播姬提供了 OpenAPI Definition 和 Swagger UI。  
OpenAPI Definition 的路径为 `/swagger/brec/swagger.json` 或 `/swagger/brec/swagger.yaml`。  
Swagger UI 的路径为 `/swagger/`。

请求示例：

```
GET /api/room/3 HTTP/1.1
Accept: application/json
```

响应示例：

```json
{
  "objectId": "7467f2b3-e8c4-482a-8756-8437b58a5f4c",
  "roomId": 23058,
  "autoRecord": false,
  "shortId": 3,
  "name": "3号直播间",
  "uid": 11153765,
  "title": "哔哩哔哩音悦台",
  "areaNameParent": "电台",
  "areaNameChild": "唱见电台",
  "recording": false,
  "streaming": true,
  "danmakuConnected": true,
  "autoRecordForThisSession": true,
  "recordingStats": {
    "sessionDuration": 0.0,
    "totalInputBytes": 0,
    "totalOutputBytes": 0,
    "currentFileSize": 0,
    "sessionMaxTimestamp": 0,
    "fileMaxTimestamp": 0,
    "addedDuration": 0.0,
    "passedTime": 0.0,
    "durationRatio": "NaN",
    "inputVideoBytes": 0,
    "inputAudioBytes": 0,
    "outputVideoFrames": 0,
    "outputAudioFrames": 0,
    "outputVideoBytes": 0,
    "outputAudioBytes": 0,
    "totalInputVideoBytes": 0,
    "totalInputAudioBytes": 0,
    "totalOutputVideoFrames": 0,
    "totalOutputAudioFrames": 0,
    "totalOutputVideoBytes": 0,
    "totalOutputAudioBytes": 0
  },
  "ioStats": {
    "streamHost": null,
    "startTime": "0001-01-01T00:00:00+00:00",
    "endTime": "0001-01-01T00:00:00+00:00",
    "duration": 0.0,
    "networkBytesDownloaded": 0,
    "networkMbps": 0.0,
    "diskWriteDuration": 0.0,
    "diskBytesWritten": 0,
    "diskMBps": 0.0
  }
}
```

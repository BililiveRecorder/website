# 配置文件格式

录播姬的配置文件在设计之初没有考虑需要人工编写阅读的情况，所以可读性比较差。

因为录播姬所有版本的配置文件都是通用的，对于一般用户来说，推荐使用录播姬桌面版生成配置文件。或者使用录播姬命令行版新的 API 和 Web UI 进行控制（编写此文档时还未发布）。

<!-- TODO -->

配置文件是工作目录里的 `config.json` 文件。

如果需要手动修改配置文件，推荐使用的编辑器是 VSCode。  
推荐添加 JSON Schema，会有自动补全和简单设置说明。

Schema 在 GitHub 仓库根文件夹里 [configV3.schema.json](https://raw.githubusercontent.com/Bililive/BililiveRecorder/dev/configV3.schema.json)

关于所有设置项的列表可以参考 [软件设置](/docs/basic/settings/)

```json
{
  "$schema":"https://raw.githubusercontent.com/Bililive/BililiveRecorder/dev/configV3.schema.json",
  "version": 3,
  "global": {},
  "rooms": []
}
```

## 层级结构

录播姬的设置是层级结构的，如果单房间没有设置值就会使用全局设置，如果全局没有设置值就会使用默认设置。

每个配置项都是下面这样的结构

```json
{
  "HasValue": true,
  "Value": "value"
}
```

`HasValue` 代表有没有值，为 `true` 时使用此处设置的值，为 `false` 时使用更高一层的设置。

## 示例

??? example "配置文件示例"
    ```json
    {
      "version": 2,
      "global": {
        "TimingStreamRetry": {
          "HasValue": false,
          "Value": 0
        },
        "TimingStreamConnect": {
          "HasValue": false,
          "Value": 0
        },
        "TimingDanmakuRetry": {
          "HasValue": false,
          "Value": 0
        },
        "TimingCheckInterval": {
          "HasValue": false,
          "Value": 0
        },
        "TimingWatchdogTimeout": {
          "HasValue": false,
          "Value": 0
        },
        "RecordDanmakuFlushInterval": {
          "HasValue": false,
          "Value": 0
        },
        "Cookie": {
          "HasValue": false,
          "Value": null
        },
        "WebHookUrls": {
          "HasValue": false,
          "Value": null
        },
        "WebHookUrlsV2": {
          "HasValue": false,
          "Value": null
        },
        "LiveApiHost": {
          "HasValue": false,
          "Value": null
        },
        "RecordFilenameFormat": {
          "HasValue": false,
          "Value": null
        },
        "WpfShowTitleAndArea": {
          "HasValue": true,
          "Value": true
        },
        "RecordMode": {
          "HasValue": false,
          "Value": 0
        },
        "CuttingMode": {
          "HasValue": true,
          "Value": 1
        },
        "CuttingNumber": {
          "HasValue": false,
          "Value": 0
        },
        "RecordDanmaku": {
          "HasValue": true,
          "Value": true
        },
        "RecordDanmakuRaw": {
          "HasValue": false,
          "Value": false
        },
        "RecordDanmakuSuperChat": {
          "HasValue": true,
          "Value": false
        },
        "RecordDanmakuGift": {
          "HasValue": true,
          "Value": false
        },
        "RecordDanmakuGuard": {
          "HasValue": true,
          "Value": false
        }
      },
      "rooms": [
        {
          "RoomId": {
            "HasValue": true,
            "Value": 5440
          },
          "AutoRecord": {
            "HasValue": true,
            "Value": false
          },
          "RecordMode": {
            "HasValue": false,
            "Value": 0
          },
          "CuttingMode": {
            "HasValue": false,
            "Value": 0
          },
          "CuttingNumber": {
            "HasValue": false,
            "Value": 0
          },
          "RecordDanmaku": {
            "HasValue": false,
            "Value": false
          },
          "RecordDanmakuRaw": {
            "HasValue": false,
            "Value": false
          },
          "RecordDanmakuSuperChat": {
            "HasValue": false,
            "Value": false
          },
          "RecordDanmakuGift": {
            "HasValue": false,
            "Value": false
          },
          "RecordDanmakuGuard": {
            "HasValue": false,
            "Value": false
          }
        }
      ]
    }
    ```

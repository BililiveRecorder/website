---
title: 命令行版 - 安装使用
---
# 命令行版 - 安装使用

录播姬命令行版是跨平台的，可以在 Linux、macOS、Windows 系统上运行。

命令行版提供了 HTTP API 和网页管理界面，可以在浏览器里启停录制、修改设置。

## 下载

下载：[GitHub Release 页面](https://github.com/BililiveRecorder/BililiveRecorder/releases){target=_blank}

| 操作系统 | 架构 | 下载链接 | 备注 |
| -------- | --- | --- | ---- |
| _N/A_ | _N/A_ | [BililiveRecorder-CLI-any.zip](https://github.com/BililiveRecorder/BililiveRecorder/releases/latest/download/BililiveRecorder-CLI-any.zip) | 需要自行安装 [.NET 运行时](https://dotnet.microsoft.com/zh-cn/download/dotnet/6.0){target=_blank} |
| Linux | x64 | [BililiveRecorder-CLI-linux-x64.zip](https://github.com/BililiveRecorder/BililiveRecorder/releases/latest/download/BililiveRecorder-CLI-linux-x64.zip) | 在服务器上运行一般选这个 |
| Linux | arm32 | [BililiveRecorder-CLI-linux-arm.zip](https://github.com/BililiveRecorder/BililiveRecorder/releases/latest/download/BililiveRecorder-CLI-linux-arm.zip) |
| Linux | arm64 | [BililiveRecorder-CLI-linux-arm64.zip](https://github.com/BililiveRecorder/BililiveRecorder/releases/latest/download/BililiveRecorder-CLI-linux-arm64.zip) |
| Windows | x64 | [BililiveRecorder-CLI-win-x64.zip](https://github.com/BililiveRecorder/BililiveRecorder/releases/latest/download/BililiveRecorder-CLI-win-x64.zip) |
| macOS | x64 | [BililiveRecorder-CLI-osx-x64.zip](https://github.com/BililiveRecorder/BililiveRecorder/releases/latest/download/BililiveRecorder-CLI-osx-x64.zip) |
| macOS | arm64 | [BililiveRecorder-CLI-osx-arm64.zip](https://github.com/BililiveRecorder/BililiveRecorder/releases/latest/download/BililiveRecorder-CLI-osx-arm64.zip) |

## 使用

下载并解压压缩包，以 Linux x64 为例：

```sh
mkdir brec
cd brec
# wget https://下载链接
unzip BililiveRecorder-CLI-linux-x64.zip
```

然后检查确认 `BililiveRecorder.Cli` 是否带有可执行权限，如果没有的话使用以下命令添加可执行权限。

```sh
chmod +x BililiveRecorder.Cli
```

确认录播姬可以运行、并检查版本号

```sh
./BililiveRecorder.Cli --version
```

为了少按几次键盘和后续文档的简洁，从这里开始把 `BililiveRecorder.Cli` 称为 `brec`。  
你也可以使用下面命令给把它改一下名，不改也可以，可执行文件的名字不影响运行。

```sh
mv BililiveRecorder.Cli brec
```

录播姬所有命令都可以加上 `--help` 查看帮助。

!!! note "自行安装 .NET 6 Runtime 的用法"
    自行安装 [.NET 6 Runtime](https://dotnet.microsoft.com/zh-cn/download/dotnet/6.0){target=_blank} 后可以下载使用 `BililiveRecorder-CLI-any.zip`。

    把本教程内的所有命令中的 `./BililiveRecorder.Cli` 和 `./brec` 替换为 `dotnet BililiveRecorder.Cli.dll` 即可，例：

    ```sh
    dotnet BililiveRecorder.Cli.dll --version
    dotnet BililiveRecorder.Cli.dll run --bind "http://localhost:2356" "工作目录"
    ```

### 运行录播姬

录播姬的配置文件和录制的视频文件在同一个文件夹内。
配置文件在工作目录里，文件名是 `config.json`。
一般来说不推荐手写配置文件，可以复制录播姬桌面版的配置文件、或者在浏览器打开录播姬管理页面来添加房间、修改设置。
如果需要手改配置文件的话可以参考 [配置文件](../config-file.md) 页面。

```sh
./brec run "工作目录"
```

录播姬命令行版提供了 HTTP API 和管理网页，可以通过 `--bind` 参数启用。

```sh
# 侦听本机地址，只有本地可以访问
./brec run --bind "http://localhost:2356" "工作目录"

# 或者所有设备都可访问
./brec run --bind "http://*:2356" "工作目录"
```

!!! danger "重要安全提醒"
    如果要把录播姬的管理页面对公网开放，请一定一定一定做好安全措施，给录播姬设置一个密码，或使用其他有身份验证功能的反向代理软件。

    直接把没有身份验证的录播姬暴露到公网可能会有严重的安全风险。轻则被添加一大堆直播间导致硬盘塞满，重则可能会被任意上传下载文件。（理论上是不能通过录播姬来做到任意代码执行的，不过不做任何保证）

录播姬目前有 HTTP Basic 登录功能：

```sh
./brec run --bind "http://*:2356" --http-basic-user "用户名" --http-basic-pass "密码" "工作目录"
```

启用 HTTP 服务之后，默认在 `/file` 路径下会提供整个录播工作目录的内容。可以通过 `--enable-file-browser false` 来禁用。

```sh
./brec run --bind "http://*:2356" --enable-file-browser false "工作目录"
```

录播姬支持以 HTTPS 协议提供服务

```sh
# 注意 --bind 参数传入的协议是 https 而不是 http

# 使用录播姬自己生成的自签名证书
./brec run --bind "https://*:2356" "工作目录"

# 使用 pem 格式的证书，和 Nginx Caddy 等软件的证书格式一致
./brec run --bind "https://*:2356" --cert-pem-path "证书文件路径" --cert-key-path "私钥文件路径" "工作目录"
# 使用带密码的私钥
./brec run --bind "https://*:2356" --cert-pem-path "证书文件路径" --cert-key-path "私钥文件路径" --cert-password "私钥密码" "工作目录"

# 使用 pfx 格式的证书
./brec run --bind "https://*:2356" --cert-pfx-path "证书文件路径" "工作目录"
# 使用带密码的证书
./brec run --bind "https://*:2356" --cert-pfx-path "证书文件路径" --cert-password "私钥密码" "工作目录"
```

### 退出录播姬

按 `Ctrl + C` (即 `SIGINT`) 退出录播姬，退出时会先停止当前正在进行的录播并保存配置。

!!! warning "在 Windows 系统运行的提醒"
    在 Windows 上运行的时候注意不要直接点击命令行窗口的红 X 关闭，这样会强制结束进程，导致配置文件不被保存、正在录制的弹幕文件不完整等问题。

### 便携模式运行

这里是便携模式指的是没有配置文件，录播姬不会加载配置文件，也不会保存配置文件。

```sh
./brec portable "保存目录" 1 3 6655

# 也可以缩写为 p
./brec p "保存目录" 1 3 6655
```

可以传入任意数量的房间号，包括 0 个。默认会给所有房间启用自动录制。

部分设置项可以通过命令参数修改，可以修改的参数列表可以用 `--help` 查看

```sh
./brec p --help
```

便携模式也可以启用 HTTP API，参数和普通的运行方式一样。

```sh
./brec p --bind "http://localhost:2356" "保存目录"
```

### 工具箱命令

命令行版提供了和桌面版一样的工具箱功能。

```sh
./brec tool -h
```

关于每个工具的说明，请查看对应的 [工具箱](../toolbox/index.md) 页面。

所有工具箱命令都有 `--json` 和 `--json-indented` 两个选项，可以以 JSON 格式输出运行结果，方便其他脚本调用。

???+ example
    ```sh
    ./brec tool analyze --json-indented input.flv
    ```
    ```json
    {
      "Status": "OK",
      "Data": {
        "InputPath": "input.flv",
        "NeedFix": false,
        "Unrepairable": false,
        "OutputFileCount": 1,
        "VideoStats": {
          "FrameCount": 11520,
          "FramePerSecond": 60.005312970419254,
          "FrameDurations": {
            "17": 7679,
            "16": 3840
          }
        },
        "AudioStats": {
          "FrameCount": 9000,
          "FramePerSecond": 46.88012751394684,
          "FrameDurations": {
            "21": 5999,
            "22": 3000
          }
        },
        "IssueTypeOther": 0,
        "IssueTypeUnrepairable": 0,
        "IssueTypeTimestampJump": 0,
        "IssueTypeTimestampOffset": 0,
        "IssueTypeDecodingHeader": 0,
        "IssueTypeRepeatingData": 0
      },
      "ErrorMessage": null,
      "Exception": null
    }
    ```

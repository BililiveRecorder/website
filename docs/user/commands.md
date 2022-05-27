# 命令行命令和参数

## 桌面版


录播姬桌面版提供了两个一级子命令 `run` (运行录播姬) 和 `tool` (工具箱)，下面主要对 `run` 进行说明。

录播姬桌面版也提供了工具箱命令，参数格式与[录播姬命令行版的](#工具箱命令)一样，一般来说更推荐使用录播姬命令行版。

!!! info "关于命令行交互"
    因为 `BililiveRecorder.WPF.exe` 是一个 "Windows GUI" 程序而不是 "Windows Console" 程序，在命令行里运行时会立刻返回，然后再输出文本。总体的使用体验很差，所以推荐用命令行版。

```txt
Usage:
  BililiveRecorder.WPF [options] run [<path>]

Arguments:
  <path>  Work directory [default: ]

Options:
  --ask-path      Ask path in GUI even when "don't ask again" is selected before.
  --hide          Minimize to tray
  -?, -h, --help  Show help and usage information
```

`run` 命令有一个可选参数 (argument) `path`，当传入了这个参数的时候，会使用这个路径作为工作目录。
可以使用这个方式来跳过选择工作目录的步骤，方便开机自启。

!!! example "示例"
    ```powershell
    ./BililiveRecorder.WPF.exe run "D:\B站录播\"
    ```

如果传入了 `--ask-path` 选项，不管之前有没有选择过 “不再询问” 都会再弹出选择工作目录的选项框。

如果传入了 `--hide` 选项，录播姬初始化后会自动最小化界面。

!!! example "示例"
    ```powershell
    ./BililiveRecorder.WPF.exe run --ask-path
    ./BililiveRecorder.WPF.exe run --hide "D:\录播"
    ```

传入 `-?`, `-h`, 或 `--help` 可以获取帮助信息。

## 命令行版

??? info "运行录播姬之前的准备工作"

    先解压[下载的压缩包](./install.md)并 `cd` 到解压出来的文件夹里

    ```sh
    # 这里用这个文件名举例
    unzip BililiveRecorder-CLI-linux-x64.zip
    cd linux-x64
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
你也可以使用下面命令给把它改一下名，可执行文件的名字不影响运行。

```sh
mv BililiveRecorder.Cli brec
```

录播姬所有命令都可以加上 `--help` 查看帮助。

### 运行录播姬

录播姬的配置文件和录制的视频文件在同一个文件夹内。

```sh
./brec run "工作目录"
```

录播姬 1.4 提供了 HTTP API，可以通过 `--bind` 参数启用。

```sh
# 侦听本机地址，只有本地可以访问
./brec run --bind "http://localhost:2356" "工作目录"

# 或者所有设备都可访问
./brec run --bind "http://*:2356" "工作目录"
```

配置文件在工作目录里，文件名是 `config.json`。
一般来说不推荐手写配置文件，可以复制录播姬桌面版的配置文件或者用 HTTP API 来添加房间、修改设置。
如果需要手改配置文件的话可以参考 [配置文件](./config-file.md) 页面。

### 便携模式

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

便携模式也可以启用 HTTP API

```sh
./brec p --bind "http://localhost:2356" "保存目录"
```

### 工具箱命令

命令行版提供了和桌面版一样的工具箱功能。

```sh
./brec tool -h
```

关于每个工具的说明，请查看对应的 [工具箱](./toolbox/index.md) 页面。

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

## Docker 版

录播姬 Docker 版和命令行版完全一样。

镜像中的 entrypoint 已经设置成运行录播姬，只需要调整 cmd 部分即可。

完整的 docker 命令例子：

```sh
docker run -v ~/宿主机路径:/rec ghcr.io/bililiverecorder/bililiverecorder:v1.3.11 run /rec
```

------

!!! warning "未发布的内容"
    从这里开始下面的内容是针对录播姬 1.4 的容器镜像编写的

完整的 docker 命令例子：

```sh
# 复制粘贴运行之前记得修改  "~/宿主机路径"
docker run -d -v ~/宿主机路径:/rec -p 2356:2356 ghcr.io/bililiverecorder/bililiverecorder
# 或使用 docker.io 镜像
docker run -d -v ~/宿主机路径:/rec -p 2356:2356 bililive/recorder
```

录播姬的镜像中 entrypoint 已经设置成运行录播姬，默认的 cmd 是在用容器内的 `/rec` 作为工作目录运行。
镜像的默认 cmd 相当于：

```sh
./brec run --bind http://*:2356 /rec
```

其他手动设置传入录播姬的子命令的例子：

```sh
# 便携模式
docker run -d -v ~/宿主机路径:/rec -p 2356:2356 bililive/recorder p /rec

# 工具箱
docker run -it -v ~/宿主机路径:/rec bililive/recorder tool analyze --json /rec/video.flv
```

关于 `docker run` 请参考 [Docker 的文档](https://docs.docker.com/engine/reference/run/){target=_blank}

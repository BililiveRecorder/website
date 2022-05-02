# 命令行命令和参数

## 桌面版


录播姬桌面版提供了两个一级子命令 `run` (运行录播姬) 和 `tool` (工具箱)，下面主要对 `run` 进行说明。

录播姬桌面版也提供了工具箱命令，参数格式与[录播姬命令行版的](#工具箱命令)一样，一般来说更推荐使用录播姬命令行版。

!!! note "关于命令行交互的提醒"
    因为 `BililiveRecorder.WPF.exe` 是一个 "Windows GUI" 程序而不是 "Windows Console" 程序，在命令行里运行时会立刻返回，然后再输出文本，总体的使用体验很差。  

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

在运行录播姬之前先解压下载的压缩包：

```sh
# 这里用这个文件名举例
unzip BililiveRecorder-CLI-linux-x64.zip
```

然后检查确认 `BililiveRecorder.Cli` 是否带有可执行权限，如果没有的话使用以下命令添加可执行权限。

```sh
chmod +x BililiveRecorder.Cli
```

为了少按几次键盘和后续文档的简洁，从这里开始把 `BililiveRecorder.Cli` 称为 `brec`。你也可以使用下面命令给把它改一下名，可执行文件的名字不影响运行。

```sh
mv BililiveRecorder.Cli brec
```

确认录播姬可以运行、并检查版本号

```sh
./brec --version
```

### 运行录播姬

录播姬的配置文件和录制的视频文件在同一个文件夹内。

```sh
./brec run "工作目录"
```

TOOD 还没写

### 以便携模式运行

TOOD 还没写

### 工具箱命令

TOOD 还没写

## Docker 版

录播姬 Docker 版和命令行版完全一样。

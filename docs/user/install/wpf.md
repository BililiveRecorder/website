---
title: 桌面版 - 安装使用
---
# 桌面版 - 安装使用

## 下载和使用

在[本网站首页](/)下载安装包，打开安装包后会自动安装并启动录播姬。  
如果安装出现问题，可以参考[常见问题](../faq.md)。

安装过录播姬后可以从桌面和开始菜单的快捷方式启动录播姬，不要再次运行安装包。  
如果想要卸载录播姬，可以在 **系统设置 :material-chevron-right: 应用** 里卸载。

你也可以从 [GitHub Releases](https://github.com/BililiveRecorder/BililiveRecorder/releases){target=_blank} 下载 zip 压缩包以及旧版本的mikufans录播姬，文件名是 `BililiveRecorder-WPF-Portable.zip`。  
这里下载的压缩包解压后即可运行，不需要安装，没有版本检查和自动更新功能。

通过安装包安装的录播姬有版本检查功能，能自动更新。更新不会重启软件，不影响正在录制的直播，更新后下一次运行录播姬会自动使用新版本。  
如果需要运行特定的版本，可以用便携版，没有版本检查功能也不会更新。

通常来说只有最后一个正式版是受支持的，使用旧版本遇到问题后请确认在最新版本里是否也会有同样的问题。

打开录播姬后需要选择工作目录，工作目录是保存 **配置文件** 和 **录像文件** 的地方。

!!! tip "关于工作目录"
    **配置文件** 也是保存到工作目录里的，因此如果更换了工作目录又没有复制配置文件到新的位置，设置就会初始化。

    录播姬可以多开，选择一个不同的工作目录即可。同一个工作目录同时只能运行一个录播姬。

添加直播间可以使用房间号、直播间短号、带有房间号的普通直播间链接。

!!! info "关于活动页面链接"
    有时候特殊活动的直播间链接是类似下面这种的：  
    `https://www.bilibili.com/blackboard/activity-xxxxxxxx.html`  
    录播姬不支持这种链接，需要手动找到房间号后使用房间号添加。

## 命令行参数

录播姬桌面版提供了两个一级子命令 `run` (运行录播姬) 和 `tool` (工具箱)，下面主要对 `run` 进行说明。

录播姬桌面版也提供了工具箱命令，参数格式与录播姬命令行版的一样，不过一般来说更推荐使用录播姬命令行版。

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
    ./BililiveRecorder.WPF.exe run "D:\mikufans录播\"
    ```

如果传入了 `--ask-path` 选项，不管之前有没有选择过 “不再询问” 都会再弹出选择工作目录的选项框。

如果传入了 `--hide` 选项，录播姬初始化后会自动最小化界面。

!!! example "示例"
    ```powershell
    ./BililiveRecorder.WPF.exe run --ask-path
    ./BililiveRecorder.WPF.exe run --hide "D:\录播"
    ```

传入 `-?`, `-h`, 或 `--help` 可以获取帮助信息。

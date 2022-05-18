# 安装使用

## 桌面版

在本网站首页下载安装包，打开安装包后会自动安装并启动录播姬。  
如果安装出现问题，可以参考[常见问题](./faq.md)。

安装过录播姬后可以从桌面和开始菜单的快捷方式启动录播姬，不要再次运行安装包。  
如果想要卸载录播姬，可以在 **系统设置 :material-chevron-right: 应用** 里卸载。

你也可以从 [GitHub Releases](https://github.com/Bililive/BililiveRecorder/releases){target=_blank} 下载便携版压缩包以及旧版本的B站录播姬，文件名是 `BililiveRecorder-WPF-Portable.zip`。

打开录播姬后需要选择工作目录，工作目录是保存 **配置文件** 和 **录像文件** 的地方。

!!! tip "关于工作目录"
    **配置文件** 也是保存到工作目录里的，因此如果更换了工作目录又没有复制配置文件到新的位置，设置就会初始化。

    录播姬可以多开，选择一个不同的工作目录即可。同一个工作目录同时只能运行一个录播姬。

添加直播间可以使用房间号、直播间短号、带有房间号的普通直播间链接。

!!! info "关于活动页面链接"
    有时候特殊活动的直播间链接是类似下面这种的：  
    `https://www.bilibili.com/blackboard/activity-xxxxxxxx.html`  
    录播姬不支持这种链接，需要手动找到房间号后使用房间号添加。

## 命令行版

从录播姬 1.4 开始命令行版有 HTTP API 功能。

[GitHub Release 页面](https://github.com/Bililive/BililiveRecorder/releases){target=_blank}

| 操作系统 | 架构 | 下载链接 | 备注 |
| -------- | --- | --- | ---- |
| _N/A_ | _N/A_ | [BililiveRecorder-CLI-any.zip](https://github.com/Bililive/BililiveRecorder/releases/latest/download/BililiveRecorder-CLI-any.zip) | 需要自行安装 [.NET 运行时](https://dotnet.microsoft.com/zh-cn/download/dotnet/6.0){target=_blank} |
| Linux | x64 | [BililiveRecorder-CLI-linux-x64.zip](https://github.com/Bililive/BililiveRecorder/releases/latest/download/BililiveRecorder-CLI-linux-x64.zip) | 在服务器上运行选这个 |
| Linux | arm32 | [BililiveRecorder-CLI-linux-arm.zip](https://github.com/Bililive/BililiveRecorder/releases/latest/download/BililiveRecorder-CLI-linux-arm.zip) |
| Linux | arm64 | [BililiveRecorder-CLI-linux-arm64.zip](https://github.com/Bililive/BililiveRecorder/releases/latest/download/BililiveRecorder-CLI-linux-arm64.zip) |
| Windows | x64 | [BililiveRecorder-CLI-win-x64.zip](https://github.com/Bililive/BililiveRecorder/releases/latest/download/BililiveRecorder-CLI-win-x64.zip) |
| macOS | x64 | [BililiveRecorder-CLI-osx-x64.zip](https://github.com/Bililive/BililiveRecorder/releases/latest/download/BililiveRecorder-CLI-osx-x64.zip) |

具体用法请参考 [命令行参数](./commands.md)

## Docker 镜像

Docker 镜像主要在 [GitHub Container registry](https://github.com/Bililive/BililiveRecorder/pkgs/container/bililiverecorder){target=_blank} 上提供。

<!-- TODO Docker Hub -->

```bash
docker pull ghcr.io/bililive/bililiverecorder
# 或指定 tag
docker pull ghcr.io/bililive/bililiverecorder:v1.3.11
```

!!! warning "不要用开发版本"
    注意不要用开发版本，不要用 `dev` tag 或者其他分支名 tag。开发版不保证能用。

镜像内设置的默认执行的命令是 `BililiveRecorder.Cli run /rec`

Docker 镜像内录播姬的用法和命令行版完全一样，具体用法请参考 [命令行参数](./commands.md)

之后可能会搬迁 GitHub Container registry 上的镜像地址（因为打算搬迁仓库）。

之后会在 Docker Hub 上也放一份。

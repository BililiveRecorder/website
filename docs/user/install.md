# 安装使用

## 桌面版

在本网站首页下载安装包，打开安装包后会自动安装并启动录播姬。  
如果安装出现问题，可以参考[常见问题](./faq.md)。

安装过录播姬后可以从桌面和开始菜单的快捷方式启动录播姬，不要再次运行安装包。  
如果想要卸载录播姬，可以在 **系统设置 :material-chevron-right: 应用** 里卸载。

你也可以从 [GitHub Releases](https://github.com/BililiveRecorder/BililiveRecorder/releases){target=_blank} 下载便携版压缩包以及旧版本的B站录播姬，文件名是 `BililiveRecorder-WPF-Portable.zip`。

通过安装包安装的录播姬有版本检查功能，能自动更新。更新不会重启软件，不影响正在录制的直播，更新后下一次运行录播姬会自动使用新版本。  
如果需要运行特定的版本，可以用便携版，没有版本检查功能也不会更新。通常来说只有最后一个正式版是受支持的，旧版本特有的问题不会修复。

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

从录播姬 1.4 开始，命令行版有 HTTP API 功能。

[GitHub Release 页面](https://github.com/BililiveRecorder/BililiveRecorder/releases){target=_blank}

| 操作系统 | 架构 | 下载链接 | 备注 |
| -------- | --- | --- | ---- |
| _N/A_ | _N/A_ | [BililiveRecorder-CLI-any.zip](https://github.com/BililiveRecorder/BililiveRecorder/releases/latest/download/BililiveRecorder-CLI-any.zip) | 需要自行安装 [.NET 运行时](https://dotnet.microsoft.com/zh-cn/download/dotnet/6.0){target=_blank} |
| Linux | x64 | [BililiveRecorder-CLI-linux-x64.zip](https://github.com/BililiveRecorder/BililiveRecorder/releases/latest/download/BililiveRecorder-CLI-linux-x64.zip) | 在服务器上运行一般选这个 |
| Linux | arm32 | [BililiveRecorder-CLI-linux-arm.zip](https://github.com/BililiveRecorder/BililiveRecorder/releases/latest/download/BililiveRecorder-CLI-linux-arm.zip) |
| Linux | arm64 | [BililiveRecorder-CLI-linux-arm64.zip](https://github.com/BililiveRecorder/BililiveRecorder/releases/latest/download/BililiveRecorder-CLI-linux-arm64.zip) |
| Windows | x64 | [BililiveRecorder-CLI-win-x64.zip](https://github.com/BililiveRecorder/BililiveRecorder/releases/latest/download/BililiveRecorder-CLI-win-x64.zip) |
| macOS | x64 | [BililiveRecorder-CLI-osx-x64.zip](https://github.com/BililiveRecorder/BililiveRecorder/releases/latest/download/BililiveRecorder-CLI-osx-x64.zip) |

具体用法请参考 [命令行参数](./commands.md)

## Docker 镜像

Docker 镜像在 [Docker Hub](https://hub.docker.com/r/bililive/recorder/tags){target=_blank} 和 [GitHub Container registry](https://github.com/BililiveRecorder/BililiveRecorder/pkgs/container/bililiverecorder){target=_blank} 上提供。

两个位置提供的正式版本镜像完全一样。  
GitHub Container registry 上还提供了开发版的镜像。

Docker 镜像内的录播姬的用法和命令行版完全一样，请参考 [命令行参数](./commands.md)

```bash
docker pull bililive/recorder:latest
# 或指定 tag
docker pull bililive/recorder:v1.3.11
```

```bash
docker pull ghcr.io/bililiverecorder/bililiverecorder
# 或指定 tag
docker pull ghcr.io/bililiverecorder/bililiverecorder:v1.3.11
```

!!! warning "地址有变动"
    之前镜像地址是 `ghcr.io/bililive/bililiverecorder` 这个旧地址已经不再使用。

    这个地址目前还可以使用，但不会再更新新的镜像，之后会完全删除。  
    请更换到上面给出的两个镜像。

!!! warning "不要误用开发版本"
    ghcr.io/bililiverecorder/bililiverecorder 同时提供了开发版，注意不要误用开发版本。  
    不要用 `dev` tag 或者其他分支名 tag。开发版不保证能用。

## 开发版

!!! warning "提醒"
    开发版不保证能正常使用

在 [GitHub 仓库的 Actions](https://github.com/BililiveRecorder/BililiveRecorder/actions) 里可以下载最新的代码编译出来的版本。

GitHub Actions 的 Artifacts 下载需要登录 GitHub 账号。  
下面提供了最新一个 `dev` 分支编译输出的免登录下载链接：

| 版本 | 编译配置 | 操作系统 | 架构 | 下载链接 |
| ---- | ------- | ------- | --- | -------- |
| 桌面版 | Debug   | Windows | _N/A_ | [WPF-Debug.zip](https://nightly.link/BililiveRecorder/BililiveRecorder/workflows/build/dev/WPF-Debug.zip)
| 桌面版 | Release | Windows | _N/A_ | [WPF-Release.zip](https://nightly.link/BililiveRecorder/BililiveRecorder/workflows/build/dev/WPF-Release.zip)
| 命令行版 | Debug   | 任意 | (自行安装运行时) | [CLI-any-Debug.zip](https://nightly.link/BililiveRecorder/BililiveRecorder/workflows/build/dev/CLI-any-Debug.zip)
| 命令行版 | Release | 任意 | (自行安装运行时) | [CLI-any-Release.zip](https://nightly.link/BililiveRecorder/BililiveRecorder/workflows/build/dev/CLI-any-Release.zip)
| 命令行版 | Debug   | Linux | arm64 | [CLI-linux-arm64-Debug.zip](https://nightly.link/BililiveRecorder/BililiveRecorder/workflows/build/dev/CLI-linux-arm64-Debug.zip)
| 命令行版 | Release | Linux | arm64 | [CLI-linux-arm64-Release.zip](https://nightly.link/BililiveRecorder/BililiveRecorder/workflows/build/dev/CLI-linux-arm64-Release.zip)
| 命令行版 | Debug   | Linux | arm | [CLI-linux-arm-Debug.zip](https://nightly.link/BililiveRecorder/BililiveRecorder/workflows/build/dev/CLI-linux-arm-Debug.zip)
| 命令行版 | Release | Linux | arm | [CLI-linux-arm-Release.zip](https://nightly.link/BililiveRecorder/BililiveRecorder/workflows/build/dev/CLI-linux-arm-Release.zip)
| 命令行版 | Debug   | Linux | x64 | [CLI-linux-x64-Debug.zip](https://nightly.link/BililiveRecorder/BililiveRecorder/workflows/build/dev/CLI-linux-x64-Debug.zip)
| 命令行版 | Release | Linux | x64 | [CLI-linux-x64-Release.zip](https://nightly.link/BililiveRecorder/BililiveRecorder/workflows/build/dev/CLI-linux-x64-Release.zip)
| 命令行版 | Debug   | macOS | x64 | [CLI-osx-x64-Debug.zip](https://nightly.link/BililiveRecorder/BililiveRecorder/workflows/build/dev/CLI-osx-x64-Debug.zip)
| 命令行版 | Release | macOS | x64 | [CLI-osx-x64-Release.zip](https://nightly.link/BililiveRecorder/BililiveRecorder/workflows/build/dev/CLI-osx-x64-Release.zip)
| 命令行版 | Debug   | Windows | x64 | [CLI-win-x64-Debug.zip](https://nightly.link/BililiveRecorder/BililiveRecorder/workflows/build/dev/CLI-win-x64-Debug.zip)
| 命令行版 | Release | Windows | x64 | [CLI-win-x64-Release.zip](https://nightly.link/BililiveRecorder/BililiveRecorder/workflows/build/dev/CLI-win-x64-Release.zip)

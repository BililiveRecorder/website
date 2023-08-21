# 安装使用

录播姬有桌面版（即 WPF 版）和命令行版（即 CLI 版）两个版本。  
除此以外还提供了命令行版的 Docker 镜像。

对一般用户来说，从本网站[首页](/)下载的安装包是推荐的安装方法。

命令行版可在 Linux、macOS、Windows 系统上运行。  
命令行版（和 Docker 镜像）提供了 HTTP API 和管理网页，可在浏览器里控制。

两个版本的功能完全一致、配置文件通用。长时间运行推荐使用命令行版。

- [桌面版安装使用说明](./wpf.md)
- [命令行版下载、安装、使用说明](./cli.md)
    - [用 PM2 运行命令行版](./cli-pm2.md)
    - [用 systemd 运行命令行版](./cli-systemd.md)
- [Docker 镜像使用说明](./docker.md)
    - [用 Portainer 运行 Docker 版](./docker-portainer.md)
    - [用 群晖 Synology 运行 Docker 版](./docker-synology.md)

两个版本的对比：

|                | 桌面版                    | 命令行版                     |
| -------------- | ------------------------- | ---------------------------- |
| 操作方式       | Windows 窗口              | 命令行、浏览器               |
| 下载安装方式   | 安装包                    | 压缩包解压                   |
| 更新方式       | 自动更新                  | 手动更新                     |
| 使用的运行时   | .NET Framework 4.7.2      | .NET 6                       |
| 支持的操作系统 | Windows                   | Linux、macOS、Windows        |
| 性能           | 比命令行版内存CPU使用都多 | 性能更好，更适合低端硬件使用 |

<p style="padding:30px"></p>

??? cite "开发版"

    !!! warning "提醒"
        开发版不保证稳定可用

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

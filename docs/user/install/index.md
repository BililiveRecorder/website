# 安装使用

录播姬有桌面版（即 WPF 版）和命令行版（即 CLI 版）两个版本。  
除此以外还提供了命令行版的 Docker 镜像。

对一般用户来说，从本网站[首页](/)下载的安装包是推荐的安装方法。

命令行版可在 Linux、macOS、Windows 系统上运行。  
命令行版（和 Docker 镜像）提供了 HTTP API 和管理网页，可在浏览器里控制。

- [桌面版安装使用说明](./wpf.md)
- [命令行版安装使用说明](./cli.md)
- [Docker 镜像使用说明](./docker.md)

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

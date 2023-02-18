# 软硬件要求

## 软件要求

### 录播姬桌面版

也就是从本网站的首页下载的、一般用户使用的版本。

!!! check "桌面版支持的操作系统"
    - Windows 11
    - Windows 10 1607 或更高版本
    - :octicons-alert-16:{ style="color:orange" } Windows 8.1
    - :octicons-alert-16:{ style="color:orange" } Windows 7 SP 1

    以及它们所对应的服务器版操作系统

    - Windows Server 2022
    - Windows Server 2019
    - Windows Server 2016
    - :octicons-alert-16:{ style="color:orange" } Windows Server 2012
    - :octicons-alert-16:{ style="color:orange" } Windows Server 2008 R2 SP1

    :octicons-alert-16:{ style="color:orange" } 虽然录播姬本体暂时还支持这些旧系统，但安装包最低支持到 Windows 10，旧系统目前可以从 GitHub Release 下载 zip 包解压运行。


??? fail "不支持的操作系统"
    - :octicons-x-16:{ style="color:red" } Windows 10 1511
    - :octicons-x-16:{ style="color:red" } Windows 10 1507
    - :octicons-x-16:{ style="color:red" } Windows 8
    - :octicons-x-16:{ style="color:red" } Windows 7 (没有安装 SP 1 的)
    - 桌面版不支持 Linux
    - 桌面版不支持 macOS

录播姬桌面版需要操作系统有安装 .NET Framework 4.7.2 或 .NET Framework 4.8。  
目前 Windows 10 已经自带了最新版本 **不需要手动安装**。

???+ tip "手动安装 .NET Framework"
    如果需要手动安装，可以从[微软官网下载 .NET Framework 4.8 离线安装包](https://dotnet.microsoft.com/zh-cn/download/dotnet-framework/thank-you/net48-offline-installer){ target=_blank }

### 其他版本

录播姬命令行版 和 录播姬 Docker 版 只要操作系统和 CPU 架构支持，就可以运行。

!!! check "支持的操作系统"
    - Windows (x86, x64, Arm64)
    - Linux (x64, Arm32, Arm64)
    - macOS (x64, Arm64)

具体的列表和系统版本要求可以参考 [录播姬的 GitHub Release 页面](https://github.com/BililiveRecorder/BililiveRecorder/releases) 以及 [.NET 6 所支持的平台](https://github.com/dotnet/core/blob/main/release-notes/6.0/supported-os.md){target=_blank}。

## 硬件要求

### 最低配置

录播姬并不需要太多的硬件资源，这里列出我认为最低的配置作参考：

- CPU: 最近十年内发售的型号, 1 核
- 内存: 共 1 GB
- 硬盘: 够存文件就行
- 网络: 够录直播就行，一般来说下行速度 10 Mbps
- 显卡: 不需要

### 推荐配置

- CPU: 不是古董，至少 2 核
- 内存: 独占 1 GB
- 硬盘: SSD
- 网络: 正规电信运营商的有线网络
- 显卡: 不需要

如果网络 **不稳定** 可能会造成录播断开。  
如果下行带宽不够可能造成录播不完整。  
推荐使用 **有线网络** 而不是 WiFi。

如果同时录制多个房间则强烈推荐使用 **SSD**。  
如果条件允许，最好让录播姬 **单独使用一个硬盘** ，减少其他软件对录播的影响。如游戏从硬盘里加载地图数据可能会占满硬盘 IO，导致录播断开。

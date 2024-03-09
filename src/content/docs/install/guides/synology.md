---
title: 使用 Synology 群晖运行容器镜像
description: 如何使用 Synology 群晖运行录播姬容器镜像
---

:::note[本教程的内容可能不完全准确]
本教程内容有可能较为老旧，不完全适用于最新版本的录播姬或其他工具（比如本文中的 Synology 群晖）。请根据实际情况自行调整。
如果您发现本教程的内容有误，可以通过发送 Pull Request 来帮助我们改进。编辑链接可以在本页面的最下方找到。
:::

## 拉取 Docker 镜像文件

在 Docker 的“注册表”（其实是镜像仓库）中，右上角的搜索框输入 `bililive/recorder`，选择一个版本，并下载。

![选择镜像版本并下载](@assets/install-guides/user-install-docker-synology-1.png)

在“映像”（其实应该是镜像）页面中等待镜像下载完成。下载完成后也会有通知提示。

![镜像文件下载中](@assets/install-guides/user-install-docker-synology-2.png)

## 创建容器

在“映像”页面选中录播姬，点击上方的“启动”按钮。点击下一步。

![从镜像文件创建容器 1](@assets/install-guides/user-install-docker-synology-3.png)
![从镜像文件创建容器 2](@assets/install-guides/user-install-docker-synology-4.png)

:::caution[重要安全提醒]
如果要把录播姬的管理页面对公网开放，请一定一定一定做好安全措施，给录播姬设置一个密码，或使用其他有身份验证功能的反向代理软件。

直接把没有身份验证的录播姬暴露到公网可能会有严重的安全风险。轻则被添加一大堆直播间导致硬盘塞满，重则可能会被任意上传下载文件。虽然理论上是不能通过录播姬来做到任意代码执行的，不过开发者不做任何保证。
:::

从 2.11.0 开始，如果没有设置用户名密码，录播姬检查请求的 IP、Header 等参数并拒绝疑似来源不是局域网的请求。如果你使用了带身份验证功能的反向代理、或使用域名访问内网服务等，可以通过设置参数 `--http-open-access` 或设置环境变量 `BREC_HTTP_OPEN_ACCESS` 为任意非空值来禁用这个限制。

如果想要设置管理界面用户名密码，点击“高级设置”然后切换到“执行命令”，在“命令”文本框中输入：

```bash
run --bind "http://*:2356" --http-basic-user "用户名" --http-basic-pass "密码" /rec
```

从录播姬 2.6.3 开始也可以使用环境变量 `BREC_HTTP_BASIC_USER` 和 `BREC_HTTP_BASIC_PASS` 来设置用户名密码，如果通过环境变量设置的话 “命令” 保持默认即可。

![设置管理界面用户名密码](@assets/install-guides/user-install-docker-synology-b.png)

在“端口设置”这一步点击“新增”，容器端口设置为 `2356`，本地端口可以是自动或者可以你自己选择一个端口号。类型为 TCP。

![设置端口映射 1](@assets/install-guides/user-install-docker-synology-5.png)
![设置端口映射 2](@assets/install-guides/user-install-docker-synology-6.png)

在“存储空间设置”这一步点击“添加文件夹”，选择 NAS 里打算用于保存录播的文件夹。然后在“装载路径”文本框内输入 `/rec`。注意不要勾选“只读”，否则无法写入文件。

:::tip[注意映射存储路径]
如果对 Docker 的原理和使用方法不太了解，在使用录播姬之前强烈建议通过 [Docker 官方文档](https://docs.docker.com/get-started/) 或其他中文教程等途径了解 Docker 使用方法。  
其中重点注意挂载目录（有的文章里也叫做 卷/绑定/Volume 等）相关的内容，如 Docker 官方文档的 [Manage data in Docker](https://docs.docker.com/storage/) 章节，避免出现录了之后找不到文件的情况。

提醒：如果没有把录播姬的工作目录映射到宿主机，录制的视频文件会在容器内部，容器被删除之后文件也会丢失。
同时需要注意 Docker 不支持修改已有容器的运行参数、映射目录等设置，各种 Docker 管理网页的修改设置功能是会先删除容器再重新创建一个新容器，如果没有把录播姬的工作目录映射到宿主机，这样的操作会导致录制的视频文件丢失。
可以使用 `docker cp` 命令把容器里的文件复制出来，具体方法请参考 [Docker 官方文档](https://docs.docker.com/engine/reference/commandline/cp/)。
:::

![添加存储空间映射 1](@assets/install-guides/user-install-docker-synology-7.png)
![添加存储空间映射 2](@assets/install-guides/user-install-docker-synology-8.png)

检查设置，并创建容器。

![确认创建容器](@assets/install-guides/user-install-docker-synology-9.png)

## 最终效果

浏览器访问 `http://NAS的IP:本地端口` 即可打开录播姬的管理界面，比如下面图中的管理界面地址是 `http://192.168.1.5:49154`

注意：群晖 Docker 的内存占用显示不准确，有时会错误显示录播姬使用了几 GB 甚至几十 GB 内存的情况，实际上没有使用这么多内存。

![最终效果](@assets/install-guides/user-install-docker-synology-a.png)

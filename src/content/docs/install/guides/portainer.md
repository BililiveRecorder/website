---
title: 使用 Portainer 运行容器镜像
description: 如何使用 Portainer 运行录播姬容器镜像
---

:::note[本教程的内容可能不完全准确]
本教程内容有可能较为老旧，不完全适用于最新版本的录播姬或其他工具（比如本文中的 Portainer）。请根据实际情况自行调整。
如果您发现本教程的内容有误，可以通过发送 Pull Request 来帮助我们改进。编辑链接可以在本页面的最下方找到。
:::

Portainer 的安装使用请参考[官方网站 https://docs.portainer.io/](https://docs.portainer.io/)。

在 Containers 容器 页面点击 Add contianer 添加容器。

![点击添加容器按钮](@assets/install-guides/user-install-docker-portainer-1.png)

Name 容器名字随便写。

Image 填入 `bililive/recorder`。tag 可以不写，默认为 latest，关于 tag 可以参考[录播姬容器镜像页面](/install/container/)和[录播姬的 Docker Hub 页面](https://hub.docker.com/r/bililive/recorder/tags)。

点击下面的 publish a new network port 按钮，添加端口映射。  
container 端口写 2356。
host 随意，图里也写了 2356。访问管理界面时使用 宿主机 ip 地址 + 这里设置的 host 端口。
协议选择 TCP。

![设置容器参数](@assets/install-guides/user-install-docker-portainer-2.png)

在页面下面的 Volumes 里添加文件夹映射。

点击 map additional volume 按钮。  
container 写入 `/rec`，然后选择 Bind 选项。  
在 host 中填入你的宿主机上保存录播数据的位置。  
注意不要把它设置为 Read-Only 只读。

![设置容器映射路径](@assets/install-guides/user-install-docker-portainer-3.png)

:::tip[注意映射存储路径]
如果对 Docker 的原理和使用方法不太了解，在使用录播姬之前强烈建议通过 [Docker 官方文档](https://docs.docker.com/get-started/) 或其他中文教程等途径了解 Docker 使用方法。  
其中重点注意挂载目录（有的文章里也叫做 卷/绑定/Volume 等）相关的内容，如 Docker 官方文档的 [Manage data in Docker](https://docs.docker.com/storage/) 章节，避免出现录了之后找不到文件的情况。

提醒：如果没有把录播姬的工作目录映射到宿主机，录制的视频文件会在容器内部，容器被删除之后文件也会丢失。
同时需要注意 Docker 不支持修改已有容器的运行参数、映射目录等设置，各种 Docker 管理网页的修改设置功能是会先删除容器再重新创建一个新容器，如果没有把录播姬的工作目录映射到宿主机，这样的操作会导致录制的视频文件丢失。
可以使用 `docker cp` 命令把容器里的文件复制出来，具体方法请参考 [Docker 官方文档](https://docs.docker.com/engine/reference/commandline/cp/)。
:::

:::caution[重要安全提醒]
如果要把录播姬的管理页面对公网开放，请一定一定一定做好安全措施，给录播姬设置一个密码，或使用其他有身份验证功能的反向代理软件。

直接把没有身份验证的录播姬暴露到公网可能会有严重的安全风险。轻则被添加一大堆直播间导致硬盘塞满，重则可能会被任意上传下载文件。虽然理论上是不能通过录播姬来做到任意代码执行的，不过开发者不做任何保证。
:::

从 2.11.0 开始，如果没有设置用户名密码，录播姬检查请求的 IP、Header 等参数并拒绝疑似来源不是局域网的请求。如果你使用了带身份验证功能的反向代理、或使用域名访问内网服务等，可以通过设置参数 `--http-open-access` 或设置环境变量 `BREC_HTTP_OPEN_ACCESS` 为任意非空值来禁用这个限制。

如果想要设置管理界面用户名密码，点击“Command & Logging”然后选择 Command 后面的 Override 选项，文本框中输入：

```bash
run --bind "http://*:2356" --http-basic-user "用户名" --http-basic-pass "密码" /rec
```

从录播姬 2.6.3 开始也可以使用环境变量 `BREC_HTTP_BASIC_USER` 和 `BREC_HTTP_BASIC_PASS` 来设置用户名密码，如果通过环境变量设置的话 Command 保持默认即可。

![设置管理界面用户名密码](@assets/install-guides/user-install-docker-portainer-4.png)

最后点击 Deploy the container 按钮部署。

效果如下：

![最终部署效果](@assets/install-guides/user-install-docker-portainer-5.png)

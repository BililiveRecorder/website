---
title: Docker 镜像 - 安装使用
---
# Docker 镜像 - 安装使用

## 拉取镜像

Docker 镜像在 [Docker Hub](https://hub.docker.com/r/bililive/recorder/tags){target=_blank} 和 [GitHub Container registry](https://github.com/BililiveRecorder/BililiveRecorder/pkgs/container/bililiverecorder){target=_blank} 上提供。

两个位置提供的正式版本镜像完全一样。  
GitHub Container registry 上除了正式版以外还提供了开发版的镜像。

```bash
docker pull bililive/recorder:latest
# 或指定 tag (请注意此处写的可能不是最新版本)
docker pull bililive/recorder:2
docker pull bililive/recorder:2.0
docker pull bililive/recorder:2.0.0
```

```bash
docker pull ghcr.io/bililiverecorder/bililiverecorder
# 或指定 tag (请注意此处写的可能不是最新版本)
docker pull ghcr.io/bililiverecorder/bililiverecorder:2
docker pull ghcr.io/bililiverecorder/bililiverecorder:2.0
docker pull ghcr.io/bililiverecorder/bililiverecorder:2.0.0
```

!!! info "关于镜像 tag 的含义"
    `latest` 是最新的一个正式版本。  
    `2` 是大版本为 2 的最新一个版本。  
    `2.0` 是大版本为 2 次版本为 0 的最新一个版本。  
    `2.0.0` 是固定的 2.0.0 版，不会变。

录播姬的镜像中 entrypoint 已经设置成运行录播姬，默认的 cmd 是在用容器内的 `/rec` 作为工作目录运行。  
镜像的默认命令相当于是：

```sh
./brec run --bind http://*:2356 /rec
```

!!! warning "地址有变动"
    之前镜像地址是 `ghcr.io/bililive/bililiverecorder` 这个旧地址已经不再使用。

    这个地址目前暂时还可以拉取旧版本的镜像文件，之后会完全删除。  
    请更换到上面给出的两个镜像。

!!! warning "不要误用开发版本"
    `ghcr.io/bililiverecorder/bililiverecorder` 同时提供了开发版，注意不要误用开发版本。  
    不要用 `dev` `edge` 等 tag。开发版不保证能用。

## 运行录播姬

录播姬的配置文件和录制的视频文件在同一个文件夹内。
配置文件在工作目录里，文件名是 `config.json`。
一般来说不推荐手写配置文件，可以复制录播姬桌面版的配置文件、或者在浏览器打开录播姬管理页面来添加房间、修改设置。
如果需要手改配置文件的话可以参考 [配置文件](../config-file.md) 页面。

完整的 Docker 启动命令例子：

```sh
# 复制粘贴运行之前记得修改  "宿主机路径"
docker run -d -v 宿主机路径:/rec -p 2356:2356 bililive/recorder
# 或使用 ghcr.io ，两个不同的 registry 里的镜像内容是一样的
docker run -d -v 宿主机路径:/rec -p 2356:2356 ghcr.io/bililiverecorder/bililiverecorder
```

!!! danger "重要安全提醒"
    如果要把录播姬的管理页面对公网开放，请一定一定一定做好安全措施，给录播姬设置一个密码，或使用其他有身份验证功能的反向代理软件。

    直接把没有身份验证的录播姬暴露到公网可能会有严重的安全风险。轻则被添加一大堆直播间导致硬盘塞满，重则可能会被任意上传下载文件。（理论上是不能通过录播姬来做到任意代码执行的，不过不做任何保证）

录播姬目前有 HTTP Basic 登录功能，设置了用户名和密码的 docker 命令例：

```sh
docker run -d -v 宿主机路径:/rec -p 2356:2356 bililive/recorder run --bind "http://*:2356" --http-basic-user "用户名" --http-basic-pass "密码" /rec
```

启用 HTTP 服务之后，默认在 `/file` 路径下会提供整个录播工作目录的内容。可以通过 `--enable-file-browser false` 来禁用。

```sh
docker run -d -v 宿主机路径:/rec -p 2356:2356 bililive/recorder run --bind "http://*:2356" --enable-file-browser false /rec
```

录播姬支持以 HTTPS 协议提供服务

```sh
# 注意 --bind 参数传入的协议是 https 而不是 http

# 本段示例省略了前面的 docker run 的命令部分，只保留了最终传递给录播姬命令行版的部分。
# 请自行把存放证书文件的目录映射到容器内。

# 使用录播姬自己生成的自签名证书
... run --bind "https://*:2356" "工作目录"

# 使用 pem 格式的证书，和 Nginx Caddy 等软件的证书格式一致
... run --bind "https://*:2356" --cert-pem-path "证书文件路径" --cert-key-path "私钥文件路径" "工作目录"
# 使用带密码的私钥
... run --bind "https://*:2356" --cert-pem-path "证书文件路径" --cert-key-path "私钥文件路径" --cert-password "私钥密码" "工作目录"

# 使用 pfx 格式的证书
... run --bind "https://*:2356" --cert-pfx-path "证书文件路径" "工作目录"
# 使用带密码的证书
... run --bind "https://*:2356" --cert-pfx-path "证书文件路径" --cert-password "私钥密码" "工作目录"
```

日志文件默认保存在 `/app/logs`，可以把这个目录也挂载出来。或者可以修改日志文件保存位置，请参考 [日志文件](../log-file.md) 页面。

---
title: 配置systemd单元文件
description: 配置systemd单元文件
---

## 下载录播姬命令行版

根据CPU架构，下载录播姬命令行版。录播姬Linux版本支持ARM、ARM64和AMD64架构的CPU

| 架构      | 下载地址 |
| ----------- | ----------- |
| ARM     |  [BililiveRecorder-CLI-linux-arm.zip](https://github.com/BililiveRecorder/BililiveRecorder/releases/latest/download/BililiveRecorder-CLI-linux-arm.zip)      |
| ARM64   | [BililiveRecorder-CLI-linux-arm64.zip](https://github.com/BililiveRecorder/BililiveRecorder/releases/latest/download/BililiveRecorder-CLI-linux-arm64.zip)   |
| AMD64   | [BililiveRecorder-CLI-linux-x64.zip](https://github.com/BililiveRecorder/BililiveRecorder/releases/latest/download/BililiveRecorder-CLI-linux-x64.zip)       |

下载二进制文件到本地，以AMD64为例

使用curl下载：
```bash
curl -L \
https://github.com/BililiveRecorder/BililiveRecorder/releases/latest/download/BililiveRecorder-CLI-linux-x64.zip \
 -o /tmp/BililiveRecorder-CLI-linux-x64.zip
```
使用wget下载：
```bash
wget \
https://github.com/BililiveRecorder/BililiveRecorder/releases/latest/download/BililiveRecorder-CLI-linux-x64.zip \
-O /tmp/BililiveRecorder-CLI-linux-x64.zip
```
解压录播姬：
```bash
sudo mkdir -p /opt/BililiveRecorder
sudo unzip -d /opt/BililiveRecorder /tmp/BililiveRecorder-CLI-linux-x64.zip
```
删除不必要的可执行权限，设置BililiveRecorder.Cli的可执行权限
```bash
sudo chmod 644 /opt/BililiveRecorder/*
sudo chmod 755 /opt/BililiveRecorder/BililiveRecorder.Cli
```
删除录播姬压缩包：
```bash
rm /tmp/BililiveRecorder-CLI-linux-x64.zip
```


## 创建专用于录播姬的用户组和用户

为保安全，应该避免使用root用户或主用户运行录播姬。

创建用户组bili：
```bash
sudo groupadd --system bili
```
创建用户bili：
```bash
sudo useradd \
    --system \
    --gid "bili" \
    --no-create-home \
    --home /nonexistent \
    --comment "BililiveRecorder user" \
    --shell /bin/false \
    "bili" 
```

## 配置录播目录

创建用于存放录播文件的目录
```bash
sudo mkdir -p /media/BililiveRecorder/
```
修改目录所有者，确保录播姬可以正常写入录制文件。
```bash
sudo chown bili:bili -R /media/BililiveRecorder/
```
**或者**设置ACL（Access Control List）：
```bash
# 对已存在的目录及其子目录赋予写入权限
sudo setfacl -R -m u:bili:rw /media/BililiveRecorder/

#设置默认 ACL，将来在该目录下新建的文件或子目录，也自动赋予写入权限
sudo setfacl -R -d -m u:bili:rw /media/BililiveRecorder/
```

## 配置Web UI密码文件 (可选)
将密码凭据保存到单独的文件中。

将以下内容写入 `/opt/BililiveRecorder/Credentials`，根据需要将username和password更改。
```bash
BREC_HTTP_BASIC_USER="username"
BREC_HTTP_BASIC_PASS="password"
```
设置凭据文件所有权和权限，确保只有root用户可以读写。
```bash
sudo chown root:root /opt/BililiveRecorder/Credentials
sudo chmod 600 /opt/BililiveRecorder/Credentials
```

## 创建服务单元文件

新建BililiveRecorder单元文件 `/etc/systemd/system/BililiveRecorder.service`

**根据需要二进制文件位置和命令行参数修改 `ExecStart=`，以及添加录播文件位置到 `ExecStart=`末尾和`ReadWritePaths=`**。

本文以BililiveRecorder.Cli二进制文件位于/opt/BililiveRecorder/目录下，录播文件存放在/media/BililiveRecorder/下为例。

```ini title="/etc/systemd/system/BililiveRecorder.service" "/opt/BililiveRecorder/BililiveRecorder.Cli"
[Unit]
Description=BililiveRecorder Daemon
After=network-online.target nss-lookup.target

[Service]
EnvironmentFile=-/opt/BililiveRecorder/Credentials
User=bili
Group=bili
ExecStart=/opt/BililiveRecorder/BililiveRecorder.Cli run --bind "http://*:2356" /media/BililiveRecorder/
TimeoutStopSec=30
Restart=on-failure

ReadWritePaths=/media/BililiveRecorder/
# ReadWritePaths=/opt/BililiveRecorder/
# 可以多次使用 ReadWritePaths= 以在文件系统名字空间内增加更多的可访问路径。

AmbientCapabilities=
CapabilityBoundingSet=
LockPersonality=true
# MemoryDenyWriteExecute=true
NoNewPrivileges=yes
PrivateTmp=yes
PrivateDevices=true
PrivateUsers=true
ProtectSystem=strict
ProtectHome=yes
ProtectClock=true
ProtectControlGroups=true
ProtectKernelLogs=true
ProtectKernelModules=true
ProtectKernelTunables=true
ProtectProc=invisible
ProtectHostname=true
RemoveIPC=true
RestrictNamespaces=true
RestrictSUIDSGID=true
RestrictRealtime=true
SystemCallArchitectures=native
SystemCallFilter=@system-service
SystemCallFilter=~@privileged
# SystemCallFilter=~@resources

[Install]
WantedBy=multi-user.target
```

然后重载服务：

```sh
sudo systemctl daemon-reload
```

每次修改了 `BililiveRecorder.service` 单元文件后都需要运行这个命令重载一次。

启动录播姬：

```sh
sudo systemctl start BililiveRecorder
```

## 设置开机启动

```sh
sudo systemctl enable BililiveRecorder
```

### 禁用开机启动

```sh
sudo systemctl disable BililiveRecorder
```

## 查看和控制运行状态

查看运行状态：

```sh
sudo systemctl status BililiveRecorder
```

启动、停止、重启：

```sh
sudo systemctl start BililiveRecorder
sudo systemctl stop BililiveRecorder
sudo systemctl restart BililiveRecorder
```

查看日志：

```sh
sudo journalctl -u BililiveRecorder.service
```
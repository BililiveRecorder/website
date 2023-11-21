---
title: 使用 systemd 运行命令行版
description: 如何使用 systemd 运行录播姬命令行版
---

:::note[本教程的内容可能不完全准确]
本教程内容有可能较为老旧，不完全适用于最新版本的录播姬或其他工具（比如本文中的 systemd）。请根据实际情况自行调整。
如果您发现本教程的内容有误，可以通过发送 Pull Request 来帮助我们改进。编辑链接可以在本页面的最下方找到。
:::

## 下载录播姬命令行版

请参考[下载使用命令行版](/install/cli/)页面。

## 创建服务

新建一个文件 `/etc/systemd/system/brec.service`

写入以下内容，**注意调整 `ExecStart=` 后面的文件路径和参数**。

```ini title="/etc/systemd/system/brec.service" "录播姬所在位置/BililiveRecorder.Cli"
[Unit]
Description=BililiveRecorder
After=network.target

[Service]
ExecStart=录播姬所在位置/BililiveRecorder.Cli run --bind "http://*:2356" --http-basic-user "用户名" --http-basic-pass "密码" "录播工作目录"

[Install]
WantedBy=multi-user.target
```

然后重载服务：

```sh
sudo systemctl daemon-reload
```

每次修改了 `brec.service` 文件后都需要运行这个命令重载一次。

启动录播姬：

```sh
sudo systemctl start brec
```

![使用 systemd 运行的截图](@assets/install-guides/user-install-cli-systemd.png)

## 设置开机启动

```sh
sudo systemctl enable brec
```

可以用以下命令禁用开机启动

```sh
sudo systemctl disable brec
```

## 查看和控制运行状态

查看运行状态：

```sh
sudo systemctl status brec
```

运行、停止、重启：

```sh
sudo systemctl start brec
sudo systemctl stop brec
sudo systemctl restart brec
```

查看日志：

```sh
sudo journalctl -u brec.service
```

也可以直接查看录播姬旁边 logs 文件夹内的日志文件。

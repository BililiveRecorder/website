---
title: 使用 pm2 运行命令行版
description: 如何使用 pm2 运行录播姬命令行版
---

:::note[本教程的内容可能不完全准确]
本教程内容有可能较为老旧，不完全适用于最新版本的录播姬或其他工具（比如本文中的 pm2）。请根据实际情况自行调整。
如果您发现本教程的内容有误，可以通过发送 Pull Request 来帮助我们改进。编辑链接可以在本页面的最下方找到。
:::

## 下载安装 PM2

Node.js 的安装请参考下面两个链接

- [https://nodejs.org/zh-cn/download/](https://nodejs.org/zh-cn/download/)
- [https://nodejs.org/zh-cn/download/package-manager/](https://nodejs.org/zh-cn/download/package-manager/)

安装 PM2:

```sh
# 详细信息请参考 PM2 的官方网站
sudo npm install pm2 -g
```

## 下载录播姬命令行版

请参考[下载使用命令行版](/install/cli/)页面。

## 使用 PM2 启动录播姬

```sh
pm2 start --name recorder BililiveRecorder.Cli -- run --bind "http://*:2356" --http-basic-user "用户名" --http-basic-pass "密码" "录播工作目录"
```

![使用 PM2 运行的截图](@assets/install-guides/user-install-cli-pm2.png)

其他录播姬的命令和参数请参考[下载使用命令行版](/install/cli/)页面。

## 设置开机启动

参考 PM2 官方文档：[https://pm2.keymetrics.io/docs/usage/startup/](https://pm2.keymetrics.io/docs/usage/startup/)

首先设置开机启动 PM2：

```sh
pm2 startup
# 然后复制粘贴并运行这条命令输出的命令。
```

```sh
pm2 save
```

## 查看和控制运行状态

```sh
pm2 ps

# "recorder" 是上面运行 pm2 start 时传入的 --name 参数
pm2 start recorder
pm2 stop recorder
pm2 restart recorder

pm2 logs recorder

pm2 delete recorder
```

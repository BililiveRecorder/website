---
title: 其他工具和项目
description: 与录播姬相关的其他工具和项目推荐
---

:::tip
写了录播姬相关的工具想加到这个页面？  
点击页面最下方编辑链接提交 Pull Request！
:::

## 视频播放器

| 名字 | 链接 | 备注说明 |
| :--: | ---- | -------- |
| VLC | [官网中文首页](https://www.videolan.org/index.zh_CN.html) | 支持加载 ASS 字幕 |
| PotPlayer | [官网中文首页](https://potplayer.daum.net/?lang=zh_CN) | 支持加载 ASS 字幕 |
| 弹弹play | [官网](http://www.dandanplay.com) | 支持加载 XML 弹幕 |

## 弹幕文件处理工具

| 名字 | 链接 | 功能 | 备注说明 |
| :--: | ---- | ------ | ------ |
| DanmakuFactory | [GitHub 项目页](https://github.com/hihkm/DanmakuFactory#windows) | 转换为 ASS 字幕 | 支持转换录播姬弹幕 XML 的 礼物、舰长购买、SuperChat |
| valkjsaaa/danmaku_tools | [GitHub 项目页](https://github.com/valkjsaaa/danmaku_tools) | 切分合并分析 |  |
| Hami-Lemon/converter | [GitHub 项目页](https://github.com/Hami-Lemon/converter) | 转换为 ASS 字幕 |  |
| gwy15/danmu2ass | [GitHub 项目页](https://github.com/gwy15/danmu2ass) | 转换为 ASS 字幕 |  |
| 弹幕盒子 | [GitHub Pages](https://danmubox.github.io)<br>[Gitee 镜像](https://danmubox.gitee.io) | 转换为 ASS 字幕 | 无需下载，浏览器内操作 |
| bilibili ASS 弹幕在线转换 | [GitHub Pages](https://tiansh.github.io/us-danmaku/bilibili/) | 转换为 ASS 字幕 | 无需下载，浏览器内操作 |

## 视频文件处理

视频文件的转封装、切割、合并、编码 (压制) 等工具。  
此处列出的软件功能说明仅供参考，不一定完整、不一定完全准确。  
如果有错误或者有其他没有列出的常用工具，可以点击页面下方的编辑链接并提交 pull request。

✔️: 有这个功能  
❌: 没有这个功能  

| 名字 | 链接 | 界面 | 转封装 | 切割 | 合并 | 编码 | 其他说明 |
| :--: | --- | :--: | :---: | :--: | :--: | :--: | ------- |
| FFmpeg                         | [官网](https://ffmpeg.org)<br>[二进制下载](https://github.com/BtbN/FFmpeg-Builds/releases)     | ❌ | ✔️ | ✔️ | ✔️ | ✔️ | 无 |
| valkjsaaa/ffmpeg-smart-trim    | [GitHub 项目页](https://github.com/valkjsaaa/ffmpeg-smart-trim)                                                | ❌ | ✔️ | ✔️ | ❌ | ❌ | 基于FFmpeg的快速精准切片 |
| lossless-cut                   | [GitHub Release](https://github.com/mifi/lossless-cut/releases)                                                | ✔️ | ✔️ | ✔️ | ✔️ | ❌ | 快速切片工具 |
| MediaCoder                     | [官网](https://www.mediacoderhq.com/dlfull.htm)                                                                | ✔️ | ✔️ | ❌ | ❌ | ✔️ | 无 |
| Rmbox<br>(Ruminoid Toolbox)    | [mikufans视频](https://www.bilibili.com/video/BV1aK4y1N7Nf)<br>[官网](https://ruminoid.world)      | ✔️ | ✔️ | ❌ | ❌ | ✔️ | 无 |
| NegativeEncoder 消极压制        | [GitHub Release](https://github.com/zyzsdy/NegativeEncoder/releases)                                          | ✔️ | ❌ | ❌ | ❌ | ✔️ | 无 |
| 小丸工具箱                      | [下载链接](https://dl.hdslb.com/video-press/xiaowantoolsrev194.zip)                                            | ✔️ | ✔️ | ❌ | ❌ | ✔️ | 无 |
| 小丸工具箱mikufans定制版              | [下载链接](https://dl.hdslb.com/video-press/BiliBiliEncoder.zip)                                               | ✔️ | ✔️ | ❌ | ❌ | ✔️ | 无 |
| StarTools                      | [GitHub Release](https://github.com/hoshinohikari/StarTools/releases)                                          | ✔️ | ❌ | ❌ | ❌ | ✔️ | 无 |
| OBS Studio                     | [官网](https://obsproject.com)                                                                                 | ✔️ | ✔️ | ❌ | ❌ | ❌ | 无 |
| biliLive-tools                 | [GitHub 项目页](https://github.com/renmu123/biliLive-tools)                                                    | ✔️ | ✔️ | ❌ | ✔️ | ❌ | 支持快捷将弹幕硬编码至视频|

## 基于录播姬的项目

| 名字 | 链接 | 备注说明 |
| :--: | ------------ | -------- |
| valkjsaaa/auto-bilibili-recorder | [GitHub 项目页](https://github.com/valkjsaaa/auto-bilibili-recorder) | 全自动录播上传脚本 |
| Morax-xyc/bililiveauto | [GitHub 项目页](https://github.com/morax-xyc/bililiveauto) | 自动处理弹幕，转封装,通过rclone上传到网盘的简单脚本 |
| mwxmmy/biliupforjava | [GitHub 项目页](https://github.com/mwxmmy/biliupforjava) | 基于录播姬WebhookV2使用java编写的录播上传插件支持webui、边录边传、弹幕发送、自定义投稿封面 |
| ayumi-otosaka-314/brec-pp | [GitHub 项目页](https://github.com/ayumi-otosaka-314/brec-pp) | 自动上传 Google Drive、删除旧文件、通过 Discord 发消息推送 |
| renmu123/biliLive-tools | [GitHub 项目页](https://github.com/renmu123/biliLive-tools) | 支持录播姬webhook自动弹幕压制上传，以及单独上传&下载&弹幕转换&转码&合并的GUI |
| TensoRaws/ffmpeg_for_BililiveRecorder | [GitHub 项目页](https://github.com/TensoRaws/ffmpeg_for_BililiveRecorder)| 基于录播姬WebhookV2使用go编写的ffmpeg插件支持自定义ffmpeg参数和预定参数，支持自动删除 |

## 其他录播软件

| 名字 | 链接 | 备注说明 |
| :--: | ------------ | -------- |
| blrec | [GitHub 项目页](https://github.com/acgnhiki/blrec) | Python 跨平台，有自己写的直播 FLV 修复，支持录制 HLS |


## 文件浏览器

可以用来建设录播站

- [AList](https://alist.nn.ci): 多存储后端，在线播放视频、加载弹幕
- [OLAINDEX](https://github.com/WangNingkai/OLAINDEX): 仅 OneDrive，在线播放视频
- [onedrive-vercel-index](https://github.com/spencerwooo/onedrive-vercel-index): 仅 OneDrive，在线播放 MP4
- [OneManager-php](https://github.com/qkqpttgf/OneManager-php): 仅 OneDrive

## 录播站

此处列出的录播站与本站无关，信息仅供参考。

- <https://t.koif.uk/> 🥵 奶粉的录播站
- <https://rec.baysonfox.com>
- <https://arukas.cn>
- <https://rec.ttklt.com>
- <https://rec.nana7mi.123485k.ltd:444>
- <https://rec.eula.uk>
- <https://rec.a-soul.ws>
- <https://rec.bili.studio>
- <https://drive.mengguyi.com> 进去后打开 Bilibili_live_playback
- <https://vuprec.waitsaber.org>
- <https://zimu.bili.studio>

## 自动化

可配合录播姬的 Webhook 功能使用

| 名字 | 链接 |
| :--: | ---- |
| Node-Red | [官网](https://nodered.org) |
| n8n.io  | [官网](https://n8n.io) |

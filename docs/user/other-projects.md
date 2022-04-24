# 其他工具和项目

!!! tip
    写了录播姬相关的工具想加到这个页面？  
    点击页面右上角 :material-pencil: 编辑并提交 pull request。

## 视频播放器

| 名字 | 链接 | 备注说明 |
| :--: | ---- | -------- |
| VLC | [官网中文首页](https://www.videolan.org/index.zh_CN.html){ target=_blank } | 支持加载 ASS 字幕 |
| PotPlayer | [官网中文首页](https://potplayer.daum.net/?lang=zh_CN){ target=_blank } | 支持加载 ASS 字幕 |
| 弹弹play | [官网](http://www.dandanplay.com){ target=_blank } | 支持加载 XML 弹幕 |

## 弹幕文件处理工具

| 名字 | 链接 | 功能 | 备注说明 |
| :--: | ---- | ------ | ------ |
| DanmakuFactory | [GitHub 项目页](https://github.com/hihkm/DanmakuFactory#windows){ target=_blank } | 转换为 ASS 字幕 | 支持转换录播姬弹幕 XML 的 礼物、舰长购买、SuperChat |
| valkjsaaa/danmaku_tools | [GitHub 项目页](https://github.com/valkjsaaa/danmaku_tools){ target=_blank } | 切分合并分析 |  |
| Hami-Lemon/converter | [GitHub 项目页](https://github.com/Hami-Lemon/converter){ target=_blank } | 转换为 ASS 字幕 |  |
| gwy15/danmu2ass | [GitHub 项目页](https://github.com/gwy15/danmu2ass){ target=_blank } | 转换为 ASS 字幕 |  |
| 弹幕盒子 | [GitHub Pages](https://danmubox.github.io){ target=_blank }<br>[Gitee 镜像](https://danmubox.gitee.io){ target=_blank } | 转换为 ASS 字幕 | 无需下载，浏览器内操作 |
| bilibili ASS 弹幕在线转换 | [GitHub Pages](https://tiansh.github.io/us-danmaku/bilibili/){ target=_blank } | 转换为 ASS 字幕 | 无需下载，浏览器内操作 |

## 视频文件处理

视频文件的转封装、切割、合并、编码(压制)等工具。  
此处列出的软件功能说明仅供参考，不一定完整、不一定完全准确。  
如果有错误或者有其他没有列出的常用工具，可以点击页面右上角 :material-pencil: 编辑并提交 pull request。

{% set y = ':fontawesome-solid-check:{ style="color:green" }' -%}
{% set x = ':fontawesome-solid-xmark:{ style="color:red" }' -%}
{{y}}: 有这个功能  
{{x}}: 没有这个功能  
表格比较宽，可以向右滚动。

| 名字 | 链接 | 界面 | 转封装 | 切割 | 合并 | 编码 | 其他说明 |
| :--: | --- | :--: | :---: | :--: | :--: | :--: | ------- |
| FFmpeg                         | [官网](https://ffmpeg.org){ target=_blank }<br>[二进制下载](https://github.com/BtbN/FFmpeg-Builds/releases){ target=_blank }     | {{ x }} | {{ y }} | {{ y }} | {{ y }} | {{ y }} | 无 |
| valkjsaaa/ffmpeg-smart-trim    | [GitHub 项目页](https://github.com/valkjsaaa/ffmpeg-smart-trim){ target=_blank }                                                | {{ x }} | {{ y }} | {{ y }} | {{ x }} | {{ x }} | 基于FFmpeg的快速精准切片 |
| lossless-cut                   | [GitHub Release](https://github.com/mifi/lossless-cut/releases){ target=_blank }                                                | {{ y }} | {{ y }} | {{ y }} | {{ y }} | {{ x }} | 快速切片工具 |
| MediaCoder                     | [官网](https://www.mediacoderhq.com/dlfull.htm){ target=_blank }                                                                | {{ y }} | {{ y }} | {{ x }} | {{ x }} | {{ y }} | 无 |
| Rmbox<br>(Ruminoid Toolbox)    | [B站视频](https://www.bilibili.com/video/BV1aK4y1N7Nf){ target=_blank }<br>[官网](https://ruminoid.world){ target=_blank }      | {{ y }} | {{ y }} | {{ x }} | {{ x }} | {{ y }} | 无 |
| NegativeEncoder 消极压制        | [GitHub Release](https://github.com/zyzsdy/NegativeEncoder/releases){ target=_blank }                                          | {{ y }} | {{ x }} | {{ x }} | {{ x }} | {{ y }} | 无 |
| 小丸工具箱                      | [下载链接](https://dl.hdslb.com/video-press/xiaowantoolsrev194.zip){ target=_blank }                                            | {{ y }} | {{ y }} | {{ x }} | {{ x }} | {{ y }} | 无 |
| 小丸工具箱B站定制版              | [下载链接](https://dl.hdslb.com/video-press/BiliBiliEncoder.zip){ target=_blank }                                               | {{ y }} | {{ y }} | {{ x }} | {{ x }} | {{ y }} | 无 |
| StarTools                      | [GitHub Release](https://github.com/hoshinohikari/StarTools/releases){ target=_blank }                                          | {{ y }} | {{ x }} | {{ x }} | {{ x }} | {{ y }} | 无 |
| OBS Studio                     | [官网](https://obsproject.com){ target=_blank }                                                                                 | {{ y }} | {{ y }} | {{ x }} | {{ x }} | {{ x }} | 无 |

## 基于录播姬的项目

| 名字 | 链接 | 备注说明 |
| :--: | ------------ | -------- |
| valkjsaaa/auto-bilibili-recorder | [GitHub 项目页](https://github.com/valkjsaaa/auto-bilibili-recorder){ target=_blank } | 全自动录播上传脚本 |

## 其他录播软件

| 名字 | 链接 | 备注说明 |
| :--: | ------------ | -------- |
| blrec | [GitHub 项目页](https://github.com/acgnhiki/blrec){ target=_blank } | Python 跨平台，有自己写的直播 FLV 修复 |

## 自动化

可配合录播姬的 Webhook 功能使用

| 名字 | 链接 |
| :--: | ---- |
| Node-Red | [官网](https://nodered.org){ target=_blank } |
| n8n.io  | [官网](https://n8n.io){ target=_blank } |

---
title: 转封装 - 工具箱
---

# 转封装 - 工具箱

这个工具只在 录播姬桌面版 提供，实际上就是调用了 `ffmpeg` 运行了这个命令：

```sh
ffmpeg -hide_banner -loglevel error -y -i ${INPUT} -c copy ${OUTPUT}
```

提供这个工具只是为了方便不会用其他工具转封装的用户。

一般来说更推荐自行使用[其他工具](../other-projects.md)进行录像文件的后处理。

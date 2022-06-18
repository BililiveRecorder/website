# 日志文件

录播姬的桌面版和命令行版都有日志文件，格式和内容基本一致。

## 日志文件位置

日志文件在可执行文件旁边的 `logs` 文件夹里。

用安装包安装的录播姬桌面版的日志文件位置吗默认在

```%localappdata%\BililiveRecorder\app-{版本号}\logs```

Docker 镜像的日志文件位置默认在

```/app/logs```

可以通过设置环境变量 `BILILIVERECORDER_LOG_FILE_PATH` 来指定日志文件保存位置。  
例子: `BILILIVERECORDER_LOG_FILE_PATH=/rec/logs/bilirec.txt`  
录播姬会自动在文件名后面添加日期。

## 阅读日志文件

日志文件内每行是一个 json。

日志文件里的时区是 UTC 时区，比中国时区 UTC+8 要小 8 小时。

可以使用任意文本编辑器打开查看，推荐 VSCode。

或者可以使用 [Compact Log Viewer](https://github.com/warrenbuckley/Compact-Log-Format-Viewer) 查看，[微软应用商店下载链接](https://apps.microsoft.com/store/detail/compact-log-viewer/9N8RV8LKTXRJ)

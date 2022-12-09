---
title: 录播修复 - 工具箱
---

# 录播修复 - 工具箱

录播修复可以使用录播姬里的录播修复系统对视频文件进行分析、修复，还可以导出原始分析数据。

关于能修复什么文件、能修复什么样的问题，见 [录播修复介绍](../repair.md)

## 用法

选择 FLV 文件，然后点 “分析” 或 “修复” 按钮，或点 “修复失败？” 后点击 “导出原始分析数据” 。

## 命令行版

```sh
# 工具箱用法
./BililiveRecorder.Cli tool --help

# 分析
./BililiveRecorder.Cli tool analyze "input.flv"

# 修复
./BililiveRecorder.Cli tool fix "input.flv" "output.flv"

# 导出分析数据
./BililiveRecorder.Cli tool export "input.flv" "output.zip"
```

命令行版工具箱可使用 JSON 作为输出信息的格式，方便脚本调用，参数是 `--json` 或 `--json-indented`

```sh
# 分析并输出 JSON
./BililiveRecorder.Cli tool analyze "input.flv" --json
```

### FLV pipeline 参数

在 v2.1.0 为了能让用户决定一部分录播修复的行为，增加了一些传入数据处理代码的参数。

目前只有一个参数 `SplitOnScriptTag`，用于控制在遇到 `ScriptTag` 时是否分段写入新文件，目前默认是 `false` 即不分段。

这个设置项在桌面版的说明是

> FLV修复-检测到可能缺少数据时分段

标准模式录制的设置和工具箱分析、修复时的设置是独立的，[设置项 `FlvProcessorSplitOnScriptTag`](../settings.md#s-FlvProcessorSplitOnScriptTag) 控制的是录制时的行为。

```sh
./BililiveRecorder.Cli tool analyze "input.flv" --pipeline-settings '{"SplitOnScriptTag": true}'
./BililiveRecorder.Cli tool fix "input.flv" "output.flv" --pipeline-settings '{"SplitOnScriptTag": true}'
```

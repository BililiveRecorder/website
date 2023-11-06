---
title: 录播修复工具
description: 录播姬工具箱的录播修复工具说明
---

工具箱中的录播修复工具可以使用录播姬里的直播数据处理系统对视频文件进行分析、修复，还可以导出原始分析数据。

关于能修复什么文件、能修复什么样的问题，见[录播修复介绍](/user/repair/)。  
据用户反馈，录播姬的录播修复功能修复其他录制工具录制的其他某直播平台的视频文件也颇有成效。

## 桌面版用法

选择 FLV 文件后点“分析”按钮进行分析，分析完成后会显示该文件的音视频数据信息以及是否需要修复。

选择 FLV 文件后点“修复”按钮，选择输出文件保存位置后进行修复。修复文件之前不需要分析，两个功能是互相独立的。

选择 FLV 文件后点击“修复失败？”按钮后点击“导出原始分析数据”可以导出原始分析数据，用于反馈给录播姬开发者。

## 命令行版用法

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

命令行版工具箱可使用 JSON 作为输出信息的格式，方便脚本调用，参数是 `--json` 或者如果需要输出格式化后的 JSON `--json-indented`

```sh
# 分析并输出 JSON
./BililiveRecorder.Cli tool analyze "input.flv" --json
```

### FLV pipeline 参数

从录播姬 2.1.0 开始，为了能让用户决定一部分录播修复的行为，增加了一些传入数据处理代码的参数。桌面版在修复工具页面添加了一个设置勾选框，而命令行版需要传入 JSON 参数。

目前只有一个参数 `SplitOnScriptTag`，用于控制在遇到 `ScriptTag` 时是否分段写入新文件，目前默认是 `false` 即不分段。

这个设置项在桌面版的说明是

> FLV 修复 - 检测到可能缺少数据时分段

标准模式录制的设置和工具箱分析、修复时的设置是独立的，[设置项 `FlvProcessorSplitOnScriptTag`](../settings.md#s-FlvProcessorSplitOnScriptTag) 控制的是录制时的行为。

```sh
./BililiveRecorder.Cli tool analyze "input.flv" --pipeline-settings '{"SplitOnScriptTag": true}'
./BililiveRecorder.Cli tool fix "input.flv" "output.flv" --pipeline-settings '{"SplitOnScriptTag": true}'
```

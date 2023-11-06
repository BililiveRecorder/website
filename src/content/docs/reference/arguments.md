---
title: 命令行参数
description: 录播姬命令行版的命令参数说明
---

录播姬命令行版除了“正常运行”进行录制以外，也提供了和桌面版一样的工具箱功能。
本参考页对录播姬的各个子命令和参数进行说明。

如果你使用的是不自带 .NET Runtime 的 any 版，下面所有的 `./BililiveRecorder.Cli` 都应该改成 `dotnet BililiveRecorder.Cli.dll`。

任何命令添加 `-?` `-h` `--help` 其一都会显示帮助信息。

## `run` `r`

子命令：**正常启动录播姬**

```bash
.\BililiveRecorder.Cli run --help
```

```
Description:
  Run BililiveRecorder in standard mode

Usage:
  BililiveRecorder.Cli run <path> [options]

Arguments:
  <path>

Options:
  --config-override <config-override>                                     Config path override []
  -b, --bind, --http-bind <http-bind>                                     Bind address for http service []
  --http-basic-user <http-basic-user>                                     Web interface username []
  --http-basic-pass <http-basic-pass>                                     Web interface password []
  --enable-file-browser                                                   Enable file browser located at '/file' [default: True]
  -l, --log, --loglevel <Debug|Error|Fatal|Information|Verbose|Warning>   Minimal log level output to console [default: Information]
  --flog, --logfilelevel <Debug|Error|Fatal|Information|Verbose|Warning>  Minimal log level output to file [default: Debug]
  --cert-pem-path, --pem <cert-pem-path>                                  Path of the certificate pem file
  --cert-key-path, --key <cert-key-path>                                  Path of the certificate key file
  --cert-pfx-path, --pfx <cert-pfx-path>                                  Path of the certificate pfx file
  --cert-password <cert-password>                                         Password of the certificate
  -?, -h, --help                                                          Show help and usage information
```

#### `<path>`

录播姬的工作目录，用于保存配置文件和录制的文件。

#### `--config-override`

指定配置文件路径。配置文件默认为录播姬工作目录里的 `config.json`，这个参数可以把配置文件放在其他位置。

#### `-b` `--bind` `--http-bind`

指定录播姬 HTTP 服务的监听地址，如果不指定则不启动 HTTP 服务。

示例：`--bind http://localhost:2356`

传入的地址必须以 `http://` 或 `https://` 开头。如果传入的协议是 `https://` 录播姬默认会在启动时生成一个自签名证书，如果需要使用自己的证书可以使用 `--cert-pem-path` `--cert-key-path` `--cert-pfx-path` `--cert-password` 参数。

录播姬会绑定到指定的接口上，如果传入的 hostname 是 `localhost` 则只会监听本地回环地址，如果传入的 hostname 不是 IP 地址则默认监听所有 IP 地址。

支持的格式例：`http://localhost:2356` `http://192.168.1.123:2356` `http://*:2356` `https://*:2356`

#### `--http-basic-user` `--http-basic-pass`

指定 HTTP 服务的 Basic Auth 用户名和密码，如果不指定则不启用 Basic Auth。

#### `--enable-file-browser`

是否启用文件浏览器，默认启用。如果需要禁用可以传入 `--enable-file-browser false`。

#### `-l` `--log` `--loglevel`

指定控制台输出的日志等级，可选值：`Debug` `Error` `Fatal` `Information` `Verbose` `Warning`。

#### `--flog` `--logfilelevel`

指定日志文件输出的日志等级，可选值：`Debug` `Error` `Fatal` `Information` `Verbose` `Warning`。

#### `--cert-pem-path` `--cert-key-path`

指定 pem 格式的 TLS 证书的公钥文件和私钥文件路径，这两个参数必须同时传入才有效。

录播姬支持 pem 格式和 pfx 格式的证书，两组参数只需要传入其中一组即可。

#### `--cert-pfx-path`

指定 pfx 格式的 TLS 证书的文件路径。pfx 格式文件内包含了公钥和私钥。

录播姬支持 pem 格式和 pfx 格式的证书，两组参数只需要传入其中一组即可。

#### `--cert-password`

pem 和 pfx 两种格式的证书的私钥密码。如果你的私钥没有密码可以不传入这个参数。

## `portable` `p`

子命令：**无配置文件启动录播姬**

这个模式运行的录播姬功能上与通过 `run` 命令启动的完全一样，唯一区别是在这个模式下不会读取也不会写入配置文件，适合集成到其他系统中通过 API 进行控制。

```bash
.\BililiveRecorder.Cli portable --help
```

```
Description:
  Run BililiveRecorder in config-less mode

Usage:
  BililiveRecorder.Cli portable <output-path> [<room-ids>...] [options]

Arguments:
  <output-path>
  <room-ids>     []

Options:
  -b, --bind, --http-bind <http-bind>                                     Bind address for http service []
  --http-basic-user <http-basic-user>                                     Web interface username []
  --http-basic-pass <http-basic-pass>                                     Web interface password []
  --enable-file-browser                                                   Enable file browser located at '/file' [default: True]
  -l, --log, --loglevel <Debug|Error|Fatal|Information|Verbose|Warning>   Minimal log level output to console [default: Information]
  --flog, --logfilelevel <Debug|Error|Fatal|Information|Verbose|Warning>  Minimal log level output to file [default: Debug]
  --cert-pem-path, --pem <cert-pem-path>                                  Path of the certificate pem file
  --cert-key-path, --key <cert-key-path>                                  Path of the certificate key file
  --cert-pfx-path, --pfx <cert-pfx-path>                                  Path of the certificate pfx file
  --cert-password <cert-password>                                         Password of the certificate
  --mode, --record-mode <RawData|Standard>                                Recording mode [default: Standard]
  -c, --cookie <cookie>                                                   Cookie string for api requests
  -f, --filename <filename>                                               File name format
  -d, --danmaku <All|Danmaku|Gift|Guard|None|RawData|SuperChat>           Flags for danmaku recording
  --webhook-url <webhook-url>                                             URL of webhoook
  --live-api-host <live-api-host>
  -?, -h, --help                                                          Show help and usage information
```

与 `run` 命令相同的参数不再赘述，请参考 `run` 命令的说明。

#### `<output-path>`

录播姬的录制输出目录，用于保存录制的文件，相当于 `run` 命令的 `<path>` 参数。

#### `<room-ids>`

录播姬要录制的房间号，可以传入多个房间号，录播姬会同时录制多个房间。可以不传，启动后可以通过 API 添加房间。

#### `--mode` `--record-mode`

录制模式，可选值：`RawData` `Standard`。传入录播姬录制模式的启动默认值，运行过程中可以通过 API 修改。

#### `-c` `--cookie`

请求 API 时使用的 Cookie。通过命令行传入启动时的默认值，运行过程中可以通过 API 修改。

#### `-f` `--filename`

录制文件名格式模板。通过命令行传入启动时的默认值，运行过程中可以通过 API 修改。

#### `-d` `--danmaku`

弹幕录制模式，本参数是一个 flag，可以传入英文逗号分割的多个参数。传入录播姬弹幕录制模式的启动默认值，运行过程中可以通过 API 修改。

可选值：`All` `Danmaku` `Gift` `Guard` `None` `RawData` `SuperChat`。

#### `--webhook-url`

Webhook URL。通过命令行传入启动时的默认值，运行过程中可以通过 API 修改。

#### `--live-api-host`

直播 API Host。通过命令行传入启动时的默认值，运行过程中可以通过 API 修改。

## `configure`

子命令：**交互式修改配置文件**

**不再推荐使用**。本命令是早期录播姬命令行版没有 HTTP API 和 WebUI 时为了方便修改配置文件而添加的，现在已经有了 HTTP API 和 WebUI，建议直接通过 HTTP 服务控制录播姬。

## `tool`

子命令：**工具箱**

所有工具箱命令都含有 `--json` 和 `--json-indented` 两个参数，可以用来输出 JSON 格式的数据，便于脚本调用解析返回结果。如果不传入这两个参数则输出面向人类阅读的文本。

### `analyze`

子命令：**录播修复 分析 FLV 文件**

```
Usage:
  BililiveRecorder.Cli tool analyze <input> [options]

Arguments:
  <input>  example: input.flv

Options:
  --json                                 print result as json string
  --json-indented                        print result as indented json string
  --pipeline-settings <pipeline-settings>
  -?, -h, --help                         Show help and usage information
```

#### `<input>`

输入的 FLV 文件路径。

#### `--pipeline-settings`

JSON 格式的传入数据处理系统的参数，目前只有一个 `SplitOnScriptTag` 参数，用于指定是否在 ScriptTag 之后分割数据。默认为 `false`。

```bash
./BililiveRecorder.Cli tool analyze path/to/input.flv --pipeline-settings '{"SplitOnScriptTag": true}'
```

### `fix`

子命令：**录播修复 修复 FLV 文件**

```bash
Usage:
  BililiveRecorder.Cli tool fix <input> <output-base> [options]

Arguments:
  <input>        example: input.flv
  <output-base>  example: output.flv

Options:
  --json                                 print result as json string
  --json-indented                        print result as indented json string
  --pipeline-settings <pipeline-settings>
  -?, -h, --help                         Show help and usage information
```

#### `<input>`

输入的 FLV 文件路径。

#### `<output-base>`

输出的 FLV 文件路径。因为修复可能会输出多个文件，实际写入的文件名会在这个基础上加上序号后缀。

#### `--pipeline-settings`

同 `analyze` 命令。

### `export`

子命令：**录播修复 导出原始分析数据**

```
Usage:
  BililiveRecorder.Cli tool export <input> <output> [options]

Arguments:
  <input>   example: input.flv
  <output>  example: output.xml or output.zip

Options:
  --json           print result as json string
  --json-indented  print result as indented json string
  -?, -h, --help   Show help and usage information
```

#### `<input>`

输入的 FLV 文件路径。

#### `<output>`

输出的 XML 文件路径。如果传入的是 zip 文件路径则会把分析数据打包成 zip 文件。

推荐使用 zip 格式，分析数据文本格式重复内容很多，压缩后体积会小很多。

### `danmaku-start-time`

子命令：**弹幕合并 读取弹幕文件开始时间**

```
Usage:
  BililiveRecorder.Cli tool danmaku-start-time [<inputs>...] [options]

Arguments:
  <inputs>  example: 1.xml 2.xml ...

Options:
  --json           print result as json string
  --json-indented  print result as indented json string
  -?, -h, --help   Show help and usage information
```

#### `<inputs>`

输入的弹幕文件路径，可以传入多个。

### `danmaku-merge`

子命令：**弹幕合并 合并弹幕文件**

```
Usage:
  BililiveRecorder.Cli tool danmaku-merge <output> [<inputs>...] [options]

Arguments:
  <output>  example: output.xml
  <inputs>  example: 1.xml 2.xml ...

Options:
  --json               print result as json string
  --json-indented      print result as indented json string
  --offsets <offsets>  Use offsets provided instead of calculating from starttime attribute.
  -?, -h, --help       Show help and usage information
```

#### `<output>`

输出的弹幕文件路径。

#### `<inputs>`

输入的要合并弹幕文件路径，可以传入多个。

#### `--offsets`

弹幕文件的时间偏移量秒数，格式为逗号分隔的数字 `5,10,15,20`。传入的数量必须和输入的弹幕文件数量一致，按照传入参数的顺序与弹幕文件一一对应。如果不传则会根据弹幕文件内记录的录制开始时间自动计算偏移量。

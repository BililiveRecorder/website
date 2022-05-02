# 工具箱

打开录播姬后，在选择工作目录的界面点击 “工具箱” 按钮会进入工具箱模式，只能使用工具箱里的功能，无需选择工作目录。

这部分文档对录播姬工具箱里的功能进行了简单说明。

写的比较简单，以后再完善。

<!-- TODO -->

## 命令行版工具箱

录播姬命令行版提供了与桌面版一样的完整的工具箱，具体命令参数以及用法见 `--help` 参数的输出。

!!! exmaple "示例"
    ```sh
    ./BililiveRecorder.Cli tool --help
    ```

命令行版工具箱可使用 JSON 作为输出信息的格式，方便脚本调用，参数是 `--json` 或 `--json-indented`

!!! exmaple "示例"
    ```sh
    ./BililiveRecorder.Cli tool analyze --json "/path/to/file.flv"
    ```

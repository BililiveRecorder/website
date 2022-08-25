# 添加新的设置项

## 新增设置项

1. 修改 `BililiveRecorder/config_gen/data.ts`
1. `cd config_gen && npm run build code` 生成新的代码
1. 更新 WPF 设置页面
1. 更新 WebUI 设置页面
1. `npm run build d /path/to/website` 更新网站文档（考虑推迟到正式版新版本发布再更新）

### 更新 WPF 设置页面

一共有三个位置会有设置项，参考已有设置

- `Pages/SettingsPage.xaml`
- `Pages/AdvancedSettingsPage.xaml`
- `Controls/PerRoomSettingsDialog.xaml`

### 更新 WebUI 设置页面

TODO

## 新配置文件版本

在 `BililiveRecorder.Core/Config/ConfigMapper.cs` 里实现配置文件版本的自动升级

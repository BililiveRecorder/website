---
title: 发布新版本
---

## 发布前

- 在 `dev` 分支完成修改的功能，实际运行测试一遍
- 检查是否有必要重新生成一个 WPF 用的 Sentry DSN

## 触发编译

- 在 GitHub 创建 Release 并发布
  - GitHub Actions 会自动补充 Assets
- 从 Artifacts 里下载 `WPF-NupkgReleases`

## 打包安装包

- 运行 `squirrel releasify` 命令
- commit push soft.danmuji.org
- 刷新安装包镜像缓存

```powershell
# $pkg="/path/to/BililiveRecorder.{version}.nupkg"
# $dst="/path/to/soft.danmuji.org/BililiveRecorder"
$pkg=""
$dst=""

$icon="./BililiveRecorder.WPF/installer.ico"
$appIcon="./BililiveRecorder.WPF/ico.ico"

squirrel releasify -p "$pkg" -r "$dst" --icon "$icon" --appIcon "$appIcon" -f net472
```

## 更新网站

- 修改 `rec.danmuji.org` 上的更新日志
- 修改 WPF 公告页
- 运行 `cd config_gen && npm run build d /path/to/website` 更新配置项文档

## 发布后检查

- Docker Hub 已更新到新版本
- ghcr.io 已更新到新版本，并且两处的 image hash 一致
- GitHub Releases 的 Assets 完整
- 安装包文件已更新
- WPF 公告页已更新

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

- [Docker Hub](https://hub.docker.com/r/bililive/recorder/tags) 已更新到新版本
- [ghcr.io](https://github.com/BililiveRecorder/BililiveRecorder/pkgs/container/bililiverecorder) 已更新到新版本，并且两处的 image hash 一致
- [GitHub Releases](https://github.com/BililiveRecorder/BililiveRecorder/releases) 的 Assets 完整
- 安装包文件已更新
- WPF 公告页已更新

## 附 mini ffmpeg 编译流程

- <https://trac.ffmpeg.org/wiki/CompilationGuide/CrossCompilingForWindows>
- <https://mxe.cc/>

```bash
docker run -it --name ffbuild ubuntu:noble
docker start -ai ffbuild

apt update
apt install -y build-essential git curl wget # ... https://mxe.cc/#requirements-debian

git clone https://github.com/mxe/mxe.git /opt/mxe --depth 1
cd /opt/mxe

make MXE_TARGETS='i686-w64-mingw32.static' cc --jobs=2 JOBS=6
export PATH=/opt/mxe/usr/bin:$PATH

cd ~
git clone https://github.com/ffmpeg/ffmpeg.git --depth 1
cd ffmpeg

./configure --enable-cross-compile --target-os=mingw32 --arch=i686 --cross-prefix=i686-w64-mingw32.static- --prefix=/output --enable-static --enable-version3 --disable-debug --disable-w32threads --disable-everything --disable-autodetect --disable-asm --enable-small --disable-runtime-cpudetect --disable-doc --disable-ffplay --disable-ffprobe --disable-network --disable-filters --disable-avdevice --disable-swresample --disable-swscale --enable-parser='h264,hevc,av1,aac,mp3' --enable-demuxer='mp4,flv,live_flv' --enable-muxer='flv,mp4' --enable-protocol='file,pipe' --enable-bsf='h264_mp4toannexb,aac_adtstoasc'

make -j10
```

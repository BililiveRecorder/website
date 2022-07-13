# 实用工具

## 安装

```shell
yarn add @bililive/rec-sdk@v2-alpha
npm i @bililive/rec-sdk@v2-alpha

import { utils } from "@bililive/rec-sdk";
```

### getRoomId

将任意形式的用户输入转换成直播间 ID

```ts
utils.getRoomId("https://live.bilibili.com/14846654")
utils.getRoomId("https://live.bilibili.com/14846654?search=42#hash")
utils.getRoomId("14846654")
utils.getRoomId("我跟你讲，我今天找到个声音超好听的妹子，她直播间是14846654，太可爱了~")

// 以上四个都会得到 number 类型的 14846654
// 你猜得没错，这个方法是为了夹带私货存在的
```

### validateCookie

验证一段 cookie 是否对于B站是否形式合法，它验证了 `DedeUserID`, `SESSDATA`, `bili_jct` 三个字段

```ts
utils.validateCookie(
  "_uuid=b407f63a-055d-458d-8bcb-4580e590b05a08491infoc; buvid3=b407f63a-055d-458d-8bcb-4580e590b05a34759infoc; buvid_fp_plain=b407f63a-055d-458d-8bcb-4580e590b05a34759infoc; LIVE_BUVID=AUTO3472911340282227; SESSDATA=ffffffff%2C000000000%2Cffffffff; bili_jct=9e2f1f8446e609144d58649b3becbfb7; DedeUserID=106978941; DedeUserID__ckMd5=22z4au4dm76fzm1i; sid=l1jtp3xe; fingerprint_s=1c284e6b42fe3c7d8474be3fb2e4cd6d; b_ut=5; buvid_fp=b4030ec481cd5c9028cd2c8b9409e003; buvid4=b407f63a-055d-458d-8bcb-4580e590b05a00000-133706993-Kp8wR12WW5LJ61IZHtW3tQ%3D%3D; i-wanna-go-back=2; nostalgia_conf=-1; fingerprint3=9a6a390bcc9dbcc2f020ee703e2294f5; fingerprint=488ec7503cbd5badde001f334975956e; bp_video_offset_100000000=3750794630458092523; dy_spec_agreed=1; bp_t_offset_100000000=451506386782327464; PVID=1; innersign=0; b_lsid=B407F63A_0E2BECBD1F2"
)
// => true
```

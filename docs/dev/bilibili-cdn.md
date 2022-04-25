# 直播 CDN 信息

本页面收集了一些B站直播服务器相关的信息。

我也不知道可能会有什么用。

暂时随便写写，回头完善。

## gotcha 系列

```txt
{c,d}1--{cn,ov}-gotcha{,1,2}0{1,2,3,4,5,6,7,8}.bilivideo.com

c1--cn-gotcha01.bilivideo.com
d1--cn-gotcha01.bilivideo.com
d1--cn-gotcha04.bilivideo.com
d1--cn-gotcha103.bilivideo.com
d1--cn-gotcha208.bilivideo.com
...
```

### c1--cn-gotcha01.bilivideo.com

几乎没见过

应该是B站自建

```txt
;; ANSWER SECTION:
c1--cn-gotcha01.bilivideo.com. 60 IN    A       61.147.236.14
c1--cn-gotcha01.bilivideo.com. 60 IN    A       61.147.236.5
c1--cn-gotcha01.bilivideo.com. 60 IN    A       61.147.236.13
c1--cn-gotcha01.bilivideo.com. 60 IN    A       61.147.236.2
c1--cn-gotcha01.bilivideo.com. 60 IN    A       61.147.236.33
c1--cn-gotcha01.bilivideo.com. 60 IN    A       61.147.236.3
c1--cn-gotcha01.bilivideo.com. 60 IN    A       61.147.236.32
c1--cn-gotcha01.bilivideo.com. 60 IN    A       61.147.236.35
c1--cn-gotcha01.bilivideo.com. 60 IN    A       61.147.236.34
c1--cn-gotcha01.bilivideo.com. 60 IN    A       61.147.236.4
```

### d1--cn-gotcha01.bilivideo.com

几乎没见过

应该是B站自建

```txt
;; ANSWER SECTION:
d1--cn-gotcha01.bilivideo.com. 600 IN   CNAME   a.w.bilicdn1.com.
a.w.bilicdn1.com.       90      IN      A       150.139.158.101
a.w.bilicdn1.com.       90      IN      A       150.139.158.102
a.w.bilicdn1.com.       90      IN      A       150.139.158.103
a.w.bilicdn1.com.       90      IN      A       150.139.158.104
a.w.bilicdn1.com.       90      IN      A       150.139.158.97
a.w.bilicdn1.com.       90      IN      A       150.139.158.98
a.w.bilicdn1.com.       90      IN      A       150.139.158.99
a.w.bilicdn1.com.       90      IN      A       150.139.158.100
```

### d1--cn-gotcha02.bilivideo.com

以前好像比较多，现在几乎没有见过

金山云 HTTP-FLV

```txt
;; ANSWER SECTION:
d1--cn-gotcha02.bilivideo.com. 90 IN    CNAME   d1--cn-gotcha02.bilivideo.com.hdlvcloud.ks-cdn.com.
d1--cn-gotcha02.bilivideo.com.hdlvcloud.ks-cdn.com. 90 IN CNAME s03-ipv6.gslb.ksyuncdn.com.
s03-ipv6.gslb.ksyuncdn.com. 90  IN      CNAME   s03-ipv6-yunfan.gslb.borui.yunfancdn.net.
s03-ipv6-yunfan.gslb.borui.yunfancdn.net. 90 IN A 略
s03-ipv6-yunfan.gslb.borui.yunfancdn.net. 90 IN A 略
s03-ipv6-yunfan.gslb.borui.yunfancdn.net. 90 IN A 略
s03-ipv6-yunfan.gslb.borui.yunfancdn.net. 90 IN A 略
s03-ipv6-yunfan.gslb.borui.yunfancdn.net. 90 IN A 略
```

### d1--cn-gotcha102.bilivideo.com

金山云 HLS-TS

```txt
;; ANSWER SECTION:
d1--cn-gotcha102.bilivideo.com. 99 IN   CNAME   d1--cn-gotcha102.bilivideo.com.hlsvcloud.ks-cdn.com.
d1--cn-gotcha102.bilivideo.com.hlsvcloud.ks-cdn.com. 99 IN CNAME k12.gslb.ksyuncdn.com.
k12.gslb.ksyuncdn.com.  99      IN      CNAME   k12-yunfan.gslb.borui.yunfancdn.net.
k12-yunfan.gslb.borui.yunfancdn.net. 99 IN A    略
k12-yunfan.gslb.borui.yunfancdn.net. 99 IN A    略
```

### d1--cn-gotcha202.bilivideo.com

金山云 HLS-FMP4

```txt
;; ANSWER SECTION:
d1--cn-gotcha202.bilivideo.com. 600 IN  CNAME   d1--cn-gotcha202.bilivideo.com.hlsvcloud.ks-cdn.com.
d1--cn-gotcha202.bilivideo.com.hlsvcloud.ks-cdn.com. 600 IN CNAME k1-ipv6.gslb.ksyuncdn.com.
k1-ipv6.gslb.ksyuncdn.com. 99   IN      CNAME   k1-ipv6-yunfan.gslb.borui.yunfancdn.net.
k1-ipv6-yunfan.gslb.borui.yunfancdn.net. 99 IN A 略
```

### d1--cn-gotcha04.bilivideo.com

比较常见

腾讯云 HTTP-FLV

```txt
;; ANSWER SECTION:
d1--cn-gotcha04.bilivideo.com. 36 IN    CNAME   4877.liveplay.myqcloud.com.
4877.liveplay.myqcloud.com. 36  IN      CNAME   9050520.pack.tcdnlive.com.
9050520.pack.tcdnlive.com. 36   IN      CNAME   d1--cn-gotcha04.bilivideo.com.l5.sched.dcloudlive.com.
d1--cn-gotcha04.bilivideo.com.l5.sched.dcloudlive.com. 36 IN A 略
```

### d1--cn-gotcha208.bilivideo.com

## 地名.bilivideo.com

```txt
cn-hbsjz-cm-02-08.bilivideo.com
cn-hbsjz-cm-02-09.bilivideo.com
cn-hbsjz-cm-02-10.bilivideo.com
cn-gddg-ct-01-22.bilivideo.com
cn-hbwh-cm-01-13.bilivideo.com

cn-hbyc-ct-02-27.bilivideo.com

cn-hbyc2-dx-live-05.bilivideo.com
```

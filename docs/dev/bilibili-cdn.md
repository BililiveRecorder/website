---
gotcha_cdn_provider_map:
  "01": mikufans自建 (mikufans视频云)
  "02": 金山云
  "03": 七牛云 (阿里云)
  "04": 腾讯云
  "05": 网宿
  "06": 白山云
  "07": 百度云 (Zenlayer)
  "08": 华为云
  "09": 阿里云
  "10": Akamai
  "11": 京东云
gotcha_cdn_type_map:
  "": FLV
  "1": HLS (ts)
  "2": HLS (fmp4)
gotcha_cdn_region_map:
  ov: 海外
  cn: 中国大陆

# npx ts-node ./scripts/dns-scan-gotcha.ts
# npx ts-node ./scripts/dns-scan-bcdn.ts
---

# 生放送 CDN 信息

本页面收集了一些mikufans生放送 CDN 相关的信息，我也不知道可能会有什么用。  
本页面主要分为两部分，分别列出了[mikufans自建的视频云域名](#mikufans视频云)（更新时间：`{{ dns_data_bcdn.time }}`）和mikufans生放送用到的[第三方服务商域名](#cdn-服务商域名)（更新时间：`{{ dns_data_gotcha.time }}`）。

!!! tip
    可以用浏览器的搜索功能 `Ctrl + F` 在本页面上快速查找

mikufans生放送使用 (或曾经用过) 以下几家 CDN:

{% for key, value in gotcha_cdn_provider_map.items() %}
- {{ value }}
{% endfor %}

目前国内最常见的是 mikufans自建 (mikufans视频云, FLV, HLS)、腾讯云(FLV)、阿里云(FLV)、华为云(HLS)。

## mikufans视频云

这些是mikufans自己建设的 CDN，也就是用地名的拼音命名的那些域名。除了生放送以外，主站视频也会用到这些服务器。

下面列出了部分已知的 CDN 域名。  
如果遇到了这里没列的域名可以联系我添加。

本段落信息更新日期: `{{ dns_data_bcdn.time }}`。

!!! tip "提交反馈"
    {% include 'cdn-feedback.html' %}

{% macro bcdn_isp(isp_name, isp_id) %}{% set data = dns_data_bcdn.dns[isp_id] %}
### {{ isp_name }} { id={{ isp_id }} }

{% for bcdn_region in data -%}
#### {{ bcdn_region.regionName }} { id={{ isp_id }}-{{ bcdn_region.regionCode }} }

{{ bcdn_region.regionName }} {{ isp_name }} (`{{ bcdn_region.regionCode }}-{{ isp_id }}`) 共有 {{ bcdn_region.domains | length }} 个域名。

??? cite "域名列表"
    ```txt
    {% for domain, ip_info in bcdn_region.domains.items() -%}
    {{ domain }}{% for ip in ip_info.ipv4 %}
        {{ ip }}{% endfor %}{% for ip in ip_info.ipv6 %}
        {{ ip }}{% endfor %}

    {% endfor %}
    ```

{% endfor %}{% endmacro %}

{{ bcdn_isp('电信', 'ct') }}
{{ bcdn_isp('联通', 'cu') }}
{{ bcdn_isp('移动', 'cm') }}
{{ bcdn_isp('广电', 'gd') }}
{{ bcdn_isp('教育网', 'fx') }}
{{ bcdn_isp('教育网（赛尔网络）', 'se') }}
{{ bcdn_isp('长城/鹏博士', 'cc') }}
{{ bcdn_isp('华数', 'wasu') }}
{{ bcdn_isp('上海驰联网络 IX', 'ix') }}
{{ bcdn_isp('Equinix IX', 'eq') }}

## CDN 服务商域名

本段落信息更新日期: `{{ dns_data_gotcha.time }}`。  
下面列出的部分 CDN 已经不再使用。  
IP 个数指的是一次 DNS 请求返回的数量（显然不可能是总数）。  
因为有 GeoDNS 的存在，不同地区的请求结果会不一样，以下信息仅供参考。

{% set 有 = '有 :fontawesome-solid-check:{ style="color:green" }, ' -%}
{% set 无 = '无 :fontawesome-solid-xmark:{ style="color:red" }' -%}

-----

{% for domain in dns_data_gotcha.dns -%}
{% set dns = dns_data_gotcha.dns[domain] -%}
{% set map = dns_data_gotcha.map[domain] -%}

### {{ domain }}

| 服务商 | 生放送流类型 | 服务区域 |
| ----- | ---------- | ------- |
| {{ gotcha_cdn_provider_map[map.id] }} | {{ gotcha_cdn_type_map[map.type] if gotcha_cdn_region_map[map.region] else '_不确定_' }} | {{ gotcha_cdn_region_map[map.region] or '_不确定_' }}  |

CNAME 指向链：

- `{{ domain }}`
{%- for key, value in dns.items() recursive -%}
  {%- if key == 'ipv4' -%}
    {{  "\n" ~ ("    " * loop.depth) }}- IPv4: {{ 有 ~ value ~ ' 个' if value else 无}}
  {%- elif key == 'ipv6' -%}
    {{  "\n" ~ ("    " * loop.depth) }}- IPv6: {{ 有 ~ value ~ ' 个' if value else 无}}
  {%- else -%}
    {{  "\n" ~ ("    " * loop.depth) }}- `{{ key }}`
    {%- if value is mapping -%}
      {{ loop(value.items())}}
    {%- else -%}
      : {{value}}
    {%- endif -%}
  {%- endif -%}
{%- endfor %}

-----

{% endfor %}

## 其他笔记

```txt
cn-hbyc2-dx-live-05.bilivideo.com
cn-zjhz-cmcc-live-01.bilivideo.com
cn-zjhz-cmcc-v-23.bilivideo.com
cn-jsnt-dx-v-05.bilivideo.com
cn-gdgz-fx-live-16.bilivideo.com
```

------

- `d1--tf-gotcha01.bilivideo.com`
    - `CNAME d1--tf-gotcha01-basic.bilivideo.com`
        - `CNAME live-tf-live-tf-015-ct.bvc-line.bilivideo.com`
        - `CNAME live-tf-live-tf-0137-ct.bvc-line.bilivideo.com`
    - `CNAME d1--tf-gotcha01-loc.bilivideo.com`
        - `CNAME a.w.bilicdn1.com`

??? cite "`d1--tf-gotcha01.bilivideo.com` 最终解析到的 IP"
    ```txt
    60.12.119.72
    42.101.85.198
    42.101.85.201
    42.56.91.134
    117.23.60.11
    60.12.119.73
    112.47.7.8
    117.23.60.10
    42.101.85.200
    120.131.2.207
    112.47.7.9
    60.12.119.71
    42.56.91.136
    23.236.97.62
    164.52.44.50
    164.52.76.18
    148.153.56.163
    223.85.58.76
    223.85.58.75
    103.151.151.2
    164.52.110.14
    148.153.46.90
    103.151.151.130
    103.151.151.131
    103.151.151.3
    45.40.60.170
    148.153.64.18
    118.193.16.42
    164.52.33.182
    164.52.28.62
    148.153.34.154
    103.151.151.5
    103.151.151.6
    ```

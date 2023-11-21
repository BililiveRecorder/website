import { writeFileSync } from 'node:fs';

import raw_bcdn from '../src/data/cdn/bcdn.json'
import raw_gotcha from '../src/data/cdn/gotcha.json'

const bcdn = raw_bcdn as unknown as BCDN;
const gotcha = raw_gotcha as unknown as GOTCHA;

// bcdn types

type IspId = keyof typeof raw_bcdn.dns

type BCDN = {
  time: string;
  dns: Record<IspId, Region[]>;
};

type Region = {
  regionCode: string;
  regionName: string;
  domains: Record<string, DomainIps>;
};

type DomainIps = {
  ipv4: string[];
  ipv6: string[];
};

// gotcha types

type GOTCHA = {
  time: string;
  dns: Record<string, DnsEntry>;
  map: Record<string, MapEntry>;
};

interface DnsEntry {
  [domain: string]: IpCount | DnsEntry;
}

type IpCount = {
  ipv4: number;
  ipv6: number;
};

type MapEntry = {
  prefix: string;
  region: string;
  type: string;
  id: string;
};

const gotchaProviderMap: Record<string, string> = {
  "01": "自建视频云",
  "02": "金山云",
  "03": "七牛云 (阿里云)",
  "04": "腾讯云",
  "05": "网宿",
  "06": "白山云",
  "07": "百度云 (Zenlayer)",
  "08": "华为云",
  "09": "阿里云",
  "10": "Akamai",
  "11": "京东云",
};

const gotchaTypeMap: Record<string, string> = {
  "": "FLV",
  "1": "HLS (ts)",
  "2": "HLS (fmp4)",
};

const gotchaRegionMap: Record<string, string> = {
  ov: "海外",
  cn: "中国大陆",
};

// main

export function generateCdnPage() {
  let result = `---
# 本文件由脚本 generate\\generateCdnPage.ts 生成，请勿手动修改
title: CDN 信息
description: 直播 CDN 相关的信息收集
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 4
---

import CdnFeedback from '@components/CdnFeedback.astro'

<style>summary\\\{cursor\\\:pointer\\\}</style>

本页面收集了一些直播 CDN 相关的信息，我也不知道可能会有什么用。  
本页面主要分为两部分，分别列出了自建的视频云域名（更新时间：\`${bcdn.time}\`）和第三方服务商域名（更新时间：\`${gotcha.time}\`）。本页面较长，可以用浏览器的搜索功能 \` Ctrl + F \` 在本页面上快速查找。

如果发现本页面上的信息不全或有错误，可以通过下面的表单提交反馈。

<CdnFeedback />

## 自建视频云域名

本段落更新时间：\`${bcdn.time}\`

`;

  result += buildBcdnIsp('电信', 'ct');
  result += buildBcdnIsp('联通', 'cu');
  result += buildBcdnIsp('移动', 'cm');
  result += buildBcdnIsp('广电', 'gd');
  result += buildBcdnIsp('教育网', 'fx');
  result += buildBcdnIsp('教育网（赛尔网络）', 'se');
  result += buildBcdnIsp('长城/鹏博士', 'cc');
  result += buildBcdnIsp('华数', 'wasu');
  result += buildBcdnIsp('上海驰联网络 IX', 'ix');
  result += buildBcdnIsp('Equinix IX', 'eq');

  result += `
## 第三方服务商域名

本段落更新时间：\`${gotcha.time}\`

下面列出的部分 CDN 已经不再使用。IP 个数指的是一次 DNS 请求返回的数量（显然不可能是总数）。因为有 GeoDNS 的存在，不同地区的请求结果会不一样，以下信息仅供参考。

`;

  for (const [domain, entry] of Object.entries(gotcha.dns)) {
    const { region, type, id } = gotcha.map[domain];
    result += `
### \`${domain}\` {#gotcha-${domain.replace(/\.bilivideo\.com$/, '')}}

| 服务商 | 生放送流类型 | 服务区域 |
| ----- | ---------- | ------- |
| ${gotchaProviderMap[id]} | ${gotchaRegionMap[region] ? gotchaTypeMap[type] : '*不确定*'} | ${gotchaRegionMap[region] || '*不确定*'} |

CNAME 指向链：
`

    /*
Recursively build CNAME chain, tracking the depth to indent output properly.
Example output:

- base.example.com
  - CNAME1.example.com
    - CNAME2.example.com
      - IPv4: 5 个 ✔️
      - IPv6: 0 个 ❌
*/

    buildCnameChain(entry);

    result += '\n';

    function buildCnameChain(entry: IpCount | DnsEntry, depth = 0) {
      const ident = '  '.repeat(depth);
      if (typeof entry.ipv4 === 'number' || typeof entry.ipv6 === 'number') {
        // entry is IpCount
        result += `
${ident}- IPv4: ${entry.ipv4} 个 ${entry.ipv4 ? '✔️' : '❌'}
${ident}- IPv6: ${entry.ipv6} 个 ${entry.ipv6 ? '✔️' : '❌'}`
      } else {
        // entry is DnsEntry
        Object.entries(entry).forEach(([domain, subEntry]) => {
          result += `
${ident}- \`${domain}\``
          buildCnameChain(subEntry, depth + 1)
        })
      }
    }
  }

  result += '\n\n';
  result = result.replaceAll(/\n{3,}/g, '\n\n');
  writeFileSync(new URL('../src/content/docs/dev/cdn-info.mdx', import.meta.url), result);
}

function buildBcdnIsp(ispName: string, ispId: IspId): string {
  const data = bcdn.dns[ispId];
  let result = `
### ${ispName} {#cdn-${ispId}}

`;

  for (const region of data) {
    if (!Object.keys(region.domains).length) continue;

    result += `
#### ${region.regionName} {#cdn-${ispId}-${region.regionCode}}

${region.regionName} ${ispName} (\`${region.regionCode}-${ispId}\`) 共有 ${Object.keys(region.domains).length} 个域名。

<details>
<summary>点击展开 ${region.regionName} ${ispName} 的域名列表</summary>

\`\`\`txt title="${region.regionName}${ispName[0].match(/[a-zA-Z]/) ? ' ' : ''}${ispName}" /.+bilivideo.com/
${Object.entries(region.domains)
        .map(([domain, ips]) => `${domain}
${[...(ips.ipv4 || []), ...(ips.ipv6 || [])].map(x => '    ' + x).join('\n')}`)
        .join('\n\n')}
\`\`\`

</details>

`;
  }
  return result;
}

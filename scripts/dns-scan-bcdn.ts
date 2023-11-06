import { Resolver } from "dns/promises";
import { writeFileSync } from "fs";

const r = new Resolver();
r.setServers(['119.29.29.29', '182.254.118.118'])

const groupBy = <T, Y>(array: T[], predicate: (v: T) => string, filter: (v: T) => Y) =>
  array.reduce((acc, value) => {
    (acc[predicate(value)] ||= []).push(filter(value));
    return acc;
  }, {} as { [key: string]: Y[] });

const CDN_INFO: [isp: string, regionCode: string, regionName: string, extraZoneName?: string[]][] = [
  // China Telecom 中国电信
  ['ct', 'ahwh', '安徽芜湖'],
  ['ct', 'cq', '重庆'],
  ['ct', 'gddg', '广东东莞'],
  ['ct', 'gdfs', '广东佛山'],
  ['ct', 'hblf', '河北廊坊'],
  ['ct', 'hbyc', '湖北宜昌'],
  ['ct', 'hnld', '湖南娄底'],
  ['ct', 'hljheb', '黑龙江哈尔滨'],
  ['ct', 'jsnt', '江苏南通'],
  ['ct', 'jsyz', '江苏扬州'],
  ['ct', 'jxjj', '江西九江'],
  ['ct', 'sccd', '四川成都'],
  ['ct', 'scya', '四川雅安'],
  ['ct', 'sxxa', '陕西西安'],
  ['ct', 'xj', '新疆'],
  ['ct', 'zjjh', '浙江金华'],

  // China Mobile 中国移动
  ['cm', 'ahhn', '安徽淮南'],
  ['cm', 'cq', '重庆'],
  ['cm', 'fjqz', '福建泉州'],
  ['cm', 'gddg', '广东东莞'],
  ['cm', 'gdst', '广东汕头'],
  ['cm', 'hbsjz', '河北石家庄'],
  ['cm', 'hbwh', '湖北武汉'],
  ['cm', 'hljheb', '黑龙江哈尔滨'],
  ['cm', 'hncs', '湖南长沙'],
  ['cm', 'hnzz', '河南郑州'],
  ['cm', 'jssz', '江苏苏州'],
  ['cm', 'jxnc', '江西南昌'],
  ['cm', 'lnsy', '辽宁沈阳'],
  ['cm', 'nmghhht', '内蒙古呼和浩特'],
  ['cm', 'sccd', '四川成都'],
  ['cm', 'sdjn', '山东济南'],
  ['cm', 'sxty', '山西太原'],
  ['cm', 'sxxa', '陕西西安'],
  ['cm', 'tj', '天津'],
  ['cm', 'xj', '新疆'],
  ['cm', 'zjhz', '浙江杭州'],

  // China Unicom 中国联通
  ['cu', 'gddg', '广东东莞'],
  ['cu', 'hbcd', '河北承德'],
  ['cu', 'hncs', '湖南长沙'],
  ['cu', 'hnly', '河南洛阳'],
  ['cu', 'jstz', '江苏泰州'],
  ['cu', 'lnsy', '辽宁沈阳'],
  ['cu', 'nmghhht', '内蒙古呼和浩特'],
  ['cu', 'sccd', '四川成都'],
  ['cu', 'sxty', '山西太原'],
  ['cu', 'sxxa', '陕西西安'],
  ['cu', 'sdqd', '山东青岛'],
  ['cu', 'sdyt', '山东烟台', ['live']],
  ['cu', 'zjhz', '浙江杭州'],
  ['cu', 'jlcc', '吉林长春'],
  // ['cu', 'jlcc3', '吉林长春'], 和 jlcc IP 一样， cn-jlcc3-cu-v-01 到 06，IP 是 2 到 7

  // 广电
  ['gd', 'cq', '重庆'],
  ['gd', 'gdgz', '广东广州'],
  ['gd', 'gzgy', '贵州贵阳'],
  ['gd', 'hb', '河北'],
  ['gd', 'hbwh', '湖北武汉'],
  ['gd', 'hljheb', '黑龙江哈尔滨'],
  ['gd', 'jlcc', '吉林长春'],
  ['gd', 'jsnj', '江苏南京'],
  ['gd', 'hncs', '湖南长沙'],
  ['gd', 'zjhz', '浙江杭州'],

  // cc 长城/鹏博士/电信通
  ['cc', 'bj', '北京'],
  ['cc', 'gdfs', '广东佛山'],
  ['cc', 'sh', '上海'],


  // ccc 三线带宽 暂不扫，回头改一下脚本一起把所有IP都扫出来
  // ['ccc', 'hnld', '湖南娄底'],
  // ['ccc', 'jsyz', '江苏扬州'],
  // ['ccc', 'sdqd', '山东青岛'],

  // ?????? 教育网
  ['fx', 'bj', '北京'],
  ['fx', 'fjfz', '福建福州'],
  ['fx', 'gdgz', '广东广州'],
  ['fx', 'hbwh', '湖北武汉'],
  ['fx', 'hncs', '湖南长沙'],
  ['fx', 'hnzz', '河南郑州'],
  ['fx', 'jsnj', '江苏南京'],
  ['fx', 'sccd', '四川成都'],
  ['fx', 'sdjn', '山东济南'],
  ['fx', 'sh', '上海'],
  ['fx', 'tj', '天津'],

  // wasu 华数
  ['wasu', 'zjhz', '浙江杭州'],

  // eq
  ['eq', 'hk', '香港'],

  // 上海驰联网络 www.wexchange.com.cn
  ['ix', 'sh', '上海'],

  // 教育网（赛尔网络）
  ['se', 'bj', '北京'],
];

const ispOrder = [] as string[];

for (const info of CDN_INFO) {
  if (ispOrder.indexOf(info[0]) === -1) {
    ispOrder.push(info[0]);
  }
}

const cdnRegions = CDN_INFO.map(info => {
  const zones = ['01', '02', '03', '04', 'v', ...(info[3] || [])]
  const prefixs = zones.map(zone => `cn-${info[1]}-${info[0]}-${zone}`);
  return {
    isp: info[0],
    regionCode: info[1],
    regionName: info[2],
    zones: prefixs
  }
});

// console.log(cdnRegions);

const parallelQueryCount: number = 6;

type DomainIpMap = { [domain: string]: { ipv4?: string[], ipv6?: string[] } };

(async function () {
  const tempStore: {
    isp: string;
    regionCode: string;
    regionName: string;
    domains: DomainIpMap;
  }[] = [];

  if (parallelQueryCount < 1) {
    for (const region of cdnRegions) {
      const domains: DomainIpMap = {};

      for (const zone of region.zones) {
        await resolveCdnDomain(zone, domains);
      }

      tempStore.push({
        isp: region.isp,
        regionCode: region.regionCode,
        regionName: region.regionName,
        domains
      });
    }
  } else {
    async function runParallelQuery(regions: {
      isp: string;
      regionCode: string;
      regionName: string;
      zones: string[];
    }[]) {
      while (true) {
        const region = regions.shift();
        if (!region) break;

        const domains: DomainIpMap = {};

        for (const zone of region.zones) {
          await resolveCdnDomain(zone, domains);
        }

        tempStore.push({
          isp: region.isp,
          regionCode: region.regionCode,
          regionName: region.regionName,
          domains
        });
      }
    }

    // make multiple async calls at the same time
    const localRegions = [...cdnRegions];
    const tasks: Promise<void>[] = new Array(parallelQueryCount).fill(0).map(() => runParallelQuery(localRegions));
    await Promise.all(tasks);
  }

  const output = groupBy(tempStore, x => x.isp, x => {
    return {
      regionCode: x.regionCode,
      regionName: x.regionName,
      domains: x.domains
    }
  });

  let outputSorted = Object.fromEntries(Object.entries(output).map(isp => {
    isp[1] = isp[1].sort((a, b) => a.regionCode > b.regionCode ? 1 : a.regionCode < b.regionCode ? -1 : 0);
    return isp;
  }));

  // the keys of outputSorted is the ISP name, sort entries by the isp names in ispOrder
  outputSorted = Object.fromEntries(Object.entries(outputSorted).sort((a, b) => {
    const aIndex = ispOrder.indexOf(a[0]);
    const bIndex = ispOrder.indexOf(b[0]);
    return aIndex > bIndex ? 1 : aIndex < bIndex ? -1 : 0;
  }));

  const outputText = JSON.stringify({
    time: new Date().toLocaleDateString('zh-CN', {
      timeZone: 'Asia/Shanghai'
    }),
    dns: outputSorted
  }, null, 2);

  writeFileSync(new URL('../src/data/cdn/bcdn.json', import.meta.url), outputText + '\n');

  console.log(' ==== DONE ==== ');
})();

async function resolveCdnDomain(zone: string, results: DomainIpMap) {
  try {
    console.log('> ' + zone);

    let lastSuccessId = 0;
    for (let id = 0; id < 100; id++) {
      const domain = `${zone}-${('0' + id).slice(-2)}.bilivideo.com`;

      const result = await resolveIpAddress(domain);

      if (result) {
        results[domain] = result;
        lastSuccessId = id;
      }

      if (id - lastSuccessId > 5)
        break;
    }
  } catch (error) {
    console.error('异常错误', error);
  }
}

async function resolveIpAddress(domain: string) {
  const result: { ipv4?: string[], ipv6?: string[] } = {};

  console.log('  > ' + domain);

  for (let i = 0; i < 2; i++) {
    try {
      result.ipv4 = (await r.resolve4(domain)).sort()
      result.ipv4.forEach(ip => console.log('    > ' + ip));
      break;
    } catch (e) { }
  }
  for (let i = 0; i < 2; i++) {
    try {
      result.ipv6 = (await r.resolve6(domain)).sort()
      result.ipv6.forEach(ip => console.log('    > ' + ip));
      break;
    } catch (e) { }
  }

  return (result.ipv4?.length || result.ipv6?.length) ? result : false;
}

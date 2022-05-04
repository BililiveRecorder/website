import { Resolver } from "dns/promises";
import { writeFileSync } from "fs";
import path from "path";
const r = new Resolver();

const groupBy = <T, Y>(array: T[], predicate: (v: T) => string, filter: (v: T) => Y) =>
  array.reduce((acc, value) => {
    (acc[predicate(value)] ||= []).push(filter(value));
    return acc;
  }, {} as { [key: string]: Y[] });

const CDN_INFO: [isp: string, regionCode: string, regionName: string, extraZoneName?: string[]][] = [
  // China Telecom 中国电信
  ['ct', 'ahwh', '安徽芜湖'],
  ['ct', 'gddg', '广东东莞'],
  ['ct', 'gdfs', '广东佛山'],
  ['ct', 'hblf', '河北廊坊'],
  ['ct', 'hbyc', '湖北宜昌'],
  ['ct', 'hljheb', '黑龙江哈尔滨'],
  ['ct', 'sccd', '四川成都'],
  ['ct', 'scya', '四川雅安'],
  ['ct', 'jxjj', '江西九江'],
  ['ct', 'jsnt', '江苏南通'],
  // China Mobile 中国移动
  ['cm', 'ahhn', '安徽淮南'],
  ['cm', 'fjqz', '福建泉州'],
  ['cm', 'gddg', '广东东莞'],
  ['cm', 'gdst', '广东汕头'],
  ['cm', 'hbsjz', '河北石家庄'],
  ['cm', 'hbwh', '湖北武汉'],
  ['cm', 'hnzz', '河南郑州'],
  ['cm', 'jxnc', '江西南昌'],
  ['cm', 'lnsy', '辽宁沈阳'],
  ['cm', 'sxxa', '陕西西安'],
  ['cm', 'tj', '天津'],
  ['cm', 'zjhz', '浙江杭州'],
  // China Unicom 中国联通
  ['cu', 'hbcd', '河北承德'],
  ['cu', 'hncs', '湖南长沙'],
  ['cu', 'lnsy', '辽宁沈阳'],
  ['cu', 'nmghhht', '内蒙古呼和浩特', ['v']],
  ['cu', 'sdyt', '山东烟台'],
  ['cu', 'zjhz', '浙江杭州'],
  // ?????? 教育网
  ['fx', 'gdgz', '广东广州'],
];

const cdnRegions = CDN_INFO.map(info => {
  const zones = ['01', '02', '03', ...(info[3] || [])]
  const prefixs = zones.map(zone => `cn-${info[1]}-${info[0]}-${zone}`);
  return {
    isp: info[0],
    regionCode: info[1],
    regionName: info[2],
    zones: prefixs
  }
});

// console.log(cdnRegions);

type DomainIpMap = { [domain: string]: { ipv4?: string[], ipv6?: string[] } };

(async function () {
  const tempStore: {
    isp: string;
    regionCode: string;
    regionName: string;
    domains: DomainIpMap;
  }[] = [];

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

  const output = groupBy(tempStore, x => x.isp, x => {
    return {
      regionCode: x.regionCode,
      regionName: x.regionName,
      domains: x.domains
    }
  });

  const outputSorted = Object.fromEntries(Object.entries(output).map(isp => {
    isp[1] = isp[1].sort((a, b) => a.regionCode > b.regionCode ? 1 : a.regionCode < b.regionCode ? -1 : 0);
    return isp;
  }));

  const outputText = JSON.stringify({
    time: new Date().toLocaleDateString('zh-CN', {
      timeZone: 'Asia/Shanghai'
    }),
    dns: outputSorted
  }, null, 2);

  const file = path.resolve(__dirname, '../data/dns_data_bcdn.json');
  console.log('Writing to: ', file);

  writeFileSync(file, outputText + '\n');

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

      if (id - lastSuccessId > 3)
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
      result.ipv4 = (await r.resolve4(domain))
      result.ipv4.forEach(ip => console.log('    > ' + ip));
      break;
    } catch (e) { }
  }
  for (let i = 0; i < 2; i++) {
    try {
      result.ipv6 = (await r.resolve6(domain))
      result.ipv6.forEach(ip => console.log('    > ' + ip));
      break;
    } catch (e) { }
  }

  return (result.ipv4?.length || result.ipv6?.length) ? result : false;
}

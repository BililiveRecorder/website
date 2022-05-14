import { Resolver } from "dns/promises";
import { writeFileSync } from "fs";
import path from "path";
const r = new Resolver();

interface CdnInfoIp {
  ipv4: number
  ipv6: number
}

type CdnInfo = CdnInfoStore | CdnInfoIp

type CdnInfoStore = {
  [domain: string]: CdnInfo
}

type CdnInfoMap = {
  [domain: string]: any
}

const gotcha_prefix = ['c1', 'd1']
const gotcha_region = ['cn', 'ov', 'tf', 'p1--cn', 'p2--cn']
const gotcha_type = ['', '1', '2']
const gotcha_id = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(x => x.toString().padStart(2, '0'))

const domain_feature_map: CdnInfoMap = {};

const domains = gotcha_region.map(region => {
  return gotcha_id.map(id => {
    return gotcha_type.map(type => {
      return gotcha_prefix.map(prefix => {
        const d = `${prefix}--${region}-gotcha${type}${id}.bilivideo.com`;
        domain_feature_map[d] = { prefix, region, type, id }
        return d;
      })
    })
  })
}).flat(3)

console.log(domains, domains.length)

async function resolveDomains(domains: string[], output: CdnInfoStore, logPrefix: string = "") {
  try {

    logPrefix += '>'
    for (const domain of domains) {
      console.log(logPrefix, domain);
      if (!await resolveCname(domain, output, logPrefix)) {
        await resolveIp(domain, output)
      }
    }

  } catch (error) {
    console.error('异常错误', error);
  }
}

async function resolveCname(domain: string, output: CdnInfoStore, logPrefix: string): Promise<boolean> {
  for (let i = 0; i < 2; i++) {
    try {
      const subd = await r.resolveCname(domain)
      const substore: CdnInfoStore = {}
      output[domain] = substore;
      await resolveDomains(subd, substore, logPrefix);
      return true;
    } catch (e) { }
  }
  return false;
}

async function resolveIp(domain: string, output: CdnInfoStore) {
  let ipv4 = 0, ipv6 = 0;

  for (let i = 0; i < 2; i++) {
    try {
      ipv4 = (await r.resolve4(domain)).length
      break;
    } catch (e) { }
  }
  for (let i = 0; i < 2; i++) {
    try {
      ipv6 = (await r.resolve6(domain)).length
      break;
    } catch (e) { }
  }
  if (ipv4 || ipv6)
    output[domain] = { ipv4, ipv6 } as CdnInfoIp
}

const output: CdnInfoStore = {};

(async function () {
  await resolveDomains(domains, output);
  // console.log(output)

  const outputText = JSON.stringify({
    time: new Date().toLocaleDateString('zh-CN', {
      timeZone: 'Asia/Shanghai'
    }),
    dns: output,
    map: Object.fromEntries(Object.entries(domain_feature_map).filter(x => output[x[0]]))
  }, null, 2);


  const file = path.resolve(__dirname, '../data/dns_data_gotcha.json');
  console.log('Writing to: ', file);

  writeFileSync(file, outputText + '\n');

  console.log(' ==== DONE ==== ');
})()

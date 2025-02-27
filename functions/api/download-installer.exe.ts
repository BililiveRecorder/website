import CONSTANTS from "../constants"
import { generateSignedURL } from "../utils/signedUrl";

export const onRequestGet: PagesFunction<{
  DOWNLOAD_CHECK_KEY: string
  CDN_HOST: string
  CDN_KEY: string
}> = async (context) => {
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context;

  const cf = request.cf;

  if (!cf) {
    console.log('cf object is null');
    return Response.redirect(CONSTANTS.FALLBACK_DOWNLOAD_URL, 302);
  }

  if (cf.country !== 'CN') {
    console.log('region: ' + cf.country);
    return Response.redirect(CONSTANTS.FALLBACK_DOWNLOAD_URL, 302);
  }

  const clientIP = request.headers.get('CF-Connecting-IP');
  const blockIpPrefix = [
    '27.115.124.',
    '36.99.136.',
    '111.7.100',
    '111.206.170.',
    '116.132.223.',
    '119.167.234.',
    '171.13.14.',
    '180.163.220.',
    '218.91.199.',
    '114.80.9.',
    '114.230.238',
  ];
  if (blockIpPrefix.some(match => clientIP?.startsWith(match))) {
    console.log('ip in blocklist: ' + clientIP);
    return Response.redirect(CONSTANTS.FALLBACK_DOWNLOAD_URL, 302);
  }

  const url = new URL(request.url);
  const req_time = url.searchParams.get('t');
  const req_ua = url.searchParams.get('u');

  if (typeof req_time !== 'string' || typeof req_ua !== 'string') {
    console.log('missing argument');
    return Response.redirect(CONSTANTS.FALLBACK_DOWNLOAD_URL, 302);
  }

  if (req_ua !== request.headers.get('User-Agent')) {
    console.log('user-agent mismatch');
    return Response.redirect(CONSTANTS.FALLBACK_DOWNLOAD_URL, 302);
  }

  if ((Date.now() - parseInt(req_time)) / 1000 > CONSTANTS.TIMESTAMP_VALID_DURATION_SECONDS) {
    console.log('request expired');
    return Response.redirect(CONSTANTS.FALLBACK_DOWNLOAD_URL, 302);
  }

  if (!req_ua.includes('Windows')) {
    console.log('not windows');
    return Response.redirect(CONSTANTS.FALLBACK_DOWNLOAD_URL, 302);
  }

  console.log('redirecting...');
  return Response.redirect(await generateSignedURL(env.CDN_HOST, '/BililiveRecorderSetup.exe', env.CDN_KEY), 302);
};

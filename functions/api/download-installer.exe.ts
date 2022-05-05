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

  const url = new URL(request.url);
  const req_time = url.searchParams.get('t'), req_ua = url.searchParams.get('u');

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

  console.log('redirecting...');
  return Response.redirect(await generateSignedURL(env.CDN_HOST, '/Setup.exe', env.CDN_KEY), 302);
};

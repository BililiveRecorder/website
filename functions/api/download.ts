import CONSTANTS from "../constants"
import { md5, generateSignedURL } from "../utils/signedUrl";

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
  const query = url.searchParams.get('a');

  if (typeof query !== 'string') {
    console.log('missing argument');
    return Response.redirect(CONSTANTS.FALLBACK_DOWNLOAD_URL, 302);
  }

  const [ts, sign] = query.split('-');
  const time = parseInt(ts, 16) * CONSTANTS.TIMESTAMP_CONVERT_MULTIPLIER;

  if ((Date.now() - time) / 1000 > CONSTANTS.TIMESTAMP_VALID_DURATION_SECONDS) {
    console.log('sign expired');
    return Response.redirect(CONSTANTS.FALLBACK_DOWNLOAD_URL, 302);
  }

  const new_sign = await md5(ts + env.DOWNLOAD_CHECK_KEY + request.headers.get('User-Agent'));

  if (new_sign === sign) {
    console.log('redirecting...');
    return Response.redirect(await generateSignedURL(env.CDN_HOST, '/BililiveRecorderSetup.exe', env.CDN_KEY), 302);
  } else {
    console.log('sign mismatch');
    return Response.redirect(CONSTANTS.FALLBACK_DOWNLOAD_URL, 302);
  }
};

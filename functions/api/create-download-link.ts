import CONSTANTS from "../constants"
import { md5 } from "../utils/signedUrl";

export const onRequestPost: PagesFunction<{
  DOWNLOAD_CHECK_KEY: string
}> = async (context) => {
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context;

  var resp = {} as { a: string };
  var postData = await request.json<{ ua: string }>();

  if (request.headers.get('User-Agent') === postData.ua) {
    const ts = Math.round(Date.now() / CONSTANTS.TIMESTAMP_CONVERT_MULTIPLIER).toString(16);
    const sign = await md5(ts + env.DOWNLOAD_CHECK_KEY + postData.ua);
    const param = `${ts}-${sign}`;
    resp = { a: '/api/download?a=' + param }
  } else {
    resp = { a: CONSTANTS.FALLBACK_DOWNLOAD_URL }
  }

  return new Response(JSON.stringify(resp), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const onRequestPost: PagesFunction<{
  RECAPTCHA_SECRET_KEY: string
  FORWARD_TARGET_URL: string
}> = async (context) => {
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    // params, // if filename includes [id] or [[path]]
    // waitUntil, // same as ctx.waitUntil in existing Worker API
    // next, // used for middleware or to fetch assets
    // data, // arbitrary space for passing data between middlewares
  } = context;

  var resp = { success: false } as { success: boolean, reason?: string };
  var postData = await request.json<{ text: string, token: string }>();

  if (typeof postData.text !== 'string' || typeof postData.token !== 'string') {
    resp.success = false;
  } else {
    const recaptchaResp = await fetch('https://www.recaptcha.net/recaptcha/api/siteverify?' + new URLSearchParams({
      secret: env.RECAPTCHA_SECRET_KEY,
      response: postData.token
    }).toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const recaptchaRespData = await recaptchaResp.json<{ success: boolean }>();

    console.log(recaptchaRespData);

    if (recaptchaRespData.success) {
      const dataString = JSON.stringify({
        username: '直播流 CDN 反馈',
        avatar_url: 'https://rec.danmuji.org/favicon.png',
        embeds: [{
          title: "直播流 CDN 反馈",
          description: postData.text,
          color: 0x4b67e3,
          fields: [
            {
              name: "来源地区",
              value: request.headers.get('CF-IPCountry') || 'Unknown',
              inline: true
            },
            {
              name: "来源 IP",
              value: request.headers.get('CF-Connecting-IP') || 'Unknown',
              inline: true
            },
            {
              name: "浏览器语言",
              value: request.headers.get('Accept-Language') || 'Unknown',
              inline: true
            },
            {
              name: "User-Agent",
              value: request.headers.get('User-Agent') || 'Unknown',
            }
          ]
        }]
      });
      console.log(dataString);

      if (env.FORWARD_TARGET_URL) {
        await fetch(env.FORWARD_TARGET_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: dataString
        });
      }

      resp.success = true;
    } else {
      resp = {
        success: false,
        reason: 'captcha'
      }
    }
  }

  return new Response(JSON.stringify(resp), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

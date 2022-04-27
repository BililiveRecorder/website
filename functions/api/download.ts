import { generateSignedURL } from "../utils/signedUrl";

export const onRequestGet: PagesFunction<{
  IMAGES: KVNamespace;
  DOWNLOAD_COUNTER: DurableObjectNamespace;
}> = async (context) => {
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context;

  return new Response('{"error":"not implemented"}', {
    headers: {
      "Content-Type": "application/json"
    }
  });
  //return new Response(null, {
  //  headers: {
  //    Location: await generateSignedURL({
  //      url: `${previewURLBase}/highres`,
  //      imagesKey,
  //    }),
  //  },
  //  status: 302,
  //});
};

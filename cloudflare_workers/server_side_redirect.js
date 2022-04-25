/*
Environment Variables:

- MKDOCS_URL_BASE

*/

addEventListener("fetch", (event) => {
  event.respondWith(
    handleRequest(event.request)
  );
});

/**
 * @param {Request} request
 * @returns {Promise<Response>}
 */
async function handleRequest(request) {
  const base = MKDOCS_URL_BASE || '/';
  const url = new URL(request.url);

  const redirects_data_url = url.origin + base + "redirects.json";
  const redirects = await (await fetch(redirects_data_url)).json();

  console.log("redirects.json info", redirects_data_url, redirects);

  const path = url.pathname;
  if (!path.startsWith(base)) {
    console.log("redirect: path out of base");
    return fetch(request);
  }
  const relative_path = path.slice(base.length);

  if (redirects[relative_path]) {
    console.log("redirect: true");
    return Response.redirect(base + redirects[relative_path])
  } else {
    console.log("redirect: false");
    return fetch(request);
  }
}

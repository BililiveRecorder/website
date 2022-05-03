const URL_BASE = '/';

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
  const url = new URL(request.url);
  const path = url.pathname;
  if (!path.startsWith(URL_BASE)) {
    console.log("redirect: path out of base");
    return fetch(request);
  }

  const redirects_data_url = url.origin + URL_BASE + "redirects.json";
  const redirects = await (await fetch(redirects_data_url)).json();
  console.log("redirects.json info", redirects_data_url, redirects);

  const relative_path = path.slice(URL_BASE.length);

  if (redirects[relative_path]) {
    console.log("redirect: true");
    return Response.redirect(new URL(redirects[relative_path], url.origin + URL_BASE), 302)
  } else {
    console.log("redirect: false");
    return fetch(request);
  }
}

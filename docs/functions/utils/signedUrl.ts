export async function generateSignedURL(host: string, path: string, key: string) {
  const ts = Math.round(Date.now() / 1000).toString(16);
  const sign = await md5(key + path + ts);
  const url = `${host}/${sign}/${ts}${path}`;
  return url
}

async function md5(text: string) {
  return bufferToHex(await crypto.subtle.digest("MD5", new TextEncoder().encode(text)))
}

const bufferToHex = (buffer: ArrayBuffer) =>
  [...new Uint8Array(buffer)]
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('');

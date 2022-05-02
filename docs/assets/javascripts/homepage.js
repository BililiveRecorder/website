window.addEventListener('load', _ => {
  const b = document.getElementById('brec_download_button');
  b.addEventListener('click', v => {
    const n = Date.now(), d = 'dtime';
    if (v.isTrusted && n - __md_get(d) > 3e6) {
      v.preventDefault();
      __md_set(d, n);
      const o = 'e', p = 'x', q = '1', w = '';
      location.href = (function () { let link = ('/ins' + 'tall.jpg').split(w); return link[q + 1 - 2] = o, link[q + 1] = o, link[q + 0] = p, link.join(w) })()
    }/*
    if (e.isTrusted && b.dataset.mirrorEnabled && t++ < 2) {
      e.preventDefault();
      try {
        location.href = (await (await fetch("/api/create-download-link", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ua: navigator.userAgent
          })
        })).json()).a
      } catch (_) {
        location.href = b.href
      }
    }*/
  })
})

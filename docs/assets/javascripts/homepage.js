window.addEventListener('load', _ => {
  if(/Windows NT [456]\.\d/.exec(navigator.userAgent))document.getElementById('brec-old-windows').style.display='';
  const b = document.getElementById('brec-download-button');
  b.addEventListener('click', v => {
    const n = Date.now(), d = 'dtime';
    if (v.isTrusted && n - __md_get(d) > 6e6) {
      __md_set(d, n);
      const l = new URL('/api/download-installer.exe', location), p = l.searchParams, old = b.getAttribute('href');
      p.set('t', Date.now());
      p.set('u', navigator.userAgent);
      b.setAttribute('href', l.toString());
      setTimeout(_ => {
        b.setAttribute('href', old)
      })
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

window.addEventListener('load', _ => {
  var t = 0;
  const b = document.getElementById('brec_download_button');
  b.addEventListener('click', async e => {
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
    }
  })
})

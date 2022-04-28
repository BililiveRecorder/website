window.addEventListener('load', _ => {
  var v = document.getElementById('brec_version'),
    s = window.__md_get('__source', sessionStorage);
  if (s) {
    v.textContent = s.version
  } else {
    fetch("https://api.github.com/repos/bililive/bililiverecorder/releases/latest")
      .then(x => x.json())
      .then(x => v.textContent = x.tag_name)
  };

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

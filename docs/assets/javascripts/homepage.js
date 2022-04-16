window.addEventListener('load', _ => {
  var v = document.getElementById('brec_version'),
    s = window.__md_get('__source', sessionStorage);
  if (s) {
    v.textContent = s.version
  } else {
    fetch("https://api.github.com/repos/bililive/bililiverecorder/releases/latest")
      .then(x => x.json())
      .then(x => v.textContent = x.tag_name)
  }
})

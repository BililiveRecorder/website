window.addEventListener('load', _ => {
  var v = Array.from(document.querySelectorAll('.brec-version')),
    s = window.__md_get('__source', sessionStorage);
  if (s) {
    v.forEach(x => x.textContent = s.version)
  } else {
    fetch("https://api.github.com/repos/bililiverecorder/bililiverecorder/releases/latest")
      .then(x => x.json())
      .then(j => v.forEach(x => x.textContent = j.tag_name))
  }
})

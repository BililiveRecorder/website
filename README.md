# [录播姬](https://github.com/BililiveRecorder/BililiveRecorder) 的 [网站](https://rec.danmuji.org)

[BiliveRecorder / 录播姬](https://github.com/BililiveRecorder/BililiveRecorder)

[Website / 网站](https://rec.danmuji.org)

基于 mkdocs 和 mkdocs-material

## mkdocs plugins

### [mkdocs_redirects](./plugins/mkdocs-redirects/)

Changes made compared to [upstream](https://github.com/mkdocs/mkdocs-redirects):

- Added support for generating [Cloudflare Pages `_redirects` file](https://developers.cloudflare.com/pages/platform/redirects/).
- Added support for generating a `redirects.json` file similar to [jekyll-redirect-from](https://github.com/jekyll/jekyll-redirect-from#disabling-redirectsjson).
- Added support for generating redirects for both with and without `/` at the end (e.g. `/path/example` and `/path/example/`).
- Changed redirect html template.

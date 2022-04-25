"""
Copyright 2019-2022 DataRobot, Inc. and its affiliates.
All rights reserved.
"""
import logging
import os
import posixpath
import textwrap
import json

from mkdocs import utils
from mkdocs.config import config_options
from mkdocs.plugins import BasePlugin

log = logging.getLogger('mkdocs.plugin.redirects')
log.addFilter(utils.warning_filter)


def write_html(site_dir, old_path, new_path):
    """ Write an HTML file in the site_dir with a meta redirect to the new page """
    # Determine all relevant paths
    old_path_abs = os.path.join(site_dir, old_path)
    old_dir = os.path.dirname(old_path)
    old_dir_abs = os.path.dirname(old_path_abs)

    # Create parent directories if they don't exist
    if not os.path.exists(old_dir_abs):
        log.debug("Creating directory '%s'", old_dir)
        os.makedirs(old_dir_abs)

    # Write the HTML redirect file in place of the old file
    with open(old_path_abs, 'w') as f:
        log.debug("Creating redirect: '%s' -> '%s'",
                  old_path, new_path)
        f.write(textwrap.dedent(
            """
            <!doctype html>
            <html>
            <head>
            <meta charset=utf-8>
            <title>跳转中...</title>
            <link rel=canonical href="{url}">
            <meta name=robots content=noindex>
            <script>a=location.hash.substr(1);location.href="{url}"+(a?"#"+a:"")</script>
            <meta http-equiv=refresh content="0;url={url}">
            </head>
            <body>
            <h1>跳转中...</h1>
            <a href="{url}">如果没有自动跳转请点击这里</a>
            </body>
            </html>
            """
        ).format(url=new_path).replace('\n',''))


def get_relative_html_path(old_html_path, new_html_path, use_directory_urls):
    """ Return the relative path from the old html path to the new html path"""
    if use_directory_urls:
        # remove /index.html from end of path
        new_html_path = posixpath.dirname(new_html_path) or './'

    relative_path = posixpath.relpath(new_html_path, start=posixpath.dirname(old_html_path))

    if use_directory_urls:
        relative_path = relative_path + '/'

    return relative_path


def get_html_path(path, use_directory_urls):
    """ Return the HTML file path for a given markdown file """
    parent, filename = posixpath.split(path)
    name_orig = posixpath.splitext(filename)[0]

    # Both `index.md` and `README.md` files are normalized to `index.html` during build
    name = 'index' if name_orig.lower() in ('index', 'readme') else name_orig

    # Directory URLs require some different logic. This mirrors mkdocs' internal logic.
    if use_directory_urls:

        # If it's name is `index`, then that means it's the "homepage" of a directory, so should get placed in that dir
        if name == 'index':
            return posixpath.join(parent, 'index.html')

        # Otherwise, it's a file within that folder, so it should go in its own directory to resolve properly
        else:
            return posixpath.join(parent, name, 'index.html')

    # Just use the original name if Directory URLs aren't used
    else:
        return posixpath.join(parent, (name + '.html'))


class RedirectPlugin(BasePlugin):
    # Any options that this plugin supplies should go here.
    config_scheme = (
        ('redirect_maps', config_options.Type(dict, default={})),  # note the trailing comma
        ('write_both_url_type', config_options.Type(bool, default=False)),
        ('build_redirects_json', config_options.Type(bool, default=False)),
    )

    # Build a list of redirects on file generation
    def on_files(self, files, config, **kwargs):
        self.redirects = self.config.get('redirect_maps', {})

        # SHIM! Produce a warning if the old root-level 'redirects' config is present
        if config.get('redirects'):
            log.warn("The root-level 'redirects:' setting is not valid and has been changed in version 1.0! "
                     "The plugin-level 'redirect-map' must be used instead. See https://git.io/fjdBN")

        # Validate user-provided redirect "old files"
        for page_old in self.redirects.keys():
            if not utils.is_markdown_file(page_old):
                log.warn("redirects plugin: '%s' is not a valid markdown file!", page_old)

        # Build a dict of known document pages to validate against later
        self.doc_pages = {}
        for page in files.documentation_pages():  # object type: mkdocs.structure.files.File
            self.doc_pages[page.src_path.replace('\\', '/')] = page

    # Create HTML files for redirects after site dir has been built
    def on_post_build(self, config, **kwargs):

        # Determine if 'use_directory_urls' is set
        use_directory_urls = config.get('use_directory_urls')

        redirect_dict = {}

        self.__build_redirect_htmls(config['site_dir'], redirect_dict, use_directory_urls, use_directory_urls)

        if self.config['write_both_url_type']:
            self.__build_redirect_htmls(config['site_dir'], redirect_dict, not use_directory_urls, use_directory_urls)

        if self.config['build_redirects_json']:
            redirects_json_path = os.path.join(config['site_dir'], 'redirects.json')
            log.debug("Creating redirects.json '%s'", redirects_json_path)
            with open(redirects_json_path, 'w') as f:
                f.write(json.dumps(redirect_dict))

    def __build_redirect_htmls(self, site_dir, redirect_dict, old_use_directory_urls, real_use_directory_urls):

        # Walk through the redirect map and write their HTML files
        for page_old, page_new in self.redirects.items():

            # External redirect targets are easy, just use it as the target path
            if page_new.lower().startswith(('http://', 'https://')):
                dest_path = page_new
                absolute_dest_path = page_new

            elif page_new in self.doc_pages:
                dest_path = get_relative_html_path(get_html_path(page_old, old_use_directory_urls), get_html_path(page_new, real_use_directory_urls), real_use_directory_urls)
                absolute_dest_path = get_html_path(page_new, real_use_directory_urls)
                absolute_dest_path = absolute_dest_path if not real_use_directory_urls else posixpath.dirname(absolute_dest_path) + '/' or './'

            # If the redirect target isn't external or a valid internal page, throw an error
            # Note: we use 'warn' here specifically; mkdocs treats warnings specially when in strict mode
            else:
                log.warn("Redirect target '%s' does not exist!", page_new)
                continue

            # DO IT!
            src_path = get_html_path(page_old, old_use_directory_urls)
            write_html(site_dir,
                       src_path,
                       dest_path)

            if src_path.endswith('index.html'):
                trimmed_src_path = src_path[:-10]
            elif src_path.endswith('.html'):
                trimmed_src_path = src_path[:-5]
            else:
                trimmed_src_path = src_path

            redirect_dict[trimmed_src_path] = absolute_dest_path

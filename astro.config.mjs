import { defineConfig } from 'astro/config';

import starlightLinksValidator from 'starlight-links-validator'
import starlight from '@astrojs/starlight';
import compress from "astro-compress";

import rehypeExternalLinks from 'rehype-external-links';
import { remarkHeadingId } from 'remark-custom-heading-id';

import { generatePages } from './generate'
generatePages()

// https://astro.build/config
export default defineConfig({
  site: 'https://rec.danmuji.org',
  outDir: './site', // for compatibility with mkdocs
  markdown: {
    remarkPlugins: [
      remarkHeadingId,
    ],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          content: { type: 'text', value: '' },
          contentProperties: { className: ['external-link-badge'] },
          rel: ['noreferrer'],
          target: '_blank',
        }
      ],
    ]
  },
  integrations: [
    starlightLinksValidator(),
    starlight({
      title: '录播姬',
      description: '一个简单好用免费开源的直播录制工具',
      logo: {
        src: './public/favicon.svg',
      },
      customCss: [
        './src/styles/custom.css',
      ],
      editLink: {
        baseUrl: 'https://github.com/BililiveRecorder/website/blob/main/'
      },
      defaultLocale: 'zh-CN',
      locales: {
        root: {
          label: '简体中文',
          lang: 'zh-CN'
        }
      },
      components: {
        SocialIcons: './src/components/SocialIcons.astro'
      },
      sidebar: [
        {
          label: '安装使用',
          items: [
            {
              label: '录播姬的各个版本',
              link: '/install/versions/'
            },
            {
              label: '录播姬桌面版',
              link: '/install/desktop/'
            },
            {
              label: '录播姬命令行版',
              link: '/install/cli/'
            },
            {
              label: '录播姬容器镜像',
              link: '/install/container/'
            },
            {
              label: '详细教程',
              collapsed: true,
              items: [
                {
                  label: '使用 systemd 运行命令行版',
                  link: '/install/guides/systemd/'
                },
                {
                  label: '使用 pm2 运行命令行版',
                  link: '/install/guides/pm2/'
                },
                {
                  label: '使用 Portainer 运行容器',
                  link: '/install/guides/portainer/'
                },
                {
                  label: '使用 Synology 运行容器',
                  link: '/install/guides/synology/'
                },
              ],
            },
          ],
        },
        {
          label: '软件功能',
          items: [
            {
              label: '常见问题',
              link: '/user/faq/'
            },
            {
              label: '录制模式',
              link: '/user/modes/'
            },
            {
              label: '弹幕录制',
              link: '/user/danmaku/'
            },
            {
              label: '录播修复',
              link: '/user/repair/'
            },
            {
              label: '工具箱',
              items: [
                {
                  label: '分析和修复',
                  link: '/user/toolbox/analyze-repair/'
                },
                {
                  label: '弹幕文件合并',
                  link: '/user/toolbox/merge-danmaku/'
                },
              ],
            },
            {
              label: '更新日志',
              link: '/user/changelog/'
            },

            {
              label: '其他工具和项目',
              link: '/user/other-projects/'
            },
          ],
        },
        {
          label: '参考',
          items: [
            {
              label: '软件设置',
              link: '/reference/settings/'
            },
            {
              label: '命令行参数',
              link: '/reference/arguments/'
            },
            {
              label: '文件名模板',
              link: '/reference/filename-template/'
            },
            {
              label: 'Webhook',
              link: '/reference/webhook/'
            },
            {
              label: '用户脚本',
              link: '/reference/userscript/'
            },
            {
              label: '日志文件',
              link: '/reference/logs/'
            },
            {
              label: 'HTTP API',
              autogenerate: {
                directory: '/reference/api/',
              }
            },
          ],
        },
        {
          label: '开发',
          collapsed: true,
          items: [
            {
              label: '录播姬 3.0 测试说明',
              link: '/dev/v3/'
            },
            {
              label: '生放送 CDN 信息',
              link: '/dev/cdn-info/'
            },
            {
              label: '直播数据修复系统',
              link: '/dev/repair/'
            },
            {
              label: '添加新设置项',
              link: '/dev/new-setting/'
            },
            {
              label: '新版本发布流程',
              link: '/dev/new-release/'
            },
            {
              label: 'sdk.js',
              collapsed: true,
              autogenerate: {
                directory: 'dev/sdk.js/',
              }
            },
            {
              label: '社区 SDK',
              link: '/dev/sdk/'
            },
          ],
        },
      ],
    }),
    compress(),
  ],
  experimental: {
  },
});

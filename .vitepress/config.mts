import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "SeaRobot 文档中心",
  description: "SeaRobot 产品技术文档",
  lang: 'zh-CN',
  base: '/searobot-docs/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'SeaRobot 01', link: '/searobot/' },
      { text: 'GT-01 Mini', link: '/gt01/' },
      { text: 'RTK 导航', link: '/rtk-navigation/' },
      { text: 'APP 2.0.0', link: '/app/' }
    ],

    sidebar: {
      '/searobot/': [
        {
          text: 'SeaRobot 01 系列',
          items: [
            { text: '产品简介', link: '/searobot/introduction' },
            { text: '车体部件', link: '/searobot/components' },
            { text: '操作说明', link: '/searobot/operation' },
            { text: '通讯协议', link: '/searobot/protocol' },
            { text: '注意事项', link: '/searobot/precautions' },
            { text: '常见问题', link: '/searobot/faq' }
          ]
        }
      ],
      '/gt01/': [
        {
          text: 'GT-01 Mini 系列',
          items: [
            { text: '产品简介', link: '/gt01/introduction' },
            { text: '车体部件', link: '/gt01/components' },
            { text: '操作说明', link: '/gt01/operation' },
            { text: '通讯协议', link: '/gt01/protocol' },
            { text: '注意事项', link: '/gt01/precautions' },
            { text: '常见问题', link: '/gt01/faq' }
          ]
        }
      ],
      '/rtk-navigation/': [
        {
          text: 'RTK 导航系统',
          items: [
            { text: '系统介绍', link: '/rtk-navigation/introduction' },
            { text: '界面操作', link: '/rtk-navigation/interface' },
            { text: '操作流程', link: '/rtk-navigation/operation' },
            { text: '故障排除', link: '/rtk-navigation/troubleshooting' }
          ]
        }
      ],
      '/app/': [
        {
          text: 'APP 2.0.0',
          items: [
            { text: '注意事项', link: '/app/notices' },
            { text: '操作流程', link: '/app/process' },
            { text: '连接机器人', link: '/app/connection' },
            { text: '地图相关操作', link: '/app/map' },
            { text: '导航相关操作', link: '/app/navigation' },
            { text: '系统相关', link: '/app/system' },
            { text: '状态显示与控制', link: '/app/status' },
            { text: '常见故障分析', link: '/app/troubleshooting' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ushisoft/searobot-docs' }
    ],

    footer: {
      message: '技术支持由 SeaRobot 团队提供',
      copyright: 'Copyright © 2024 SeaRobot'
    }
  }
})

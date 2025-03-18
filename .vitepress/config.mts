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
      { text: 'APP 2.0.0', link: '/app/' },
      { text: 'GT-01 Mini', link: '/gt01/' },
      { text: 'RTK导航', link: '/rtk-navigation/' }
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
      ],
      '/gt01/': [
        {
          text: 'GT-01 Mini 系列',
          items: [
            { text: '产品简介', link: '/gt01/introduction' },
            { text: '车体部件', link: '/gt01/components' },
            { text: '操作说明', link: '/gt01/operation' },
            { text: '通讯协议', link: '/gt01/protocol' },
            { text: 'ROS通讯包使用说明', link: '/gt01/ros' },
            { text: '注意事项', link: '/gt01/notice' },
            { text: '常见问题', link: '/gt01/faq' }
          ]
        }
      ],
      '/rtk-navigation/': [
        {
          text: 'RTK 导航界面',
          items: [
            { text: '使用须知', link: '/rtk-navigation/notices' },
            { text: '界面概述', link: '/rtk-navigation/overview' },
            { text: '连接设置', link: '/rtk-navigation/connection' },
            { text: '轨迹录制', link: '/rtk-navigation/recording' },
            { text: '导航功能', link: '/rtk-navigation/navigation' },
            { text: '开源导航协议', link: '/rtk-navigation/protocol' }
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

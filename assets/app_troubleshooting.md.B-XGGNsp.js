import{_ as d,c as r,o as e,ae as a}from"./chunks/framework.COrXKI8X.js";const c=JSON.parse('{"title":"常见故障分析","description":"","frontmatter":{},"headers":[],"relativePath":"app/troubleshooting.md","filePath":"app/troubleshooting.md"}'),o={name:"app/troubleshooting.md"};function n(s,t,_,i,h,l){return e(),r("div",null,t[0]||(t[0]=[a('<h1 id="常见故障分析" tabindex="-1">常见故障分析 <a class="header-anchor" href="#常见故障分析" aria-label="Permalink to &quot;常见故障分析&quot;">​</a></h1><table tabindex="0"><thead><tr><th>问题现象</th><th>可能原因</th><th>对策</th></tr></thead><tbody><tr><td>建图存在重影或建图与实际不符</td><td>激光，控制器放置位置角度不正确</td><td>激光水平放置并调整角度朝向向前控制器水平并调整角度朝向向前</td></tr><tr><td></td><td>建图路径没有回环</td><td>严格按照建图规则重新建图</td></tr><tr><td>固件升级失败</td><td>网络不稳定</td><td>重启后重新升级</td></tr><tr><td></td><td>升级过程中关闭软件或者机器</td><td></td></tr><tr><td>行驶过程中突然停止不在运行</td><td>机器人供电不足</td><td>请及时充电</td></tr><tr><td></td><td>电机掉线</td><td>重新检查电机线路和电机状态，确保正常后重启</td></tr><tr><td></td><td>激光掉线</td><td>检查并牢固安装激光线路，确保正常后重启</td></tr><tr><td>行驶过程中卡顿倒退</td><td>激光前有障碍物</td><td>检查超声波是否有障碍并清除</td></tr><tr><td></td><td>超声波干扰</td><td>检查超声波工作状态，并适当调整超声波测距参数，推荐20-40CM；开启与关闭适当数量的超声波；两个超声波之间的距离不能太近</td></tr><tr><td></td><td>红外干扰</td><td>检查红外工作状态，检测红外设备是否水平放置，是否检测到地面</td></tr><tr><td>行驶蔽障过程中突然掉头蔽障</td><td>当前道路路径拥堵</td><td>查看当前行走路径是否堵住或预留空间较小</td></tr><tr><td>行驶过程中机器左右摆动较大</td><td>激光放置方位有偏移</td><td>重新正确安装激光位置和方位</td></tr><tr><td></td><td>新环境变化较大，与正在执行的地图偏差较大</td><td>新建地图</td></tr><tr><td></td><td>建立地图重影</td><td>严格按照建图规则重新建图</td></tr></tbody></table>',2)]))}const b=d(o,[["render",n]]);export{c as __pageData,b as default};

'use strict'
const path = require('path')
const dayjs = require('dayjs')
const packageJson = require('./package.json')
const resolve = dir => path.join(__dirname, dir)

const time = dayjs().format('YYYY-M-D HH:mm:ss')
process.env.VUE_APP_UPDATE_TIME = time
process.env.VUE_APP_ELEMENT_VERSION = packageJson.dependencies['element-plus']

function chainWebpack (config) {
  // 在已有的svg loader配置中 排除掉对src/icons里svg进行转换
  config.module
    .rule('svg')
    .exclude.add(resolve('src/icons')) // 排除掉src/icons目录
    .end()
  // svg icon工作原理 https://segmentfault.com/a/1190000015367490
  // 配置svg-sprite-loader
  config.module
    .rule('icons')
    .test(/\.svg$/)
    .include.add(resolve('src/icons')) // 指定src/icons要处理svg的文件目录
    .end()
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader') // 用svg-sprite-loader解析
    .options({
      symbolId: 'icon-[name]' // symbol id命名格式 icon-图标名称
    })
    .end()
  //
  config.module
    .rule('md')
    .test(/\.md/)
    .use('html-loader')
    .loader('html-loader')
    .end()
    .use('markdown-loader')
    .loader('markdown-loader')
    .end()
}

module.exports = {
  chainWebpack,
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  }
}

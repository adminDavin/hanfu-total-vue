'use strict'
const path = require('path')
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 开发服务配置
  publicPath: process.env.NODE_ENV === 'production' ? '/hanfu-total' : '/',
  devServer: {
    port: 8888, // 端口号
    host: 'localhost', // 主机
    https: false, // 是否启用https
    open: false, // 配置是否自动启动浏览器
    // 配置多个代理
    proxy: {
      '/api': {
        // target: 'http://192.168.1.104:9095/', // 本地模拟数据服务器
        target: 'https://www.tjsichuang.cn:1443', // 远程服务器
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 去掉接口地址中的api字符串
        }
      }
    }
  },
  // webpack配置节点
  configureWebpack: {
    // 路径配置
    resolve: {
      extensions: ['.js', '.vue', '.json', '.css'],
      // 别名配置
      alias: {
        // @ is an alias to /src
        '@': resolve('src')
      }
    },
    // 插件配置
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // 配置compression-webpack-plugin压缩
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5,
        minChunkSize: 100
      })
    ],
    // webpack-load配置
    module: {
      rules: []
    }
  }
}

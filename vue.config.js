const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  // devServer: {
  //   proxy: {
  //     "/api": {
  //       target: "https://apipc-xiaotuxian-front.itheima.net", // 接口地址
  //       ws: true, // 是否启用websockets
  //       changOrigin: true, //允许跨域  Origin源127.0.0.1:9000
  //       pathRewrite: {
  //         "^/api": "" //请求的时候使用这个/api前缀就可以
  //       }
  //     }
  //   }
  // },
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  }
}
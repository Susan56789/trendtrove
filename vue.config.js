const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: [],
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: {
    port: 8080,
    proxy: {
      '^/api': {
        target: 'https://worldempiresafaris.co.ke',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api': '/api' },
        logLevel: 'debug',
      },
    },
  },
})

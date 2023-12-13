const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: [], // Set this to an array of dependencies to transpile, or leave it as an empty array if none need transpilation
  configureWebpack: {
    devtool: 'source-map'
  }
})

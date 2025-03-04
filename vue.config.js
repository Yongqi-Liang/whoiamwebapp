const { defineConfig } = require('@vue/cli-service');
const { getBackendUrl } = require('./src/js/getBackendUrl.js'); // 使用 require 导入

const backendUrl = getBackendUrl();

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.whoiam.liangyongqi.top',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },
});
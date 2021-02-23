module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://magistratus/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    },
    port: 8080
  }
};
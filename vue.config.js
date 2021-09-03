module.exports = {
    devServer: {
      watchOptions: {
        ignored: ['**/public/**/*', '/node_modules'],
      },
      proxy: {
        '/api': {
          target: 'http://localhost:3000/',
          ws: true,
          changeOrigin: true
        }
      }
    }
  }
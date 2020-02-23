const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/party_budget/'
    : '/',

  configureWebpack: {
    resolve: {
      modules: [
        path.join(__dirname, 'src'),
      ]
    },
    devtool: 'source-map',
  }
}
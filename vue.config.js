const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      modules: [
        path.join(__dirname, 'src'),
      ]
    },
    devtool: 'source-map',
  }
}
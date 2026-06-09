const path = require('path')
const { register } = require('tsconfig-paths')

register({
  baseUrl: path.join(__dirname, 'dist'),
  paths: {
    '@/*': ['*'],
  },
})

require('./dist/server.js')

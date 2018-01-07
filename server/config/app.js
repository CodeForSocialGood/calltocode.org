const path = require('path')

const config = {
  port: process.env.PORT || 3000,
  publicDir: path.join(__dirname, '..', 'public')
}

module.exports = config

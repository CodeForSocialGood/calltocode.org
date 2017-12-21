const fs = require('fs')
const path = require('path')

const config = {
  port: process.env.PORT || 3000,
  httpsOptions: {
    key: fs.readFileSync('./deploy/test/privateKey.key'),
    cert: fs.readFileSync('./deploy/test/certificate.crt')
  },
  get clientDistDir () {
    return process.env.NODE_ENV === 'dev'
      ? path.join(__dirname, '..', '..', 'client', 'dist')
      : path.join(__dirname, '..', 'client')
  }
}

module.exports = config

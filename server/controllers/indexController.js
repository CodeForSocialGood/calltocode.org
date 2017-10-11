const path = require('path')

const indexController = {
  _init (pathResolver = path) {
    this.indexFilePath = pathResolver.join(__dirname, '..', '..', 'client', 'dist', 'index.html')
    return this
  },

  getIndexPage (req, res) {
    res.sendFile(this.indexFilePath)
  }
}

module.exports = indexController

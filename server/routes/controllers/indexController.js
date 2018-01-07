const path = require('path')

const bindFunctions = require('../../bindFunctions')

const indexController = {
  _init (pathResolver = path) {
    bindFunctions(this)
    
    this.indexFilePath = pathResolver.join(__dirname, '..', '..', 'public', 'index.html')
    return this
  },

  getIndexPage (req, res) {
    res.sendFile(this.indexFilePath)
  }
}

module.exports = indexController

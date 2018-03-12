import path from 'path'

import bindFunctions from '../../lib/bindFunctions'

export default {
  _init (pathResolver = path) {
    bindFunctions(this)

    this.indexFilePath = pathResolver.join(__dirname, '..', '..', 'public', 'index.html')
    return this
  },

  getIndexPage (req, res) {
    res.sendFile(this.indexFilePath)
  }
}

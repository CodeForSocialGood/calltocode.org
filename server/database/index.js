const mongoose = require('mongoose')
//  mongoose.Promise = Promise

const database = {
  _init (url, client = mongoose) {
    this.url = url
    this.client = client
    return this
  },

  connect () {
    this.client.connect(this.url)

    const db = this.client.connection
    return new Promise((resolve, reject) => {
      db.on('error', reject)
      db.once('open', resolve)
    })
  }
}

module.exports = database

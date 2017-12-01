class Database {
  constructor (url, client = require('mongoose')) {
    this.url = url
    this.client = client
  }

  connect () {
    this.client.connect(this.url, {
      useMongoClient: true
    })

    const db = this.client.connection
    return new Promise((resolve, reject) => {
      db.on('error', reject)
      db.once('open', resolve)
    })
  }
}

module.exports = Database

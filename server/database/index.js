const mongoose = require('mongoose')

function connectToDatabase () {
  const url = process.env.NODE_ENV === 'dev'
    ? 'mongodb://admin@127.0.0.1:27017/admin'
    : `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds117495.mlab.com:17495/c2c`

  mongoose.connect(url, {
    useMongoClient: true
  })

  const db = mongoose.connection
  return new Promise((resolve, reject) => {
    db.on('error', reject)
    db.once('open', resolve)
  })
}

module.exports = connectToDatabase

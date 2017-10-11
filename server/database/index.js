const mongoose = require('mongoose')

function connectToDatabase () {
  mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds117495.mlab.com:17495/c2c`, {
    useMongoClient: true
  })

  const db = mongoose.connection
  return new Promise((resolve, reject) => {
    db.on('error', reject)
    db.once('open', resolve)
  })
}

module.exports = connectToDatabase

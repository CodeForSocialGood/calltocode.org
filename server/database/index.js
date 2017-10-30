const mongoose = require('mongoose')

function connectToDatabase () {
  const dbUser = process.env.DB_USER || 'user'
  const dbPass = process.env.DB_PASS || 'pass'

  mongoose.connect(`mongodb://${dbUser}:${dbPass}@ds117495.mlab.com:17495/c2c`, {
    useMongoClient: true
  })

  const db = mongoose.connection
  return new Promise((resolve, reject) => {
    db.on('error', reject)
    db.once('open', resolve)
  })
}

module.exports = connectToDatabase

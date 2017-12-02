const config = {
  get url () {
    switch (process.env.NODE_ENV) {
      case 'prod': return `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds117495.mlab.com:17495/c2c`
      case 'test': return 'mongodb://admin@db:27017/admin'
      default: return `mongodb://admin@${process.env.DB_URL}:27017/admin`
    }
  }
}

module.exports = config

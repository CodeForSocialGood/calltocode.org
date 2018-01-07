const config = {
  get url () {
    switch (process.env.NODE_ENV) {
      case 'test':
      case 'prod': return `mongodb://admin:${process.env.DB_PASS}@${process.env.DB_HOST}/test?ssl=true&replicaSet=${process.env.DB_REPLICA_SET}&authSource=admin`
      default: return `mongodb://admin@127.0.0.1:27017/admin`
    }
  }
}

module.exports = config

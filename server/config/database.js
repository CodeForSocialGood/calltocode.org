const config = {
  get url () {
    switch (process.env.NODE_ENV) {
      case 'test': return `mongodb://admin:${process.env.DB_PASS}` +
        '@calltocode-shard-00-00-romiu.mongodb.net:27017,calltocode-shard-00-01-romiu.mongodb.net:27017,calltocode-shard-00-02-romiu.mongodb.net:27017/test?ssl=true&replicaSet=calltocode-shard-0&authSource=admin'
      case 'prod': return `mongodb://admin:${process.env.DB_PASS}` +
        '@calltocode-shard-00-00-o20xv.mongodb.net:27017,calltocode-shard-00-01-o20xv.mongodb.net:27017,calltocode-shard-00-02-o20xv.mongodb.net:27017/test?ssl=true&replicaSet=calltocode-shard-0&authSource=admin'
      default: return `mongodb://admin@127.0.0.1:27017/admin`
    }
  }
}

module.exports = config

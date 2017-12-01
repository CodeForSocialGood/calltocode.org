module.exports = {
  jwtSigningKey: process.env.JWT_SIGNING_KEY || 'secret',
  serverPort: process.env.PORT || 3000
  databaseConfig: require('./database'),
  appConfig: require('./app')
}

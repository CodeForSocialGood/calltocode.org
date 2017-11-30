module.exports = {
  // Secret for JWT signing and encryption
  secret: process.env.SECRET || 'secret',
  // Port for server
  port: process.env.PORT || 3000
}

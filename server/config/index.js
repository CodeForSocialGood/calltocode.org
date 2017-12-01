module.exports = {
  jwtSigningKey: process.env.JWT_SIGNING_KEY || 'secret',
  serverPort: process.env.PORT || 3000
}

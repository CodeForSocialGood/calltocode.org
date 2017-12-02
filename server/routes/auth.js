const jwt = require('express-jwt')
const { authConfig } = require('../config')

function getTokenFromHeader (req) {
  if (req.headers.authorization) {
    const [preamble, token] = req.headers.authorization.split(' ')
    if (preamble === 'Token' || preamble === 'Bearer') {
      return token
    }
  }

  return null
}

const auth = {
  required: jwt({
    secret: authConfig.jwtSigningKey,
    userProperty: 'payload',
    getToken: getTokenFromHeader
  }),
  optional: jwt({
    secret: authConfig.jwtSigningKey,
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
}

module.exports = auth

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
    getToken: getTokenFromHeader,
    secret: authConfig.jwtSigningKey,
    userProperty: 'payload'
  }),
  optional: jwt({
    credentialsRequired: false,
    getToken: getTokenFromHeader,
    secret: authConfig.jwtSigningKey,
    userProperty: 'payload'
  })
}

module.exports = auth

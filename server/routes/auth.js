const jwt = require('express-jwt')
const { jwtSigningKey } = require('../config')

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
    secret: jwtSigningKey,
    userProperty: 'payload',
    getToken: getTokenFromHeader
  }),
  optional: jwt({
    secret: jwtSigningKey,
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
}

module.exports = auth

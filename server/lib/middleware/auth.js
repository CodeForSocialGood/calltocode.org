import jwt from 'express-jwt'

import { authConfig } from '../../config'

function getTokenFromHeader (req) {
  if (req.headers.authorization) {
    const [preamble, token] = req.headers.authorization.split(' ')
    if (preamble === 'Token' || preamble === 'Bearer') {
      return token
    }
  }

  return null
}

export default {
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

const config = {
  accessToken: process.env.ROLLBAR_API_KEY,
  captureUncaught: true,
  captureUnhandledRejections: true,
  verbose: true,
  ...envConfig()
}

function envConfig () {
  switch (process.env.NODE_ENV) {
    case 'prod': return { environment: 'prod', reportLevel: 'error', verbose: false }
    case 'test': return { environment: 'test', reportLevel: 'warning' }
    default: return { environment: 'dev', reportLevel: 'debug', enabled: false }
  }
}

module.exports = config

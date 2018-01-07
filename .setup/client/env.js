const env = {
  NODE_ENV: process.env.NODE_ENV || 'dev',
  COMMIT_HASH: process.env.COMMIT_HASH || '',
  HOST_DOMAIN: process.env.HOST_DOMAIN || 'https://localhost:3001',
}

module.exports = env

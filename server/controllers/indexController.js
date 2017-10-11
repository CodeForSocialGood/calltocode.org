const path = require('path')

function getIndexPage (req, res) {
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'dist', 'index.html'))
}

module.exports = {
  getIndexPage
}

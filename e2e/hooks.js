const { client } = require('nightwatch-cucumber')
const { After } = require('cucumber')

After(() => {
  client.execute(`
    localStorage.clear();
    sessionStorage.clear();
  `).deleteCookies().refresh()
})

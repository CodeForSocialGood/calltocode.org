const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, Then, When }) => {
  
  Then(/^Kevin is logged in successfully$/, () => {
    return client
      .expect.element('input[name="password"]').to.be.visible
  })
})

const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, Then, When }) => {

  Then(/^Kevin is logged in successfully$/, () => {
    // not sure how to do this yet
  })
})

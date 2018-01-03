const test = require('ava')

const bindFunctions = require('./bindFunctions')

const testMessage = 'test message'

test('bindFunctions works with objects', t => {
  const controller = {
    _init (message) {
      bindFunctions(this)

      this.message = message
      return this
    },

    sendMessage () {
      return this.message
    }
  }

  const ctrl = controller._init(testMessage)
  const sendMessage = ctrl.sendMessage

  t.is(sendMessage(), testMessage)
})

test('bindFunctions works with classes', t => {
  class Controller {
    constructor (message) {
      bindFunctions(this)

      this.message = message
    }

    sendMessage () {
      return this.message
    }
  }

  const ctrl = new Controller(testMessage)
  const sendMessage = ctrl.sendMessage

  t.is(sendMessage(), testMessage)
})

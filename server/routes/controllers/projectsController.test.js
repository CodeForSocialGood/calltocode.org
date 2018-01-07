const test = require('ava')

test.beforeEach(t => {
  t.context.req = {
    query: {},
    params: {}
  }

  t.context.res = {
    status () { return this },
    json () {}
  }

  t.context.next = function () {}

  t.context.model = {
    find () { return this },
    findById () { return this },
    limit () { return this },
    skip () { return this },
    sort () { return this },
    then () { return this },
    catch () {}
  }
})

test.todo('getProjects')

test.todo('getProject')

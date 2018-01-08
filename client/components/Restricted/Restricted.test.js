import test from 'ava'
import render from 'react-test-renderer'
import Restricted from './Restricted'

test('foo', t => {
  t.pass()
})

test('bar', async t => {
  const bar = Promise.resolve('bar')

  t.is(await bar, 'bar')
})

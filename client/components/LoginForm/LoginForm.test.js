/* eslint-env jest */
import React from 'react'
import {shallow} from 'enzyme'

import {LoginForm} from './LoginForm'
let mockProps

beforeEach(() => {
  mockProps = {
    error: null,
    handleSubmit: () => {},
    login: () => {}
  }
})

describe('<LoginForm />', () => {
  describe('error is "Wrong Email"', () => {
    beforeEach(() => { mockProps.error = 'Wrong Email'})

    test('component renders correctly', () => {
      const component = shallow(<LoginForm {...mockProps} />)
      expect(component).toMatchSnapshot()
    })
  })
  describe('error is "Wrong password"', () => {
    beforeEach(() => { mockProps.error = 'Wrong password' })

    test('component renders correctly', () => {
      const component = shallow(<LoginForm {...mockProps} />)
      expect(component).toMatchSnapshot()
    })
  })
})

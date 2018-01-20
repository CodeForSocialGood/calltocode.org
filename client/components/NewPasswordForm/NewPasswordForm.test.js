/* eslint-env jest */
import React from 'react'
import {shallow} from 'enzyme'

import {NewPasswordForm} from './NewPasswordForm'
let mockProps

beforeEach(() => {
  mockProps = {
    handleSubmit: () => {},
    changePassword: () => {},
    email: {}
  }
})

describe('<NewPasswordForm />', () => {
  describe('email exists in database', () => {
    beforeEach(() => { mockProps.email = { email: 'kevin@email.com' } })

    test('component renders correctly', () => {
      const component = shallow(<NewPasswordForm {...mockProps} />)
      expect(component).toMatchSnapshot()
    })
    // describe('password of length 0', () => {
    //   beforeEach(() => { mockProps})
    // })
    // describe('password not of length 0', () => {
    //
    // })
  })
  describe('email does not exist in database', () => {
    beforeEach(() => { mockProps.email = { email: 'email@email.com' } })

    test('component renders correctly', () => {
      const component = shallow(<NewPasswordForm {...mockProps} />)
      expect(component).toMatchSnapshot()
    })
    // describe('password of length 0', () => {
    //
    // })
    // describe('password not of length 0', () => {
    //
    // })
  })
})

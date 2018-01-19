/* eslint-env jest */
import React from 'react'
import {shallow} from 'enzyme'

import {NewPasswordForm} from './NewPasswordForm'
let mockProps

beforeEach(() => {
  mockProps = {
    handleSubmit: () => {},
    onChangePassword: () => {},
    password: null
  }
})

describe('<NewPasswordForm />', () => {
  describe('render()', () => {
    describe('password of length 0', () => {
      beforeEach(() => { mockProps.password = '' })

      test('component renders correctly', () => {
        const component = shallow(<NewPasswordForm {...mockProps} />)
        expect(component).toMatchSnapshot()
      })
    })

    describe('password not of length 0', () => {
      beforeEach(() => { mockProps.password = 'fakepassword' })

      test('component renders correctly', () => {
        const component = shallow(<NewPasswordForm {...mockProps} />)
        expect(component).toMatchSnapshot()
      })
    })
  })
})

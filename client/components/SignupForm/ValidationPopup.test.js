import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import {shallow} from 'enzyme'

import ValidationPopup from './ValidationPopup'
let mockProps

beforeEach(() => {
  mockProps = {
    active: null,
    error: null
  }
})

describe('<ValidationPopup />', () => {
  describe('error is null', () => {
    beforeEach(() => { mockProps.error = null })

    describe('active is truthy', () => {
      beforeEach(() => { mockProps.active = true })

      test('component renders correctly', () => {
        const component = shallow(<ValidationPopup {...mockProps} />)
        expect(component).toMatchSnapshot()
      })
    })

    describe('active is falsey', () => {
      beforeEach(() => { mockProps.active = false })
      g
      test('component renders correctly', () => {
        const component = shallow(<ValidationPopup {...mockProps} />)
        expect(component).toMatchSnapshot()
      })
    })
  })

  describe('error is an object', () => {
    beforeEach(() => { mockProps.error = {} })

    describe('all errors truthy', () => {
      beforeEach(() => {
        mockProps.error = {
          upperCase: true,
          lowerCase: true,
          hasOneDigit: true,
          hasSpecialChar: true,
          minLength: true,
          maxLength: true,
          noIdenticalChars: true
        }
      })

      describe('active is truthy', () => {
        beforeEach(() => { mockProps.active = true })

        test('component renders correctly', () => {
          const component = shallow(<ValidationPopup {...mockProps} />)
          expect(component).toMatchSnapshot()
        })
      })

      describe('active is falsey', () => {
        beforeEach(() => { mockProps.active = false })

        test('component renders correctly', () => {
          const component = shallow(<ValidationPopup {...mockProps} />)
          expect(component).toMatchSnapshot()
        })
      })
    })

    describe('all errors falsey', () => {
      beforeEach(() => {
        mockProps.error = {
          upperCase: false,
          lowerCase: false,
          hasOneDigit: false,
          hasSpecialChar: false,
          minLength: false,
          maxLength: false,
          noIdenticalChars: false
        }
      })

      describe('active is truthy', () => {
        beforeEach(() => { mockProps.active = true })

        test('component renders correctly', () => {
          const component = shallow(<ValidationPopup {...mockProps} />)
          expect(component).toMatchSnapshot()
        })
      })

      describe('active is falsey', () => {
        beforeEach(() => { mockProps.active = false })

        test('component renders correctly', () => {
          const component = shallow(<ValidationPopup {...mockProps} />)
          expect(component).toMatchSnapshot()
        })
      })
    })
  })
})

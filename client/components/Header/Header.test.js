/* eslint-env jest */
import React from 'react'
import {shallow} from 'enzyme'

import {Header} from './Header'
let mockProps

beforeEach(() => {
  mockProps = {
    authenticated: null,
    currentPage: '',
    logout: () => {},
    user: {
      usertype: null
    }
  }
})

describe('<Header />', () => {
  describe('authenticated is truthy', () => {
    beforeEach(() => { mockProps.authenticated = true })

    describe('currentPage includes the string "profile"', () => {
      beforeEach(() => { mockProps.currentPage += 'profile' })

      describe('user\'s usertype is "contact"', () => {
        beforeEach(() => { mockProps.user.usertype = 'contact' })

        describe('currentPage includes the string "create-project"', () => {
          beforeEach(() => { mockProps.currentPage += 'create-project' })

          test('component renders correctly', () => {
            const component = shallow(<Header {...mockProps} />)
            expect(component).toMatchSnapshot()
          })
        })

        describe('currentPage does not include the string "create-project"', () => {
          test('component renders correctly', () => {
            const component = shallow(<Header {...mockProps} />)
            expect(component).toMatchSnapshot()
          })
        })
      })

      describe('user\'s usertype is not "contact"', () => {
        beforeEach(() => { mockProps.user.usertype = 'not_contact' })

        test('component renders correctly', () => {
          const component = shallow(<Header {...mockProps} />)
          expect(component).toMatchSnapshot()
        })
      })
    })
  })

  describe('authenticated is falsey', () => {
    beforeEach(() => { mockProps.authenticated = false })

    describe('currentPage includes the string "signup"', () => {
      beforeEach(() => { mockProps.currentPage += 'signup' })

      describe('currentPage includes the string "login"', () => {
        beforeEach(() => { mockProps.currentPage += 'login' })

        test('component renders correctly', () => {
          const component = shallow(<Header {...mockProps} />)
          expect(component).toMatchSnapshot()
        })
      })

      describe('currentPage does not include the string "login"', () => {
        test('component renders correctly', () => {
          const component = shallow(<Header {...mockProps} />)
          expect(component).toMatchSnapshot()
        })
      })
    })

    describe('currentPage does not include the string "signup"', () => {
      describe('currentPage includes the string "login"', () => {
        beforeEach(() => { mockProps.currentPage += 'login' })

        test('component renders correctly', () => {
          const component = shallow(<Header {...mockProps} />)
          expect(component).toMatchSnapshot()
        })
      })

      describe('currentPage does not include the string "login"', () => {
        test('component renders correctly', () => {
          const component = shallow(<Header {...mockProps} />)
          expect(component).toMatchSnapshot()
        })
      })
    })
  })
})

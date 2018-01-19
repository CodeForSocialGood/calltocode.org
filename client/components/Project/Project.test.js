/* eslint-env jest */
import React from 'react'
import {shallow} from 'enzyme'

import {Project} from './Project'
let mockProps

beforeEach(() => {
  mockProps = {
    applyForProject: () => {},
    authenticated: false,
    project: {
      name: '',
      organization: {name: ''},
      image: '',
      id: 1
    },
    user: {
      usertype: null,
      projectsAppliedFor: [{type: 1, ref: ''}],
      email: '',
      salt: '',
      hash: '',
      organization: {type: 1, ref: ''}
    }
  }
})

describe('<Project />', () => {
  describe('authenticated is truthy', () => {
    beforeEach(() => { mockProps.autheticated = true })

    describe('user has applied for project', () => {
      beforeEach(() => {
        mockProps.user = {
          usertype: null,
          projectsAppliedFor: [1]
        }
      })

      describe('user\'s usertype is "contact"', () => {
        beforeEach(() => { mockProps.user.usertype = 'contact' })

        test('component renders correctly', () => {
          const component = shallow(<Project {...mockProps} />)
          expect(component).toMatchSnapshot()
        })
      })

      describe('user\'s usertype is "volunteer"', () => {
        beforeEach(() => { mockProps.user.usertype = 'volunteer' })

        test('component renders correclty', () => {
          const component = shallow(<Project {...mockProps} />)
          expect(component).toMatchSnapshot()
        })
      })
    })

    describe('user has not applied for project', () => {
      beforeEach(() => {
        mockProps.user = {
          usertype: null,
          projectsAppliedFor: []
        }
      })

      describe('user\'s usertype is "volunteer"', () => {
        beforeEach(() => { mockProps.user.usertype = 'volunteer' })
        // component for applyForProject renders
        test('component renders correclty', () => {
          const component = shallow(<Project {...mockProps} />)
          expect(component).toMatchSnapshot()
        })
      })

      describe('user\'s usertype is "contact"', () => {
        beforeEach(() => { mockProps.user.usertype = 'contact' })

        test('component renders correclty', () => {
          const component = shallow(<Project {...mockProps} />)
          expect(component).toMatchSnapshot()
        })
      })
    })
  })

  // describe('authenticated is falsey', () => {
  //   beforeEach(() => { mockProps.autheticated = true })
  //
  //   const component = shallow(<Project {...mockProps} />)
  //   expect(component).toMatchSnapshot()
  // })
})

/* eslint-env jest */
import React from 'react'
import {shallow} from 'enzyme'

import {Profile} from './Profile'
let mockProps

beforeEach(() => {
  mockProps = {
    onLoad: () => {},
    projects: [],
    user: {
      usertype: null
    },
    mockState: {
      fetchProfileProject: () => {}
    }
  }
})

describe('<Profile />', () => {
  describe('user\'s usertype is "contact"', () => {
    beforeEach(() => { mockProps.user.usertype = 'contact' })

    test('component renders correctly', () => {
      const component = shallow(<Profile {...mockProps} />)
      expect(component).toMatchSnapshot()
    })
  })
  describe('user\'s usertype is not "contact"', () => {
    beforeEach(() => { mockProps.user.usertype = '' })

    test('component renders correctly', () => {
      const component = shallow(<Profile {...mockProps} />)
      expect(component).toMatchSnapshot()
    })
  })
})

/* eslint-env jest */
import React from 'react'
import {shallow} from 'enzyme'

import {Home} from './Home'
let mockProps

beforeEach(() => {
  mockProps = {
    onLoad: () => {},
    projects: []
  }
})

describe('<Home />', () => {
  describe('Projects is empty', () => {
    test('component renders correctly', () => {
      const component = shallow(<Home {...mockProps}/>)
      expect(component).toMatchSnapshot()
    })
  })
  describe('Projects is not empty', () => {
    beforeEach(() => { mockProps.projects = [{}] })

    test('component renders correctly', () => {
      const component = shallow(<Home {...mockProps}/>)
      expect(component).toMatchSnapshot()
    })
  })
})

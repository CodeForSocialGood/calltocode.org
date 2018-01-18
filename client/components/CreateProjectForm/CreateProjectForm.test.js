/* eslint-env jest */
import React from 'react'
import {shallow} from 'enzyme'

import {CreateProjectForm} from './CreateProjectForm'
let mockProps

beforeEach(() => {
  mockProps = {
    user: {
      organization: null
    },
    handleSubmit: () => {}
  }
})

describe('<CreateProjectForm />', () => {
  describe('with valid user organization', () => {
    beforeEach(() => { mockProps.user.organization = 'fakeOrg' })

    test('component renders correctly', () => {
      const component = shallow(<CreateProjectForm {...mockProps} />)
      expect(component).toMatchSnapshot()
    })
  })
})
